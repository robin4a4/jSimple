// @ts-ignore
import { tmpl } from "riot-tmpl";
import $ from "@jsimple/core";

/**
 * Reactive dom attribute
 *
 * TODO: - manage open() native function and others
 *       - remove tmpl dependency
 */
interface HTMLElementWithData extends HTMLElement {
  data: string;
}

export function DOMRender<TContext>(
  context: TContext,
  mount: HTMLElementWithData
) {
  let current;
  let next = mount.firstChild as HTMLElementWithData;
  while (next) {
    current = next;
    processNode<TContext>(current, context);
    next = DOMRender(context, current) || next.nextSibling;
  }
  return next;
}

function processNode<TContext>(el: HTMLElementWithData, context: TContext) {
  const type = el.nodeType;

  // element
  if (type === 1) {
    for (const { name, value } of [...el.attributes]) {
      if (name[0] === "$") {
        const jAttr = name.slice(1);
        const eventList = [
          "click",
          "mouseover",
          "mouseout",
          "change",
          "keydown",
        ];
        if (eventList.find((eventName) => eventName === jAttr)) {
          el.addEventListener(jAttr, () => tmpl(`{${value}}`, context));
        }
        if (jAttr === "display") {
          $.effect(() => {
            el.style.display = tmpl(`{${value}}`, context) ? "block" : "none";
          });
        }
      }
    }
  }
  // text node
  else if (type === 3) {
    if (tmpl.hasExpr(el.data)) {
      if (/(\(.*\))?(\.)?/g.test(el.data)) {
        $.effect(() => {
          el.data = tmpl(el.data, context);
        });
      } else el.data = tmpl(el.data, context);
    }
  }
}
