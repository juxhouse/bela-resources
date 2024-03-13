# Updating BELA with your Java Projects

## 1. Install Your Project(s)

Make sure your project is built and installed in the local Maven .m2 repository. In the same directory as your `pom.xml` file, run:

`mvn clean install dependency:build-classpath`

If your project had already been installed by a previous step in your build pipeline, you can just run this instead:

`mvn dependency:build-classpath`

This will download all Maven plugins needed in the next step.

If you are using a monorepo with several projects, repeat the above for each one of them.

> [!TIP]
> Gradle, SBT, Bazel, Buildr: If you are using a build tool other than Maven, build your project normally and use your build tool to generate a `pom.xml` file. Configure your tool to install your compiled project artifact and its dependency artifacts to the local Maven `.m2` directory. They will be used in the next step.

## 2. Run the Bela Updater

The bela-updater docker app analyses the projects in your repo and generates the `bela-update.json` file.

> [!IMPORTANT]
> It runs with network=none for secure containment.

An example using the `GITHUB_REPOSITORY` env var as source. Adapt with your own source:
```
docker run --network=none --pull=always \
           -v ./:/workspace/ \
           -v ~/.m2:/root/.m2 \
           juxhouse/bela-updater-java -source "$GITHUB_REPOSITORY"
```

## 3. Upload to BELA

See [upload example](/updaters/reference/upload-example.md).
