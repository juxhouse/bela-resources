# Updating BELA with your TS and JS Projects

## 1. Preparation: Install Dependencies

Make sure your project has its dependencies installed. You can skip this step if your dependencies are already installed.

```sh
  npm ci
```

## 2. Run the Bela Updater

The bela-updater docker app analyses your project and generates the `bela-update.ecd` file.

> [!IMPORTANT]
> It runs with network=none for secure containment.

```sh
docker run --network=none --pull=always \
                     -v ./.bela:/.bela \
                     -v ./:/workspace:ro \
                     juxhouse/bela-updater-typescript -source my-source \
                     -parent-element-path service/my-service
```

#### `-source`

This argument indicates the [source](/Concepts.md#sources) for the elements being uploaded. Normally the name of the repo is used as source. In Github that would be `"$GITHUB_REPOSITORY"`, for example.


#### `-parent-element-path`  

This optional argument will import your projects' elements as contents to some parent element. If your project is the implementation of a microservice for example, you can import it inside that microservice, like this:
```
  -parent-element-path service/my-service
```
Your projects can also have [custom parent elements](reference/Custom-Parent-Elements.md).

## 3. Upload the generated `bela-update.ecd` file to BELA

To upload it to a BELA container running on your local machine:
```
curl -f "http://localhost:8081/api/ecd-architecture" \
     --data-binary @.bela/bela-update.ecd
```

To upload it to a remote BELA service:
```
curl -f "https://$BELA_HOST/api/ecd-architecture" \
     -H "Authorization: $BELA_API_TOKEN" \
     --data-binary @.bela/bela-update.ecd
```

You can obtain your `BELA_HOST` and `BELA_API_TOKEN` from the BELA web app.
