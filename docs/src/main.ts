import $, { DOMRender } from "@jsimple/core";

const [isOpen, setIsOpen] = $.signal(false);
const [loading, setLoading] = $.signal(false);
const [name, setName] = $.signal("button");

// const onButtonClick = async () => {
//   setLoading(true);
//   const { content, error } = await $.fetch.GET("https://my-api.com/jokes");
//   setLoading(false);
//   if (result.error) {
//     console.log(error);
//   } else {
//     console.log(content);
//   }
// };

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatSignalString(signalString: string) {
  const getterString = signalString.replace("Signal", "");
  const setterString = `set${capitalizeFirstLetter(getterString)}`;
  return [getterString, setterString];
}

function s<K extends string>(proto: Record<K, unknown>, key: K): any {
  const [getterString, setterString] = formatSignalString(key);
  const signal = $.signal(false);
  Object.defineProperty(proto, key, {
    configurable: true,
    value: signal,
  });
  Object.defineProperty(proto, getterString, {
    configurable: true,
    value: signal[0],
  });
  Object.defineProperty(proto, setterString, {
    configurable: true,
    value: signal[1],
  });
}

const define = (name: string) => {
  return function (target: CustomElementConstructor) {
    window.customElements.define(name, target);
  };
};

@define("fancy-button")
export class FancyButton extends HTMLElement {
  @s declare isOpenSignal: any;
  @s declare nameSignal: any;

  handleClick() {
    this.setIsOpen(!this.isOpen());
  }

  connectedCallback() {
    this.html(`
    <div>
    <button type="button" $click="handleClick()">{name()}</button>
    <div $display="isOpen()">lorem ipsum</div>
    </div>
    `);
    DOMRender(
      {
        name: this.name,
        isOpen: this.isOpen,
        setIsOpen: this.setIsOpen,
        handleClick: this.handleClick,
      },
      $.select("#app")!
    );
  }
}
