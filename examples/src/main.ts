import $, { TSignal } from "@jsimple/core";
import { DOMRender } from "@jsimple/dom-render";
import { define, s, callback } from "@jsimple/custom-element";

const btn1 = $.select("#btn1");
const svg1 = $.select("#svg1");
const card1 = $.select("#card1");
const [isOpen1, setIsOpen1] = $.signal(false);
const [isLoading1, setIsLoading1] = $.signal(false);

$.effect(() => {
  if (card1) {
    card1.style.display = isOpen1() ? "block" : "none";
  }
  if (svg1) {
    svg1.classList.toggle("hidden", !isLoading1());
  }
});

btn1?.onClick(() => {
  setIsLoading1(true);
  setTimeout(() => {
    setIsOpen1(!isOpen1());
    setIsLoading1(false);
  }, 1000);
});

const [isOpen2, setIsOpen2] = $.signal(false);
const [isLoading2, setIsLoading2] = $.signal(false);

const toggleCard = () => {
  setIsLoading2(true);
  setTimeout(() => {
    setIsOpen2(!isOpen2());
    setIsLoading2(false);
  }, 1000);
};

DOMRender(
  { isOpen2, setIsOpen2, isLoading2, setIsLoading2, toggleCard },
  $.select("#section2")!
);

@define("fancy-toggle")
export class FancyToggle extends HTMLElement {
  @s(false) isOpenSignal: TSignal<boolean>;
  @s(false) isLoadingSignal: TSignal<boolean>;
  isOpen: typeof this.isOpenSignal[0];
  setIsOpen: typeof this.isOpenSignal[1];
  isLoading: typeof this.isLoadingSignal[0];
  setIsLoading: typeof this.isLoadingSignal[1];

  @callback
  toggleCard() {
    this.setIsLoading(true);
    setTimeout(() => {
      this.setIsOpen(!this.isOpen());
      this.setIsLoading(false);
    }, 1000);
  }

  connectedCallback() {
    this.html(`
      <div class="border border-gray-200 rounded-md flex flex-col gap-16 justify-center items-center p-32 my-16">
        <button $click="toggleCard()" class="btn" type="button">
          open card
          <svg $display="isLoading()" class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg>
        </button>
        <div $display="isOpen()" class="shadow-md border border-gray-200 rounded-md w-[300px] overflow-hidden">
          <img class="w-full h-96 object-cover" src="https://images.unsplash.com/photo-1667693790254-cf2fda33c8bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3132&q=80">
          <div class="p-16 text-slate-700">
            <p class="font-bold uppercase text-14 text-slate-900">Title</p>
            Loren ipsun dolor sit anet, consectetur adipisci elit, sed eiusnod tenpor incidunt ut labore et dolore nagna aliqua. Ut enin ad ninin venian, quis nostrun exercitationen ullan corporis suscipit laboriosan.
          </div>
        </div>
      </div>
    `);
  }
}
