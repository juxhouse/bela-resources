# BELA Concepts

## ECDs

ECDs are software [Elements](#elements), [Containments](#containments) and [Dependencies](#dependencies).

They are the only top-level concepts necessary to represent and explore software architecture structure.


## Architecture

Architecture is simply a collection of ECDs.

#### Built vs Modeled

**Built** architecture or **built** ECDs refer to ECDs that actually exist in your production environments and were imported to BELA.

**Modeled** architecture or **modeled** ECDs refer to ECDs that have been manually created in BELA and do not exist in your production environments.

When a built element is created with the same name as an existing modeled element, the modeled element will get a `(model)` suffix to its name.

> [!TIP]
> You can use the `Diagram Legend` tool from BELA's main menu to see the different colors in which different ECDs are diplayed.


## Elements

Software elements are the nouns in your architecture: projects, classes, methods, etc. [API](/API.md#upsert-element)

#### Element Type

Element type examples: domain, system, project, service, component, namespace, package, interface, classe, function, method, field, database, bucket, table, data-set, endpoint, topic, queue, etc.

You can create your own element types.

#### Element Path

Every element is identified by a path. [API](/API.md#elementpath)

Examples:
 - service/customers
 - dotnet-assembly/MyAssembly/MyNamespace/MyInterface
 - java-project/org.acme:customers/org.acme/customer/Customer/setName(java.lang.String)

#### Element Name

Every element has a simple name. Names are not unique.

Examples:
```
Type        Name              Path
---------   ---------------   ----------------------------------------------------------------------------------------------
service     Customers         service/customers
interface   MyInterface       dotnet-assembly/MyAssembly/MyNamespace/MyInterface
method      setName(String)   java-project/my-company:my-artifact/org.mycompany/customers/Customer/setName(java.lang.String)
```


## Containments

Containment is the relationship between a parent element and a child element. Parent elements are also called "containers". [API](/API.md#add-containments)

Restrictions:
 - An element cannot be contained by more that one parent element.
 - There cannot be containment cycles.

A project can contain a package, for example, which can contain a class, which can contain a method. BELA does not have any containment restrictions based on element types.

#### Top-level Elements

A top-level element is an element that is not contained by any other.

Example paths of top-level elements:
 - domain/Billing
 - service/customers
 - project/SomeApp


## Dependencies

Any element can depend on any other element. [API](/API.md#add-dependencies)

Dependencies are uniquely identified by the path of both elements, a type and a name.

> [!TIP]
> If there is a dependency "from" element A "to" element B, BELA will do automatic diagram layout to try and position A further up and B further down. When that is impossible (in the case of a dependency cycle, for example) the dependency that is "pointing up" will be displayed in red.

#### Dataflow Direction

Dependencies can be tagged with "read" and/or "write" tags. This dataflow direction will be displayed as arrowheads on the dependency line.

Dataflow direction is independent of dependency direction.


## Sources

A Source indicates where each built ECD exists in your architecture: a code repository, a config file, an APM tool, etc.

Examples sources:
 - "my-repo"
 - "my-service-postman-catalog"
 - "my-company-apm-tool"
 - etc

An ECD will typically exist in only one source but some ECDs, like libs, can be present in multiple sources.

The source name is sent to BELA when ECDs are uploaded.

BELA will garbage collect ECDs that are no longer present in any source. That is the purpose of sources.
