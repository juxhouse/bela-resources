# BELA "How To"

This is a list of essential, non-obvious BELA features.

> [!TIP]
> This page will not waste your time with obvious features. Reading it will make your life easier and happier.

## Non-Obvious Mouse Button Actions

 - **Double-click on element:** expand/collapse element, to display its contents.
 - **Right-click on element:** Open element menu.
 - **Right-click on diagram background:** Open diagram menu.
 - **Right-click on dependency line:** Open dependency menu.
 - **Drag element:** Move element in or out of a container or simply move it to nudge the automatic layout.
 - **Right-drag:** Scroll diagram in all directions.
 - **Mouse wheel:** Zoom in/out (like Google maps).

If you’re not using a standard 2-button mouse, check how your pointing device maps these actions. On Mac trackpads, for example, a two-finger tap acts as right-click, while a soft press and two-finger drag scrolls the diagram.

## Diagram Legend

There is a question-mark icon on the bottom-left of the screen. It opens a pop-up key to BELA's graphical elements.

## Disabled Buttons and Menu Actions

Every time you see a disabled button or menu action, you can hover over it to see **WHY** that item is disabled.

## Search

When searching for diagrams or elements, you can type a fragment of their name and type.

Typing: `Person` will return:
  - `getPerson() [method]`
  - `PersonController [class]`
  - `PersonImpl [class]`

you can use an asterisk `*` to represent any part of the name and type.

Typing: `Pers*[cla` will return:
  - `PersonController [class]`
  - `PersonImpl [class]`

You can use the `only modeled` icon 🎨 in the search field to search only for [modeled](https://github.com/juxhouse/bela-resources/blob/main/Concepts.md#built-vs-modeled) diagrams and elements.
