// Running this script: node elastic-apm.js
const https = require("https");

// Elastic APM params:
const API_KEY = "YOUR_API_KEY";
const API_URL = "YOUR_API_URL";
const API_PORT = 0;
const ENV = "ENVIRONMENT_ALL";

// BELA params:
const BELA_TOKEN = "BELA_TOKEN";
const BELA_HOST = "BELA_HOST";
const SERVICE_ENVIRONMENTS_TO_IGNORE = [ "staging", "develop" ]; // services with these fragments in their name or in their environment will be ignored
const SERVICE_NAME_FRAGMENTS_TO_CLEAN_UP = [ "-production", "-prd" ]; // services will have theses fragments removed from their name. Ex: acme-production -> acme

let serviceMap;
const transaction = [];

const getTimestamps = () => {
  const formatDate = (date) => {
    const year  = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() returns 0-11
    const day   = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.00Z`
  }

  const currentDate = new Date();
  const oneMonthBefore = new Date();
  oneMonthBefore.setMonth(currentDate.getMonth() - 1);

  return { START_TS: formatDate(oneMonthBefore), END_TS: formatDate(currentDate) };
}

const fetchServiceMap = () => {
  const { START_TS, END_TS } = getTimestamps();

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: API_URL,
      port: API_PORT,
      path: `/internal/apm/service-map?start=${encodeURIComponent(START_TS)}&end=${encodeURIComponent(END_TS)}&environment=${ENV}`,
      method: "GET",
      headers: {
        "kbn-xsrf": "true",
        "Authorization": `ApiKey ${API_KEY}`,
      }
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        serviceMap = JSON.parse(data);
        resolve();
      });
    });
  
    req.on("error", (error) => reject(`Request error: ${error.message}`));
  
    req.end();
  });
}

const parseId = (id) => id.startsWith(">") ? id.slice(1) : id;

const createSpanPath = (id, type, subtype) => {
  let spanPath = parseId(id);
  if (spanPath !== subtype && !spanPath.includes(`${subtype}/`)) {
    spanPath = `${subtype}/${spanPath}`;
  }
  if (spanPath !== type) {
    spanPath = `${type}/${spanPath}`;
  }

  return spanPath;
}

const createElementName = (name) => {
  if (name.includes('/')) {
    const nameArray = name.split('/');
    return nameArray[nameArray.length - 1];
  }
  return name;
}

const createElementPath = (id) => {
  const elementPath = `service/${parseId(id)}`;

  return elementPath;
}

const removeFragmentsIfNecessary = (serviceName) => {
  SERVICE_NAME_FRAGMENTS_TO_CLEAN_UP.forEach(fragment => {
    serviceName = serviceName.replace(fragment, '');
  });

  return serviceName;
}

const createElementUpsertTransaction = (element) => {
  const elementUpsertion = { op: "upsert-element" };
  const id = removeFragmentsIfNecessary(element.id);

  if (element["service.name"]) {
    elementUpsertion.path = createElementPath(id);
    elementUpsertion.type = "service";
    elementUpsertion.name = createElementName(removeFragmentsIfNecessary(element["service.name"]));
  } else {
    const type = element["span.type"];
    const subtype = element["span.subtype"];

    elementUpsertion.path = createSpanPath(id, type, subtype);
    elementUpsertion.type = subtype;
    elementUpsertion.name = createElementName(removeFragmentsIfNecessary(element.label));
  }

  transaction.push(elementUpsertion);
}

const createDependenciesUpsertTransaction = (data) => {
  const dependenciesUpsertion = { op: "add-dependencies" };

  const { sourceData, targetData } = data;
  if (!sourceData || !targetData) return;
  let fromPath;
  let toPath;

  const sourceDataId = removeFragmentsIfNecessary(sourceData.id);
  const targetDataId = removeFragmentsIfNecessary(targetData.id);

  if (sourceData["service.name"]) {
    fromPath = createElementPath(sourceDataId);
  } else {
    fromPath = createSpanPath(sourceDataId, sourceData["span.type"], sourceData["span.subtype"]);
  }

  if (targetData["service.name"]) {
    toPath = createElementPath(targetDataId);
  } else {
    toPath = createSpanPath(targetDataId, targetData["span.type"], targetData["span.subtype"]);
  }

  dependenciesUpsertion.from = fromPath;
  dependenciesUpsertion.dependencies = [{ to: toPath }];

  transaction.push(dependenciesUpsertion);
}

const checkIgnored = (value) => {
  if (!value) return false;
  return SERVICE_ENVIRONMENTS_TO_IGNORE.some(environment => value.includes(environment));
};

const isIgnoredService = (element) => {
  if (element["service.name"]) return checkIgnored(element.id) || checkIgnored(element["service.environment"]);
  return checkIgnored(element.id);
}

const isIgnoredDependency = (dependency) => {
  const { sourceData } = dependency;
  if (!sourceData) return true;
  return isIgnoredService(sourceData);
}

const createTransactions = () => {
  serviceMap.elements.forEach(({ data }) => {
    if (data.source && data.target) {
      if (isIgnoredDependency(data)) return;
      createDependenciesUpsertTransaction(data);

      return;
    }
    if (isIgnoredService(data)) return;
    createElementUpsertTransaction(data);
  });
}

const patchArchitecture = () => {
  const req = https.request({
    hostname: BELA_HOST,
    path: "/architecture",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": BELA_TOKEN,
    }
  }, (res) => {
    res.on("data", (chunk) => console.log(`BODY: ${chunk}`));
  });

  req.on("error", (error) => console.error(`Request error: ${error.message}`));

  req.write(JSON.stringify({ source: "elastic-apm", transaction }));
  req.end();
}

const init = async () => {
  try {
    await fetchServiceMap();
    createTransactions();
    patchArchitecture();
  } catch (err) {
    console.error(`Failed to fetch service map. Error: ${err.message}`);
  }
}

init();
