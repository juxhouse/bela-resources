# Updating BELA with your Java Projects (Other)

## Requirement

Build your project into this structure:

```
YourProjectName/
├── .bela/
├── src/
│   └── .../
└── target/
    ├── classes/
    ├── dependency/
    └── classpath.txt
```

- `.bela` directory where the update file will be created.
- `target/classes` should contain your compiled `.class` files.
- `target/dependency` should contain the JAR files of your project dependencies.
- `target/classpath.txt` should be a txt file containing your project classpath.

## 1. Run the Bela Updater

The bela-updater docker app analyses the projects in your repo and generates the `bela-update.json` file.

> [!IMPORTANT]
> It runs with network=none for secure containment.

```
docker run --network=none --pull=always \
           -v ./.bela:/.bela \
           -v ./:/workspace:ro \
           juxhouse/bela-updater-java -source my-source \
           -parent-element-path service/my-service
```

#### `-source`

This argument indicates the [source](/Concepts.md#sources) for the elements being uploaded. Normally the name of the repo is used as source. In Github that would be `"$GITHUB_REPOSITORY"`, for example.


#### `-parent-element-path`  

This optional argument will import your projects' elements as contents to some parent element. If your project is the implementation of a microservice for example, you can import it inside that microservice, like this:
```
  -parent-element-path service/my-service
```

## 2. Upload to BELA

See [upload example](/updaters/reference/upload-example.md).

