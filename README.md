# BELA
The Browser for Enterprise-Level Architecture

[BELA](https://jux.house/bela) is a platform developed in partnership with [Nubank](https://international.nubank.com.br/about) to visualize and navigate any software architecture, from high-level business domains down to projects and code.

## Main Features

- Live diagrams integrating all your source code repositories and Application Performance Monitoring (APM) data.
- Simple C4 model notation.
- Infinite levels of element expand/collapse from high-level containers down to code.
- Single source of truth for manually modeled elements across your entire organization.

## Synchronizing your Code Repositories

1. Obtain your BELA API token from the BELA web app.
   
2. Run the `BELA Updater` docker app. See examples for the supported languages:
- C#
- Java
- Javascript
- Typescript

If your language is not supported, you can use a native code analysis tool and call BELA's [generic API](API.md) directly.

3. Automate the above as a repository action or as an optional pipeline step that runs after your main CICD pipeline has completed.


## Synchronizing your APM Tools



1. Obtain your BELA API token from the BELA web app.
2. Call
3. Automate the above by calling  


### Datadog

### Dynatrace

### Elastic APM
