const select = <TElement extends HTMLElement>(selector: string) =>
  document.querySelector(selector) as TElement | null;

const selectAll = <TElement extends HTMLElement>(selector: string) =>
  [...document.querySelectorAll(selector)] as Array<TElement> | null;

const create = <TCollection extends HTMLCollection>(htmlString: string) => {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.children as TCollection;
};

function isObjKey<T>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj;
}

type TEachCallback<TObj> = (key: keyof TObj, value: TObj[keyof TObj]) => any;

const each = <TObj>(obj: TObj, callback: TEachCallback<TObj>) => {
  for (const [key, value] of Object.entries(obj)) {
    if (isObjKey(key, obj)) callback(key, value);
  }
};

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

HTMLElement.prototype.addClass = function (classes: string) {
  this.classList.add(classes);
  return this;
};

HTMLElement.prototype.removeClass = function (classes: string) {
  this.classList.remove(classes);
  return this;
};

HTMLElement.prototype.toggleClass = function (classes: string) {
  this.classList.toggle(classes);
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

Element.prototype.on = function (event: string, callback: () => void) {
  this.addEventListener(event, callback);
};

Element.prototype.click = function (callback: () => void) {
  this.on("click", callback);
};

const $ = {
  select,
  selectAll,
  create,
  each,
};

export default $;
