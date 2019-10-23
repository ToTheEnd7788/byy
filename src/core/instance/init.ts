/// <reference path="../../../types/typings.d.ts">

import { warn } from "../../../publics/index";

export function initMoon(Moon) {
  Moon.prototype._init = function(options: Options) {
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

    render(this._render)
  };

  Moon.prototype._render = function(options: Options) {
    console.log(111111, options);
    let { render: unitRender, name } = options;

    if (!unitRender) {
      warn(`The component named <${name}> don't have render function`);
    }
  }
};