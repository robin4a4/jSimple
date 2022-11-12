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
  data?: string;
}

export function DOMRender<TContext>(
  context: TContext,
  mount: HTMLElementWithData
) {
  let current;
  let next = mount.firstChild as HTMLElementWithData;
  while (next) {
    current = next;
    const type = current.nodeType;
    if (type === 1 && current.hasAttribute("data-define")) break;

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
    if (tmpl.hasExpr(el.data) && el.data) {
      if (/(\(.*\))?(\.)?/g.test(el.data)) {
        $.effect(() => {
          const expr = tmpl(el.data, context);
          if (expr) {
            el.data = expr;
          }
        });
      } else el.data = tmpl(el.data, context);
    }
  }
}

export function run<TContext>(funcArray: Array<() => TContext>) {
  funcArray.forEach((func) => {
    const mountEl = $.select(
      `[data-define='${func.name
        .replace(/([a-z0–9])([A-Z])/g, "$1-$2")
        .toLowerCase()}']`
    );
    if (!mountEl) return;
    DOMRender<TContext>(func(), mountEl);
  });
}
