# Updating BELA with Your Ruby Projects


## 1. Prepare Your Project(s)

The BELA updater app for Ruby supports projects with standard Ruby conventions, including the presence of a `lib` or `app` directory.

Change into your project's folder and create the `.bela` folder, if necessary:

```
mkdir -p .bela
```


## 2. Run the Bela Updater

The bela-updater Docker app analyzes your Ruby projects and generates the `bela-update.ecd` file in the `.bela` folder.

> [!IMPORTANT]  
> It runs with `--network=none` for secure containment.

```bash
docker run --network=none \
  -v ./.bela:/.bela \
  -v ./:/workspace:ro \
  -v <<root-gems-path>>:/external_gems:ro \
  juxhouse/bela-updater-ruby \
    --source my-source \
    --parent-element-path service/my-service
```

### **Command Arguments**

#### `<<root-gems-path>>`

The root path for installed gems when using RVM or rbenv. It must be mounted as a volume.

You can get `root-gems-path` by running `Gem.path` inside `rails console` or `irb`.

You can also use `bundle show --paths` to retrieve the root path of the installed gems.

#### `--source`

This argument specifies the [source](/Concepts.md#sources) for the elements being uploaded. Normally, the repository name is used as the source. For example, in GitHub, you could use:
```bash
-source "$GITHUB_REPOSITORY"
```

#### `--parent-element-path`

This optional argument will import your projects' elements as contents to some parent element. If your project is the implementation of a microservice for example, you can import it inside that microservice, like this:
```
  -parent-element-path service/my-service
```

## 3. Upload to BELA

Once the updater has generated the `bela-update.ecd` file, follow the instructions in the [upload example](/updaters/reference/upload-example.md) to update BELA.
