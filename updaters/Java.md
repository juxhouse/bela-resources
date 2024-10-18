# Updating BELA with your Java Projects

## Requirement

This playbook is for Maven projects. For Gradle projects go [here](/updaters/Java-Gradle.md). For other built tools go [here](/updaters/Java-Others.md).

Your Maven project needs to be **installed** in the local Maven .m2 repository. For a simple Maven project, for example, that is done running:

`mvn clean install`



## 1. Generate Classpath

```
mvn dependency:build-classpath -Dmdep.outputFile=.bela/classpath.txt
```

If your repo has several maven projects or maven modules, repeat this step inside the folder of each one of them.


## 2. Run the Bela Updater

The bela-updater docker app analyses the projects in your repo and generates the `bela-update.json` file.

> [!IMPORTANT]
> It runs with network=none for secure containment.

```
docker run --network=none --pull=always \
           -v ./.bela:/.bela \
           -v ./:/workspace:ro \
           -v ~/.m2:/.m2:ro \
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
