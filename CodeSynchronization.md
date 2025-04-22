## Synchronize your Code Repositories

#### Run the `BELA Updater` Docker App for Your Language

It will detect all projects in your repository and produce the [architecture data](/Concepts.md#ecds) that is sent to BELA. Only metadata down to method/function/field name level is sent. The actual lines of code are not.

> [!IMPORTANT]
> The `BELA Updater` docker apps run with the `--network=none` argument for secure containment.

| Language Environment | Preparation Playbook  | BELA Updater Docker App |
|------------------------|----------------------|-----------------------------|
|C#|[C# Project Preparation](/updaters/.NET.md)
 - [Clojure](/updaters/Clojure.md)
 - [Java](/updaters/Java.md)
 - [Javascript](/updaters/Typescript.md)
 - [Typescript](/updaters/Typescript.md)

If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly. You can also hire BELA developers to build that integration for you.
 
#### Automate

Set up the steps above as a repository action or as optional pipeline steps after your main CI/CD pipeline has completed.
