## Custom Parent Elements

To allow each of your projects to specify its own parent element, each project must contain a file called:

`.bela/parent-element-path`

Use a script like this example for running the BELA updater that analyses your projects:

```bash
FILE=".bela/parent-element-path"
[ -f "$FILE" ] || { echo "$FILE file does not exist. Skipping BELA update."; exit 0; }
read -r PARENT < "$FILE"

# Your updater command:
docker run ... -parent-element-path "$PARENT"
```

The first line of the `.bela/parent-element-path` file will be used as the parent element path.
