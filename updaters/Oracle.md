# Access through JDBC

Make sure your Oracle database schema is accessible through a JDBC connection with a URL similar to the example below:

```jdbc:oracle:thin:MyUser/MyPassword@//localhost:1521/freepdb1```

The next step will be to run the .NET BELA Updater app on your to export your database sceham. When you do that, you must pass this JDBC URL as a parameter:
```
docker run ... juxhouse/bela-updater-oracle -jdbc "jdbc:oracle:thin:MyUser/MyPassword@//localhost:1521/freepdb1" ...
```

You are now ready to [go back](/CodeSynchronization.md) and run the BELA Updater for Oracle.
