# BELA Web API

This API has a single endpoint that allows you to upload your architecture or a part of it to BELA.

It is called by build pipelines or repository actions (Github actions, for example) every time new commits are pushed or merged to the main branch.

It can also be called daily, for example, by processes that read service dependency information from APM tools such as Dynatrace, Datadog and OpenTelemetry.


## Host

Your BELA API host address is provided to you when you sign-up for a BELA account. Each account has an exclusive host.


## Headers

`Authorization: Token <your-token>`
Obtain you BELA API token from the BELA web app.


## Endpoint: POST `/ecd-architecture`

This endpoint allows you to upload your architecture or a part of it to BELA.

It does not require you to inform the deletion or renaming of elements in your architecture. Instead, it allows you to upload the elements that currently exist and BELA will garbage collect the rest.

You can upload elements from different [sources](#source).

**Reply Success Code** `200`

**Reply Error Codes**

Errors will be returned as some 4XX or 5XX HTTP error code with a helpful message in the reply body.

...

**Body**

This endpoint receives an [.ecd file](reference/ECD-File) in its body. The entire file is applied to BELA atomically.
