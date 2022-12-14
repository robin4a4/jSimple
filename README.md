# jSimple
An small experimental library inspired by jQuery, Solidjs and @github/catalyst. It **can't be used in production** as it is not fully typesafe, tested and robust.

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

If you need to fetch data and cache it the fetcher package is here for you:

```
npm install @jsimple/fetcher
```

## Example

### Core
The core library includes a reactive system that makes building dom interaction easier.

```javascript
// Javascript file
import $ from "@jsimple/core";

const btn = $.select("#btn");
const container = $.select("#container");
const [isOpen, setIsOpen] = $.signal(false);

$.effect(() => {
  container?.html(`
    <div style='display: ${isOpen() ? "block" : "none"}'>
      Lorem ipsum
    </div>
  `);
});

btn?.onClick(() => {
    setIsOpen(!isOpen());
});

```

```html
<!-- HTML file-->
<button id="btn" type="button">open</button>
<div id="container"></div>
```

You can read more on this package here: [@jsimple/core](https://github.com/robin4a4/jSimple/tree/main/packages/core)

### DOM-render
Using the dom-render package you can simplify this markup like the following example. It is heavily inspired by Alpinejs.

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
DOMRender({isOpen, setIsOpen}, $.select("[data-define='app']"))
```

You can read more on this package here: [@jsimple/dom-render](https://github.com/robin4a4/jSimple/tree/main/packages/dom-render)

### Custom element
If you'd like to use the dom-render APIs in custom elements we provide decorators wrappers to abstract some of the plumbing:

```html
<!-- HTML file-->
<fancy-button></fancy-button>
```

```javascript
// Javascript file
import { define, s } from "@jsimple/custom-element";

@define("fancy-button")
export class FancyButton extends HTMLElement {
  @s(false) isOpenSignal: TSignal<boolean>;

  connectedCallback() {
    this.html(`
    <div>
      <button type="button" $click="setIsOpen(!isOpen())">open</button>
      <div $display="isOpen()">lorem ipsum</div>
    </div>
    `);
  }
}
```
If you'd like to use it without decorators you can do as follow:

```javascript
import $ from "@jsimple/core";
import { DOMRender } from "@jsimple/dom-render";

export class FancyButton extends HTMLElement {
  isOpen: TSignal<boolean>[0];
  setIsOpen: TSignal<boolean>[1];

  constructor() {
    super();
    [this.isOpen, this.setIsOpen] = $.signal(true);
  }

  connectedCallback() {
    this.html(`
    <div>
    <button type="button" $click="setIsOpen(!isOpen())">open</button>
    <div $display="isOpen()">lorem ipsum</div>
    </div>
    `);
    DOMRender(
      {
        isOpen: this.isOpen,
        setIsOpen: this.setIsOpen,
      },
      this
    );
  }
}
customElements.define("fancy-button", FancyButton);
```

You can read more on this package here: [@jsimple/custom-element](https://github.com/robin4a4/jSimple/tree/main/packages/custom-element)

### Fetcher

Using the fetcher package you can fetch and cache data easily.

```html
<!-- HTML file-->
<div data-define="component-with-data" class="component">
  <img src="./spinner.svg" $display="isLoading()" class="spinner" width=24 height=24 alt='spinner'/>
  <div $display="!isLoading()" class="card">
    <p class="font-bold uppercase text-14 text-slate-900">{data()?.name}</p>
    <span>{data()?.body}</span>
  </div>
</div>
```

```javascript
// Javascript file
import { run } from "@jsimple/dom-render";
import { GET, load } from "@jsimple/fetcher";

const getTodos = GET<TodoData>("https://jsonplaceholder.typicode.com/comments/1");

function ComponentWithData() {
  const { data, isLoading } = load(getTodos, ["keyString"]);
  return {
    data,
    isLoading,
  };
}
  
run([ComponentWithData]);
```

You can read more on this package here: [@jsimple/fetcher](https://github.com/robin4a4/jSimple/tree/main/packages/fetcher)