// Running this script: node Datadog.js
const https = require("https");
const fs = require("fs");

// Datadog params:
const API_KEY = "YOUR_API_KEY";
const APP_KEY = "YOUR_APP_KEY";
const ENV = "YOUR_ENVIRONMENT";

// BELA params:
const BELA_TOKEN = "YOUR_BELA_TOKEN";
const BELA_HOST = "https://your.bela.host";

const httpsRequest = (url, options, body = null) => {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}`));
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    if (body) {
      req.write(body);
    }

    req.end();
  });
}

const fetchDatadogDependencies = async () => {
  const options = {
    headers: {
      "DD-API-KEY": API_KEY,
      "DD-APPLICATION-KEY": APP_KEY
    }
  };

  const params = new URLSearchParams({
    env: ENV,
    start: Math.floor(Date.now() / 1000) - (60 * 60 * 24 * 31) // One month ago
  });

  const url = `https://api.datadoghq.com/api/v1/service_dependencies?${params}`;

  return httpsRequest(url, options);
}

const createUpdateFileStream = (filename, datadogData) => {
  const writableStream = fs.createWriteStream(filename);

  const writeLine = (content, padding = 0) => writableStream.write(" ".repeat(padding) + content + "\n");

  const versionLine = "v1";
  writeLine(versionLine);

  const sourceLine = "source datadog";
  writeLine(sourceLine);

  for (const [service, details] of Object.entries(datadogData)) {
    writeLine(`/service/${service} [service]`);

    const calls = details.calls || [];
    for (const call of calls) {
      writeLine(`> /service/${call}`, 2);
    }
  }

  writableStream.end();

  return writableStream;
}

const sendToTargetApi = async (body) => {
  const url = BELA_HOST + "/api/ecd-architecture";
  const options = {
    method: "PATCH",
    headers: {
      "Authorization": BELA_TOKEN,
    }
  };
  
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Allow self-signed certificates
  return httpsRequest(url, options, body);
}

const run = async () => {
  const datadogData = await fetchDatadogDependencies();

  const filename = "bela-update.ecd";
  const updateFileStream = createUpdateFileStream(filename, datadogData);

  await new Promise((resolve, reject) => {
    updateFileStream.on("finish", resolve);
    updateFileStream.on("error", reject);
  });

  const fileContent = await fs.promises.readFile(filename, "utf8");
  await sendToTargetApi(fileContent);
}

run();

