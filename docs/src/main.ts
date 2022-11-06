// import { define, signal, callback } from "@jsimple/custom-element";

// @define("fancy-button")
// export class FancyButton extends HTMLElement {
//   @signal("bonjour") nameSignal: any;
//   @signal(true) isOpenSignal: any;
//   isOpen: any;
//   setIsOpen: any;

//   @callback
//   handleClick() {
//     console.log(this.isOpen());
//     this.setIsOpen(!this.isOpen());
//   }

//   connectedCallback() {
//     this.html(`
//     <div>
//     <button type="button" $click="setIsOpen(!isOpen())">{name()}</button>
//     <div $display="isOpen()">lorem ipsum</div>
//     </div>
//     `);
//   }
// }

import $ from "@jsimple/core";

const [isOpen, setIsOpen] = $.signal(false);
const app = $.select("#app");
const btn = $.select("#btn");

$.effect(() => {
  console.log("test");
});

btn?.onClick(() => {
  setIsOpen(!isOpen());
  console.log(isOpen());
});
