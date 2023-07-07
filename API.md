# BELA Web API

## Host

Your BELA API host address is provided to you when you sign-up for a BELA account. Each account has its own exclusive host.

## Authorization Header

`Authorization: token`

Just the token, without a "Bearer" or "Token" prefix.

An API token is provided to you when you sign-up for a BELA account.

## Argument

Endpoints take either no argument or a single JSON value in the request body.

## HTTP Methods (Verbs)

Any HTTP method can be used with any endpoint. The method is ignored by the server.

## Return Codes

Endpoints return either 200 for success or an error code with a helpful message in the body.

## Endpoints

### upsert-architecture

Replaces all built elements, all built dependencies and all built containments.

All built elements that are not marked as "third-party" and that do not have a container will be contained by the implicit top-level organization container.

Modeled elements, modeled dependencies and modeled containments are preserved. Modeled elements that have the same path (see "ElementPath" below) as a new built element, will have `(Model)` appended to their name.

This endpoint returns immediately but it can take a few seconds to process, depending on the size of the payload. When done processing, the entire new built architecture will be available atomically.

#### Argument
```
{
  elements: Element[]
  dependencies: Dependency[]
  containments: Containment[]
}
```

### upsert-element

Same as the `upsert-architecture` endpoint above, but restricted to the contents of a single container element. Replaces all built elements, all built dependencies and all built containments within that container element.

#### Argument
```
{
  container: ElementPath
  elements: Element[]
  dependencies: Dependency[]
  containments: Containment[]
}
```

## JSON Schemas

### Element
```
{
  path: ElementPath
  name: String             // Optional. Defaults to last segment in the path.
  type: Identifier         // Optional. Defaults to the first segment in the path.
                           // Examples: "package", "class", "function", "service", "endpoint", "topic", "queue", "bucket", "table", etc.
  technology: Identifier   // Optional. Examples: "java", "php", "clojure", "python", "kafka", "http", etc.
  third-party: boolean     // Optional. Defaults to false.
  description: String      // Optional.
  metadata: Object         // Optional. Any extra, useful information. Ignored for now (2023-04)
}
```

**Examples**
```
{
  :path "domain|Credit"
}

{
  :path "domain|Credit|CreditCard"
  :type "subdomain"
}

{
  :path "domain|Credit|CreditCard|Mastercard"
  :type "subdomain"
}

{
  :path "maven-group|house.jux"
  :technology "maven"
}

{
  :path "maven-group|house.jux|bela"
  :type "artifact"
  :technology "maven"
}

{
  :path "maven-group|house.jux|bela|bela"
  :type "namespace"
  :technology "clojure"
}

{
  :path "maven-group|house.jux|bela|bela|biz"
  :type "namespace"
  :technology "clojure"
}

{
  :path "maven-group|house.jux|bela|bela|biz|diagram-get"
  :type "function"
  :technology "clojure"
}

```

### ElementPath

Any non-empty String. It uniquely identifies the element.

Paths are case-sensitive: "getName" and "getname" are NOT the same path.

You can optionally use the pipe character "|" to indicate segments in the path. If an element has a path that starts with the segments of the path of another element, BELA will implicitly create a containment relationship between both elements.

The paths of modeled elements are composed of their type and name: `type|name`. Modeled elements that have the same path as a new built element, will have `(Model)` appended to their name.

**Examples**
```
- "service|billing" (type service)
- "service|billing|billing" (type package)
- "service|billing|billing|core" (type package)
- "service|billing|billing|core|Bill" (type class)
- "service|billing|billing|core|Bill|isDue" (type method)

- "team|billing" (type team)
- "team|billing|backend" (type squad)
```

### Dependency
```
{
  from: ElementPath
  to:   ElementPath
  name: String                    // Optional. Case-sensitive. Required when more than one dependency exists between the same elements.
  description: String             // Optional.
  technology: Identifier          // Optional. Examples: "http", "kafka", "method-call", "function-call"
  async: boolean                  // Optional. Defaults to false. Displayed as a dashed line in the diagrams.
  dataflow-direction: Identifier  // Optional. "read", "write", "read-write", "unknown". Defaults to "unknown". Displayed with one, two or no arrowheads.
}
```

### Containment

Containment relationships are created implicitly between elements that share the same initial path segments, as seen above.

They can also be created explicitly between elements that don't have a containment relationship implied by their path. A microservice inside a business domain is an example.

An element can NOT be contained by more than one container.

```
{
  container: ElementPath.  // Example: "domain|billing"
  contained: ElementPath.  // Example: "service|payments"
}
```

### Identifier

A String that begins with a lowercase letter (a-z), followed by any number of lowercase letters, digits, and hyphens.
