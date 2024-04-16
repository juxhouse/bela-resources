# Updating BELA with your Clojure Projects

## 1. Run the Bela Updater

The bela-updater docker app analyses the projects in your repo and generates the `bela-update.json` file.

> [!IMPORTANT]
> It runs with network=none for secure containment.

An example using the `GITHUB_REPOSITORY` env var as source. Adapt with your own source:
```
docker run --network=none --pull=always \
           -v ./:/workspace/ \
           -v ~/.m2:/root/.m2 \
           juxhouse/bela-updater-clojure -source "$GITHUB_REPOSITORY"
```

## 2. Upload to BELA

See [upload example](/updaters/reference/upload-example.md).
