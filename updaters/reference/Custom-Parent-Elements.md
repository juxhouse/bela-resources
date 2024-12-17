## Custom Parent Elements

To allow each of your projects to specify its own parent element when updating BELA, you can use a script like this:

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

Each project will be updated to BELA only if it has a `.bela/parent-element-path` file. The first line of that file will be used as the parent element path.
