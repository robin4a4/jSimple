import $, { TSignal } from "@jsimple/core";
import { run } from "@jsimple/dom-render";
import { define, signal, callback } from "@jsimple/custom-element";
import { GET, load } from "@jsimple/fetcher";

type TodoData = {
  id: number;
  name: string;
  body: string;
  userId: number;
};

const getTodos = GET<TodoData>(
  "https://jsonplaceholder.typicode.com/comments/1"
);

function ComponentWithData() {
  const { data, isLoading } = load(getTodos, ["keyString"]);
  return {
    data,
    isLoading,
  };
}

run([ComponentWithData]);

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

function CardComponent() {
  const [isOpen2, setIsOpen2] = $.signal(false);
  const [buttonBg, setButtonBg] = $.signal("bg-red-500");
  const [isLoading2, setIsLoading2] = $.signal(false);

  const toggleCard = () => {
    setIsLoading2(true);
    setButtonBg("bg-green-500");
    setTimeout(() => {
      setIsOpen2(!isOpen2());
      setIsLoading2(false);
      setButtonBg("bg-red-500");
    }, 1000);
  };

  return {
    isOpen2,
    setIsOpen2,
    isLoading2,
    setIsLoading2,
    toggleCard,
    buttonBg,
    setButtonBg,
  };
}

run([CardComponent]);

@define("fancy-toggle")
export class FancyToggle extends HTMLElement {
  @signal(false) isOpenSignal: TSignal<boolean>;
  @signal(false) isLoadingSignal: TSignal<boolean>;
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
}
