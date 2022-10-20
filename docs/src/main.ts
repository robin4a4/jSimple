import $ from "jsimple";

const app = $.select("#app");
// const [isOpen, setIsOpen] = $.signal(false);

// class OverEngineeredButton extends HTMLButtonElement {
//   constructor() {
//     super();
//     const defaultText = "Button !";
//     const [content, setContent] = $.signal(defaultText);

//     this.addClasses(
//       "h-48 px-16 flex items-center justify-center bg-purple-500 text-white rounded hover:bg-purple-400"
//     );

//     $.effect(() => {
//       this.html(content());
//     });

//     this.onClick(() => {
//       setContent("loading !");
//       setTimeout(() => {
//         setContent(defaultText);
//       }, 1000);
//     });
//   }
// }

// customElements.define("fancy-button", OverEngineeredButton, {
//   extends: "button",
// });

// $.effect(() => {
//   app.html(`
//   <div>
//     <button is="fancy-button"></button>
//   </div>
// `);

//   $.select("#btn").onClick(() => {
//     setIsOpen(!isOpen());
//   });
// });

const [open, setOpen] = $.signal(false);
$.select("button").onClick(() => setOpen(!open()));

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
