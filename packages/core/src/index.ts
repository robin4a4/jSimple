declare global {
  interface Array<T> {
    first: () => T;
    last: () => T;
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
export type TSignal<TSignalValue> = [
  () => TSignalValue,
  (newValue: TSignalValue) => void
];
type TExecuteEffect = () => void;
type TObserver = { execute: TExecuteEffect };

const globalContext: Array<TObserver> = [];

const signal = function <TSignalValue>(
  value: TSignalValue
): TSignal<TSignalValue> {
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

const effect = function (func: any) {
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

/**
 * Data fetching
 */
enum RequesterMethods {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}
enum RequesterType {
  Json = "JSON",
  Xml = "XML",
}
interface RequesterOptions {
  type: RequesterType;
  method?: RequesterMethods;
  headers: {
    Accept: string;
    "Content-Type": string;
    Authorization: string;
  };
  body?: string;
}
const jsonResponse = (response: Response) => response.json();
const xmlResponse = (response: Response) => response.text();

async function requester(url: string, options?: RequesterOptions) {
  const results: { content: Promise<any> | null; error: Error | null } = {
    content: null,
    error: null,
  }; // TODO: better type

  let resultFunction = jsonResponse;
  if (options?.type === RequesterType.Xml) resultFunction = xmlResponse;

  const response = await fetch(url, { method: "GET", ...options });
  if (response.ok) {
    results.content = await resultFunction(response);
  } else {
    results.error = new Error("server error");
  }
  return results;
}

function GET(url: string, options: RequesterOptions) {
  return requester(url, { method: RequesterMethods.Get, ...options });
}
function POST(url: string, options: RequesterOptions) {
  return requester(url, { method: RequesterMethods.Post, ...options });
}
function PUT(url: string, options: RequesterOptions) {
  return requester(url, { method: RequesterMethods.Put, ...options });
}
function DELETE(url: string, options: RequesterOptions) {
  return requester(url, { method: RequesterMethods.Delete, ...options });
}

/**
 * jSimple object definition
 */
const $ = {
  select,
  selectAll,
  create,
  signal,
  effect,
  fetch: {
    GET,
    POST,
    PUT,
    DELETE,
  },
};

export default $;
