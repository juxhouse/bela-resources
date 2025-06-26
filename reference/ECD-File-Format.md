# ECD File Format (.ecd)

This is the format of the file produced by BELA's [updaters apps](/CodeSynchronization.md#2-run-the-bela-updater-docker-app-for-your-language) and accepted by the BELA [API](/API.md).

## Lines

This is a line-based format. If you need to escape [new line characters](https://docs.oracle.com/en/java/javase/24/docs/api/java.base/java/io/BufferedReader.html#readLine()) within your own strings, such as element descriptions, for example, use `backslash` followed by `n`.

## Version 1

The first lines is always `v1`.

## Source

The second line is `source` followed by a space and the name of the [source](/Concepts.md#sources).

```
v1
source your-source-name 
```

