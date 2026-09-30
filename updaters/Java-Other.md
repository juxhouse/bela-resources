## Prepare your Java Project (Other Build Tool)

Configure your build to produce this directory structure, read by BELA:

- `src/main/java` containing your Java source files, unless `target/project.properties` sets another `sourceDirectory`.
- `target/classes` directory containing your compiled `.class` files.
- `target/classpath.txt` containing the project classpath. BELA reads the JAR names from this file.
- Dependency JARs available in one of these locations:
  - a mounted Maven repository at `/.m2`, or
  - `target/dependency` inside the project directory.
- For non-Maven projects, `target/project.properties` containing `groupId`, `artifactId`, `version`, and optionally `sourceDirectory`. See [example](/updaters/reference/project.properties).

> [!IMPORTANT]
> **Submodules**: You can have multiple nested submodule folders with this same structure.

When your project is built with this structure you will be ready to [go back](/CodeSynchronization.md) and run the Java BELA Updater app on it.
