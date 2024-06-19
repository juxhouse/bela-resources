# BELA Proof-of-Concept (POC)

To run a BELA instance locally, you can follow these steps.

## Start the BELA backend

```
docker run -p 8081:8081 --pull=always -e POC_TOKEN={TOKEN} juxhouse/bela-backend
```
You can obtain your POC_TOKEN with the BELA team.


## Generate the BELA update file

[Run the bela-updater docker app](https://github.com/juxhouse/bela-resources/blob/main/README.md#synchronize-your-code-repositories) to generate a `bela-update.json` file for one of your projects .


## Upload it to your local instance
```
curl "http://localhost:8081/architecture" --fail \
     -H "Content-Type: application/json" \
     --data @bela-update.json
```

## Open BELA

Access [local.bela.live](https://local.bela.live)

This will open BELA connected to your localhost instance.
