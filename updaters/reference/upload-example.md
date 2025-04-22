# Uploading the BELA update file

To upload to a BELA container running anonymously on your local machine:

```
curl -f "http://localhost:8081/api/ecd-architecture" \
     --data-binary @.bela/bela-update.ecd
```

To upload to a remote BELA service:

```
curl -f "https://$BELA_HOST/api/ecd-architecture" \
     -H "Authorization: $BELA_TOKEN" \
     --data-binary @.bela/bela-update.ecd
```

You can obtain your `BELA_HOST` and `BELA_API_TOKEN` from the BELA web app.
