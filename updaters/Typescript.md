# Updating BELA with your TS and JS Projects
  You can upload your Typescript or Javascript projects to BELA

## Creating tsconfig file
  If your project is using Typescript, you may ignore this step, however, if you're only using Javascript you should create a tsconfig.json file first at the project root, containing your package.json file. The file should have the following content:
  
```json
{"compilerOptions": {"allowJs": true}}
```

## Creating scip file
  We're gonna be using scip-typescript to create your project index.scip file. First, you should install it, it can be done with:
```sh
npm install -g @sourcegraph/scip-typescript
```
Navigate to the project root, that contains the tsconfig.json file. Install its dependencies and run the scip-typescript command:
```sh
npm install # or yarn install
scip-typescript index
```
## Uploading to BELA
  Now that you've created your index.scip file, you may upload it to BELA. It can be done with a curl request like the following one:
```sh
 curl -X POST "https://${BACKEND_URL}/api/architecture-scip?source=${SOURCE}&secret=${ACCESS_TOKEN}" \
             -H "Content-Type: application/octet-stream" \
             --data-binary @index.scip
```
You should replace BACKEND_URL and ACCESS_TOKEN by the values supplied to you by BELA. 
The SOURCE is an identifier you provide to BELA and it may be the project name.
A successfull response is gonna return null.
