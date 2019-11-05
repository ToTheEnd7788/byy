/// <reference path="../types/typings.d.ts">
import "../../../publics/shim";
import { initMoon } from "./init";
import { warn } from "../../../publics/index";

function Moon(options: Object): void {
  if (!(this instanceof Moon)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMoon(Moon);

export default Moon;