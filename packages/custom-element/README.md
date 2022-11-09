# @jsimple/custom-element

## Get started
To install the library enter the following command:

```
npm install @jsimple/custom-element
```

## Example

If you'd like to use the dom-render APIs in custom elements we provide decorator wrappers to abstract some of the plumbing:

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
If you'd like to use it without decorators you can do as follows:

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


## API

### @define

This decorator defines the custom element using the name given in argument.

The most important feature is that it calls a `DOMRender` function with every signal and callback so that you don't have to write it and call it.

 It also adds a `data-define` attribute that blocks a potential parent DOMRender walker to let the one in the custom element taking over. It means that you can call a defined custom element in a snippet that is already walked by the tree walker:

 ```html
<div id="mount">
  <custom-element></custom-element>
</div>
 ```

```typescript
@define("custom-element")
export class CustomElement extends HTMLElement {
  ...
}

DOMRender(
  {},
  $.select('#mount')
);
```

### @s

Decorator that creates a signal using `$.signal()` under the hood:

```typescript
@s(defaultValue) myVarSignal: TSignal<typeof defaultValue>
```

The signal name has to be prefixed by `Signal`. JSimple will derive a getter and a setter functions from this name with the following format: `myVarSignal -> [myVar, setMyVar]` and add them to the class as properties using `Object.defineProperty()`. Unfortunately, typescript asks for every property to be defined manually in the class so if you want to use then outside a dom definition you will have to define them under the signals:

```typescript
@define("custom-element")
export class CustomElement extends HTMLElement {
  @s(false) myVarSignal: TSignal<boolean>
  myVar: typeof myVarSignal[0]

  connectedCallback() {
    console.log(this.myVar())) // for this to work without typescript erroring you'll have to define myVar under the signal definition
  }
}
```

### @callback

The callback decorator helps the `@define` decorator understand what method to subscribe to the DOMRender function.

If you want to use a `openModal()` method in the dom using the reactive system you'll have to assign it as a `@callback`:

```typescript
@define("custom-element")
export class CustomElement extends HTMLElement {

  @callback  
  openModal() {
    console.log('open !')
  }

  connectedCallback() {
    this.html(`
      <button $click="openModal()" type="button">open modal</button>
    `)
  }
}
```
