import $, { DOMRender } from "@jsimple/core";

const [isOpen, setIsOpen] = $.signal(false);
const [loading, setLoading] = $.signal(false);
const [name, setName] = $.signal("button");

const onButtonClick = async () => {
  setLoading(true);
  const { content, error } = await $.fetch.GET("https://my-api.com/jokes");
  setLoading(false);
  if (result.error) {
    console.log(error);
  } else {
    console.log(content);
  }
};

DOMRender(
  { name, setName, isOpen, setIsOpen, loading, onButtonClick },
  $.select("#app")!
);
