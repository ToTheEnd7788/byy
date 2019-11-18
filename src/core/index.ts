// / <reference path="../types/typings.d.ts">
import "../utils/shim";
import { warn } from "../utils/index";
import Context from "./context";


class Moon extends Context {
  el: string;
  _el: HTMLElement;
  render: Render;
  autoRender?: boolean;
  children: any;

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

  _mountedTrigger(children) {
    for (let child of children) {
      if (child.nodeType === 'component') {
        child.component.mounted && child.component.mounted();
      }

      if (child.children) {
        this._mountedTrigger(child.children);
      }
    }
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

      // mounted event trigger
      this.children.mounted && this.children.mounted();

      console.log(99999999, this.children);

      this._mountedTrigger(this.children._vNode.children);
    }
  }
}

export default Moon;