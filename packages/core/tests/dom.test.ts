// @vitest-environment jsdom
import { expect, test } from "vitest";
import $ from "../src";

function domExample() {
  const div = document.createElement("div");
  div.innerHTML = `
    <label for="username">Username</label>
    <input id="username" />
    <button>Print Username</button>
  `;
  return div;
}

function eventExample() {
  const div = domExample();
  const button = div.querySelector("button");
  const input = div.querySelector("input");
  button?.addEventListener("click", () => {
    // let's pretend this is making a server request, so it's async
    // (you'd want to mock this imaginary request in your unit tests)...
    setTimeout(() => {
      const printedUsernameContainer = document.createElement("div");
      printedUsernameContainer.innerHTML = `
        <div data-testid="printed-username">${input?.value}</div>
      `;
      div.appendChild(printedUsernameContainer);
    }, Math.floor(Math.random() * 200));
  });
}

test.skip("select", () => {
  const div = domExample();
  expect($.select(".div")).toBe(div);
});

test.skip("selectAll", () => {
  const div = domExample();
  const div2 = domExample();
  expect($.selectAll(".div")).toBe([div, div2]);
});

const array = [1, 2];

test("first", () => {
  expect(array.first()).toBe(1);
});

test("last", () => {
  expect(array.last()).toBe(2);
});

test("add one class", () => {
  const div = domExample();
  div.addClasses("flex");
  expect(div.getAttribute("class")).toBe("flex");
});

test("add multiple classes and remove", () => {
  const div = domExample();
  div.addClasses("flex border");
  expect(div.getAttribute("class")).toBe("flex border");
  div.removeClasses("flex border");
  expect(div.getAttribute("class")).toBe("");
});

test("toggle class", () => {
  const div = domExample();
  div.toggleClasses("flex");
  expect(div.getAttribute("class")).toBe("flex");
  div.toggleClasses("flex");
  expect(div.getAttribute("class")).toBe("");
});
