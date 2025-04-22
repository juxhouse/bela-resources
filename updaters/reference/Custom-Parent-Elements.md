## Custom Parent Elements

Each project of yours can set its parent element as a single line in a file called:

`.bela/parent-element-path`

Simply adapt your code synchronization script like this:

```bash
FILE=".bela/parent-element-path"
[ -f "$FILE" ] || { echo "$FILE file does not exist. Skipping BELA update."; exit 0; }
read -r PARENT < "$FILE"

# Your updater command:
docker run ... -parent-element-path "$PARENT"
```

The first line of the `.bela/parent-element-path` file will be used as the `-parent-element-path` argument.
