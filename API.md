# BELA Web API

This API has a single endpoint that allows you to upload your architecture or a part of it to BELA.

It is called by build pipelines or repository actions (Github actions, for example) every time new commits are pushed or merged to the main branch.

It can also be called daily, for example, by processes that read service dependency information from APM tools such as Dynatrace, Datadog and OpenTelemetry.


## Host

Your BELA API host address is provided to you when you sign-up for a BELA account. Each account has an exclusive host.


## Headers

`Authorization: Token <your-token>`

Obtain you BELA API token from `BELA Menu > Sources > Use API`.


## Endpoint: POST `/ecd-architecture`

This endpoint allows you to update BELA with the architecture from one of your [sources](/Concepts.md#sources).

BELA does not require you to inform the deletion or renaming of elements in your architecture. Instead, it allows you to upload the elements that currently exist and BELA will garbage collect the rest.

**Reply Success Code** `2XX`

**Reply Error Codes**

Errors will be returned as some 4XX or 5XX HTTP error code with a helpful message in the reply body.

**Body**

This endpoint receives an .ecd file in its body. See ECD Format.

