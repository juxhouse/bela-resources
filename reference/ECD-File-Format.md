# ECD File Format (.ecd)

This is the format of the file produced by the [BELA updaters apps](/CodeSynchronization.md#2-run-the-bela-updater-docker-app-for-your-language) and accepted by the [BELA API](/API.md).

It was designed for compactness, readability and on-the-fly parsing—unlike JSON—allowing each line to be processed as it’s read, without loading the entire file.

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

The lines that follow are either Element lines or Dependency lines. Containments are formed by indenting consecutive Element lines.

```
maven/my-company/my-project [maven-artifact]
  mycompany [package]
    myproject [package]

  > /maven/com.apache/commons/version/3.0.1
  mycompany [package]
    myproject [package]
      MyClass [class]
        main [method]
          > mycompany/myproject/
      
```
In the example above you can see . Explanations follow.

### Indentation

ECD Lines can be indented. Each indentation level uses exaclty two space characters.

Dependency lines indented below an Element lines 


### Element Line

An Element line 

### Element Upsert Line

An element upsert line is 

### Element Reference Line





