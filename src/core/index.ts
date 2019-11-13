/// <reference path="../types/typings.d.ts">
import "../utils/shim";
import { warn } from "../utils/index";
import Componnent from "./component";

class Moon extends Configs {
  constructor(config) {
    super();
    let { el, autoRender, render } = Object.assign({
      el: "#app",
      autoRender: true
    }, config);

    this.el = el;
    this.render = render;
    this.autoRender = autoRender;

    this._init();
  }

  _init(): void {
    console.log(3333333, this);
    console.log(4444444, new Componnent())
  }
}

export default Moon;