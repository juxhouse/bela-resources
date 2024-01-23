# BELA
The Browser for Enterprise-Level Architecture

[BELA](https://jux.house/bela) is a platform to visualize and navigate any software architecture, from high-level business domains down to code elements.


## Main Features

- Live dependency diagrams integrating all your source code repositories and Application Performance Monitoring (APM) data.
- Simple C4 model notation.
- Infinite levels of element expand/collapse from high-level containers down to code.
- Single source of truth for manually modeled elements across your entire organization.


## Concepts

Get a solid understanding of BELA's fundamental [concepts](/Concepts.md).


## Synchronize your Code Repositories

#### 1. Run the `bela-updater` docker app

   > [!IMPORTANT]
   > It runs with the `--network=none` argument for secure containment.
   
   It detects all projects in the repository and produces a single `bela-update.json` file with the [architecture data](/Concepts.md#ecds) to be sent to BELA. Only metadata down to method/function name level is sent. The actual lines of code are not.

   You must provide a [source](/Concepts.md#sources) argument.

   See examples for the supported languages:
   - [C#](/updaters/.NET.md)
   - [Java](/updaters/Java.md)
   - [Javascript](/updaters/Typescript.md)
   - [Typescript](/updaters/Typescript.md)

   If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly.
 
#### 2. Upload to BELA

   Upload the `bela-update.json` file, produced above, to BELA.
   
   For example:
   ```
   curl -f "https://$BELA_HOST/architecture" \
        -H "Authorization: $BELA_TOKEN" \
        -H "Content-Type: application/json" \
        --data @bela-update.json
   ```
   You can obtain your `BELA_TOKEN` from the BELA web app.

#### 3. Automate

Set up the steps above as a repository action or as optional pipeline steps after your main CI/CD pipeline has completed.


## Synchronize your APM Tools

If you use a services architecture, you can obtain your service names and the dependencies among them from your Application Performance Monitoring (APM) data.

Set up a script, to be executed periodically, to query your APM tool and upload service dependencies to BELA.

Examples for some APM tools:
- [Datadog](/updaters/datadog.js)
- [Elastic APM](/updaters/elastic-apm.js)
  
If you use a different tool, you can adapt one of the scripts above or call BELA's [generic API](API.md) directly.


## Diagram-as-Code

You can upload "hard coded" diagram elements to BELA using the JSON format defined by the [BELA API](API.md).

Add this command to your CI/CD pipeline to update BELA with custom diagram elements:
```
if [ -f "bela-custom-update.json" ]; then
    curl ... --data @bela-custom-update.json
fi
```
Use the same [curl command](#2-upload-to-bela) as above, changing the data arg to `--data @bela-custom-update.json`.

Now, every repository that uses this CI/CD pipeline can simply use the `bela-custom-update.json` file for custom diagrams-as-code.

> [!IMPORTANT]
> Diagram-as-code is a technique that produces diagram code that is brittle and redundant with your production code. Use this only in exceptional cases. It is often better to simply use the BELA UI to model these cases.
