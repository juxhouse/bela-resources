# BELA API

## Host

`https://bela-api.jux.house`

## Authorization Header

`Authorization: token`

Just the token, without a "Bearer" or "Token" prefix.

## Argument

Endpoints take either no argument or a single JSON encoded value in the request body.

## HTTP Verbs

Any HTTP verb can be used with any endpoint. The verb is ignored by the server.

## Return Codes

Endpoints return either 200 for success or some other error code with a helpful error message String in the body.

## Endpoints

There is a single endpoint.

### upsert-architecture

Replaces all built elements.

Replaces modeled elements with built elements that have the same path. See "ElementPath" below.

Other modeled elements are preserved.

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

{
  path: ElementPath
  name:                    // Optional. Defaults to the last segment in the path.
  type: Identifier         // Optional. Defaults to the first segment in the path.
                           // Examples: "package", "class", "function", "service", "endpoint", "topic", "queue", "bucket", "table"
  name: String             // Optional. Non-empty String. Defaults to last segment in the path.
  description: String      // Optional.
  technology: Identifier   // Optional. Examples: "java", "php", "clojure", "python", "kafka", "http"
  metadata: Object         // Optional. Any extra, useful information. Ignored for now (2023-04)
  third-party: boolean     // Optional. Defaults to false.
}

### ElementPath

Any non-empty JSON String. It uniquely identifies the element.

Paths are case-sensitive: "Person" and "person" are NOT the same path.

It is a String with segments separated by the pipe character "|".


                           ; Example: "service|billing" (type service)
                           ; Example: "service|billing|billing" (type package)
                           ; Example: "service|billing|billing|logic" (type package)
                           ; Example: "service|billing|billing|logic|product-ownership" (type namespace)
                           ; Example: "service|billing|billing|logic|product-ownership|has-others?"
                           ;   (type "function") This is the has-others? function, inside the product-ownership namespace, inside the logic package, inside the billing package, inside the billing service)
                           ; Example: "squad|billing" (type squad)
                           ; Example: "squad|billing|backend" (type pack)
                           ; Example: "maven-group"








*Type
  A kebab-case String having only lowercase letters a-z, numerals, dash, underscore and period.
  Often this will be the same as the first segment of the path, but not necessarily. Examples: "service", "lambda", "bu", "squad", "package", "namespace", "endpoint", "topic", "function", "macro", "def", "method", "field", etc.

Dependency
{
  from: String                ; Element path. (Shown above in the diagrams)
  to:   String                ; Element path. (Shown below in the diagrams)
  name: String                ; Optional. Required when more than one dependency exists between the same elements. Example: "endpointX GET/200"
  description: String         ; Optional. Text paragraphs.

  technology: String          ; Optional. Examples: "http", "kafka", "method-call", "function-call"
  async: boolean              ; Optional. Defaults to false. Shown as a dashed line.
  dataflow-direction: String  ; Optional. "read", "write", "read-write", "unknown". Defaults to "unknown". Shown with one, two or no arrowheads.
}

Containment                   ; Containment relationships are created automatically between path parent and child segments,
                              ; so this containment structure is used for containments that are not expressed in path segments.
{
  container: String           ; Element path. Example: "account|br"
  contained: String           ; Element path. Example: "service|billing"
}

### Identifier

A String that begins with a lowercase letter (a-z), followed by any number of lowercase letters, digits, and hyphens.


Examples
============

{
  :path "domain|Credit"
}

{
  :path "domain|Credit|CreditCard"
  :type "Subdomain"
}

{
  :path "domain|Credit|CreditCard|Mastercard"
  :type "Subdomain"
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
  :path "maven-group|house.jux|bela|isa-bela"
  :type "namespace"
  :technology "clojure"
}

{
  :path "maven-group|house.jux|bela|isa-bela|biz"
  :type "namespace"
  :technology "clojure"
}

{
  :path "maven-group|house.jux|bela|isa-bela|biz|diagram-get"
  :type "function"
  :technology "clojure"
}
