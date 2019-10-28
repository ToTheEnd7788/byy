function warn(content) {
    console.error("[ Moon Warning ]:\n" + content);
}
//# sourceMappingURL=index.js.map

var transformMethods = function (vm) {
    for (var name in vm.methods) {
        vm[name] = vm.methods[name].bind(vm);
    }
};
var transformDatas = function (vm) {
    for (var key in vm.data) {
        vm[key] = vm.data[key];
    }
};
//# sourceMappingURL=compiler.js.map

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
        var frag = document.createDocumentFragment();
        this._el
            .appendChild(this._createFragment(render(this._createElement.bind(this))));
    };
    Moon.prototype._createFragment = function (vNode) {
        var ele;
        if (typeof vNode === 'string') {
            ele = document.createTextNode(vNode);
        }
        else {
            ele = document.createElement(vNode.tag);
        }
        for (var key in vNode.attrs) {
            if (key === 'style') {
                for (var styleName in vNode.attrs.style) {
                    ele.style[styleName] = vNode.attrs.style[styleName];
                }
            }
            else {
                ele[key] = vNode.attrs[key];
            }
        }
        for (var evt in vNode.on) {
            if (/^\$.+$/.test(evt)) ;
            else {
                ele["on" + evt] = null;
                ele["on" + evt] = vNode.on[evt];
            }
        }
        if (vNode.children && vNode.children.length > 0) {
            for (var _i = 0, _a = vNode.children; _i < _a.length; _i++) {
                var node = _a[_i];
                ele.appendChild(this._createFragment(node));
            }
        }
        return ele;
    };
    Moon.prototype._patch = function (oldVNode, newVNode) {
        console.log(33333, oldVNode);
        console.log(44444, newVNode);
    };
    Moon.prototype._set = function (name, value) {
        if (this.data[name] !== value) {
            this[name] = value;
            this._patch(this.vNode, this.render(this._createElement));
        }
    };
    Moon.prototype._get = function (name) {
        return this[name];
    };
    Moon.prototype._createElement = function (a, b, c) {
        var vNode = {};
        if (typeof a === 'object') {
            var vm = a;
            if (vm.render) {
                vm.componentWillInit.call(vm);
                transformDatas(vm);
                transformMethods(vm);
                vNode = vm.render(this._createElement.bind(this));
                vm.vNode = vNode;
                vm.$get = this._get.bind(vm);
                vm.$set = this._set.bind(vm);
                vm._createElement = this._createElement;
                vm._patch = this._patch;
            }
        }
        else {
            vNode.tag = a;
            vNode.attrs = b.attrs || {};
            vNode.on = b.on || {};
            vNode.children = c || [];
        }
        return vNode;
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
