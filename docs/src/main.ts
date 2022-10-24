import $, { DOMReact } from "@jsimple/core";

const [isOpen, setIsOpen] = $.signal(false);
DOMReact(isOpen, setIsOpen, "isOpen", "setIsOpen");
