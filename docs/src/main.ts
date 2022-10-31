import $, { DOMRender } from "@jsimple/core";

const [isOpen, setIsOpen] = $.signal(false);
const [name, setName] = $.signal("button");

DOMRender({ name, setName, isOpen, setIsOpen }, $.select("#app")!);
