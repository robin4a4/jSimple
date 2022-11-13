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

test("read signal", () => {
  const [signal] = $.signal(false);

  expect(signal()).toBe(false);
});

test("set signal", () => {
  const [signal, setSignal] = $.signal(false);
  setSignal(true);
  expect(signal()).toBe(true);
});

test("run effect", () => {
  const [value, setValue] = $.signal("value1");
  const button = document.createElement("button");
  button.addEventListener("click", () => {
    setValue("value2");
  });
  $.effect(() => (button.value = value()));
  button.click();
  expect(button.value).toBe("value2");
});
