# Updating BELA with your Java Projects

## Preparation: Build Your Projects

Make sure your projects are built. You can skip this step if the projects in your repository are already built.

Example for a simple Maven project:

`mvn clean package`

> [!TIP]
> Gradle, SBT, Bazel, Buildr: If you are using a build tool other than Maven, build your project normally and use your build tool to generate a `pom.xml` file. For best results, configure your tool to download the dependency artifacts to the local Maven `.m2` directory. It will be used in the next step.

## 1. Run the Bela Updater

The bela-updater docker app analyses the projects in your repo and generates the `bela-update.json` file.

> [!IMPORTANT]
> It runs with network=none for secure containment.

An example using the `GITHUB_REPOSITORY` env var as source. Adapt with your own source:
```
docker run --network=none \
           -v ./:/workspace/ \
           -v ~/.m2:/root/.m2 \
           juxhouse/bela-updater-java -source "$GITHUB_REPOSITORY"
```

## 2. Upload to BELA

See [upload example](/updaters/reference/upload-example.md).
