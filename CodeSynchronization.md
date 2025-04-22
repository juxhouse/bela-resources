# Synchronize a Code Repository

## 1. Build the Projects

Check out your repository, and `cd` into it, if necessary.
```
cd my-repository
```

Build your project using the correct playbook for your language environment:
 - [C#](/updaters/.NET.md)
 - [Clojure](/updaters/Clojure.md)
 - [Java (Maven)](/updaters/Java-Maven.md)
 - [Java (Gradle)](/updaters/Java-Gradle.md)
 - [Java (other build tools)](/updaters/Java-Other.md)
 - [Javascript](/updaters/Typescript.md)
 - [Typescript](/updaters/Typescript.md)


## 2. Run the BELA Updater Docker App for Your Language

It will detect all projects in your repository and produce the [architecture data](/Concepts.md#ecds) that will be sent to BELA below. Only metadata down to method/function/field name level is sent. The actual lines of code are not.

Create the `.bela` folder if it does not already exist.
```
cd my-repository
mkdir -p .bela
```


> [!IMPORTANT]
> The `BELA Updater` docker apps run with the `--network=none` argument for secure containment.


If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly. You can also hire BELA developers to build that integration for you.
 
#### Automate

Set up the above as a repository action or as an optional step after your main CI/CD pipeline has completed.
