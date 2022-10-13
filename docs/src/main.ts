import "./style.css";
import typescriptLogo from "./typescript.svg";
import { setupCounter } from "./counter";
import $ from "jsimple-core";

$.select<TDiv>("#app")!.html(
  `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`
);

setupCounter($.select<TButton>("#counter")!);

let reactiveValues = { count: 5 };
let target = null;

class Dep {
  constructor() {
    this.subscribers = [];
  }

  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }

  notify() {
    this.subscribers.forEach((sub) => sub());
  }
}

Object.keys(reactiveValues).forEach((key) => {
  let internalValue = reactiveValues[key];
  const dep = new Dep();

  Object.defineProperty(reactiveValues, key, {
    get() {
      dep.depend();
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal;
      dep.notify();
    },
  });
});

function watcher(func) {
  target = func;
  target();
  target = null;
}

watcher(() => {
  reactiveValues.doubleCount = reactiveValues.count * 2;
});

$.select<TButton>("#btn")
  .html(reactiveValues.doubleCount)
  .onClick((ev) => {
    reactiveValues.count++;
    ev.target.html(reactiveValues.doubleCount);
  });
