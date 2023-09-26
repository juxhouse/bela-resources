# BELA Web API

This API is composed of a single endpoint that allows you to upload your architecture or a part of it to BELA.

It is called typically by repository actions (Github actions, for example) everytime the main branch is updated with new commits.

It can also be called daily, for example, by processes that read architecture information from production monitoring tools such as Dynatrace and Datadog.


## Host

Your BELA API host address is provided to you when you sign-up for a BELA account. Each account has an exclusive host.


## Headers

`Authorization: Token <your-token>`
An API token is provided to you when you sign-up for a BELA account.

`Content-Type: application/json`


## Endpoint: [PATCH](https://en.wikipedia.org/wiki/PATCH_(HTTP)) `/architecture`

This endpoint allows you to upload your architecture or a part of it to BELA.

It does not require you to inform the deletion or renaming of elements in your architecture. Instead, it allows you to upload the elements that currently exist and BELA will garbage collect the rest.

You can upload elements from different `sources`. See "Source" section below.

This endpoint receives a `transaction` as an array of `operations`. The effect of all operations is applied to BELA atomically.

**Body**
```
{
  "source": Source
  "transaction": [Operation]
}
```

**Reply Success Code** `200`

**Reply Error Codes**

Errors will be returned as some HTTP error code with a helpful message in the reply body.


## Operations

### `upsert-element`

Creates/updates a built element with the given attributes.

Modeled elements that have the same path (see "ElementPath" section below) as a new built element, will have `(Model)` appended to their name.

```
{
  "op": "upsert-element"
  "path": ElementPath           // Primary key.
  "type": ElementType           // See ElementType below.
  "name": String                // Optional. Defaults to last segment in the path.
  "technology": Technology      // Optional.
  "third-party": boolean        // Optional. Defaults to false.
  "description": String         // Optional.
  "extra": Object               // Optional. Any extra information you want to store. It is opaque to BELA.
}
```

### `add-dependencies`

Receives an array of dependencies and adds them as dependencies `from` the given element.

This operation DOES NOT delete any other existing dependencies.


```
{
  "op": "add-dependencies"
  "from": ElementPath
  "dependencies": [Dependency]  // See Dependency below.
}
```

### `add-containments`

Receives an array of element paths and adds them as direct `contents` of the given `container`.

This operation:
  - Removes `contents` from their old containers, if any, since elements can only be contained by a single container.
  - DOES NOT delete other contents from `container`.

```
{
  "op": "add-containments"
  "container": ElementPath
  "contents": [ElementPath]
}
```

## Schemas

### Source

String. This is the source of the elements being uploaded. BELA will garbage collect elements and containments that are no longer present in the latest upload of any of your sources.

Examples:
  - "https://github.com/my-company/my-repo"
  - "my-service-postman-catalog"
  - "my-company-dynatrace-logs"
  - "my-teams-datadog-logs"
  - etc

### ElementType

Identifier. Examples: domain, subdomain, person, package, class, function, method, service, endpoint, topic, queue, bucket, table, etc.

See also: ElementPath.

### Technology

Identifier. Examples: java, php, clojure, python, kafka, http, etc.

### ElementPath

String. A primary key for elements.

A path is composed of two or more segments separated by slash. You cannot have slash as a character in a path segment.

Path segments are case-sensitive: "getName()" and "getname()" are NOT the same.

The first segment is always an `ElementType`. You can think of it as a namespace, so that you can have elements with the same name if they have different types, for example:
```
- service/Billing
- squad/Billing
```

Elements with only 2 segments in their path, such as the examples above:
  - Have their ElementType defined by the first segment.
  - Can be added as contents to other elements.

Elements with 3 or more path segments have their containment predefined by their path, much like folders and files in a filesystem. They cannot be added as contents to other elements. In this example, each element is contained by the element above it:
```
- service/Billing (ElementType: service)
- service/Billing/billing (ElementType: package)
- service/Billing/billing/core (ElementType: package)
- service/Billing/billing/core/Bill (ElementType: class)
- service/Billing/billing/core/Bill/isDue() (ElementType: method)
```

The paths of modeled elements are composed of their type and name: `type/name`. Modeled elements that have the same path as a new uploaded built element, will have `(Model)` appended to their name.

### Dependency

Dependencies are uniquely identified by the combination of `from` element, `to` element, `type` and `name`.

An element can have more than one dependency on another element as long as these dependencies have different types or names.

```
{
  to: ElementPath
  name: String                    // Optional. Case sensitive.
  type: Identifier                // Optional.
  description: String             // Optional.
  tags: [Identifier]              // Optional. You can have any tags you want.
                                  // BELA displays the following tags in special ways:
                                  //   read: Displayed as an arrowhead
                                  //   write: Displayed as an arrowhead
                                  //   async: Displayed as a dashed line
                                  //   implements: Displayed as a big, hollow arrowhead.
}
```

### Identifier

A String that begins with a lowercase letter (a-z), followed by any number of lowercase letters, digits, and hyphens.
