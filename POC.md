# BELA Proof-of-Concept (POC)

To run a BELA instance locally, to try it out, you can follow these steps.

## 1. Start the BELA backend

```
docker run -p 8081:8081 --pull=always -e POC_TOKEN={TOKEN} juxhouse/bela-backend
```
You can obtain your POC_TOKEN with the BELA team.


## 2. Update BELA with your project's architecture

Run the `bela-updater` docker app to generate a `bela-update.json` file for one of your projects.

See examples for the supported languages:
 - [C#](/updaters/.NET.md)
 - [Clojure](/updaters/Clojure.md)
 - [Java](/updaters/Java.md)
 - [Javascript](/updaters/Typescript.md)
 - [Typescript](/updaters/Typescript.md)

If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly. You can also hire BELA developers to build that integration for you.

Upload the `bela-update.json` file generated above to your local instance:
```
curl "http://localhost:8081/architecture" --fail \
     -H "Content-Type: application/json" \
     --data @bela-update.json
```

## 3. Browse It

Access [local.bela.live](https://local.bela.live)

This will open BELA connected to your localhost instance.
