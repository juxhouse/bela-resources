[**What can I do with BELA?**](#what-can-i-do-with-bela)

[**How can I understand a diagram in BELA?**](#how-can-i-understand-a-diagram-in-bela)

> [What boxes represent?](#what-boxes-represent)
>
> [Elements](#elements)
>
> [Modeled Elements](#modeled-elements)
>
> [Built Elements](#built-elements)
>
> [Containments](#containments)
>
> [What do the lines represent?](#what-do-the-lines-represent)
>
> [How can I view the legend?](#how-can-i-view-the-legend)
>
> [How does BELA's automatic layout work?](#how-does-belas-automatic-layout-work)
>
> [How can I browse different levels of structure?](#how-can-i-browse-different-levels-of-structure)

[**How can I see my code in BELA?**](#how-can-i-see-my-code-in-bela)

[**How can I model elements and dependencies?**](#how-can-i-model-elements-and-dependencies)

> [How can I create a modeled element?](#how-can-i-create-a-modeled-element)
>
> [How can I generate new elements using AI?](#how-can-i-generate-new-elements-using-ai)
>
> [How can I add a description to an element?](#how-can-i-add-a-description-to-an-element)
>
> [How can I generate a description using AI?](#how-can-i-generate-a-description-using-ai)
>
> [How can I delete a modeled element?](#how-can-i-delete-a-modeled-element)
>
> [How can I create a modeled dependency?](#how-can-i-create-a-modeled-dependency)
>
> [How can I change the meaning of a modeled dependency?](#how-can-i-change-the-meaning-of-a-modeled-dependency)
>
> [How can I delete a modeled dependency?](#how-can-i-delete-a-modeled-dependency)

[**How can I work with a diagram?**](#how-can-i-work-with-a-diagram)

> [How can I insert elements into a diagram?](#how-can-i-insert-elements-into-a-diagram)
>
> [How can I remove an element from a diagram?](#how-can-i-remove-an-element-from-a-diagram)
>
> [How can I open an element in a new diagram?](#how-can-i-open-an-element-in-a-new-diagram)
>
> [How can I browse an element?](#how-can-i-browse-an-element)
>
> [How can I zoom in and out?](#how-can-i-zoom-in-and-out)
>
> [How can I move the entire diagram around the screen?](#how-can-i-move-the-entire-diagram-around-the-screen)
>
> [How can I create a sticky note?](#how-can-i-create-a-sticky-note)
>
> [How can I ungroup modeled elements?](#how-can-i-ungroup-modeled-elements)

[**How to manage diagrams?**](#how-to-manage-diagrams)

> [How can I create a new diagram?](#how-can-i-create-a-new-diagram)
>
> [How can I find previously created diagrams?](#how-can-i-find-previously-created-diagrams)
>
> [How can I rename a diagram?](#how-can-i-rename-a-diagram)
>
> [How can I duplicate a diagram?](#how-can-i-duplicate-a-diagram)
>
> [How can I delete a diagram?](#how-can-i-delete-a-diagram)

# What can I do with BELA?

BELA enables you to browse both **built** and **modeled** elements.

**Built** elements and dependencies are **extracted automatically** from your source code. They are represented in the diagram by **black** lines and text on a **blue** background.

**Modeled** elements and dependencies are the ones **you create manually in BELA** when doing high-level architecture or planning future changes to your software. They are represented by **dark green** lines and text on a white background.

**Cyan lines** represent **modeled dependencies**.

<img src="assets/image30.png" style="width:6.26772in;height:7.80556in" />

<img src="assets/image13.png" style="width:6.26772in;height:5.76389in" />

# How can I understand a diagram in BELA?

## What boxes represent?

A box represents an element or container.

### Elements

Elements are the nouns that compose software structure: projects, classes, methods, etc.

Each Element has a type, shown in \[brackets\].

Element type examples: domain, system, project, service, component, namespace, package, interface, class, function, method, field, database, bucket, table, data-set, endpoint, topic, queue, etc.

You can create your own element types.

<img src="assets/image23.png" style="width:6.26772in;height:3.29167in" />

### Modeled Elements

Modeled elements are manually created (modeled) in BELA and do not exist in your production artifacts. They are useful for modeling third-party systems and exploring future plans for your software.

You can change their name, type, description, and other attributes at will.

Element names can be user-friendly and don't need to be unique. They can include UTF-8 characters, including emojis and spaces.

### Built Elements

Built elements refer to elements that actually exist in your production artifacts and are synced to BELA. They cannot be individually deleted or altered (only augmented) by users.

### Containments

An element can contain other elements, forming an arbitrarily deep containment hierarchy.

For example, a project can contain a package, which can contain a class, which can contain a method.

<img src="assets/image24.png" style="width:6.26772in;height:4.97222in" />

## What do the lines represent?

The lines connecting elements represent **dependencies**. Any element can depend on any other element.

By convention, elements depend on elements that are **below** them.

In this example, the `webapp` package depends on the `Booking` and `FlightSearch` classes.

They, in turn, depend on the `Databases` grouping.

<img src="assets/image26.png" style="width:6.26772in;height:7.625in" />

## How can I view the legend?

You can use the Diagram Legend tool (question-mark icon in the bottom-left corner) to see the colors and styles used to display different ECDs.

Click the question-mark icon (?) in the bottom-left corner to open the legend.

<img src="assets/image9.gif" style="width:6.26772in;height:4.06944in" />

## How does BELA's automatic layout work?

You don’t need to waste time organizing objects when you show them on the diagram.

BELA automatically adjusts the layout to fit elements on the screen and ensure they are positioned correctly, respecting the dependency convention. When there is a dependency from element A to element B, BELA will automatically try to position A further up and B further down.

<img src="assets/image12.gif" style="width:6.26772in;height:4.06944in" />

## How can I browse different levels of structure?

Double-click a container to reveal the elements inside it. If there are other containers inside, you can double-click them to reveal their contents.

To collapse a container that has been previously opened, double-click it again.

<img src="assets/image31.gif" style="width:6.26772in;height:4.06944in" />

# How can I see my code in BELA?

See [Code Synchronization](CodeSynchronization.md)

## Synchronize a Code Repository

These are the steps to update your BELA instance with the [architecture data](/Concepts.md#ecds) from your software project. Only metadata down to method/function/field name level is sent. The actual lines of code are not.

If you set this up as a repository action or as an optional step after your main CI/CD pipeline has completed, BELA will always be in sync with your latest code.

### 1. Build Your Project

Check out your project and `cd` into it, if necessary.
```
cd my-project
```

Create the `.bela` folder if it does not already exist.
```
mkdir -p .bela
```

Build your project according to its language and build tool:
 - [C#](/updaters/.NET.md)
 - [Clojure](/updaters/Clojure.md)
 - [Java (Maven)](/updaters/Java-Maven.md)
 - [Java (Gradle)](/updaters/Java-Gradle.md)
 - [Java (other build tools)](/updaters/Java-Other.md)
 - [Javascript](/updaters/Typescript.md)
 - [Oracle Schema](/updaters/Oracle.md)
 - Powerbuilder ([get in touch](/README.md#contact-us))
 - Ruby ([get in touch](/README.md#contact-us))
 - [Typescript](/updaters/Typescript.md)

If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly. You can also hire BELA developers to build that integration for you.

### 2. Run the BELA Updater Docker App

It will analyse your project and produce the `.bela/bela-update.ecd` file with [architecture data](/Concepts.md#ecds) that will be sent to BELA in the following step. Only metadata down to method/function/field name level is sent. The actual lines of code are not.

Set the `BELA_UPDATER` environment variable to the appropriate docker image for your language below. These images can be downloaded anonymously, without a token. You are authorized to execute them only to generate data to be sent to a licensed BELA instance. You are not licensed to read their contents or use them for any other purpose.

| Language | Command |
|----------|-------------------------|
| C# | `BELA_UPDATER=juxhouse/bela-updater-dotnet` |
| Clojure | `BELA_UPDATER=juxhouse/bela-updater-clojure` |
| Java | `BELA_UPDATER=juxhouse/bela-updater-java` |
| Javascript | `BELA_UPDATER=juxhouse/bela-updater-typescript` |
| Oracle | `BELA_UPDATER=juxhouse/bela-updater-oracle` |
| Typescript | `BELA_UPDATER=juxhouse/bela-updater-typescript` |

If your language is not supported, you can use a code analysis tool for your language and call BELA's [generic API](API.md) directly. You can also hire BELA developers to build that integration for you.

Run the `BELA_UPDATER` Docker app:
```
docker run --network=none --pull=always \
           -v ./.bela:/.bela \
           -v ./:/workspace:ro \
           $BELA_UPDATER \
           -source my-source \
           -parent-element-path service/my-service
```
It will analyse your project and produce the `.bela/bela-update.ecd` file with the [architecture data](/Concepts.md#ecds) you will upload to BELA.

> [!IMPORTANT]
> This container runs with `--network=none` and your project folder is mounted with `:ro` (read-only mode) for secure containment.

#### Arguments

##### -source

This argument indicates the [source](/Concepts.md#sources) for the elements being uploaded. Normally the name of the repo is used as source. In Github that would be `"$GITHUB_REPOSITORY"`, for example.

##### -parent-element-path (Optional)

This optional argument will export your projects' elements as the contents of some parent element. If your project is the implementation of a microservice for example, you can export it like this:
```
  -parent-element-path service/my-service
```
You can also use [diagram-as-code](updaters/reference/upload-example.md#uploading-diagrams-as-code) to give each of your projects a custom parent element.


## How can I upload the ECD file to BELA manually?

<img src="assets/image20.gif" style="width:6.26772in;height:4.06944in" />

## How can I upload the ECD file to BELA automatically?

To upload to a BELA backend running anonymously on your local machine:

```
curl -f 'http://localhost:8081/api/ecd-architecture' \
     --data-binary @.bela/bela-update.ecd
```

To upload to a remote BELA backend:

```
curl -f -k 'https://$BELA_HOST/api/ecd-architecture' \
     -H 'Authorization: $BELA_API_TOKEN' \
     --data-binary @.bela/bela-update.ecd
```

You can obtain your `BELA_API_TOKEN` from `BELA Main Menu > Sources > Use API`.

<img src="assets/image2.gif" style="width:6.26772in;height:4.06944in" />

## How can I upload diagrams as code?

Run the following command in your CICD pipeline to allow any project to have a `.bela/diagram-as-code.ecd` file with "hard coded" diagram elements.

```
if [ -f .bela/diagram-as-code.ecd ]; then
  curl -f 'https://$BELA_HOST/api/ecd-architecture' \
       -H 'Authorization: $BELA_API_TOKEN' \
       --data-binary @.bela/diagram-as-code.ecd
fi
```

> [!IMPORTANT]
> Diagram-as-code is a technique that produces diagram code that is brittle and redundant with your production code. Use this only in exceptional cases. It is often better to simply use the BELA UI to model these cases.

# How can I model elements and dependencies?

## How can I create a modeled element?

Right-click on a point in the diagram where you would like to create a new element. If you click inside a container, the new element will be created inside it.

Choose the “Create element” option from the menu that appears.

Enter the name, type, and description of the element on the upper-right panel.

<img src="assets/image28.gif" style="width:6.26772in;height:4.06944in" />

## How can I generate new elements using AI?

You can use AI to generate new elements automatically.

Right-click on a point in the diagram where you would like to create the new elements.

Choose the “Generate contents” option from the menu that appears.

Specify the type of elements you would like the AI to generate. In the example below, the user asks the AI to generate classes for a given package.

The AI uses the name of the package and the general context to generate classes that fit the purpose of the package.

<img src="assets/image22.gif" style="width:6.26772in;height:4.06944in" />

## How can I add a description to an element?

Click on the element and edit the description in the upper-right panel.

<img src="assets/image1.gif" style="width:6.26772in;height:4.06944in" />

## How can I generate a description using AI?

Click on the element, then click the AI icon at the end of the description field in the upper-right panel.

<img src="assets/image21.gif" style="width:6.26772in;height:4.06944in" />

## How can I delete a modeled element?

Right-click on the element and choose the “Delete element…” option from the menu.

<img src="assets/image15.gif" style="width:6.26772in;height:4.06944in" />

## How can I create a modeled dependency?

Click on the element to select it. Then drag the arrow at the bottom of the element to the other element it should depend on.

In the example below, we want **PassengerRecord** to depend on **BoardingPass**. So we drag the arrow from **PassengerRecord** to **BoardingPass**.

<img src="assets/image16.gif" style="width:3.93787in;height:2.83239in" />

## How can I change the meaning of a modeled dependency?

You can add more details about the meaning of a dependency.

Right-click on the dependency and choose the appropriate meaning from the menu.

<img src="assets/image8.gif" style="width:6.26772in;height:4.06944in" />

## How can I delete a modeled dependency?

Right-click on the dependency and choose the “Delete” option from the menu.

<img src="assets/image3.gif" style="width:6.26772in;height:4.06944in" />

# How can I work with a diagram?

## How can I insert elements into a diagram?

Right-click on the diagram and select the “Insert element…” option from the menu.

Type the name of the element you want to insert into the diagram.

<img src="assets/image14.gif" style="width:6.26772in;height:4.06944in" />

## How can I remove an element from a diagram?

Right-click on the element and choose the “Remove from Diagram” option.

The element will only be removed from the diagram. It will not be deleted, which means it can be reinserted into the diagram or appear in other diagrams.

<img src="assets/image17.gif" style="width:6.26772in;height:4.06944in" />

## How can I open an element in a new diagram?

You can easily create a new diagram that contains only the selected element.

Right-click on the element and select the “Open in New Diagram” option.

<img src="assets/image5.gif" style="width:6.26772in;height:4.06944in" />

## How can I browse an element?

You can create a diagram that contains only the selected element, its immediate dependencies, and the elements that immediately depend on it.

Right-click on the element and select the “Browse” option.

<img src="assets/image10.gif" style="width:6.26772in;height:4.06944in" />

## How can I zoom in and out?

To zoom in and out, use the magnifying glass buttons in the bottom-right corner, or use the mouse wheel.

<img src="assets/image25.gif" style="width:6.26772in;height:4.06944in" />

## How can I move the entire diagram around the screen?

Press and hold the right mouse button, then move the mouse to drag the diagram around the screen.

<img src="assets/image11.gif" style="width:6.26772in;height:4.06944in" />

## How can I create a sticky note?

Right-click on the element you want to attach the sticky note to. Then select the “Create Sticky Note” option from the menu.

<img src="assets/image18.gif" style="width:6.26772in;height:4.06944in" />

## How can I ungroup modeled elements?

Right-click on a container and select the “Ungroup…” option from the menu.

<img src="assets/image29.gif" style="width:6.26772in;height:4.06944in" />

# How to manage diagrams?

## How can I create a new diagram?

Click on the BELA logo in the upper-left corner and select the “New” option from the menu.

<img src="assets/image7.gif" style="width:6.26772in;height:4.06944in" />

## How can I find previously created diagrams?

Click on the magnifying glass icon near the BELA logo in the upper-left corner. Enter the name of the diagram you are looking for.

<img src="assets/image19.gif" style="width:6.26772in;height:4.06944in" />

## How can I rename a diagram?

Click on the name of the diagram in the upper-left corner to rename it.

<img src="assets/image27.gif" style="width:6.26772in;height:4.06944in" />

## How can I duplicate a diagram?

Click on the BELA logo in the upper-left corner and select the “Duplicate” option from the menu.

<img src="assets/image6.gif" style="width:6.26772in;height:4.06944in" />

## How can I delete a diagram?

Click on the BELA logo in the upper-left corner and select the “Delete…” option from the menu. Confirm by entering the name of the diagram.

<img src="assets/image4.gif" style="width:6.26772in;height:4.06944in" />
