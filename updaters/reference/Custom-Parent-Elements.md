## Custom Parent Elements

To allow your projects to specify their own parent element, each project must contain a file called:

`.bela/parent-element-path`

Use a script like this for running the BELA updater:

```bash
FILE=".bela/parent-element-path"
[ -f "$FILE" ] || { echo "$FILE file does not exist. Skipping BELA update."; exit 0; }
read -r PARENT < "$FILE"

docker run --network=none --pull=always \
           -v ./.bela:/.bela \
           -v .:/workspace:ro \
           juxhouse/bela-updater-XXXX -source my-source \
           -parent-element-path "$PARENT" \
           -ignore-test-code
```

The first line of the `.bela/parent-element-path` file will be used as the parent element path.
