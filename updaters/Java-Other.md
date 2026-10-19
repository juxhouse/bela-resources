## Prepare your Java Project (Other Build Tool)

Configure your build to produce this directory structure, read by BELA:

- `src/main/java` - Directory containing your project source files, unless the project metadata sets another `sourceDirectory` (relative to the module).
- `target/classes` - Directory containing your compiled `.class` files.
- `target/project.properties` - Metadata used when a `pom.xml` cannot be found. Follow the [example](/updaters/reference/project.properties): `artifactType` and `artifactId` are required; `groupId` is required only for `artifactType=maven` and must be absent otherwise; `version` is optional (default `0.0.0`). You can also set `sourceDirectory` here.
- `target/dependency` - Directory with the dependency JARs, unless all are available through the Maven cache described below. Dispensable without external dependencies.
- `target/classpath.txt` - List of dependency JAR names, separated by `:`, for example `commons-lang3-3.12.0.jar`. Keep the file, empty, even without external dependencies. JARs are matched by filename, so different dependencies must not share a filename.

> [!IMPORTANT]
> **Submodules**: You can have multiple nested submodule folders with this same structure. Custom module discovery uses their `target/project.properties`.

For direct Docker execution, a mounted `/.m2` takes precedence over `target/dependency`, even when empty; if mounted, it must contain all listed JARs. The locally corrected BELA action combines the runner's `~/.m2` with missing JARs from the modules' `target/dependency`. This action fix and the updater fix for modules beneath organisational folders are **not yet published**; see [Java results](/reference/custom-build-results/Java.md).

The BELA action needs an existing `pom.xml`, `build.gradle`, `build.gradle.kts`, or `gradlew` before preparation. `target/project.properties` alone works with the direct updater but does not enable action discovery. No final application JAR, Maven installation step or test execution is required just for analysis.

When using the BELA action, set `build-command` in the project’s `.bela/bela.yml` to your preparation command. It replaces the default preparation and runs from the project directory; use `build-command: "true"` if the CI has already prepared these inputs.

When your project is built with this structure you will be ready to [go back](/CodeSynchronization.md) and run the Java BELA Updater app on it.
