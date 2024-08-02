# Uploading the BELA update file

Use this command to upload the `.bela/bela-update.json` file to BELA:

```
curl -f "https://$BELA_HOST/architecture" \
     -H "Authorization: $BELA_TOKEN" \
     --data @.bela/bela-update.json
```
You can obtain your `BELA_HOST` and `BELA_TOKEN` from the BELA web app.
