# jSimple
An small experimental library inspired by jQuery, Solidjs and @github/catalyst. It can't be used in production as it is not fully typesafe, tested and robust.

## Get started
To install the core library enter the following command:

```
npm install @jsimple/core
```

## API

### jSimple object

The `jSimple` object or its alias `$` host every utils method.

```
import $ from "@jsimple/core"
```

`$.select()`

Accepts a css selector and returns an `HTMLElement`.

`$.selectAll()`

Accepts a css selector and returns an `Array<HTMLElement>`.

`$.create()`

Accepts HTML as a string and returns an `HTMLCollection`.

`$.signal()`

Creates a signal that returns a getter and a setter functions. Allows to create reactive values.

`$.effect()`

Allows to rerun code after a signal has been updated.

### New javascript prototypes

`Array.prototype.first`

Retrieve the first element in an Array.

`Array.prototype.last`

Retrieve the last element in an Array.

`NodeList.prototype.first`

Retrieve the first element in a NodeList.

`NodeList.prototype.last`

Retrieve the last element in a NodeList.

`HTMLElement.prototype.addClass`

Add a class to an HTMLElement.

`HTMLElement.prototype.removeClass`

Remove a class to an HTMLElement.

`HTMLElement.prototype.toggleClass`

Toggle a class to an HTMLElement.

`HTMLElement.prototype.html`

Replace the content of an HTMLElement.

`HTMLElement.prototype.empty`

Empty the content of an HTMLElement.

`HTMLElement.prototype.on` 

Attach an event listener to an HTMLElement.

`HTMLElement.prototype.onClick`

Attach an click event listener to an HTMLElement.
