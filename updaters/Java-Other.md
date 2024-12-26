## Prepare your Java Project (Other Build Tool)

Build your project into this structure:

- `src` directory containing your project source files.
- `target/classes` directory containing your compiled `.class` files.
- `target/dependency` directory with the JAR files of your project dependencies.
- `target/project.properties` a file containing groupId, artifactId and version. See [example](/updaters/reference/project.properties).
- `target/classpath.txt` a txt file containing your project classpath. Only the names of the jars are used. Their paths can be anything because they are ignored.

Make sure the `.bela` directory exists. The update file to be sent to BELA will be created in there:

`mkdir -p .bela`

Your project is now ready to be [analysed by BELA](/updaters/Java.md).
