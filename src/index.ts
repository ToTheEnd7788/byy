/// <reference path="./types/typings.d.ts">

class Moon {
  options: M_Options;

  constructor(options: M_Options) {
    this.options = options;

    console.log(11111, this.options);
  }

  _init() {}
}

export { Moon };