# Updating BELA with your Clojure Projects

## 1. Prepare Your Project(s)

Calculate the dependencies for your project.

### 1.1 Using lein

For a simple lein project, for example, that is done running:

`lein deps`

### 1.2 Using tools.deps

For a simple tools.deps project, for example, that is done running:

`clojure -A:test:dev -Spath`

Replace the aliases in the -A parameter according to your project.

### 1.3 Copy the dependencies

Copy the depedencies to the folder that will be mounted to run the docker image in the next step.

If you are in the the project folder, for example, this is done running:

```
cp -r ~/.m2 ./
cp -r ~/.gitlibs ./
```

## 2. Run the Bela Updater

In the root of your project, create the .bela directory if necessary:

`mkdir -p .bela`

The bela-updater docker app analyses the projects in your repo and generates the `bela-update.json` file.

> [!IMPORTANT]
> It runs with network=none for secure containment.

An example using the `GITHUB_REPOSITORY` env var as source. Adapt it with your own [source](/Concepts.md#sources):
```
docker run --network=none --pull=always \
           -v ./:/workspace/ \
           juxhouse/bela-updater-clojure -source "$GITHUB_REPOSITORY"
```

#### `-source`

This argument indicates the [source](/Concepts.md#sources) for the elements being uploaded. Normally the name of the repo is used as source. In Github that would be `"$GITHUB_REPOSITORY"`, for example.


#### `-parent-element-path`  

This optional argument will import your projects' elements as contents to some parent element. If your project is the implementation of a microservice for example, you can import it inside that microservice, like this:
```
  -parent-element-path service/my-service
```
Your projects can also have [custom parent elements](reference/Custom-Parent-Elements.md).

## 3. Upload to BELA

See [upload example](/updaters/reference/upload-example.md).
