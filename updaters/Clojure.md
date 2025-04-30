# Prepare your Clojure Project

## Download the dependencies for your project.

#### For a Lein Project

For a simple lein project, for example:

`lein deps`

#### For a tools.deps Project

For a simple tools.deps project, for example, that is done running:

`clojure -A:test:dev -Spath`

Replace the aliases in the -A parameter according to your project.

## Copy the Dependencies

Copy the depedencies to your project folder, so that the BELA updater Docker App can see them, for example:

```
cp -r ~/.m2 ./
cp -r ~/.gitlibs ./
```

You are now ready to [go back](/CodeSynchronization.md) run the Clojure BELA Updater app on your project.
