## Prepare Your Maven Project

Install your Maven project. For a simple Maven project, for example, that is done running:

`mvn clean install`

In the root of your project, create the .bela directory if necessary:

```
mkdir -p .bela
```

Prepare the project's classpath:

```
mvn dependency:build-classpath -Dmdep.outputFile=target/classpath.txt
```
and

```
mvn dependency:copy-dependencies -Dmdep.outputDirectory=target/dependency
```

Your project is now ready to be [analysed by BELA](/updaters/Java.md).
