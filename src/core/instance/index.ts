/// <reference path="../types/typings.d.ts">

import { initMoon } from "./init";
import { _warn } from "../../../publics/index";

function Moon(options: M_Options): void {
  if (!(this instanceof Moon)) {
    _warn('Vue is a constructor and should be called with the `new` keyword')
  }

  this._init(options);
}

initMoon(Moon);

export default Moon;