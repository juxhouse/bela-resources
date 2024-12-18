# Updating BELA with your TS and JS Projects

## 1. Preparation: Install Dependencies
  Make sure your project has its dependencies installed. You can skip this step if your dependencies are already installed.
```sh
  npm ci
```

## 2. Run the Bela Updater
  The bela-updater docker app analyses your project and generates the index.scip file.

> [!IMPORTANT]
> It runs with network=none for secure containment.

```sh
docker run --network=none --pull=always \
                     -v ./:/workspace/ \
                     juxhouse/bela-updater-typescript
```

## 3. Upload the generated `index.scip` file to BELA

To upload it to a BELA container running on your local machine:
```
curl -X POST "http://localhost:8081/api/architecture-scip?source=my-source&parent-element-path=service/my-service" \
             -H "Content-Type: application/octet-stream" \
             --data-binary @index.scip
```

To upload it to a remote BELA service:
```
curl -X POST "https://$BELA_HOST/api/architecture-scip?source=my-source&parent-element-path=service/my-service" \
     -H "Content-Type: application/octet-stream" \
     -H "Authorization: $BELA_API_TOKEN" \
     --data-binary @index.scip
```

The `parent-element-path` param is optional. Elements being uploaded will be contents in the given parent element. 

You can obtain your `BELA_HOST` and `BELA_API_TOKEN` from the BELA web app.
