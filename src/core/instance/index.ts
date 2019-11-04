/// <reference path="../types/typings.d.ts">

import { initMoon } from "./init";
import { warn } from "../../../publics/index";

function Moon(options: Object): void {
  if (!(this instanceof Moon)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

let aaa = {
  name: "byy",
  test() {
    console.log(777777);
  }
};

aaa.test();

initMoon(Moon);

export default Moon;