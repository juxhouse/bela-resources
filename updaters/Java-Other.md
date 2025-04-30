## Prepare your Java Project (Other Build Tool)

This is the directory structure read by BELA:

- `src` directory containing your project source files.
- `target/classes` directory containing your compiled `.class` files.
- `target/project.properties` a file containing groupId, artifactId and version. Used when a pom.xml file cannot be found. See [example](/updaters/reference/project.properties).
- `target/dependency` directory with the JAR files of your project dependencies.
- `target/classpath.txt` a txt file containing your project classpath. Only the file names of the jars are used. Their paths can be anything because they are ignored.

When your project is built with this structure you will be ready to [go back](/CodeSynchronization.md) and run the Java BELA Updater app on it.
