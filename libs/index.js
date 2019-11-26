function warn(content) {
    console.error("Moon Error:\n" + content);
}
function isObj(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
//# sourceMappingURL=index.js.map

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Component = (function () {
    function Component(vm, options) {
        this.$options = options;
        this._vm = vm;
        this._propsData;
        this._createComponent();
    }
    Component.prototype._createElement = function (vNode) {
        var ele;
        if (vNode.nodeType === 1) {
            ele = document.createElement(vNode.tag);
        }
        else if (vNode.nodeType === 3) {
            ele = document.createTextNode(vNode.value);
        }
        if (vNode.children) {
            for (var _i = 0, _a = vNode.children; _i < _a.length; _i++) {
                var childNode = _a[_i];
                ele.appendChild(this._createElement(childNode));
            }
        }
        return ele;
    };
    Component.prototype._createVnode = function (a, b, c) {
        var children = [];
        if (c && c.length > 0) {
            children = c.reduce(function (acc, child) {
                if (isObj(child))
                    acc.push(child);
                else
                    acc.push({ nodeType: 3, value: child });
                return acc;
            }, []);
        }
        return __assign(__assign({ tag: a, children: children }, b), { nodeType: 1 });
    };
    Component.prototype.$mount = function () {
        this.$options.$el.parentNode.replaceChild(this.$el, this.$options.$el);
    };
    Component.prototype._updateChildComponent = function () {
    };
    Component.prototype._createComponent = function () {
        this._vNode = this._vm.render(this._createVnode.bind(this._vm));
        this.$el = this._createElement(this._vNode);
        this.$mount();
    };
    return Component;
}());

var Moon = (function () {
    function Moon(options) {
        this.$options = Object.assign({
            el: "app",
            $el: null,
            render: null,
            autoRender: true
        }, options);
        this._vm;
        if (!this.$options.name) {
            this._init("byy");
        }
    }
    Moon.prototype._init = function (pass) {
        if (pass === "byy") {
            this.$options.render(this._render.bind(this, "byy"));
        }
        else {
            warn("The function named [_init] is a inner function, you can't call it directly");
        }
    };
    Moon.prototype._render = function (pass, component) {
        if (pass === "byy") {
            if (isObj(component)) {
                this.$options.$el = document.querySelector(this.$options.el || this.$options.el);
                this._vm = new Component(component, this.$options);
            }
            else {
                warn("You must init Moon with a component");
            }
        }
        else {
            warn("The function named [_render] is a inner function, you can't call it directly");
        }
    };
    return Moon;
}());
//# sourceMappingURL=index.js.map

export default Moon;
