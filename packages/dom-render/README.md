# @jsimple/dom-render

## Get started
To install the library enter the following command:

```
npm install @jsimple/dom-render
```

## Example

```html
<!-- HTML file-->
<div data-define="app-component">
  <button id="btn" type="button" $click="setIsOpen(!isOpen())">open</button>
  <div $display="isOpen()">lorem ipsum</div>
</div>
```
```javascript
// Javascript file
import $ from "@jsimple/core";
import { DOMRender } from "@jsimple/dom-render";

function AppComponent() {
  const [isOpen, setIsOpen] = $.signal(false);
  return {isOpen, setIsOpen}
}

run([AppComponent])
```

or without the run function:

```javascript
// Javascript file
import $ from "@jsimple/core";
import { DOMRender } from "@jsimple/dom-render";

const [isOpen, setIsOpen] = $.signal(false);
DOMRender({isOpen, setIsOpen}, $.select("#app"))
```


## API

### DOMRender()

This packages consists of a tree walker that adds effects to rerender the dom.

The `DOMRender` function takes two arguments:
- a context object consisting of the variables and functions that are called in the dom.
- a mount element to identify which part should be scanned. To avoid walking multiple times the same tree if there are multiple DOMRender function running, you must add a data-define attribute to your mount element. It will stop a higher DOMRender tree walker and let the new one take over.

### run()

The run function takes an array of component functions and applies DOMRender() to each of the functions by auto-selecting the mount element by deriving it from the function name.

```html
<div data-define="my-fancy-component">
  <div data-define="my-second-fancy-component"></div>
</div>
<div data-define="my-third-fancy-component"></div>
```

```javascript
import $ from "@jsimple/core";
import { DOMRender } from "@jsimple/dom-render";

function MyFancyComponent() {
  ...
  return {...}
}
function MySecondFancyComponent() {
  ...
  return {...}
}
function MyThirdFancyComponent() {
  return {...}
}

run([MyFancyComponent, MySecondFancyComponent, MyThirdFancyComponent])
```

If you plan to minify your code you'll have to set the esbuild option `keepNames` to true as the code needs the real function name to infer the component to be walked.

### Events

you can use `$click`, `$mouseover`, `$mouseout`, `$change`, `$keydown` to add event listeners to your elements.

### $display

defines the display style of an element.