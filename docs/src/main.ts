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
const btn = $.select<TButton>("#btn");

const [count, setCount] = $.signal(1);
const doubleCount = () => count() * 2;

$.effect(() => {
  btn.html(doubleCount());
});

btn.onClick(() => {
  setCount(count() + 1);
});
