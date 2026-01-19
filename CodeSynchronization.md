# Synchronize a Code Repository

These are the steps to update your BELA instance with the [architecture data](/Concepts.md#ecds) from your software project. Only metadata down to method/function/field name level is sent. The actual lines of code are not.

If you set this up as a repository action or as an optional step after your main CI/CD pipeline has completed, BELA will always be in sync with your latest code.

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
 - [Oracle Schema](/updaters/Oracle.md)
 - Powerbuilder ([get in touch](/README.md#contact-us))
 - Ruby ([get in touch](/README.md#contact-us))
 - [Typescript](/updaters/Typescript.md)

If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly. You can also hire BELA developers to build that integration for you.

## 2. Run the BELA Updater Docker App

It will analyse your project and produce the `.bela/bela-update.ecd` file with [architecture data](/Concepts.md#ecds) that will be sent to BELA in the following step. Only metadata down to method/function/field name level is sent. The actual lines of code are not.

Set the `BELA_UPDATER` environment variable to the appropriate docker image for your language below. These images can be downloaded anonymously, without a token. You are authorized to execute them only to generate data to be sent to a licensed BELA instance. You are not licensed to read their contents or use them for any other purpose.

| Language | BELA_UPDATER Docker Image |
|----------|-------------------------|
| C# | juxhouse/bela-updater-dotnet |
| Clojure | juxhouse/bela-updater-clojure |
| Java | juxhouse/bela-updater-java |
| Javascript | juxhouse/bela-updater-typescript |
| Oracle | juxhouse/bela-updater-oracle |
| Typescript | juxhouse/bela-updater-typescript |

Example for Javascript/Typescript:
```
BELA_UPDATER=juxhouse/bela-updater-typescript
```
If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly. You can also hire BELA developers to build that integration for you.

Run the `BELA_UPDATER` Docker app:
```
docker run --network=none --pull=always \
           -v ./.bela:/.bela \
           -v ./:/workspace:ro \
           $BELA_UPDATER \
           -source my-source \
           -parent-element-path service/my-service
```
It will analyse your project and produce the `.bela/bela-update.ecd` file with the [architecture data](/Concepts.md#ecds) you will upload to BELA.

> [!IMPORTANT]
> This container runs with `--network=none` and your project folder is mounted with `:ro` (read-only mode) for secure containment.

### Arguments

#### -source

This argument indicates the [source](/Concepts.md#sources) for the elements being uploaded. Normally the name of the repo is used as source. In Github that would be `"$GITHUB_REPOSITORY"`, for example.

#### -parent-element-path (Optional)

This optional argument will import your projects' elements as the contents of some parent element. If your project is the implementation of a microservice for example, you can import it inside that microservice, like this:
```
  -parent-element-path service/my-service
```
You can also use [diagram-as-code](updaters/reference/upload-example.md#uploading-diagrams-as-code) to give each of your projects a custom parent element.

## 3. Upload to BELA

See [upload example](/updaters/reference/upload-example.md).

## Success

Your updated source will appear in the Sources screen: `BELA Main Menu > Sources`.

You can also search (🔍) BELA for elements (classes, functions, methods, etc) that are present in the source you just updated.

If you have any trouble, please [contact us](/README.md#contact-us).
