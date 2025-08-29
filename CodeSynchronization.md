# Synchronize a Code Repository

## 1. Build Your Project

Check out your project and `cd` into it, if necessary.
```
cd my-project
```

Create the `.bela` folder if it does not already exist.
```
mkdir -p .bela
```

Build your project according to its language and build tool:
 - [C#](/updaters/.NET.md)
 - [Clojure](/updaters/Clojure.md)
 - [Java (Maven)](/updaters/Java-Maven.md)
 - [Java (Gradle)](/updaters/Java-Gradle.md)
 - [Java (other build tools)](/updaters/Java-Other.md)
 - [Javascript](/updaters/Typescript.md)
 - [Typescript](/updaters/Typescript.md)


## 2. Run the BELA Updater Docker App for Your Language

It will analyse your project and produce the `.bela/bela-update.ecd` file with [architecture data](/Concepts.md#ecds) that will be sent to BELA in the following step. Only metadata down to method/function/field name level is sent. The actual lines of code are not.

```
docker run --network=none --pull=always \
           -v ./.bela:/.bela \
           -v ./:/workspace:ro \
           $DOCKER_APP \
           -source my-source \
           -parent-element-path service/my-service
```

> [!IMPORTANT]
> The container runs with `--network=none` and your project is mounted with `:ro` (read-only mode) for secure containment.

#### DOCKER_APP

Use the appropriate docker image for your language:

| Language | BELA Updater Docker Image |
|----------|-------------------------|
| C# | juxhouse/bela-updater-dotnet |
| Clojure | juxhouse/bela-updater-clojure |
| Java | juxhouse/bela-updater-java |
| Javascript | juxhouse/bela-updater-typescript |
| Typescript | juxhouse/bela-updater-typescript |

If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly. You can also hire BELA developers to build that integration for you.


#### `-source`

This argument indicates the [source](/Concepts.md#sources) for the elements being uploaded. Normally the name of the repo is used as source. In Github that would be `"$GITHUB_REPOSITORY"`, for example.

#### `-parent-element-path`  

This optional argument will import your projects' elements as the contents of some parent element. If your project is the implementation of a microservice for example, you can import it inside that microservice, like this:
```
  -parent-element-path service/my-service
```
Your projects can also have [custom parent elements](reference/Custom-Parent-Elements.md).

## 3. Upload to BELA

See [upload example](/updaters/reference/upload-example.md).

## Automate

Set up the above as a repository action or as an optional step after your main CI/CD pipeline has completed.
