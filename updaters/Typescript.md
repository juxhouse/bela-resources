# Updating BELA with your TS and JS Projects

## Preparation: Install Dependencies
  Make sure your project has its dependencies installed. You can skip this step if your dependencies are already installed.
```sh
  npm ci
```

## 1. Run the Bela Updater
  The bela-updater docker app analyses your project and generates the index.scip file.

> [!IMPORTANT]
> It runs with network=none for secure containment.

```sh
docker run --network=none --pull=always \
                     -v ./:/workspace/ \
                     juxhouse/bela-updater-typescript
```

## 2. Upload to BELA
  See [upload example](/updaters/reference/upload-example.md).
