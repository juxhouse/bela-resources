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
const SOURCE = "elastic-apm";
const SERVICE_ENVIRONMENTS_TO_IGNORE = [ "staging", "develop" ]; // services with these fragments in their name or in their environment will be ignored
const SERVICE_NAME_FRAGMENTS_TO_CLEAN_UP = [ "-production", "-prd" ]; // services will have theses fragments removed from their name. Ex: acme-production -> acme

const getDates = () => {
  const current = new Date();
  const oneMonthBefore = new Date();
  oneMonthBefore.setMonth(current.getMonth() - 1);

  return { START_DATE: oneMonthBefore.toISOString(), END_DATE: current.toISOString() };
}

const fetchServiceMap = () => {
  const { START_DATE, END_DATE } = getDates();

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: API_URL,
      port: API_PORT,
      path: `/internal/apm/service-map?start=${encodeURIComponent(START_DATE)}&end=${encodeURIComponent(END_DATE)}&environment=${ENV}`,
      headers: {
        "kbn-xsrf": "true",
        "Authorization": `ApiKey ${API_KEY}`,
      }
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        const parsedData = JSON.parse(data);
        if (res.statusCode < 200 || res.statusCode >= 300) {
          const message = parsedData.message.replace(/\n/g, '').replace(/\t/g, '');
          console.error(`Elastic APM Request Failed: ${res.statusCode} ${parsedData.error}.\n ${message}`);

          return;
        }

        resolve(parsedData);
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

  return elementUpsertion;
}

const createDependenciesUpsertTransaction = (data) => {
  const dependenciesUpsertion = { op: "add-dependencies" };

  const { sourceData, targetData } = data;
  if (!sourceData || !targetData) return null;
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

  return dependenciesUpsertion;
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

const createTransactions = (serviceMap) => {
  const transactions = [];

  serviceMap.elements.forEach(({ data }) => {
    if (data.source && data.target) {
      if (isIgnoredDependency(data)) return;
      const transaction = createDependenciesUpsertTransaction(data);
      if (transaction) transactions.push(transaction);

      return;
    }
    if (isIgnoredService(data)) return;
    transactions.push(createElementUpsertTransaction(data));
  });

  return transactions;
}

const patchArchitecture = (transaction) => {
  const req = https.request({
    hostname: BELA_HOST,
    path: "/architecture",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": BELA_TOKEN,
    }
  }, (res) => {
    res.on("data", (chunk) => console.log(chunk.toString()));
  });

  req.on("error", (error) => console.error(`Request error: ${error.message}`));

  req.write(JSON.stringify({ source: SOURCE, transaction }));
  req.end();
}

const run = async () => {
  const serviceMap = await fetchServiceMap();
  const transactions = createTransactions(serviceMap);
  patchArchitecture(transactions);
}

run();
