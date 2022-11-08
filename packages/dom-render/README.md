# @jsimple/dom-render

## Get started
To install the library enter the following command:

```
npm install @jsimple/dom-render
```

## Example

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
import $ from "@jsimple/core";
import { DOMRender } from "@jsimple/dom-render";

const [isOpen, setIsOpen] = $.signal(false);
DOMRender({isOpen, setIsOpen}, $.select("#app"))
```


## API

### DOMRender

This packages consists of a tree walker that add effects to rerender the dom.

The `DOMRender` function takes two arguments:
- a context object consiting of the variables and functions that are called in the dom.
- a mount element to identifiy wich part should be scanned

### Events

you can use `$click`, `$mouseover`, `$mouseout`, `$change`, `$keydown` to add event listeners to your elements.

### $display

defines the display style of an element.