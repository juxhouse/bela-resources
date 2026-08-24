## Prepare your TypeScript and JavaScript Project (Other Build Tool)

Use this when your project is prepared by a build tool, build service, package manager, or monorepo workflow not covered by the standard TypeScript and JavaScript instructions.

This is the directory structure read by BELA:

- `package.json` in the project directory.
- Source files under the project directory with these extensions: `.js`, `.ts`, `.jsx`, `.tsx`, `.mjs`, or `.cjs`.
- `node_modules` in the project directory, containing the installed packages imported by the source files.
- `package-lock.json` in the project directory, when you want BELA to read dependency versions from the lock file.
- `tsconfig.json` in the project directory, when the project needs custom TypeScript compiler options.
- Generated source or type declaration files, when the project imports or references generated files.

Make sure the `.bela` directory exists. The update file to be sent to BELA will be created in there:

`mkdir -p .bela`

The updater skips `node_modules` when scanning project source files, but uses it for TypeScript/JavaScript module resolution and for package versions from `node_modules/<package>/package.json`.

The updater runs offline, so `node_modules` and generated files must already exist inside the mounted workspace. A lock file alone is not a replacement for `node_modules`: it can provide package versions, but it cannot provide the files needed for module resolution.

Your project is now ready to be [analysed by BELA](/updaters/Typescript.md).
