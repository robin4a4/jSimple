import $ from "./core";

declare global {
  interface Array<T> {
    first: () => Node;
    last: () => Node;
  }
  interface NodeList {
    first: () => Node;
    last: () => Node;
  }
  interface HTMLElement {
    addClass: (classes: string) => HTMLElement;
    removeClass: (classes: string) => HTMLElement;
    toggleClass: (classes: string) => HTMLElement;
    html: (html: string) => HTMLElement;
    empty: () => HTMLElement;
  }
  interface Element {
    on: (event: string, callback: () => void) => void;
    click: (callback: () => void) => void;
  }
}

export default $;
