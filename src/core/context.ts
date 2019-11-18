import { isObj, isStr, warn } from "../utils/index";
import Component from "./component";

class Context {
  constructor() {
    
  }

  _c(a: Vm) {
    return new Component(a, false);
  }
};

export default Context;