# BELA
The Browser for Enterprise-Level Architecture

[BELA](https://jux.house/bela) is a platform developed in partnership with [Nubank](https://international.nubank.com.br/about) to visualize and navigate any software architecture, from high-level business domains down to projects and code elements.

## Main Features

- Live dependency diagrams integrating all your source code repositories and Application Performance Monitoring (APM) data.
- Simple C4 model notation.
- Infinite levels of element expand/collapse from high-level containers down to code.
- Single source of truth for manually modeled elements across your entire organization.

## Synchronizing your Code Repositories

Set up these two commands as a repository action or as an optional pipeline step after your main CI/CD pipeline steps have completed.

#### 1. Run the `BELA Updater` docker app

   > [!IMPORTANT]
   > It runs with the `--network=none` argument for secure containment.
   
   It detects all projects in the repository and produces a single `bela-update.json` file.

   See examples for the supported languages:
   - C#
   - [Java](/updaters/Java.md)
   - Javascript
   - Typescript

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
   

## Synchronizing your APM Tools

If you use a services architecture, you can obtain your service names and the dependencies among them from your Application Performance Monitoring (APM) data.

Set up a script, to be executed every hour, to query your APM tool and upload service dependencies to BELA.

Examples for some APM tools:
- Datadog
- Elastic APM
  
If you use a different tool, you can adapt one of the scripts above or call BELA's [generic API](API.md) directly.


## Diagram-as-Code

You can upload "hard coded" elements, dependencies and containments to BELA using the JSON format defined by the [BELA API](API.md).

Add this command to your CI/CD pipeline to update BELA with custom diagram elements:
```
if [ -f "bela-custom-update.json" ]; then
    curl ... --data @bela-custom-update.json
fi
```
Use the same [curl command](#2-upload-to-bela) as above, changing the data arg to `--data @bela-custom-update.json`.

Now, every repository that uses this CI/CD pipeline can simply use the `bela-custom-update.json` file for custom diagrams-as-code.

> [!IMPORTANT]
> Diagram-as-code is a technique that makes you write brittle diagram code that is redundant with your production code. Use this only in exceptional cases. It is often better to simply use the BELA UI to model these cases.
