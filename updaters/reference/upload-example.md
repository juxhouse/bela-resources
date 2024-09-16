# Uploading the BELA update file

Use this command to upload the `.bela/bela-update.json` file to BELA:

```
curl -f "https://$BELA_HOST/architecture" \
     -H "Authorization: $BELA_TOKEN" \
     --data @.bela/bela-update.json
```
You can obtain your `BELA_HOST` and `BELA_API_TOKEN` from the BELA web app.

If you are uploading to a local BELA instance running on your machine, you don't need the BELA_API_TOKEN. You can simply do:

```
curl -f "http://localhost:8081/architecture" \
     --data @.bela/bela-update.json
```
