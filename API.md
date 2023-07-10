# BELA Web API

## Host

Your BELA API host address is provided to you when you sign-up for a BELA account. Each account has an exclusive host.


## Headers

`Authorization: Token <your-token>`
An API token is provided to you when you sign-up for a BELA account.

`Content-Type: application/json`


## Endpoint: [PATCH](https://en.wikipedia.org/wiki/PATCH_(HTTP)) `/architecture`

This endpoint allows you to upload your architecture or a part of it to BELA.

This API does not require you to inform the deletion or renaming of elements in your architecture. Instead, it allows you to upload the elements that do exist and BELA will garbage collect the rest.

This endpoint receives an array of operations. You can think of operations as being executed one after the other in the order they are provided. However, the overall combined effect of all operations happens atomically, as a single transaction.

**Body**
```
{
  "transaction": [Operation]
}
```

**Reply Success Code** `202`

The server replies immediately but can take a few seconds to process the request, depending on its size.

**Reply Error Codes**

Errors will be returned as some HTTP error code with a helpful message in the reply body.


## Operations

### `upsert-element`

Creates/updates a built element with the given attributes.

Modeled elements that have the same path (see "ElementPath" below) as a new built element, will have `(Model)` appended to their name.

```
{
  "op": "upsert-element"
  "path": ElementPath           // Primary key.
  "name": String                // Optional. Defaults to last segment in the path.
  "type": Type                  // Optional. Defaults to the first segment in the path.
  "technology": Technology      // Optional.
  "third-party": boolean        // Optional. Defaults to false.
  "description": String         // Optional.
  "extra": Object               // Optional. Any extra information you want to store. It is opaque to BELA.

  "dependencies": [Dependency]  // Optional. All this element's dependencies.
                                // Deletes any dependencies that this element had and that are not in this array.
}
```

### `add-contents`

Receives an array of element paths and adds them as direct `contents` of the given `container`.

Does not delete old contents, so that multiple different uploads from different sources can contribute to the contents of a same container. To delete old contents, use the `garbage-collect` operation.

```
{
  "op": "add-contents"
  "container": ElementPath
  "contents": [ElementPath]
}
```


### `garbage-collect`

Receives an array of `elements-to-keep` and deletes elements that are not listed in that array. Can also receive an element type and a container to restrict the scope of the deletion.

In other words: performs garbage collection on elements of a given `type`, contained in a given element.

Performing this operation with no `container`, no `type` and no `elements-to-keep` will delete your entire architecture. This can be used, for example, as the first operation in a transaction that uploads a small architecture entirely.

Modeled elements are not affected by this operation, only built elements are. Deleted built elements will be displayed as `missing` if it they have any containment or dependency relationship with a modeled element.

```
{
  "op": "garbage-collect"
  "container": ElementPath            // Optional. Restricts deletions to contents of this container.
  "depth": Identifier                 // Optional. "direct-contents" or "all-contents". Must be provided if and only if container is provided.
                                      // "direct-contents" restricts the deletion only to elements that are directly contained by the container.
                                      // "all-contents" restricts the deletion to elements directly or indirectly contained by the container.
  "type": Type                        // Optional. Restricts deletions to elements of this type.
  "elements-to-keep": [ElementPath]
}
```


## Schemas

### Type

Identifier. The type of an element.

Examples: domain, subdomain, person, package, class, function, service, endpoint, topic, queue, bucket, table, etc.

### Technology

Identifier. The technology of an element or depedency.

Examples: java, php, clojure, python, kafka, http, etc.





### ElementPath

Any non-empty String. It uniquely identifies the element.

Paths are case-sensitive: "getName" and "getname" are NOT the same path.

You can optionally use the pipe character "|" to indicate segments in the path. If an element has a path that starts with the segments of the path of another element, BELA will implicitly create a containment relationship between both elements.

The paths of modeled elements are composed of their type and name: `type|name`. Modeled elements that have the same path as a new built element, will have `(Model)` appended to their name.

**Examples**
```
- "service|billing" (Type: service)
- "service|billing|billing" (Type: package)
- "service|billing|billing|core" (Type: package)
- "service|billing|billing|core|Bill" (Type: class)
- "service|billing|billing|core|Bill|isDue()" (Type: method)

- "team|billing" (Type: tribe)
- "team|billing|backend" (Type: squad)
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
