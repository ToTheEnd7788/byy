function warn(content) {
    console.error("[ Moon Warning ]:\n" + content);
}
//# sourceMappingURL=index.js.map

function initMoon(Moon) {
    Moon.prototype._init = function (options) {
        var el = options.el, render = options.render;
        this._el = el;
        console.log(33333, render(this._render.bind(this)));
    };
    Moon.prototype._render = function (vm) {
        vm = this._renderComponent(vm);
        console.log(22222, this._createELement(vm));
    };
    Moon.prototype._createELement = function (vm) {
        console.log(77777, vm);
        var ele = document.createElement(vm.vNode.tag);
        for (var key in vm.vNode.attrs) {
            if (key === 'style') {
                for (var styleName in vm.vNode.attrs[key]) {
                    ele.style[styleName] = vm.vNode.attrs[key][styleName];
                }
            }
            else {
                ele[key] = vm.vNode.attrs[key];
            }
        }
        var _loop_1 = function (child) {
            if (typeof child === 'string') {
                ele.appendChild(document.createTextNode(child));
            }
            else {
                var name = Object.keys(vm.components).find(function (tagName) {
                    return tagName === child.tag;
                });
                if (name) {
                    ele.appendChild(this_1._createELement(vm.components[name]));
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = vm.vNode.children; _i < _a.length; _i++) {
            var child = _a[_i];
            _loop_1(child);
        }
        return ele;
    };
    Moon.prototype._renderVNode = function (a, b, c) {
        return {
            tag: a,
            attrs: b && b.attrs,
            children: c || []
        };
    };
    Moon.prototype._renderComponent = function (vm) {
        vm.$get = this._get.bind(vm);
        vm.$set = this._set.bind(vm);
        vm._renderVNode = this._renderVNode;
        if (vm.components) {
            for (var key in vm.components) {
                vm[key] = this._renderComponent(vm.components[key]);
            }
        }
        if (vm.render) {
            vm.vNode = vm.render(vm._renderVNode);
        }
        else {
            warn("The component render function is required, in [" + vm.name + "]");
        }
        return vm;
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
