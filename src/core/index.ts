// / <reference path="../types/typings.d.ts">
import "../utils/shim";
import { warn } from "../utils/index";
import Component from "./component";
import Context from "./context";


class Moon extends Context {
  el: string;
  _el: HTMLElement;
  render: Render;
  autoRender?: boolean;
  children: Components;

  constructor(config?: Configs) {
    super();

    let { el, autoRender, render } = Object.assign({
      el: "#app",
      autoRender: true
    }, config);

    this.el = el;
    this.render = render;
    this.autoRender = autoRender;
    this.children;

    this.__init();
  }

  __init(): void {
    if (!this.el || !document.querySelector(this.el)) {
      warn(`Please set valid el value, then I can get correct mounted element`);
    } else if (!this.render) {
      warn(`The render function is required, please check`);
    } else {
      this._el = document.querySelector(this.el);
      this.children = this.render(this._c.bind(this));


      this._el.appendChild(this.children.$el);
    }
  }
}

export default Moon;