import $ from "jsimple-core";

const [isOpen, setIsOpen] = $.signal(false);

$.effect(() => {
  const app = $.select("#app");
  const btn = $.select("#btn");

  app.html(`
  <div>
    <button id="btn" type="button">open</button>
    <div class="card" style='display: ${isOpen() ? "block" : "none"}'>
      Lorem ipsum
    </div>
  </div>
`);

  btn.onClick(() => {
    setIsOpen(!isOpen());
  });
});
