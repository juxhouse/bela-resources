## Prepare your Gradle Project

Build your Gradle project. For a simple Gradle project, for example, that is done running:

`gradle clean build`

Copy this [bela.gradle](/updaters/reference/bela.gradle) file into your project folder and run the following command:

```
./gradlew belaBuild --init-script bela.gradle
```

Your project is now ready to be [analysed by BELA](/updaters/Java.md).
