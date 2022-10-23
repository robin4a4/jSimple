import $ from "@jsimple/core";

const app = $.select("#app");

const [open, setOpen] = $.signal(false);
$.select("button")?.onClick(() => setOpen(!open()));

const everyReactiveElements = document.querySelectorAll("[j-reactive]");
everyReactiveElements.forEach((reactiveEl) => {
  $.effect(() => {
    const signal = reactiveEl.getAttribute("j-reactive");
    if (signal) {
      const executedSignal = eval(signal);
      reactiveEl.html(executedSignal);
    }
  });
});

const everyShowElements = document.querySelectorAll("[j-display]");
everyShowElements.forEach((reactiveEl) => {
  $.effect(() => {
    const signal = reactiveEl.getAttribute("j-display");
    if (signal) {
      const executedSignal = eval(signal);
      reactiveEl.style.display = executedSignal ? "block" : "none";
    }
  });
});
