(Work in Progress)

## Running
- Generate classes for example-project:

  ```
  cd src/example-project
  mvn clean compile
  mvn clean install -Dparent.basedir=$(pwd)
  ```

- Create the Uber JAR:

  ``` 
  cd ../..
  mvn clean package
  ```

- Run the Uber JAR:

  ```
  java -jar target/bela.integrations.java.maven-1.0-SNAPSHOT.jar
  ```
