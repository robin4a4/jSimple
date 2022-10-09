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
}

export {};
