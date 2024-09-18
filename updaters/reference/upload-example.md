# Uploading the BELA update file

To upload to a BELA container running on your local machine:

```
curl -f "http://localhost:8081/architecture" \
     --data @.bela/bela-update.json
```

To upload to a remote BELA service:

```
curl -f "https://$BELA_HOST/architecture" \
     -H "Authorization: $BELA_TOKEN" \
     --data @.bela/bela-update.json
```

You can obtain your `BELA_HOST` and `BELA_API_TOKEN` from the BELA web app.
