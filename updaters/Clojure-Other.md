## Prepare your Clojure Project (Other Build Tool)

Use this when your project is prepared by a build tool, build service, or dependency resolver not covered by the standard Clojure instructions.

This is the directory structure read by BELA:

- `deps.edn` or `project.clj` in the project directory.
- Source files under `src`.
- `.m2/repository` containing the resolved Maven dependencies used by the project.
- `.gitlibs/libs`, when the project uses git dependencies.

Make sure the `.bela` directory exists. The update file to be sent to BELA will be created in there:

`mkdir -p .bela`

The updater runs offline and copies `.m2` and `.gitlibs` from the mounted workspace before analysis. Without `.m2/repository`, BELA cannot resolve Maven dependency code or map external definitions back to Maven libraries.

Your project is now ready to be [analysed by BELA](/updaters/Clojure.md).
