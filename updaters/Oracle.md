# Access through JDBC

Make sure your Oracle database schema is accessible through a JDBC connection with a URL similar to the example below:

```jdbc:oracle:thin:MyUser/MyPassword@//localhost:1521/freepdb1```

This JDBC URL must be passed as a parameter for the `BELA_UPDATER` Docker app command:
```
docker run ... juxhouse/bela-updater-oracle -jdbc "jdbc:oracle:thin:MyUser/MyPassword@//localhost:1521/freepdb1" ...
```

The schema for this user, with all its objects, table columns and dependencies will be exported.

You are now ready to [go back](/CodeSynchronization.md) and run the BELA Updater for Oracle.
