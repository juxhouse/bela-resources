## Prepare your TypeScript and JavaScript Project (Other Build Tool)

Have your preparation leave these inputs inside the project directory:

- `package.json` and the project sources (`.js`, `.ts`, `.jsx`, `.tsx`, `.mjs`, or `.cjs`).
- `node_modules` containing the packages imported by those sources, when there are external dependencies. Symlink targets and files used for module resolution must remain accessible inside the mounted project.
- `tsconfig.json` when the project relies on compiler options such as import aliases. It is not required for a basic JavaScript or TypeScript project.
- Generated sources or declarations that are actually imported or referenced by the project.

Analysis runs offline. A lockfile alone cannot replace installed dependencies. `package-lock.json` is optional for analysis: it can supply versions, which the updater can also read from installed packages. Keep the lockfile your own preparation needs; BELA does not require switching package managers.

Compilation, bundling, lint and tests are not required just for BELA. The updater skips `node_modules` when scanning project sources but uses it for resolution and package versions.

When using the BELA action, set `build-command` in the project’s `.bela/bela.yml` to your preparation command. It replaces the default preparation and runs from the project directory; use `build-command: "true"` if the CI has already prepared these inputs. For direct execution, follow the [Docker and upload instructions](/CodeSynchronization.md).

### Current analysis limits

- Isolated pnpm storage can be mistaken for package identity, losing versions. `compilerOptions.preserveSymlinks: true` in `tsconfig.json` worked around the tested pnpm 10.18.3 case; it is not a general requirement or a guarantee for other layouts. An agnostic resolution fix is deferred to another delivery.
- JavaScript packages without type declarations may lose external references and versions. Custom builds do not require creating `.d.ts` files or a `tsconfig.json` solely for this limitation; the experimental `maxNodeModuleJsDepth` setting is not a general recipe.
- Existing `tsc` outputs can duplicate source elements, including generated `.d.ts` files. The current scanner is not limited by `include`/`exclude` in `tsconfig.json`. Keep files actually required by the project; this issue needs an analyser fix, not a blanket requirement to delete outputs.

These limitations also affect traditional builds. See the [TypeScript](/reference/custom-build-results/TypeScript.md) and [JavaScript](/reference/custom-build-results/JavaScript.md) results and [remaining gaps](/reference/custom-build-results/TODO.md).
