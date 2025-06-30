# ECD File Format (.ecd)

This is the format of the [architecture data](/Concepts.md#ecds) file produced by the [BELA updater apps](/CodeSynchronization.md#2-run-the-bela-updater-docker-app-for-your-language) and accepted by the [BELA API](/API.md).

It was designed for compactness, readability and on-the-fly parsing—unlike JSON—allowing each line to be processed as it is read, without loading the entire file.

## Versioning

The format is currently at version 1, so the first line of the file is always `v1`.

Any future changes will follow [BoringVer](https://medium.com/@klauswuestefeld/boringver-ad84d272a380) to ensure backward compatibility.

## Lines

This is a line-based format. To include a newline inside a string—such as in an element description—escape it using `\` + `n`.

## Source

The second line in the file is `source` followed by the name of the [source](/Concepts.md#sources), for example:

```
v1
source your-source-name 
```

## ECD Lines

The lines that follow are ECD lines. Here is an example. It will be explained below.

```
/maven/my-company/my-project [maven-artifact] "My Project" (java)
  > /maven/com.apache/commons/version/3.0.1
  business [package]
    billing [package]
      Invoice [class]
        getCustomer() [method]
          > business/customers/Customer
    customers [package]
      Customer [class]
        setName(String) [method]
/grouping/libs/maven
  /maven/com.apache
```

### Nesting

ECD Lines can be nested. Each nesting level uses exactly two space characters for indentation.

### Element Line

An element line is composed of:
- Absolute element reference: Slash (`/`) followed by an [element path](#element-path).
- Element Type (Optional): an [identifier](#identifier) in brackets. Examples: `[class]`, `[function]`.
- Element Name (Optional): Any String. Can be quoted.
- 


### Nested Element Upsert Line

### Element Reference Line

### Element Path

Paths are primary keys for [built elements](/Concepts.md#built-vs-modeled).

An [element path](/Concepts.md#element-path) is a String composed of two or more path segments separated by `/`.

Path segments are case-sensitive: `getName()` and `getname()` are NOT the same.

The first segment is always an `ElementType`. You can think of it as a namespace, so that you can have elements with the same name if they have different types.

Examples:
| Path | Obs
| ---- | ----
| domain/Billing | Domain
| domain/Billing/Invoices | Subdomain
| maven/my-company/my-project | Maven artifact "my-project" in the "my-company" maven group.
| service/Billing | 
service/Billing/billing/core/Bill/isDue(java.util.Date)
```



### Element Path Segment

Any String without slashes `/`, spaces or newline characters.

### Quoted String

A String in double-quotes `"`. It can contain spaces and any other character.

| Special Character | Escape Sequence
| ---- | ----
| Newline | `\` + `n`
| Double-Quote | `\` + `"`
| Backslash | `\` + `\`

### Identifier

aa

