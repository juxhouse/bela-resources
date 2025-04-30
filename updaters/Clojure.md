## Download the dependencies for your project.

An example for a simple `Lein` project:

```
lein deps
```

An example for a simple `deps.edn` project:

```
clojure -A:test:dev -Spath
```

Replace the aliases in the -A parameter according to your project.

## Copy the Dependencies

Copy the depedencies to your project folder, so that the BELA Updater Docker App can see them, for example:

```
cp -r ~/.m2 ./
cp -r ~/.gitlibs ./
```

You are now ready to [go back](/CodeSynchronization.md) run the Clojure BELA Updater app on your project.
