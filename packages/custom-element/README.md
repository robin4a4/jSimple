# @jsimple/custom-element

## Get started
To install the library enter the following command:

```
npm install @jsimple/custom-element
```


## Example

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
If you would like to extract the click handler in a new method function, use the @callback decorator:

```javascript
import { define, signal, callback } from "@jsimple/custom-element";

@define("fancy-button")
export class FancyButton extends HTMLElement {
  @signal(false) isOpenSignal: any;
  isOpen: () => boolean
  setIsOpen: (newValue: boolean) => void

  @callback
  handleClick() {
    this.setIsOpen(!this.isOpen());
  }

  connectedCallback() {
    this.html(`
    <div>
      <button type="button" $click="handleClick()">open</button>
      <div $display="isOpen()">lorem ipsum</div>
    </div>
    `)
  }
}

```

## API

### @define

### @signal

### @callback

