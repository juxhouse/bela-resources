## Prepare Your Maven Project

Install your Maven project. Multi-module projects are supported too.

For a standard Maven project, run:

`mvn -DskipTests clean install`

Prepare the project's classpath and dependencies:

```
mvn dependency:build-classpath -Dmdep.outputFile=target/classpath.txt
```

If your build does not produce artifacts in the standard Maven folder structure, please check [here](/updaters/Java-Other.md).

👉 [Go back](/CodeSynchronization.md) and run the Java BELA Updater app, with an extra mount for your .m2 folder, otherwise dependencies to lib methods will not be resolved:
```
docker ...
-v "$HOME/.m2":/.m2:ro \
```
