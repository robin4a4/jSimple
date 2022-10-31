// @ts-ignore
import { tmpl } from "riot-tmpl";

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
    addClasses: (classes: string) => HTMLElement;
    removeClasses: (classes: string) => HTMLElement;
    toggleClasses: (classes: string) => HTMLElement;
    html: (html: string) => HTMLElement;
    empty: () => HTMLElement;
    on: (event: string, callback: () => void) => void;
    onClick: (callback: () => void) => void;
  }
}

/**
 * Type helpers
 */
type TExecuteEffect = () => void;
type TObserver = { execute: TExecuteEffect };

/**
 * jSimple methods
 */
const select = <TElement extends HTMLElement>(selector: string) =>
  document.querySelector<TElement>(selector);

const selectAll = <TElement extends HTMLElement>(selector: string) => [
  ...document.querySelectorAll<TElement>(selector),
];

const create = <TCollection extends HTMLCollection>(htmlString: string) => {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.children as TCollection;
};

/**
 * reactivity methods
 */

const globalContext: Array<TObserver> = [];

const signal = function <TSignalValue>(
  value: TSignalValue
): [() => TSignalValue, (newValue: TSignalValue) => void] {
  const subscriptions = new Set<TObserver>();

  const read = (): TSignalValue => {
    const observer = globalContext[globalContext.length - 1];
    if (observer) subscriptions.add(observer);
    return value;
  };
  const write = (newValue: TSignalValue) => {
    value = newValue;
    for (const sub of [...subscriptions]) {
      sub.execute();
    }
  };
  return [read, write];
};

const effect = function effect(func: any) {
  const execute: TExecuteEffect = () => {
    globalContext.push(observer);
    try {
      func();
    } finally {
      globalContext.pop();
    }
  };

  const observer: TObserver = {
    execute,
  };

  execute();
};

/**
 * New prototypes methods
 */
Array.prototype.first = function () {
  return this[0];
};

Array.prototype.last = function () {
  return this[this.length - 1];
};

NodeList.prototype.first = function () {
  return [...this][0];
};

NodeList.prototype.last = function () {
  return [...this][this.length - 1];
};

HTMLElement.prototype.addClasses = function (classes: string) {
  classes.split(" ").forEach((className) => {
    this.classList.add(className);
  });
  return this;
};

HTMLElement.prototype.removeClasses = function (classes: string) {
  classes.split(" ").forEach((className) => {
    this.classList.remove(className);
  });
  return this;
};

HTMLElement.prototype.toggleClasses = function (classes: string) {
  classes.split(" ").forEach((className) => {
    this.classList.toggle(className);
  });
  return this;
};

HTMLElement.prototype.html = function (html: string) {
  this.innerHTML = html;
  return this;
};

HTMLElement.prototype.empty = function () {
  this.innerHTML = "";
  return this;
};

HTMLElement.prototype.on = function (
  event: string,
  callback: (ev: Event) => void
) {
  this.addEventListener(event, (ev) => callback(ev));
};

HTMLElement.prototype.onClick = function (callback: () => void) {
  this.on("click", callback);
};

const $ = {
  select,
  selectAll,
  create,
  signal,
  effect,
};

/**
 * Reactive dom attribute
 *
 * TODO: manage open() native function and others
 */
export function DOMRender<TContext>(context: TContext, mount: HTMLElement) {
  let next = mount.firstChild as HTMLElement;
  let stop;
  while (next) {
    // @ts-ignore
    if ((stop = processNode<TContext>(next, context))) {
      // @ts-ignore
      next = stop.nextSibling;
      stop = undefined;
    } else next = DOMRender(context, next) || next.nextSibling;
  }
  return next;
}

function processNode<TContext>(el: HTMLElement, context: TContext) {
  const type = el.nodeType;

  // element
  if (type === 1) {
    for (const { name, value } of [...el.attributes]) {
      const jAttr = name.slice(2);
      const eventList = ["click", "mouseover", "mouseout", "change", "keydown"];
      if (eventList.find((eventName) => eventName === jAttr)) {
        el.addEventListener(jAttr, () => tmpl(`{${value}}`, context));
      }
      if (jAttr === "display") {
        $.effect(() => {
          el.style.display = tmpl(`{${value}}`, context) ? "block" : "none";
        });
      }
    }
  }
  // text node
  else {
    // @ts-ignore
    const text = el.data;
    if (tmpl.hasExpr(text)) {
      $.effect(() => {
        // @ts-ignore
        el.data = tmpl(text, context);
      });
    }
  }
}

export default $;
