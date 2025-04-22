# BELA
The Browser for Enterprise-Level Architecture

[BELA](https://bela.live) is a platform to visualize and navigate any software architecture, from high-level business domains down to code elements.


## Main Features

- Live dependency diagrams integrating all your source code repositories and Application Performance Monitoring (APM) data.
- Simple C4 model notation.
- Infinite levels of element expand/collapse from high-level containers down to code.
- Single source of truth for manually modeled elements across your entire organization.


## Concepts

Get a solid understanding of BELA's fundamental [concepts](/Concepts.md).


## Synchronize your Code Repositories

#### Run the `BELA Updater` Docker App for Your Language

It will detect all projects in your repository and produce the [architecture data](/Concepts.md#ecds) that is sent to BELA. Only metadata down to method/function/field name level is sent. The actual lines of code are not.

> [!IMPORTANT]
> The `BELA Updater` docker apps run with the `--network=none` argument for secure containment.

[Step-by-step instructions](/CodeSynchronization.md)

Supported languages:
 - C#
 - Clojure
 - Java
 - Javascript
 - Oracle Stored Procedures (beta)
 - Powerbuilder (beta)
 - Ruby (beta)
 - Typescript

If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly. You can also hire BELA developers to build that integration for you.
 
#### Automate

Set up the steps above as a repository action or as optional pipeline steps after your main CI/CD pipeline has completed.


## Synchronize your APM/Telemetry Tools

If you use a services architecture, you can obtain your service names and the dependencies among them from your Application Performance Monitoring (APM) or Telemetry data.

Set up a script, to be executed periodically, to query your APM/Telemetry tool and upload service dependencies to BELA.

Examples for some APM tools:
- [Datadog](/updaters/Datadog.js)
- [Elastic APM](/updaters/Elastic-apm.js)
  
If you use a different tool, you can adapt one of the scripts above or call BELA's [generic API](API.md) directly.


## Diagram-as-Code

You can upload "hard coded" diagram elements to BELA using the ECD format defined by the [BELA API](API.md).

Add [this command](/updaters/reference/upload-example.md#uploading-diagrams-as-code) to your CI/CD pipeline to update BELA with custom diagram elements. It will upload the `.bela/bela-custom-update.ecd` file to BELA if it exists.

Now, every project of yours that uses this CI/CD pipeline can simply create the `.bela/bela-custom-update.ecd` file for custom diagrams-as-code.

> [!IMPORTANT]
> Diagram-as-code is a technique that produces diagram code that is brittle and redundant with your production code. Use this only in exceptional cases. It is often better to simply use the BELA UI to model these cases.
