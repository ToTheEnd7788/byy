import { isObj, warn } from "../utils/index";
import { Component } from "./component";
import { StaticContext } from "./instance";

class Moon extends StaticContext {
  $options: any;
  _vm: any;

  constructor(options) {
    super();

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

  _triggerMounter(childs) {
    for (let child of childs) {
      if (child.nodeType === 'component') {
        child.component.mounted && child.component.mounted();
      }

      if (child.children) {
        this._triggerMounter(child.children);
      }
    }
  }

  $mount() {
    this.$options.$el.appendChild(this._vm.$el);
    this._vm.mounted && this._vm.mounted();
    this._triggerMounter(this._vm._vNode.children);
  }

  _render(pass, component) {
    if (pass === "byy") {
      if (isObj(component)) {
        this.$options.$el = document.querySelector(this.$options.el || this.$options.el);
        this._vm = new Component(component, null, Moon);
        if (this.$options.autoRender) this.$mount();
      } else {
        warn(`You must init Moon with a component`);
      }
    } else {
      warn(`The function named [_render] is a inner function, you can't call it directly`);
    }
  }
}

export default Moon;