# BELA Web API

## Host

`https://bela-api.jux.house`

## Authorization Header

`Authorization: token`

Just the token, without a "Bearer" or "Token" prefix.

## Argument

Endpoints take either no argument or a single JSON value in the request body.

## HTTP Verbs

Any HTTP verb can be used with any endpoint. The verb is ignored by the server.

## Return Codes

Endpoints return either 200 for success or an error code with a helpful message in the body.

## Endpoints

There is a single endpoint.

### upsert-architecture

Replaces all built elements.

Replaces modeled elements with built elements that have the same path. See "ElementPath" below. All other modeled elements are preserved. Modeled dependencies to replaced modeled elements are also preserved.

This endpoint returns immediately but it can take a few seconds to process, depending on the size of the architecture. When done processing, the entire new architecture will be available atomically.

#### Argument
```
{
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

Paths are case-sensitive: "Person" and "person" are NOT the same path.

You can optionally use the pipe character "|" to indicate segments in the path. If an element has a path that starts with the segments of the path of another element, BELA will implicitly create a containment relationship between both elements.

The paths of modeled elements are composed of their type and name: `type|name`. Modeled element are replaced by built elements with the same name.

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

Containment relationships are created implicitly between child and parent Elements that share the same initial path segments, as seen above.

They can also be created explicitly between elements that don't have such a strong and permanent containment relationship implied by their path. A microservice deployed to a AWS account is an example.

An Element can NOT be contained by more than one parent.

```
{
  container: ElementPath.  // Example: "aws-account|acme"
  contained: ElementPath.  // Example: "service|billing"
}
```

### Identifier

A String that begins with a lowercase letter (a-z), followed by any number of lowercase letters, digits, and hyphens.
