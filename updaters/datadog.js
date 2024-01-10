// Running this script: datadog.js
const https = require("https");

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
  const params = new URLSearchParams({
    env: ENV,
    start: Math.floor(Date.now() / 1000) - (60 * 60 * 24 * 31) // One month ago
  });
  const options = {
    headers: {
      "DD-API-KEY": API_KEY,
      "DD-APPLICATION-KEY": APP_KEY
    }
  };
  const url = `https://api.datadoghq.com/api/v1/service_dependencies?${params}`;

  return httpsRequest(url, options);
}

const transformToTargetFormat = (datadogData) => {
  const transaction = [];
  const serviceDependencies = {};

  // Add services as elements to transaction
  for (const service in datadogData) {
    transaction.push({
      op: "upsert-element",
      path: `service/${service}`
    });
  }

  // Collect dependencies
  for (const [service, details] of Object.entries(datadogData)) {
    if (!serviceDependencies[service]) {
      serviceDependencies[service] = [];
    }
    const calls = details.calls || [];
    for (const call of calls) {
      serviceDependencies[service].push({
        to: `service/${call}`
      });
    }
  }

  // Add dependencies to transaction
  for (const [service, dependencies] of Object.entries(serviceDependencies)) {
    transaction.push({
      op: "add-dependencies",
      from: `service/${service}`,
      dependencies: dependencies
    });
  }

  return {
    source: "datadog",
    transaction: transaction
  };
}

const sendToTargetApi = async (body) => {
  const url = BELA_HOST + "/architecture";
  const options = {
    method: "PATCH",
    headers: {
      "Authorization": BELA_TOKEN,
      "Content-Type": "application/json"
    }
  };

  return httpsRequest(url, options, JSON.stringify(body));
}

const init = async () => {
  try {
    const datadogData = await fetchDatadogDependencies();
    const belaTransaction = transformToTargetFormat(datadogData);
    await sendToTargetApi(belaTransaction);
  } catch (error) {
    console.error(error.message);
  }
}

init();
