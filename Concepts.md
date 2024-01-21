# BELA Concepts

## ECDs

ECDs are software [Elements](#elements), [Containments](#Containments) and [Dependencies](#dependencies). These are the only top-level concepts necessary to understand and explore software architecture.


## Architecture

Architecture is a collection of ECDs.

#### Built Architecture

"Built architecture" or "built ECDs" refer to ECDs that actually exist in your production environments.

#### Modeled Architecture

"Modeled architecture" or "modeled ECDs" refer to ECDs that have been manually created in BELA and that do not exist in your production environments.

When a built element is created with the same name as an existing modeled element, the modeled element will get a `(model)` suffix to its name.

> [!TIP]
> You can use the `Diagram Legend` tool from BELA's main menu to see the different colors in which different ECDs are diplayed.


## Elements

Software elements are the nouns in your architecture. [Details](/API.md#upsert-element)

#### Element Type

Element type examples: domain, system, project, service, component, namespace, package, interface, classe, function, method, field, database, bucket, table, data-set, endpoint, topic, queue, etc.

#### Element Path

Every element is identified by a path. [Details](/API.md#elementpath)

Examples:
 - service/customers
 - dotnet-assembly/MyAssembly/MyNamespace/MyInterface
 - java-project/org.acme:customers/org.acme/customer/Customer/setName(java.lang.String)

#### Element Name

Every element has a simple name. Names are not unique.

Examples:
```
Type        Name              Path
service     Customers         service/customers
interface   MyInterface       dotnet-assembly/MyAssembly/MyNamespace/MyInterface
method      setName(String)   java-project/my-company:my-artifact/org.mycompany/customers/Customer/setName(java.lang.String)
```


## Containments


## Sources

A Source is a String that indicates where each built ECD exists in your architecture: a code repository, a config files, an APM tool, etc.

Some examples:
 - "my-repo"
 - "my-service-postman-catalog"
 - "my-company-apm"
 - etc

The source name is sent to the BELA API when ECDs are uploaded.

An ECD will typically exist in only one source but some ECDs, like libs, can be present in multiple sources.

BELA will garbage collect ECDs that are no longer present in any source. That is the purpose of sources.
