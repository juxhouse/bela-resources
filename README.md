# BELA
The Browser for Enterprise-Level Architecture

[BELA](https://jux.house/bela) is a platform developed in partnership with [Nubank](https://international.nubank.com.br/about) to visualize and navigate any software architecture, from high-level business domains down to projects and code.

## Main Features

- Live dependency diagrams integrating all your source code repositories and Application Performance Monitoring (APM) data.
- Simple C4 model notation.
- Infinite levels of element expand/collapse from high-level containers down to code.
- Single source of truth for manually modeled elements across your entire organization.

## Synchronizing your Code Repositories

Set up these two commands as a repository action or as an optional pipeline step after your main CI/CD pipeline steps have completed.

#### 1. Run the `BELA Updater` docker app.
  
   It runs with the `--network=none` argument for secure containment.
   
   It detects all projects in the repository and produces a single `bela-update.json` file.

   See examples for the supported languages:
   - C#
   - [Java](/updaters/Java.md)
   - Javascript
   - Typescript

   If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly.

 
#### 2. Upload the update to BELA.

   Upload the `bela-update.json` file, produced above, to BELA. See below.
   
   For example:
   ```
   curl -f "https://${{ secrets.BELA_HOST  }}/architecture" \
        -H "Authorization: ${{ secrets.BELA_TOKEN }}" \
        -H "Content-Type: application/json" \
        --data @bela-update.json
   ```
   You can obtain your `BELA_TOKEN` from the BELA web app.
   

## Synchronizing your APM Tools

You can obtain your services and the dependencies among them from your Application Performance Monitoring (APM) data.

Set up a script, to be executed every hour, to query your APM data and upload service dependencies to BELA.

Here are some examples:
- Datadog
- Elastic APM
  
If you use a different tool, you can copy one of the scripts above and call BELA's [generic API](API.md) directly.
