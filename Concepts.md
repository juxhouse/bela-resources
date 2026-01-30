# BELA Concepts

This is the most critical page for understanding BELA.

Using BELA without these concepts is like trying to drive a car without knowing what the pedals or gears are for.

## Software Structure (ECDs)

"Software structure" is composed of ECDs ([Elements](#elements), [Containments](#containments) and [Dependencies](#dependencies)).

"Structure" is a precise term that works uniformly at all levels of abstracion, from high-level architecture to mid-level design and low-level implementation.

ECDs are the only fundamental concepts necessary to represent and explore software structure.


## Elements

Elements are the nouns that compose software structure: projects, classes, methods, etc.


#### Element Types

Each Element has a type, shown in [brackets].

Element type examples: domain, system, project, service, component, namespace, package, interface, classe, function, method, field, database, bucket, table, data-set, endpoint, topic, queue, etc.

You can create your own element types.

#### Modeled Elements

Modeled elements are manually created (modeled) in BELA and do not exist in your production artifacts. They are useful for modeling third-party systems and exploring plans for the future.

You can change their name, type, description and other attributes at will.

#### Built Elements

Built elements refer to elements that actually exist in your production artifacts and are synced to BELA. They cannot be individually deleted or altered (only augmented) by any user. See [Sources](#sources) below.

> [!TIP]
> You can use the `Diagram Legend` tool (question-mark icon on the bottom-left) to see the colors and styles used to display different ECDs.

#### Element Names

Element names can be user-friendly and don't need to be unique. They can use UTF-8 characters including emojis and spaces.


## Containments

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

## Dependencies

Any element can depend on any other element.

Dependencies are uniquely identified by the "from" and "to" elements, and an optional name.

#### Automatic Layout

When there is a dependency line from element A to element B, BELA will do automatic diagram layout to try and position A further up and B further down. When that is impossible (in the case of a dependency cycle, for example) the dependency line that is pointing upward will be displayed in red.

#### Dataflow Direction

Dependencies can be tagged with "read" and/or "write" tags. This dataflow direction will be displayed as arrowheads on the dependency line.

Dataflow direction is independent of dependency direction.


## Paths

Every [built element](#built-elements) is identified by a `path` composed of slash-separated `segments`.

The first segment of the path is a `type`. It works as a namespace, avoiding path conflicts among top-level elements of different types. Paths always have at least 2 segments, therefor.

Examples paths and element types from C#:
 - `assembly/MyAssembly [assembly]`
 - `assembly/MyAssembly/MyNamespace [namespace]`
 - `assembly/MyAssembly/MyNamespace/MyInterface [interface]`

Examples paths and element types from Java:
 - `maven/org.acme:customers [maven]`
 - `maven/org.acme:customers/org.acme [package]`
 - `maven/org.acme:customers/org.acme/customers [package]`
 - `maven/org.acme:customers/org.acme/customers/Customer [class]`
 - `maven/org.acme:customers/org.acme/customers/Customer/setName(java.lang.String) [method]`

#### Implicit vs Explicit Containments

Path segments define **implicit**, unbreakable containments between child elements and their parents.

This means that elements with implicit parents cannot be contained by other elements.

In the examples above, `assembly/MyAssembly` and `maven/org.acme:customers` are the only elements without implicit parents. They are free to be contained by other elements (explicit containment).

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

## See Also

See these concepts applied by the [API](API.md).
