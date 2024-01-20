# BELA Concepts

## ECD

An ECD is a software Element, Containment and/or Dependency.


## Architecture

Architecture is a collection of software ECDs (Elements, Containments and Dependencies).

#### Built Architecture

"Built architecture" or "built ECDs" refer to ECDs that actually exist in your production environments.

#### Modeled Architecture

"Modeled architecture" or "modeled ECDs" refer to ECDs that have been manually created in BELA and that do not exist in your production environments.

When a built element is created with the same name as an existing modeled element, the modeled element will get a `(model)` suffix to its name.

> [!TIP]
> You can use the `Diagram Legend` tool from BELA's main menu to see the different colors in which built and modeled ECDs are diplayed.


## Elements


## Sources

A Source is a String that indicates where each built ECD exists in your architecture: a code repository, a config files, an APM tool, etc.

Some examples:
"my-repo"
"my-service-postman-catalog"
"my-company-apm"
etc

The source name is sent to the BELA API when ECDs are uploaded.

An ECD will typically exist in only one source but some ECDs, like libs, can be present in multiple sources.

BELA will garbage collect ECDs that are no longer present in any source. That is the purpose of sources.
