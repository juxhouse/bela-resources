# ECD File Format (.ecd)

This is the format of the file produced by BELA's [updaters apps](/CodeSynchronization.md#2-run-the-bela-updater-docker-app-for-your-language) and accepted by the BELA [API](/API.md).

It was designed for compactness, readability, and—unlike JSON—supports incremental parsing, allowing it to be processed line by line without having to read the entire file.

## Versioning

The format is currently at version 1, so the first line of the file is always `v1`.

Any future changes will follow [BoringVer](https://medium.com/@klauswuestefeld/boringver-ad84d272a380) to ensure backward compatibility.

## Lines

This is a line-based format. If you need newline characters within your own strings, such as element descriptions, escape them with `backslash` followed by `n`.

## Source

The second line is `source` followed by the name of the [source](/Concepts.md#sources), for example:

```
v1
source your-source-name 
```

## ECD Lines

