function warn(content) {
    console.error("[ Moon Warning ]:\n" + content);
}
//# sourceMappingURL=index.js.map

function initMoon(Moon) {
    Moon.prototype._init = function (options) {
        var el = options.el, render = options.render;
        this._el = el;
        render(this._render.bind(this));
    };
    Moon.prototype._render = function (a, b, c) {
        if (typeof a === 'object') {
            this._renderComponent(a);
        }
        else {
            console.log(111, a);
            console.log(222, b);
            console.log(333, c);
        }
    };
    Moon.prototype._renderComponent = function (vm) {
        if (vm.render) {
            vm.$get = this._get.bind(vm);
            vm.$set = this._set.bind(vm);
            vm._render = this._render;
            vm.render(this._render.bind(this));
            console.log('wwwwww', vm);
        }
        else {
            warn("The render function is required in a component object");
        }
    };
    Moon.prototype._get = function (name) {
        return this.data[name];
    };
    Moon.prototype._set = function (name, value) {
        this.data[name] = value;
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
