# Uploading the BELA ECD file

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

# Uploading Diagrams as Code

Run the following command in your CICD pipeline to allow any project to have a `.bela/diagram-as-code.ecd` file with "hard coded" diagram elements. [(ECD Format)](reference/ECD-File)

```
if [ -f .bela/diagram-as-code.ecd ]; then
  curl -f "https://$BELA_HOST/api/ecd-architecture" \
       -H "Authorization: $BELA_TOKEN" \
       --data-binary @.bela/diagram-as-code.ecd
fi
```

> [!IMPORTANT]
> Diagram-as-code is a technique that produces diagram code that is brittle and redundant with your production code. Use this only in exceptional cases. It is often better to simply use the BELA UI to model these cases.
