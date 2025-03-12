//
// This script will import service interaction data from Elastic APM and upload it to BELA.
//
// Example call:
// node elastic-apm.js --api-key "ELASTIC_APM_API_KEY" --api-url "https://elastic-apm-api-url:9544" --bela-token "BELA_TOKEN" --bela-host "BELA_HOST"
//
// Arguments:
// --api-key       API Key provided to you by Elastic APM
// --api-url       API URL you use to access Elastic APM (includes port number)
// --bela-token    Access token provided to you by BELA
// --bela-host     Your host provided by BELA (just the host name, not a URL)
//
// Optional Arguments:
// --environment   The Elastic APM environment you want to query (defaults to ENVIRONMENT_ALL). Refer to SERVICE_ENVIRONMENTS_TO_IGNORE and SERVICE_NAME_FRAGMENTS_TO_CLEAN_UP below for further customization.
// --source        A name that will be associated with the entities created in this import (defaults to "elastic-apm")

const https = require("https");
const fs = require("fs");

const getProcessArgValue = (processArg, required) => {
  const index = process.argv.indexOf(processArg);
  if (index > -1) {
    return process.argv[index + 1];
  }
  if (required) {
    const arg = processArg.replace(/^--/, "");
    console.error(`Missing required argument: ${arg}`);
    process.exit(1);
  }
}

// Elastic APM params:
const API_KEY = getProcessArgValue("--api-key", true);
const API_URL = getProcessArgValue("--api-url", true);
const ENV = getProcessArgValue("--environment") || "ENVIRONMENT_ALL";

// BELA params:
const BELA_TOKEN = getProcessArgValue("--bela-token", true);
const BELA_HOST = getProcessArgValue("--bela-host", true);
const SOURCE = getProcessArgValue("--source") || "elastic-apm";
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
  const url = new URL(API_URL);

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: url.hostname,
      port: url.port,
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

const createElementUpsertLine = (element) => {
  let path, type, name;
  const id = removeFragmentsIfNecessary(element.id);

  if (element["service.name"]) {
    path = createElementPath(id);
    type = "service";
    name = createElementName(removeFragmentsIfNecessary(element["service.name"]));
  } else {
    const spanType = element["span.type"];
    const spanSubtype = element["span.subtype"];

    path = createSpanPath(id, spanType, spanSubtype);
    type = spanSubtype;
    name = createElementName(removeFragmentsIfNecessary(element.label));
  }

  return `/${path} [${type}] ${name}`;
}

const createDependenciesUpsertLine = (data) => {
  const { sourceData, targetData } = data;
  if (!sourceData || !targetData) return null;
  let fromPath;
  let toPath;

  const sourceDataId = removeFragmentsIfNecessary(sourceData.id);
  if (sourceData["service.name"]) {
    fromPath = createElementPath(sourceDataId);
  } else {
    fromPath = createSpanPath(sourceDataId, sourceData["span.type"], sourceData["span.subtype"]);
  }

  const targetDataId = removeFragmentsIfNecessary(targetData.id);
  if (targetData["service.name"]) {
    toPath = createElementPath(targetDataId);
  } else {
    toPath = createSpanPath(targetDataId, targetData["span.type"], targetData["span.subtype"]);
  }

  return { fromLine: `/${fromPath}`, toLine: `> ${toPath}` };
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

const createUpdateFileStream = (filename, serviceMap) => {
  const writableStream = fs.createWriteStream(filename);
  const writeLine = (content, padding = 0) => writableStream.write(" ".repeat(padding) + content + "\n");

  const versionLine = "v1";
  writeLine(versionLine);

  const sourceLine = `source ${SOURCE}`;
  writeLine(sourceLine);

  serviceMap.elements.forEach(({ data }) => {
    if (data.source && data.target) {
      if (isIgnoredDependency(data)) return;
      const depLine = createDependenciesUpsertLine(data);
      if (depLine) {
        const { fromLine, toLine } = depLine;
        writeLine(fromLine);
        writeLine(toLine, 2);
      }

      return;
    }
    if (isIgnoredService(data)) return;
    writeLine(createElementUpsertLine(data));
  });

  writableStream.end();

  return writableStream;
}

const patchArchitecture = (body) => {
  const req = https.request({
    hostname: BELA_HOST,
    path: "/api/ecd-architecture",
    method: "PATCH",
    headers: {
      "Authorization": BELA_TOKEN,
    }
  }, (res) => {
    res.on("data", (chunk) => console.log(chunk.toString()));
  });

  req.on("error", (error) => console.error(`Request error: ${error.message}`));

  req.write(body);
  req.end();
}

const run = async () => {
  const serviceMap = await fetchServiceMap();

  const filename = "bela-update.ecd";
  const updateFileStream = createUpdateFileStream(filename, serviceMap);

  await new Promise((resolve, reject) => {
    updateFileStream.on("finish", resolve);
    updateFileStream.on("error", reject);
  });

  const fileContent = await fs.promises.readFile(filename, "utf8");
  patchArchitecture(fileContent);
}

run();
