## Prepare Your Maven Project

Install your Maven project. For a simple Maven project, for example, that is done running:

`mvn clean install`

Prepare the project's classpath and dependencies:

```
mvn dependency:build-classpath -Dmdep.outputFile=target/classpath.txt
mvn dependency:copy-dependencies -Dmdep.outputDirectory=target/dependency
```

> [!IMPORTANT]
> If your build does not produce artifacts in the standard Maven folder structure, please check [here](/updaters/Java-Other.md).

You are now ready to [go back](/CodeSynchronization.md) run the Java BELA Updater app on your project.
