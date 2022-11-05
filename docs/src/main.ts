import { define, signal, callback } from "@jsimple/custom-element";

@define("fancy-button")
export class FancyButton extends HTMLElement {
  @signal("bonjour") nameSignal: any;
  @signal(false) isOpenSignal: any;

  @callback
  handleClick() {
    this.setIsOpen(!this.isOpen());
  }

  connectedCallback() {
    this.innerHTML = `
    <div>
    <button type="button" $click="handleClick()">{name()}</button>
    <div $display="isOpen()">lorem ipsum</div>
    </div>
    `;
  }
}
