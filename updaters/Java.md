# Updating BELA with your Java Projects

## Requirement

Your Maven project needs to be **installed** in the local Maven .m2 repository. For a simple Maven project, for example, that is done running:

`mvn clean install`

> [!TIP]
> Gradle, SBT, Bazel, Buildr: If you are using a build tool other than Maven, build your project normally and use your build tool to generate a `pom.xml` file. Configure your tool to install your compiled project artifact and its dependency artifacts to the local Maven `.m2` directory. They will be used below.


## 1. Generate Classpath

```
mvn dependency:build-classpath -Dmdep.outputFile=.bela/classpath.txt
```

If you are using a monorepo with several projects, repeat this step for each one of them.


## 2. Run the Bela Updater

The bela-updater docker app analyses the projects in your repo and generates the `bela-update.json` file.

> [!IMPORTANT]
> It runs with network=none for secure containment.

An example using the `GITHUB_REPOSITORY` env var as source. Adapt it with your own [source](/Concepts.md#sources):
```
docker run --network=none --pull=always \
           -v ./.bela:/.bela \
           -v ./:/workspace:ro \
           -v ~/.m2:/.m2:ro \
           juxhouse/bela-updater-java -source "$GITHUB_REPOSITORY"
```

## 3. Upload to BELA

See [upload example](/updaters/reference/upload-example.md).
