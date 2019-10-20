(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Moon = (function () {
        function Moon(options) {
            this.options = options;
            console.log(11111, this.options);
        }
        Moon.prototype._init = function () { };
        return Moon;
    }());
    exports.Moon = Moon;
});
