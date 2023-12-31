# BELA
The Browser for Enterprise-Level Architecture

A tool developed by [Nubank](https://international.nubank.com.br/about) and [Jux](https://jux.house) to visualize and navigate any software architecture, from high-level business domains down to projects and code.

## Main Features

- Live diagrams for your source code repos and APM data.
- Simple, familiar [C4 model](https://c4model.com/) notation.
- Infinite levels of expand/collapse to explore element children.
- Central, shared source-of-truth for your manually *modeled* elements.

## Synchronizing your Code Repositories

1. Obtain your BELA API token from the BELA web app.
2. Run the `BELA Updater` docker image or call the [BELA API](API.md) directly.
3. Automate the above in an optional pipeline step that runs after your main CICD pipeline has completed.

See examples for the languages supported by the `BELA Updater`:
- C#
- Java
- Javascript
- Typescript

If your language is not supported, you can use a native code analysis tool and call BELA's [generic API](API.md) directly.

## Synchronizing your APM Tools

1. Obtain your BELA API token from the BELA web app.
2. Call
3. Automate the above by calling  


### Datadog

### Dynatrace

### Elastic APM
