# Access through JDBC

Make sure your Oracle database schema is accessible through a JDBC connection with a URL similar to this example:

```jdbc:oracle:thin:MyUser/MyPassword@//localhost:1521/freepdb1```

The next step will be to run the .NET BELA Updater app on your to export your database schema. When you do that, you must pass that JDBC URL as a parameter, for example:
```
docker run ... juxhouse/bela-updater-oracle -jdbc "jdbc:oracle:thin:MyUser/MyPassword@//localhost:1521/freepdb1" ...
```

You are now ready for [step 2](/CodeSynchronization.md) (run the BELA Updater for Oracle).
