function warn(content) {
    console.error("[ Moon Warning ]:\n" + content);
}
//# sourceMappingURL=index.js.map

function initMoon(Moon) {
    Moon.prototype._init = function (options) {
        this._initOptions(options);
    };
    Moon.prototype._initOptions = function (options) {
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
        this._el = _el;
        console.log(render(this._createElement.bind(this)));
    };
    Moon.prototype._createVNode = function (a, b, c) {
        console.log(a);
        var vnode = {
            tag: a,
            attrs: b,
            children: c
        };
        return vnode;
    };
    Moon.prototype._createElement = function (options) {
        var vm = Object.assign({}, options), render = vm.render, name = vm.name;
        if (!render) {
            return;
        }
        if (name) {
            console.log("This is Component render");
            console.log(111111, this, vm);
            return render.call(vm, this._createVNode);
        }
        else {
            console.log("This is components' render");
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
