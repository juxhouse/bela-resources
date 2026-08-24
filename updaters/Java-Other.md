## Prepare your Java Project (Other Build Tool)

This is the directory structure read by BELA:

- `src/main/java` containing your Java source files, unless `target/project.properties` sets another `sourceDirectory`.
- `target/classes` directory containing your compiled `.class` files.
- `target/classpath.txt` containing the project classpath. BELA reads the JAR names from this file.
- Dependency JARs available in one of these locations:
  - a mounted Maven repository at `/.m2`, or
  - `target/dependency` inside the project directory.
- For non-Maven projects, `target/project.properties` containing `groupId`, `artifactId`, `version`, and optionally `sourceDirectory`. See [example](/updaters/reference/project.properties).

Make sure the `.bela` directory exists. The update file to be sent to BELA will be created in there:

`mkdir -p .bela`

Your project is now ready to be [analysed by BELA](/updaters/Java.md).
