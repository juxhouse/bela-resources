# BELA Concepts


## Software Structure (ECDs)

"Software structure" is composed of ECDs ([Elements](#element), [Containments](#containment) and [Dependencies](#dependency)).

"Structure" is a precise term that works uniformly at all levels of abstracion, from high-level architecture to mid-level design and low-level implementation.

ECDs are the only fundamental concepts necessary to represent and explore software structure.


## Element

Software elements are the nouns that compose software structure: projects, classes, methods, etc.


#### Element Type

Each Element has a type, shown in [brackets].

Element type examples: domain, system, project, service, component, namespace, package, interface, classe, function, method, field, database, bucket, table, data-set, endpoint, topic, queue, etc.

You can create your own element types.

#### Modeled Element

Modeled elements are manually created (modeled) in BELA and do not exist in your production artifacts. They are useful for modeling third-party systems and exploring plans for the future.

You can change their name, type, description and other attributes at will.

#### Built Element

Built elements refer to elements that actually exist in your production artifacts and are synced to BELA. They cannot be individually deleted or altered (only augmented) by any user. See [Sources](#sources) below.

> [!TIP]
> You can use the `Diagram Legend` tool (question-mark icon on the bottom-left) to see the colors and styles used to display different ECDs.

#### Built Element Path

Every **built** element is identified by a `path` made up of slash-separated `segments`.

Examples:
 - `service/customers`
 - `assembly/MyAssembly/MyNamespace/MyInterface`
 - `maven/org.acme:customers/org.acme/customers/Customer/setName(java.lang.String)`

The first segment of the path is a `type`. It works as a namespace, allowing for different types of elements with the same name.

#### Element Name

Element names can be user-friendly and don't need to be unique. They can use any UTF-8 characters including emojis and spaces.

Examples:
```
Name            Type        Path
--------------- ---------   -------------------------------------------------------------------------------------
Customers       [service]   service/customers
MyInterface     [interface] assembly/MyAssembly/MyNamespace/MyInterface
setName(String) [method]    maven/group-id:artifact-id/org.mycompany/customers/Customer/setName(java.lang.String)
```


## Containment

An element can contain other elements, forming an arbitrarily deep containment hierarchy.

Container elements are also called "parents" and their contents are also called "children".

> [!NOTE]
> BELA does not have a special meaning for the term "container". We use the common meaning of the word, as in "Russian dolls".

Restrictions:
 - An element can be contained by at most one direct parent (like folders in a file system).
 - There cannot be containment cycles.

A project can contain a package, for example, which can contain a class, which can contain a method. BELA does not have any containment restrictions based on element types.

#### Top-level Elements

A top-level element is an element that is not contained by any other.

## Dependency

Any element can depend on any other element.

Dependencies are uniquely identified by the "from" and "to" elements, and an optional name.

> [!IMPORTANT]
> If there is a dependency line from element A to element B, BELA will do automatic diagram layout to try and position A further up and B further down. When that is impossible (in the case of a dependency cycle, for example) the dependency line that is pointing upward will be displayed in red.

#### Dataflow Direction

Dependencies can be tagged with "read" and/or "write" tags. This dataflow direction will be displayed as arrowheads on the dependency line.

Dataflow direction is independent of dependency direction.


## Sources

A Source indicates where each [built](#built-elements) ECD exists in your architecture: a code repository, a config file, an APM tool, etc.

Examples sources:
 - "my-repo"
 - "my-service-postman-catalog"
 - "my-company-apm-tool"
 - etc

An ECD will typically exist in only one source but some ECDs, like libs, can be present in multiple sources.

The source name is sent to BELA when ECDs are uploaded.

BELA will garbage collect ECDs that are no longer present in any source. That is the purpose of sources.

Admins can delete a source, which will delete all ECDs that were present exclusively in that source.
