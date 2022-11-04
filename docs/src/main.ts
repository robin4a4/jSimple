import { define, signal, callback } from "@jsimple/custom-element";

@define("fancy-button")
export class FancyButton extends HTMLElement {
  @signal nameSignal: any;
  @signal isOpenSignal: any;

  @callback
  handleClick() {
    this.setIsOpen(!this.isOpen());
  }

  connectedCallback() {
    this.html(`
    <div>
    <button type="button" $click="handleClick()">test</button>
    <div $display="isOpen()">lorem ipsum</div>
    </div>
    `);
  }
}
