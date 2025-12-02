# ECD File Format (.ecd)

This is the format of the [architecture data](/Concepts.md#ecds) file produced by the [BELA updater apps](/CodeSynchronization.md#2-run-the-bela-updater-docker-app-for-your-language) and accepted by the [BELA API](/API.md).

It was designed for compactness, readability. It also extensible, by allowing an optional JSON data at the end of each line.

There is a formal [EBNF grammar](#ebnf-grammar) below.

## Versioning

The format is currently at version 1, so the first line of the file is always `v1`.

Future changes will use the [BoringVer](https://medium.com/@klauswuestefeld/boringver-ad84d272a380) versioning scheme.

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
/grouping/libs/maven [grouping]
  /maven/com.apache
```

### Nesting

ECD Lines can be nested. Each nesting level uses exactly two space characters for indentation.


### Element Path

Paths are primary keys for [built elements](/Concepts.md#built-vs-modeled).

An [element path](/Concepts.md#element-path) is a String composed of two or more path segments separated by `/`.

Path segments are case-sensitive: `getName()` and `getname()` are NOT the same.

You can use capital letters, diacritics and all sorts of fancy characters but we strongly recommend you keep things simple.

The first segment is always an `ElementType`. You can think of it as a namespace, so that you can have elements with the same name if they have different types.

Examples:
| Path | Obs
| ---- | ----
| domain/billing | Domain
| domain/billing/invoices | Subdomain
| maven/my-company/my-project | Maven artifact "my-project" in the "my-company" maven group.
| service/billing | 
service/Billing/billing/core/Bill/isDue(java.util.Date)

## EBNF Grammar

#### Syntax Summary
 - Optional: [ ... ]
 - Repetition: { ... }
 - Alternatives: ...|...

#### ECD File Format

```ebnf
ecd-file          = header ,
                    body ;

header            = 'v1' , newline ,
                    'source' , space , source-name , newline ;
source-name       = reasonable-string ;  // Max length of 100.

body              = { ecd-line } ;
ecd-line          = element-line | dependency-line;  // A containment is simply an element-line nested below another element-line.

dependency-line   = nesting , '>' , space , path-string , newline ;  // Must be nested below an element-line.
element-line      = nesting , path-string , newline ;

nesting           = { space , space } ;  // Indentation of 2 spaces for each nesting level. Nesting of zero (no spaces) is also possible.
path-string       = reasonable-string ;  // Max length of 200.

reasonable-string = unquoted-string | quoted-string ;
unquoted-string   = unquoted-char , { unquoted-char } ;
quoted-string     = '"' , quoted-char , { quoted-char } , '"' ;

unquoted-char     = quoted-char - space ; // No spaces, no double-quotes.
quoted-char       = any-char - '"' ; // No double-quotes.
space             = ' ' ;
any-char          = ? any Unicode character except newline ? ;
newline           = '\n' | '\r' ;
```



