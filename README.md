# jSimple
A small library inspired by jQuery and Solidjs.

## Get started
To install the core library enter the following command:

```
npm install @jsimple/core
```

To install the additional dom rendering library enter the following command:

```
npm install @jsimple/dom-render
```

To install the additional custom element library enter the following command:

```
npm install @jsimple/custom-element
```


## Example

### Core
The core library includes a reactive system that makes building dom interaction easier.

```javascript
import $ from "@jsimple/core";

const [isOpen, setIsOpen] = $.signal(false);

$.effect(() => {
  const app = $.select("#app");
  const btn = $.select("#btn");

  app.html(`
  <div>
    <button id="btn" type="button">open</button>
    <div style='display: ${isOpen() ? "block" : "none"}'>
      Lorem ipsum
    </div>
  </div>
`);

  btn.onClick(() => {
    setIsOpen(!isOpen());
  });
});

```

### DOM-render
Using the dom-render package you can simplify this markup like the following example. It is heavily inspired by Alpinejs.

```html
<!-- HTML file-->
<div id="app">
  <button id="btn" type="button" $click="setIsOpen(!isOpen())">open</button>
  <div $display="isOpen()">lorem ipsum</div>
</div>
```

```javascript
// Javascript file
import { DOMRender } from "@jsimple/dom-render";

const [isOpen, setIsOpen] = $.signal(false);
DOMRender({isOpen, setIsOpen}, $.select("#app"))
```

### Custom element
If you'd like to use the dom-render APIs in custom elements we provide decorators wrappers to abstract some of the plumbing:

```html
<!-- HTML file-->
<fancy-button></fancy-button>
```

```javascript
// Javascript file
import { define, signal } from "@jsimple/custom-element";

@define("fancy-button")
export class FancyButton extends HTMLElement {
  @signal(false) isOpenSignal: any;

  connectedCallback() {
    this.innerHTML = `
    <div>
      <button type="button" $click="setIsOpen(!isOpen())">open</button>
      <div $display="isOpen()">lorem ipsum</div>
    </div>
    `;
  }
}
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
