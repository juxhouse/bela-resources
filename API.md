# BELA Web API

## Host

Your BELA API host address is provided to you when you sign-up for a BELA account. Each account has an exclusive host.


## Headers

`Authorization: Token <your-token>`
An API token is provided to you when you sign-up for a BELA account.

`Content-Type: application/json`


## Endpoint: [PATCH](https://en.wikipedia.org/wiki/PATCH_(HTTP)) `/architecture`

This endpoint allows you to upload your architecture or a part of it to BELA.

This API does not require you to inform the deletion or renaming of elements in your architecture. Instead, it allows you to upload the elements that currently exist and BELA will garbage collect the rest.

This endpoint receives an array of operations. You can think of operations as being executed one after the other, in order. However, the overall combined effect of all operations happens atomically, as a single transaction.

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
  "type": ElementType           // Optional. Defaults to the first segment in the path.
  "name": String                // Optional. Defaults to last segment in the path.
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

Receives an array of `elements-to-keep` and deletes elements that are not listed in that array. Can also receive an element `type` and a `container` to restrict the scope of the deletion.

In other words: performs garbage collection on elements of a given type, contained in a given element.

Performing this operation with no `container`, no `type` and no `elements-to-keep` will delete your entire architecture. This can be used, for example, as the first operation in a transaction that uploads a small architecture entirely.

Modeled elements are not affected by this operation, only built elements are. Deleted built elements will be displayed as `missing` if they have any containment or dependency relationship with a modeled element.

```
{
  "op": "garbage-collect"
  "container": ElementPath            // Optional. Restricts deletions to contents of this container.
  "depth": Identifier                 // Optional. "direct-contents" or "all-contents". Must be provided if and only if container is provided.
                                      // "direct-contents" restricts the deletion only to elements that are directly contained by the container.
                                      // "all-contents" restricts the deletion to elements directly or indirectly contained by the container.
  "type": ElementType                 // Optional. Restricts deletions to elements of this type.
  "elements-to-keep": [ElementPath]
}
```


## Schemas

### ElementType

Identifier. Examples: domain, subdomain, person, package, class, function, service, endpoint, topic, queue, bucket, table, etc.

### Technology

Identifier. Examples: java, php, clojure, python, kafka, http, etc.

### ElementPath

String. A primary key for elements.

A path is composed of two or more segments separated by the pipe character "|". The pipe character is used instead of the more common slash "/" character so that you can use slashes as part of your segments without having to escape them.

Path segments are case-sensitive: "getName()" and "getname()" are NOT the same.

The first segment is always an `ElementType`. You can think of it as a namespace, so that you can have elements with the same name if they have different types, for example:
```
- service|Billing
- tribe|Billing
```

Elements with only 2 segments in their path, such as the examples above, can be added as contents to other elements.

Elements with 3 or more path segments, however, have their containment predefined by their path, much like folders and files in a filesystem. They cannot be added as contents to other elements. In this example, each element is contained by the element above it:
```
- service|Billing (type: service)
- service|Billing|billing (type: package)
- service|Billing|billing|core (type: package)
- service|Billing|billing|core|Bill (type: class)
- service|Billing|billing|core|Bill|isDue() (type: method)
```

The paths of modeled elements are composed of their type and name: `type|name`. Modeled elements that have the same path as a new uploaded built element, will have `(Model)` appended to their name.

### Dependency
```
{
  to: ElementPath
  name: String                    // Optional. Case-sensitive. Required when more than one dependency exists between the same two elements.
  description: String             // Optional.
  technology: Technology          // Optional.
  async: boolean                  // Optional. Defaults to false.
  dataflow-direction: Identifier  // Optional. "read", "write", "read-write", "none".
                                  // Defaults to "none". Displayed with one, two or no arrowheads.
}
```

### Identifier

A String that begins with a lowercase letter (a-z), followed by any number of lowercase letters, digits, and hyphens.
