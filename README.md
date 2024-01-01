# BELA
The Browser for Enterprise-Level Architecture

[BELA](https://jux.house/bela) is a platform developed in partnership with [Nubank](https://international.nubank.com.br/about) to visualize and navigate any software architecture, from high-level business domains down to projects and code.

## Main Features

- Live dependency diagrams integrating all your source code repositories and Application Performance Monitoring (APM) data.
- Simple C4 model notation.
- Infinite levels of element expand/collapse from high-level containers down to code.
- Single source of truth for manually modeled elements across your entire organization.

## Synchronizing your Code Repositories

Set up these two commands as a repository action or as an optional pipeline step. Set it up to run after your main CI/CD pipeline has completed.

#### 1. Run the `BELA Updater` docker app.
  
   It runs with the `--network=none` argument for secure containment and produces a single `bela-update.json` file.

   See examples for the supported languages:
   - C#
   - [Java](/updaters/Java.md)
   - Javascript
   - Typescript

   If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly.

 
#### 2. Upload the update file to BELA.

   Upload the `bela-update.json` file produced above to BELA using curl, for example:

   ```
   curl "https://${{ secrets.BELA_HOST  }}/architecture" --fail \
        -H "Authorization: ${{ secrets.BELA_TOKEN }}" \
        -H "Content-Type: application/json" \
        --data @bela-update.json
   ```


## Synchronizing your APM Tools

If some dependencies among services are not standardized in the code, you can obtain them easily from your Application Performance Monitoring (APM) data.

1. Obtain your BELA API token from the BELA web app.

2. Call
- Datadog
- Dynatrace
- Elastic APM
  
3. Automate the above by calling 


