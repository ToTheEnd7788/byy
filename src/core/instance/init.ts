/// <reference path="../../../types/typings.d.ts">

import { warn } from "../../../publics/index";

export function initMoon(Moon) {
  Moon.prototype._init = function(options: Options) {
    // 
    this._initOptions(options);
  };

  Moon.prototype._initOptions = function(options: Options) {
    let { el, render } = options;
    let _el: HTMLElement | null = document.querySelector(el);

    if (!_el) {
      warn(`The mounted element is not exsist, please check < el: ${el} >`);
      return;
    }

    if (!render) {
      warn(`The component's render function is required`);
      return;
    }

    this._el = _el;
    // *** 这里需要将render函数生成的实际内容变成vnode ***
    // *** 然后生成实际的dom元素 ***
    console.log(render(this._createElement.bind(this)));
    // this.$el.appendChild(aaa);
  }

  Moon.prototype._createVNode = function(a: string, b: any, c: any) {
    console.log(a);
    let vnode = {
      tag: a,
      attrs: b,
      children: c
    }

    return vnode;
  }

  Moon.prototype._createElement = function(options: Component) {
    let vm: Component = Object.assign({}, options),
      { render, name } = vm;

    if (!render) {
      // warn(`The component's render function is required`);
      return;
    }

    if (name) {
      console.log("This is Component render");
      console.log(111111, this, vm);
      return render.call(vm, this._createVNode);
    } else {
      console.log("This is components' render");
      
    }
  }
};