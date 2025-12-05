# ECD File Format (.ecd)

This is the format of the [architecture data](/Concepts.md#ecds) file produced by the [BELA updater apps](/CodeSynchronization.md#2-run-the-bela-updater-docker-app-for-your-language) and sent to the [BELA API](/API.md).

It is designed for compactness and readability. It is also extensible, by allowing optional JSON data.

There is a formal [EBNF grammar](#ebnf-grammar) below.

## Lines

This is a line-based format, so strings must not contain newline characters (ASCII codes 10 and 13).

ECD files are designed to be read with line-wrap off.

#### JSON Extension

Each line can have an optional JSON data object at the end. It must be formatted as a single line, without newline characters. JSON already require newlines to be escaped in strings.

#### Comments

Blank lines and lines starting with hashtag (#) are ignored. Inline comments with hashtag are **NOT** supported.

## Versioning

The format is currently at version 1, so the first line of the file is always `v1`.

Future changes will use the [BoringVer](https://medium.com/@klauswuestefeld/boringver-ad84d272a380) versioning scheme.

## Source

The second line in the file is `source` followed by the name of the [source](/Concepts.md#sources), for example:

```
v1
source your-source-name 
```

## ECD Lines

The lines that follow are ECD lines. Here is an example.

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

#### Base Elements

Elements that are not nested are "base elements". Their path is used as the prefix for all relative dependency references that come after them, to avoid wasteful repetition.

...WIP...

## EBNF Grammar

#### Syntax Summary
 - Optional: [ ... ]
 - Repetition: { ... }
 - Alternatives: ...|...

#### ECD File Format Version 1

Blank lines and lines starting with hashtag (#) are ignored. They can be used for comments. All other lines use the following grammar.

```ebnf
ecd-file          = header ,
                    body ;

header            = 'v1' , newline ,
                    'source' , space , source-name , newline ;
source-name       = quotable-string ;  // Max length of 100.

body              = { ecd-line } ;
ecd-line          = element-line | dependency-line;  // A containment is simply an element-line nested below another element-line.

dependency-line   = nesting , '>' , space , path-reference , newline ;  // Must be nested below an element-line.
element-line      = nesting , path-reference , [ type ] , newline ;

nesting           = { space , space } ;  // Indentation of 2 spaces for each nesting level. Nesting of zero (no spaces) is also possible.
path-reference    = quotable-string ;  // path-reference is a quotable-string. Max length of 1024.
type              = '[' , identifier , ']' ;
identifier        = 

quotable-string   = ? A string that does not contain double-quotes. It can be surrounded by double-quotes and can only contain spaces when surrounded. ? ;

space             = ' ' ;
newline           = '\n' | '\r' ;  // ASCII codes 13 and 10
```


# OLD:

 - name-char-limit 512
 - type-char-limit 32
 - tag-char-limit 32 (includes old "tech" and "dataflow" attributes)
 - dep-name-char-limit 256

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
