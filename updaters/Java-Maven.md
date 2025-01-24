## Prepare Your Maven Project

Install your Maven project. For a simple Maven project, for example, that is done running:

`mvn clean install`

> [!IMPORTANT]
> If your build does not produce artifacts in the standard Maven folder structure, please check [here](/updaters/Java-Other.md).

Prepare the project's classpath and dependencies:

```
mvn dependency:build-classpath -Dmdep.outputFile=target/classpath.txt
mvn dependency:copy-dependencies -Dmdep.outputDirectory=target/dependency
```

In your project directory, create the .bela directory if necessary:

```
mkdir -p .bela
```

Your project is now ready to be [analysed by BELA](/updaters/Java.md).
