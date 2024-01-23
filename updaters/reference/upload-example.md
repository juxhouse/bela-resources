   # Uploading the BELA update file
   
   For example:
   ```
   curl -f "https://$BELA_HOST/architecture" \
        -H "Authorization: $BELA_TOKEN" \
        -H "Content-Type: application/json" \
        --data @bela-update.json
   ```
   You can obtain your `BELA_TOKEN` from the BELA web app.
