# Updating BELA with your Java Projects (Gradle)

## Requirement

This playbook is for Gradle projects. If you are using Maven go [here](/updaters/Java.md). If you are using some other build tool (SBT, Bazel, Buildr, etc) go [here](/updaters/Java-Other.md).

Your Gradle projects need to have been **built**. For a simple Gradle project, for example, that is done running:

`gradle clean build`



## 1. Generate and run belaBuild task

Inside your project folder run:

```
cat > bela.gradle <<'EOF'
allprojects {
    afterEvaluate {
        tasks.named('compileJava').configure {
            destinationDir = file("$projectDir/target/classes")
        }

        task copyDependencies(type: Copy) {
            dependsOn compileJava
            from configurations.runtimeClasspath
            into file("$projectDir/target/dependency")
        }

        task writeClasspath {
            dependsOn compileJava
            doLast {
                def classpathFile = file("$projectDir/target/classpath.txt")
                classpathFile.withWriter('UTF-8') { writer ->
                    configurations.runtimeClasspath.each { 
                        writer.writeLine it.name
                    }
                }
            }
        }

        task writeProjectProperties {
            dependsOn compileJava
            doLast {
                def propertiesFile = file("$projectDir/target/project.properties")
                def artifactId = project.hasProperty('archivesBaseName') ? project.archivesBaseName : project.name

                propertiesFile.withWriter('UTF-8') { writer ->
                    writer.writeLine "artifactType=${project.hasProperty('group') && project.group ? 'maven' : 'gradle'}"
                    writer.writeLine "groupId=${project.group ?: 'unspecified'}"
                    writer.writeLine "artifactId=${artifactId}"
                    writer.writeLine "version=${project.version ?: 'unspecified'}"
                }
            }
        }

        task createNeededDirs {
            file("$projectDir/target").mkdirs()
            file(".bela").mkdirs()
        }

        task belaBuild {
            dependsOn createNeededDirs
            dependsOn compileJava
            dependsOn copyDependencies
            dependsOn writeClasspath
            dependsOn writeProjectProperties
        }
    }
}
EOF

```
and
```
./gradlew belaBuild --init-script bela.gradle
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
