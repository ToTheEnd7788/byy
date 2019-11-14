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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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

if (!Function.prototype.bind) {
    Function.prototype.bind = function (o) {
        if (typeof this !== 'function') {
            throw TypeError("Bind must be called on a function");
        }
        var args = Array.prototype.slice.call(arguments, 1), self = this, nop = function () { }, bound = function () {
            return self.apply(this instanceof nop ? this : o, args.concat(Array.prototype.slice.call(arguments)));
        };
        if (this.prototype)
            nop.prototype = this.prototype;
        bound.prototype = new nop();
        return bound;
    };
}
if (!Array.isArray) {
    Array.isArray = function (o) {
        return Boolean(o &&
            Object.prototype.toString.call(Object(o)) === '[object Array]');
    };
}
if (!Array.prototype.find) {
    Array.prototype.find = function (callback) {
        var result;
        if (!callback) {
            console.error("[Find]: params[0] is invalid");
        }
        else {
            var o = this;
            for (var i = 0; i < o.length; i++) {
                if (callback(o[i], i)) {
                    result = o[i];
                    break;
                }
            }
        }
        return result;
    };
}
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (callback) {
        var index = -1;
        if (!callback) {
            console.error("[FindIndex]: params[0] is invalid");
        }
        else {
            var o = this;
            for (var i = 0; i < o.length; i++) {
                if (callback(o[i], i)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
}
if (!Object.keys) {
    Object.keys = function (o) {
        var res = [];
        for (var key in o) {
            res.push(key);
        }
        return res;
    };
}
if (!Array.prototype.map) {
    Array.prototype.map = function (callback) {
        var res = [], o = this.slice(0);
        for (var i = 0; i < o.length; i++) {
            res.push(callback(o[i], i, o));
        }
        return res;
    };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function (callback) {
        var res = [], o = this.slice(0);
        for (var i = 0; i < o.length; i++) {
            if (callback(o[i], i)) {
                res.push(o[i]);
            }
        }
        return res;
    };
}
if (typeof Object.assign !== 'function') {
    Object.assign = function assign(target, varArgs) {
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];
            if (nextSource != null) {
                for (var nextKey in nextSource) {
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}
//# sourceMappingURL=shim.js.map

function warn(content) {
    console.error("Moon Error:\n" + content);
}
function isObj(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
function isStr(value) {
    return Object.prototype.toString.call(value) === "[object String]";
}
//# sourceMappingURL=index.js.map

var Component = (function () {
    function Component(vm) {
        this.vm = vm;
        this.eventFilter = {
            stop: function (e) {
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            },
            prevent: function (e) {
                if (e.preventDefault)
                    e.preventDefault();
                else
                    e.returnValue = false;
            }
        };
        this._createComponent();
    }
    Component.prototype._setEvents = function (el, event) {
        var _this = this;
        var _loop_1 = function (name) {
            var _a = name.split('.'), n = _a[0], type = _a[1], _b = event[name], handler = _b[0], params = _b.slice(1);
            el["on" + n] = null;
            el["on" + n] = function (e) {
                var evt = e || window.event;
                if (type) {
                    _this.eventFilter[type] && _this.eventFilter[type](evt);
                }
                params = params.reduce(function (acc, item) {
                    if (item === '$event')
                        acc.push(evt);
                    else
                        acc.push(item);
                    return acc;
                }, []);
                handler.apply(_this.vm, params);
            };
        };
        for (var name in event) {
            _loop_1(name);
        }
    };
    Component.prototype._setStyle = function (el, style) {
        for (var key in style) {
            el.style[key] = style[key];
        }
    };
    Component.prototype._setAttributes = function (el, node) {
        var _loop_2 = function (key) {
            if (key === 'className') {
                if (isObj(node[key])) {
                    el[key] = Object.keys(node[key]).filter(function (item) {
                        return node[key][item];
                    }).join(" ");
                }
                else if (isStr(node[key])) {
                    el[key] = node[key];
                }
                else {
                    warn("The className must be string or object");
                }
            }
            else if (key === 'on') {
                this_1._setEvents(el, node[key]);
            }
            else if (key === 'style') {
                this_1._setStyle(el, node[key]);
            }
            else if (key === 'attrs') {
                for (var attr in node[key]) {
                    el[attr] = node[key][attr];
                }
            }
        };
        var this_1 = this;
        for (var key in node) {
            _loop_2(key);
        }
    };
    Component.prototype._createElement = function (node) {
        var ele;
        if (node.nodeType === 1) {
            ele = document.createElement(node.tag);
            this._setAttributes(ele, node);
        }
        else if (node.nodeType === 3) {
            ele = document.createTextNode(node.text);
        }
        else if (node.nodeType === "component") {
            ele = this.vm.components[node.tag].$el;
        }
        if (node.children && node.children.length > 0) {
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                ele.appendChild(this._createElement(child));
            }
        }
        return ele;
    };
    Component.prototype.__transferMethods = function () {
        this.vm = Object.assign(this.vm, __assign({}, this.vm.methods));
    };
    Component.prototype._createVnode = function (a, b, c) {
        var children, result;
        if (c && c.length > 0) {
            children = c.reduce(function (acc, item) {
                if (isObj(item)) {
                    acc.push(item);
                }
                else {
                    acc.push({
                        nodeType: 3,
                        text: item
                    });
                }
                return acc;
            }, []);
        }
        if (this.components && this.components[a]) {
            this.components[a].$parent = this;
            result = __assign(__assign({ tag: a }, b), { children: children, component: this.components[a], nodeType: "component" });
        }
        else {
            result = __assign(__assign({ tag: a }, b), { children: children, nodeType: 1 });
        }
        return result;
    };
    Component.prototype._createChildrenComponent = function () {
        var components = this.vm.components;
        if (components && Object.keys(components).length > 0) {
            Object.keys(components).reduce(function (acc, item) {
                acc[item] = new Component(components[item]).vm;
                return acc;
            }, {});
        }
    };
    Component.prototype._get = function (name) {
        var data = this.data && this.data();
        return data[name] || data[name] === false || data[name] === 0
            ? data[name]
            : (this.props && this.props[name]);
    };
    Component.prototype._createComponent = function () {
        if (!this.vm.render) {
            warn("The compoennt named [" + this.vm.name + "]'s render function is required");
        }
        else {
            this.__transferMethods();
            this.vm.created && this.vm.created();
            this._createChildrenComponent();
            this.vm.$get = this._get;
            this.vm._vNode = this.vm.render(this._createVnode.bind(this.vm));
            this.vm.$el = this._createElement(this.vm._vNode);
        }
    };
    return Component;
}());

var Context = (function () {
    function Context() {
    }
    Context.prototype._c = function (a) {
        return new Component(a).vm;
    };
    return Context;
}());
//# sourceMappingURL=context.js.map

var Moon = (function (_super) {
    __extends(Moon, _super);
    function Moon(config) {
        var _this = _super.call(this) || this;
        var _a = Object.assign({
            el: "#app",
            autoRender: true
        }, config), el = _a.el, autoRender = _a.autoRender, render = _a.render;
        _this.el = el;
        _this.render = render;
        _this.autoRender = autoRender;
        _this.children;
        _this.__init();
        return _this;
    }
    Moon.prototype.__init = function () {
        if (!this.el || !document.querySelector(this.el)) {
            warn("Please set valid el value, then I can get correct mounted element");
        }
        else if (!this.render) {
            warn("The render function is required, please check");
        }
        else {
            this._el = document.querySelector(this.el);
            this.children = this.render(this._c.bind(this));
            this._el.appendChild(this.children.$el);
        }
    };
    return Moon;
}(Context));
//# sourceMappingURL=index.js.map

export default Moon;
