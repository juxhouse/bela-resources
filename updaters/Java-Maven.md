[If your build does not produce artifacts in the standard Maven folder structure, please check [here](/updaters/Java-Other.md).]

## Prepare Your Maven Project

Install your Maven project. Multi-module projects are supported too.

For a standard Maven project, for example, run:

`mvn clean install`

Prepare the project's classpath:
```
mvn dependency:build-classpath -Dmdep.outputFile=target/classpath.txt
```

You can now [go back](/CodeSynchronization.md) and run the BELA Updater docker app for Java.

> [!IMPORTANT]
> When running the BELA Updater docker app, add an extra mount for your .m2 folder, otherwise dependencies to lib methods will not be resolved:

```
docker ...
-v "$HOME/.m2":/.m2:ro \
...
```
