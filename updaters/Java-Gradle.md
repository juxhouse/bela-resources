# Updating BELA with your Java Projects (Gradle)

## Requirement

This playbook is for Gradle projects. If you are using Maven or some other build tool (SBT, Bazel, Buildr) go [here](/updaters/Java.md).


## 1. Generate Classpath

Inside your project folder run:

```
cat > bela.gradle <<'EOF'
allprojects {
  task printClasspath {
    doLast {
      println "classpath:"
      configurations.runtimeClasspath.each { println it }
      println "source-dirs:"
      sourceSets.main.allSource.srcDirs.each { println it }
    }
  }
}
EOF
```
and
```
mkdir -p ./.bela && ./gradlew -I bela.gradle printClasspath > ./.bela/gradle-classpath.txt
```
If you are using a monorepo with several projects, repeat this step inside the folder of each one of them.


## 2. Run the Bela Updater

The bela-updater docker app analyses the projects in your repo and generates the `bela-update.json` file.

> [!IMPORTANT]
> It runs with network=none for secure containment.

```
docker run --network=none --pull=always \
           -v ./.bela:/.bela \
           -v ./:/workspace:ro \
           -v ~/.gradle:/.gradle:ro \
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
