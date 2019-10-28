/// <reference path="../../../types/typings.d.ts">
import { warn } from "../../../publics/index";
import { transformMethods, transformDatas } from "./compiler";
export function initMoon(Moon) {
  Moon.prototype._init = function(options: Options) {
    let { el, render } = options;

    this._el = el;

    render(this._render.bind(this));
  };

  Moon.prototype._render = function(a: any, b: any, c: any) {
    let vNode = {};

    // Render a component
    if (typeof a === 'object') {
      this._renderComponent(a);
    }
    // Render a vNode
    else {
      console.log(111, a);
      console.log(222, b);
      console.log(333, c);
    }
  };

  Moon.prototype._renderComponent = function(vm: Component) {
    if (vm.render) {
      vm.$get = this._get.bind(vm);
      vm.$set = this._set.bind(vm);
      vm._render = this._render;

      vm.render(this._render.bind(this));

      console.log('wwwwww', vm);
    } else {
      warn(`The render function is required in a component object`);
    }
  };

  Moon.prototype._get = function(name: string) {
    return this.data[name];
  };

  Moon.prototype._set = function(name: string, value: any) {
    this.data[name] = value;
  }
}