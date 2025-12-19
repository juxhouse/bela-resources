# ECD File Format (.ecd)

This is the format of the [architecture data](/Concepts.md#ecds) file produced by the [BELA updater apps](/CodeSynchronization.md#2-run-the-bela-updater-docker-app-for-your-language) when they analyse your code repositories. It is sent to the [BELA API](/API.md).

![ECD Overview](ECD-File-Format-Overview.png)

The ECD format is designed for conciseness and readability. It is also extensible, by allowing custom JSON metadata.

There is a more formal [syntax specification](#appendix---syntax) at the end.

## Example
```
v1
source my-source-name
/maven/my-company:my-project "My Project" (java)
  > /maven/org.apache.commons:commons-collections4/version/3.0.1
  business [package]
    billing [package]
      Invoice [class]
        getCustomer() [method]
          > business/customers/Customer
          > /*/getAddress()
    customers [package]
      Customer [class]
        setName(String) [method]

/grouping/libs/maven [grouping]
  /maven/org.apache.commons:commons-collections4
```

## Encoding

UTF-8

## Versioning

The format is currently at version 1, so the first line of the file is always `v1`.

Future versions will use the [BoringVer](https://medium.com/@klauswuestefeld/boringver-ad84d272a380) versioning scheme.

## Line-Based

ECD is a line-based format, so newline characters (CR and LF) in your strings must be escaped. More on that below.

> [!TIP]
> ECD files are designed to be read with line-wrap off.

#### Comments

Blank lines and lines starting with hashtag (#) are ignored. In-line comments are **NOT** supported.

## Source

The second line in the file is `source` followed by the name of the [source](/Concepts.md#sources). It is a [quotable string](#quotable-string) with max length of 100.

## Element and Dependency Lines

Each line that follows is either an [Element Line](#element-line) or a [Dependency Line](#dependency-line). A containment is simply an Element Line nested below another.

#### Nesting

Element and Dependency Lines can be nested below another Element Line. Each nesting level uses exactly two spaces for indentation.

#### Base Elements

Element Lines that are not nested are called `Base Elements`. They are used as the base path for relative dependencies (see below).

#### Element Line

Element lines are composed of:

 - [Element Path Reference](#element-path-reference)
 - [Element Type](#element-type) (optional)
 - [Element Name](#element-name) (optional)
 - [Tags](#tags) (optional)
 - [Custom Metadata](#custom-metadata) (optional)

#### Dependency Line

Dependency lines start with `> ` followed by:

 - [Element Path Reference](#element-path-reference)
 - [Dependency Name](#element-name) (optional)
 - [Tags](#tags) (optional)
 - [Custom Metadata](#custom-metadata) (optional)

#### Element Path Reference

`Elements` start with a path reference, which can be one of:

 - **Child Path Segment** - A nested element can be declared with only its last path segment. Its path will be composed of its parent's path + `/` + this segment. It is a [quotable string](#quotable-string) that does not contain a slash `/`. Most elements in the example ECD above are declared like this.
 - **Absolute Path Reference** - A slash `/` followed by a [path](/Concepts.md#element-path). It is a [quotable string](#quotable-string) with max length of 1024.
 - **Last Segment Query** - `/*/` followed by the last path segment of some element. Example: `/*/getAddress()`. A warning is generated in case of ambiguity.

#### Element Type

An [identifier](#identifier) between square brackets. Examples: `[domain]`, `[subdomain]`, `[service]`, `[package]`, `[class]`, `[endpoint]`, etc.

#### Element Name

A [quotable string](#quotable-string) with max length of 512. Example: `"My Project"`. If ommitted, the last path segment will be used as the element name. It must be quoted if it starts with `(`.

#### Tags

A list of identifiers between parentheses. Example: `(tag1 tag2 tag3)`. Example tags: `async` `python` `critical`, etc.

#### Dependency Name

A [quotable string](#quotable-string) with max length of 128. Example: `"GET customer{id}"`. It must be quoted if it starts with `(`.

#### Custom Metadata

Each line can have custom metadata as a JSON object at the end. It must be formatted as a single line, stripped of newline characters. JSON already requires newlines to be escaped in strings anyway.

The `description` attribute of this JSON object is the element's description. All other attributes are displayed by BELA as metadata in the element details panel.


#### Quotable String 

A string of any Unicode chars except double-quotes and newline. It can optionally be surrounded by double-quotes. It must be surrounded if it contains spaces.


#### Identifier

A string that begins with a lowercase letter (a-z), followed by lowercase letters, digits and hyphens (not underscore). Max length 32.


## Appendix - Syntax

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
ecd-line          = element-line | dependency-line;

dependency-line   = nesting , { nesting } , '>' , space , path-reference ,            [ dependency-name ] , [ tags ] , [ custom-metadata ] , newline ;
element-line      =           { nesting } ,               path-reference , [ type ] , [    element-name ] , [ tags ] , [ custom-metadata ] , newline ;

nesting           = space , space ;  // Indentation of 2 spaces for each nesting level.
space             = ' ' ;

path-reference    = quotable-string ;  // Max length of 1024.
dependency-name   = quotable-string ;  // Max length of 128.  It must be quoted if it starts with '(' (open-brackets).
element-name      = quotable-string ;  // Max length of 512. It must be quoted if it starts with '(' (open-brackets).
quotable-string   = ? A string of any Unicode chars except double-quotes and newline. It can optionally be surrounded by double-quotes and can only contain spaces when surrounded. ? ;

type              = '[' , identifier , ']' ;  // Max length of 32.
tags              = '(' , identifier , { space , identifier } , ')';
identifier        = ? A string that begins with a lowercase letter (a-z), followed by lowercase letters, digits and hyphens (not underscore). Max length 32. ?

custom-metadata   = ? A JSON object formatted as a single line without newlines. JSON already requires newlines to be escaped in strings. ? ;

double-quote      = '"' ;  // Unicode U+0022
newline           = '\n' | '\r' ;  // Unicode character CR or LF.
```
