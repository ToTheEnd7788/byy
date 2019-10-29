/// <reference path="../../../types/typings.d.ts">
import { warn } from "../../../publics/index";
import { transformMethods, transformDatas } from "./compiler";
export function initMoon(Moon) {
  Moon.prototype._init = function(options: Options) {
    let { el, render } = options;

    this._el = el;

    console.log(11111, render(this._createElement.bind(this)));
  };

  Moon.prototype._createElement = function(a: any, b: any, c: any) {
    if (typeof a === 'object') {
      a.$get = this._get.bind(a);
      a.$set = this._set.bind(a);

      if (a.children) {
        a.children.push(this._createElement.bind(this));
      } else {
        a.children = [a.render(this._createElement.bind(this))];
      }
    } else {
      let vNode = {
        tag: a,
        attrs: b.attrs,
        children: c
      };
    }

    return a;
  }

  Moon.prototype._get = function(name: string) {
    return this.data[name];
  };

  Moon.prototype._set = function(name: string, value: any) {
    this.data[name] = value;
  }
}