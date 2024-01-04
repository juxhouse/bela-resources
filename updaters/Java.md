# Updating BELA with Elements from your Java Projects

## 1. Build Your Projects

`mvn clean package`

If you are using `Gradle` or some other build tool, build your project normally and use your build tool to generate a `pom.xml` file.

## 2. Run the Bela Updater

The bela-updater docker app analyses the projects in your repo and generates the bela-update.json file.

It runs with network=none for secure containment.

```
docker run --network=none \
           -v ./:/workspace/ \
           -v ~/.m2:/root/.m2 \
           juxhouse/bela-updater -source "$GITHUB_REPOSITORY"
```

## 3. Upload to BELA
curl "https://${{ secrets.BELA_HOST  }}/architecture" --fail \
     -H "Authorization: ${{ secrets.BELA_TOKEN }}" \
     -H "Content-Type: application/json" \
     --data @bela-update.json
