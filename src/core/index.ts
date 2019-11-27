import { warn, isObj } from "../utils/index";
import Component from "./component";

class Moon {
  $options: any;
  _vm: any;

  constructor(options: object) {
    this.$options = Object.assign({
      el: "app",
      $el: null,
      render: null,
      autoRender: true
    }, options);

    this._vm;

    if (!this.$options.name) {
      this._init("byy");
    }
  }

  _init(pass) {
    if (pass === "byy") {
      this.$options.render(this._render.bind(this, "byy"));
    } else {
      warn(`The function named [_init] is a inner function, you can't call it directly`);
    }
  }

  _triggerMounter(component) {
    component.mounted && component.mounted();

    let vNode = component._vNode,
      { children } = vNode;

    if (vNode.nodeType === "component") {
      vNode.component.mounted && vNode.component.mounted();
    }

    if (children) {
      for (let child of children) {
        if (child.nodeType === "component") {
          this._triggerMounter(child.component);
        }
      }
    }
  }

  _render(pass, component) {
    if (pass === "byy") {
      if (isObj(component)) {
        this.$options.$el = document.querySelector(this.$options.el || this.$options.el);
        this._vm = new Component(component);
        this.$options.$el.appendChild(this._vm.$el);
        this._triggerMounter(this._vm);
      } else {
        warn(`You must init Moon with a component`);
      }
    } else {
      warn(`The function named [_render] is a inner function, you can't call it directly`);
    }
  }
}

export default Moon;