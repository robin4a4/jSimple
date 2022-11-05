import $, { DOMRender } from "@jsimple/core";

const symbol = Symbol.for("jsimple");

enum Decorator {
  Define = "define",
  Signal = "signal",
  Callback = "callback",
}

type InferValue<Prop extends PropertyKey, Desc> = Desc extends {
  get(): any;
  value: any;
}
  ? never
  : Desc extends { value: infer T }
  ? Record<Prop, T>
  : Desc extends { get(): infer T }
  ? Record<Prop, T>
  : never;

type DefineProperty<
  Prop extends PropertyKey,
  Desc extends PropertyDescriptor
> = Desc extends { writable: any; set(val: any): any }
  ? never
  : Desc extends { writable: any; get(): any }
  ? never
  : Desc extends { writable: false }
  ? Readonly<InferValue<Prop, Desc>>
  : Desc extends { writable: true }
  ? InferValue<Prop, Desc>
  : Readonly<InferValue<Prop, Desc>>;

function defineProperty<
  Obj extends object,
  Key extends PropertyKey,
  PDesc extends PropertyDescriptor
>(
  obj: Obj,
  prop: Key,
  val: PDesc
): asserts obj is Obj & DefineProperty<Key, PDesc> {
  Object.defineProperty(obj, prop, val);
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatSignalString(signalString: string) {
  const getterString = signalString.replace("Signal", "");
  const setterString = `set${capitalizeFirstLetter(getterString)}`;
  return [getterString, setterString];
}

function meta(proto: Record<PropertyKey, unknown>, name: string): Set<string> {
  if (!Object.prototype.hasOwnProperty.call(proto, symbol)) {
    const parent = proto[symbol] as Map<string, Set<string>> | undefined;
    const map = (proto[symbol] = new Map<string, Set<string>>());
    if (parent) {
      for (const [key, value] of parent) {
        map.set(key, new Set(value));
      }
    }
  }
  const map = proto[symbol] as Map<string, Set<string>>;
  if (!map.has(name)) map.set(name, new Set<string>());
  return map.get(name)!;
}

/**
 * Define a new custom element and apply the jsimple dom rendering
 * on the connectedCallback.
 *
 * Usage: add a @define(<element-name>) decorator on top of your
 *        custom element class definition.
 *
 * @param {string} name
 */
export const define = (name: string) => {
  return function (cls: CustomElementConstructor) {
    const connectedCallback = cls.prototype.connectedCallback || function () {};
    cls.prototype.connectedCallback = function () {
      const domSetData = new Set([
        ...meta(cls.prototype, Decorator.Signal),
        ...meta(cls.prototype, Decorator.Callback),
      ]);
      const domObjectData: any = {};
      for (let propertyString of domSetData) {
        domObjectData[propertyString] = cls.prototype[propertyString];
      }
      connectedCallback.call(this);
      DOMRender(domObjectData, this);
    };

    window.customElements.define(name, cls);
  };
};

export function signal<TSignalValue>(value: TSignalValue) {
  return function <K extends string>(proto: Record<K, unknown>, key: K): any {
    const [getterString, setterString] = formatSignalString(key);
    const signal = $.signal(value);
    defineProperty(proto, key, {
      configurable: true,
      value: signal,
    });
    defineProperty(proto, getterString, {
      configurable: true,
      value: signal[0],
    });
    defineProperty(proto, setterString, {
      configurable: true,
      value: signal[1],
    });
    meta(proto, Decorator.Signal).add(getterString);
    meta(proto, Decorator.Signal).add(setterString);
  };
}

export function callback(target: any, propertyKey: string) {
  meta(target, Decorator.Callback).add(propertyKey);
}
