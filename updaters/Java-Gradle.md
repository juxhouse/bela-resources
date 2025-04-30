## Prepare your Gradle Project

Build your Gradle project. For a simple Gradle project, for example, that is done running:

`gradle clean build`

Copy this [bela.gradle](/updaters/reference/bela.gradle) file into your project folder and run the following command:

```
./gradlew belaBuild --init-script bela.gradle
```

You are now ready to [go back](/CodeSynchronization.md) and run the BELA Updater for Java.

## Troubleshooting

If you have an unusual build config and the above isn't working, [this](/updaters/Java-Other.md) is the output structure that BELA needs.
