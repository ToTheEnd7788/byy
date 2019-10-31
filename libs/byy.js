function warn(content) {
    console.error("[ Moon Warning ]:\n" + content);
}
//# sourceMappingURL=index.js.map

var transformMethods = function (vm) {
    for (var name in vm.methods) {
        vm[name] = vm.methods[name].bind(vm);
    }
};
//# sourceMappingURL=compiler.js.map

function initMoon(Moon) {
    Moon.prototype._init = function (options) {
        var el = options.el, render = options.render;
        this._el = el;
        this.$el = render(this._render.bind(this)).$el;
        document.querySelector(this._el).appendChild(this.$el);
    };
    Moon.prototype._render = function (vm) {
        vm = this._renderComponent(vm);
        vm.$el = this._createELement(vm);
        return vm;
    };
    Moon.prototype._createELement = function (vm, child) {
        var vNode = child
            ? (child.vNode
                ? child.vNode
                : child)
            : vm.vNode, ele = document.createElement(vNode.tag);
        for (var key in vNode.attrs) {
            if (key === 'style') {
                for (var styleName in vNode.attrs[key]) {
                    ele.style[styleName] = vNode.attrs[key][styleName];
                }
            }
            else if (key === 'class') ;
            else {
                ele[key] = vNode.attrs[key];
            }
        }
        for (var name in vNode._events) {
            var isSelfEvent = /^\$.+$/;
            if (isSelfEvent.test(name)) ;
            else {
                ele["on" + name] = null;
                ele["on" + name] = vNode._events[name];
            }
        }
        var _loop_1 = function (child_1) {
            if (typeof child_1 === 'string') {
                ele.appendChild(document.createTextNode(child_1));
            }
            else {
                if (vm.components) {
                    var name = Object.keys(vm.components).find(function (tagName) {
                        return tagName === child_1.tag;
                    });
                    if (name) {
                        vm.components[name].$parent = vm;
                        vm.components[name].$el = this_1._createELement(vm, vm.components[name]);
                        ele.appendChild(vm.components[name].$el);
                    }
                    else {
                        ele.appendChild(this_1._createELement(vm, child_1));
                    }
                }
                else {
                    ele.appendChild(this_1._createELement(vm, child_1));
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = vNode.children; _i < _a.length; _i++) {
            var child_1 = _a[_i];
            _loop_1(child_1);
        }
        return ele;
    };
    Moon.prototype._renderVNode = function (a, b, c) {
        if (b && b.attrs) {
            var classes = b.attrs.class || [];
            b.attrs.class;
        }
        return {
            tag: a,
            attrs: (b && b.attrs),
            _events: (b && b.on),
            children: c || []
        };
    };
    Moon.prototype._renderComponent = function (vm) {
        vm.$get = this._get.bind(vm);
        vm.$set = this._set.bind(vm);
        vm._renderVNode = this._renderVNode;
        vm._patch = this._patch;
        vm._createELement = this._createELement;
        vm._diffAttrs = this._diffAttrs;
        vm._addPatch = this._addPatch;
        vm._updatePacher = this._updatePacher;
        transformMethods(vm);
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
        this._patch(this.render(this._renderVNode), this.vNode);
    };
    Moon.prototype._diffAttrs = function (newVal, oldVal) {
        var diff = {};
        for (var name in newVal) {
            if (newVal[name] !== oldVal[name]) {
                if (typeof newVal[name] === 'object') {
                    if (diff[name]) {
                        diff[name] = Object.assign(diff[name], this._diffAttrs.call(this, newVal[name], oldVal[name]));
                    }
                    else {
                        diff[name] = Object.assign({}, this._diffAttrs.call(this, newVal[name], oldVal[name]));
                    }
                }
                else {
                    diff[name] = newVal[name];
                }
            }
        }
        return diff;
    },
        Moon.prototype._updatePacher = function (el, differ) {
            for (var name in differ) {
                if (name === 'style') {
                    for (var styleName in differ[name]) {
                        el.style[styleName] = differ[name][styleName];
                    }
                }
                else if (name === 'className') {
                    el[name] = differ[name];
                }
                else {
                    el[name] = differ[name];
                }
            }
        };
    Moon.prototype._addPatch = function (differ) {
        for (var name in differ) {
            if (name === 'update') {
                for (var position in differ[name]) {
                    if (position === '0')
                        this._updatePacher(this.$el, differ[name][position]);
                    else
                        this._updatePacher(this.$el.childNodes[position], differ[name][position]);
                }
            }
        }
    };
    Moon.prototype._patch = function (newVNode, oldVNode) {
        var maps = {
            update: {},
            move: {},
            insert: {}
        };
        if (newVNode.tag !== oldVNode.tag) {
            this.$el.parentNode.replaceChild(this._createELement(this, newVNode), this.$el);
        }
        else {
            maps.update = {
                "0": this._diffAttrs.call(this, newVNode.attrs, oldVNode.attrs)
            };
        }
        this._addPatch(maps);
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
