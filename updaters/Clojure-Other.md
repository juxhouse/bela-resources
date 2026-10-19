## Prepare your Clojure Project (Other Build Tool)

Resolve the dependencies used by your project and leave these inputs inside the project directory:

- `deps.edn` or `project.clj`, and source files under `src`.
- `.m2/repository` with the resolved Maven dependencies, including those selected by the aliases/profiles used for analysis.
- For Git dependencies only, both `.gitlibs/libs` (checkouts) and `.gitlibs/_repos` (repository metadata).

The updater runs offline and copies these caches from the mounted project. If your resolver puts them in your home directory or elsewhere, copy the required caches into the project before analysis. Checkouts alone are insufficient for Git dependencies, even with a pinned SHA: classpath resolution can need repository metadata and otherwise attempt an offline clone.

If the required alias/profile is not already selected for analysis, configure it in `.lsp/config.edn`. For example, when preparation resolves `:bela`:

```clojure
{:source-aliases #{:bela}}
```

Resolving an alias/profile during preparation does not activate it in the analyser. AOT compilation, an application JAR and tests are not required just for BELA; generate any sources the project actually needs under the supported source layout.

When using the BELA action, set `build-command` in the project’s `.bela/bela.yml` to your preparation command. It replaces the default preparation and runs from the project directory; use `build-command: "true"` if the CI has already prepared these inputs. For direct execution, follow the [Docker and upload instructions](/CodeSynchronization.md).

The complete Git cache enables offline preparation, but current analysis still omits some Git calls and identities; versions from aliases/profiles and the `clojure.*` filter also have limitations. See [Clojure results](/reference/custom-build-results/Clojure.md) and [remaining gaps](/reference/custom-build-results/TODO.md). These affect traditional preparation too.
