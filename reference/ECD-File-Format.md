# ECD File Format (.ecd)

This is the format of the [architecture data](/Concepts.md#ecds) file produced by the [BELA updater apps](/CodeSynchronization.md#2-run-the-bela-updater-docker-app-for-your-language) and sent to the [BELA API](/API.md).

It is designed for compactness and readability. It is also extensible, by allowing custom JSON metadata.

There is a formal [syntax specification](#appendix---syntax) at the end.

## Example
```
v1
source my-source-name

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

## Encoding

UTF-8

## Line-Based

ECD is a line-based format, so newline characters (CR and LF) in your strings must be escaped. More on that below.

> [!TIP]
> ECD files are designed to be read with line-wrap off.

#### Comments

Blank lines and lines starting with hashtag (#) are ignored. Inline comments with hashtag are **NOT** supported.

## Versioning

The format is currently at version 1, so the first line of the file is always `v1`.

Future changes will use the [BoringVer](https://medium.com/@klauswuestefeld/boringver-ad84d272a380) versioning scheme.

## Source

The second line in the file is `source` followed by the name of the [source](/Concepts.md#sources). It is a [quotable string](#quotable-string) with max length of 100.

## ECD Lines

The lines that follow are ECD lines.

### Nesting

ECD Lines can be nested. Each nesting level uses exactly two space characters for indentation.

#### Base Elements

Elements that are not nested are "base elements". Their path is used as the prefix for all relative dependency references that come after them, to avoid wasteful repetition.

#### Custom Metadata

Each line can have custom metadata as a JSON object at the end. It must be formatted as a single line, without newline characters. JSON already requires newlines to be escaped in strings anyway.

## Definitions

#### Quotable String 

A string of any Unicode chars except double-quotes and newline. It can optionally be surrounded by double-quotes and can only contain spaces when surrounded.


## Appendix 1 - Syntax

This is the ECD syntax specification as an EBNF grammar.

#### EBNF Notation Summary
 - Optional: [ ... ]
 - Repetition: { ... }
 - Alternatives: ...|...

#### ECD Syntax Version 1

Blank lines and lines starting with hashtag (#) are ignored. They can be used for comments. All other lines follow this grammar:

```ebnf
ecd-file          = header ,
                    body ;

header            = 'v1' , newline ,
                    'source' , space , source-name , newline ;
source-name       = quotable-string ;  // Max length of 100.

body              = { ecd-line } ;
ecd-line          = element-line | dependency-line;  // A containment is simply an element-line nested below another element-line.

dependency-line   = nesting , { nesting } , '>' , space , path-reference ,            [ dependency-name ] , [ tags ] , [ custom-metadata ] , newline ;
element-line      =           { nesting } ,               path-reference , [ type ] , [    element-name ] , [ tags ] , [ custom-metadata ] , newline ;

nesting           = space , space ;  // Indentation of 2 spaces for each nesting level.
space             = ' ' ;

path-reference    = quotable-string ;  // Max length of 1024.
dependency-name   = quotable-string ;  // Max length of 40.  It must be quoted if it starts with '(' (open-brackets).
element-name      = quotable-string ;  // Max length of 512. It must be quoted if it starts with '(' (open-brackets).
quotable-string   = ? A string of any Unicode chars except double-quotes and newline. It can optionally be surrounded by double-quotes and can only contain spaces when surrounded. ? ;

type              = '[' , identifier , ']' ;
tags              = '(' , identifier , { space , identifier } , ')';
identifier        = ? A string that begins with a lowercase letter (a-z), followed by lowercase letters, digits and hyphens (not underscore). Max length 32. ?

custom-metadata   = ? A JSON object formatted as a single line without newlines. JSON already requires newlines to be escaped in strings. ? ;

double-quote      = '"' ;  // Unicode U+0022
newline           = '\n' | '\r' ;  // Unicode character CR or LF.
```


# OLD:

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
