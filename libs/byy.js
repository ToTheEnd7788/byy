function warn(content) {
    console.error("[ Moon Warning ]:\n" + content);
}
//# sourceMappingURL=index.js.map

function initMoon(Moon) {
    Moon.prototype._init = function (options) {
        var el = options.el, render = options.render;
        var _el = document.querySelector(el);
        if (!_el) {
            warn("The mounted element is not exsist, please check < el: " + el + " >");
            return;
        }
        if (!render) {
            warn("The component's render function is required");
            return;
        }
        render(this._render);
    };
    Moon.prototype._render = function (options) {
        console.log(111111, options);
        var unitRender = options.render, name = options.name;
        if (!unitRender) {
            warn("The component named <" + name + "> don't have render function");
        }
    };
}

function Moon(options) {
    if (!(this instanceof Moon)) {
        warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
}
initMoon(Moon);
//# sourceMappingURL=index.js.map

export default Moon;
