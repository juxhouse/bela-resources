## Prepare your Java Project (Other Build Tool)

Configure your build to produce this directory structure, read by BELA:

- `src/main/java` or `src` - Directory containing your project source files.
- `target/classes` - Directory containing your compiled `.class` files.
- `target/project.properties` - A file containing groupId, artifactId and version. Used when a pom.xml file cannot be found. See [example](/updaters/reference/project.properties).
- `target/dependency` - Directory with the JAR files of your project dependencies.
- `target/classpath.txt` - Text file containing your project classpath. Only the file names of the jars are used. Their paths can be anything because they are ignored.

> [!IMPORTANT]
> **Submodules**: You can have multiple nested submodule folders with this same structure.

When your project is built with this structure you will be ready to [go back](/CodeSynchronization.md) and run the Java BELA Updater app on it.
