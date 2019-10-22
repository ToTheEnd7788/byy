/// <reference path="../../../types/typings.d.ts">

export function initMoon(Moon: Moon) {
  Moon.prototype._init = function(options: M_Options) {
    const moon: Moon = this; 

    this.$options = options;
  }
};