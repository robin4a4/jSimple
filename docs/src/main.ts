import $, { TSignal } from "@jsimple/core";
import { DOMRender } from "@jsimple/dom-render";
import { define, s, callback } from "@jsimple/custom-element";

@define("fancy-button")
export class FancyButton extends HTMLElement {
  @s(false) isOpenSignal: TSignal<boolean>;
  isOpen: typeof this.isOpenSignal[0];
  setIsOpen: typeof this.isOpenSignal[1];

  @callback
  handleClick() {
    this.setIsOpen(!this.isOpen());
  }

  connectedCallback() {
    this.html(`
    <div>
    <button type="button" $click="setIsOpen(!isOpen())">open</button>
    <div $display="isOpen()">lorem ipsum</div>
    </div>
    `);
  }
}

export class FancyButton2 extends HTMLElement {
  isOpen: TSignal<boolean>[0];
  setIsOpen: TSignal<boolean>[1];

  constructor() {
    super();
    [this.isOpen, this.setIsOpen] = $.signal(true);
  }

  handleClick() {
    this.setIsOpen(!this.isOpen());
  }

  connectedCallback() {
    this.html(`
    <div>
    <button type="button" $click="setIsOpen(!isOpen())">open2</button>
    <div $display="isOpen()">lorem ipsum 2</div>
    </div>
    `);
    DOMRender(
      {
        isOpen: this.isOpen,
        setIsOpen: this.setIsOpen,
        handleClick: this.handleClick,
      },
      this
    );
  }
}
customElements.define("fancy-button2", FancyButton2);

// type TExecuteEffect = () => void;
// type TObserver = { execute: TExecuteEffect };
// const globalContext: Array<TObserver> = [];

// const signal = function <TSignalValue>(
//   value: TSignalValue
// ): [() => TSignalValue, (newValue: TSignalValue) => void] {
//   const subscriptions = new Set<TObserver>();

//   const read = (): TSignalValue => {
//     const observer = globalContext[globalContext.length - 1];
//     if (observer) subscriptions.add(observer);
//     return value;
//   };
//   const write = (newValue: TSignalValue) => {
//     value = newValue;
//     for (const sub of [...subscriptions]) {
//       sub.execute();
//     }
//   };
//   return [read, write];
// };

// const effect = function (func: any) {
//   const observer: TObserver = {
//     execute() {
//       globalContext.push(this);
//       try {
//         func();
//       } finally {
//         globalContext.pop();
//       }
//     },
//   };

//   observer.execute();
// };

// const [isOpen, setIsOpen] = signal(false);
// const app = $.select("#app");
// const btn = $.select("#btn");
// if (app) {
//   effect(() => {
//     app.innerHTML = `
//     <div style='display: ${isOpen() ? "block" : "none"}'>
//       Lorem ipsum
//     </div>
// `;
//   });
//   btn?.onClick(() => {
//     setIsOpen(!isOpen());
//   });
// }
