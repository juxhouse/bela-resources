# Updating BELA with your Java Projects

## 1. Prepare Your Project(s)

- [Using Maven](/updaters/Java-Maven.md)
- [Using Gradle](/updaters/Java-Gradle.md)
- [Using other build tools](/updaters/Java-Other.md)

If your repo has several projects or Maven modules, repeat this step inside the each one of them.

## 2. Run the Bela Updater

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

## 3. Upload to BELA

See [upload example](/updaters/reference/upload-example.md).
