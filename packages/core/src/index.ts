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
    on: (event: string, callback: () => void) => void;
    onClick: (callback: () => void) => void;
  }

  export type TDiv = HTMLDivElement;
  export type TButton = HTMLButtonElement;
}

export default $;
