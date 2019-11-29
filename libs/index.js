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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function warn(content) {
    console.error("Moon Error:\n" + content);
}
function isObj(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
function isStr(value) {
    return Object.prototype.toString.call(value) === "[object String]";
}
function isArr(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
}
//# sourceMappingURL=index.js.map

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
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (callback) {
        if (this === null) {
            throw new TypeError('Array.prototype.reduce ' +
                'called on null or undefined');
        }
        if (typeof callback !== 'function') {
            throw new TypeError(callback +
                ' is not a function');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        var k = 0;
        var value;
        if (arguments.length >= 2) {
            value = arguments[1];
        }
        else {
            while (k < len && !(k in o)) {
                k++;
            }
            if (k >= len) {
                throw new TypeError('Reduce of empty array ' +
                    'with no initial value');
            }
            value = o[k++];
        }
        while (k < len) {
            if (k in o) {
                value = callback(value, o[k], k, o);
            }
            k++;
        }
        return value;
    };
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        var k;
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = +fromIndex || 0;
        if (Math.abs(n) === Infinity) {
            n = 0;
        }
        if (n >= len) {
            return -1;
        }
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}
//# sourceMappingURL=shim.js.map

var eventFilter = {
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
function setStyle(el, style) {
    for (var key in style) {
        if (el.style.setAttribute)
            el.style.setAttribute(key, style[key]);
        else
            el.style[key] = style[key];
    }
}
function setAttibutes(el, node, ctx) {
    var _loop_1 = function (key) {
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
            setEvents(el, node[key], ctx);
        }
        else if (key === 'style') {
            setStyle(el, node[key]);
        }
        else if (key !== 'component' && key !== 'nodeType' && key !== 'children' && key !== "tag") {
            el[key] = node[key];
        }
    };
    for (var key in node) {
        _loop_1(key);
    }
}
function setEvents(el, event, ctx) {
    var _loop_2 = function (name) {
        var _a = name.split('.'), n = _a[0], type = _a[1], _b = event[name], handler = _b[0], params = _b.slice(1);
        el["on" + n] = null;
        el["on" + n] = function (e) {
            var evt = e || window.event;
            if (type) {
                eventFilter[type] && eventFilter[type](evt);
            }
            params = params.reduce(function (acc, item) {
                if (item === '$event')
                    acc.push(evt);
                else
                    acc.push(item);
                return acc;
            }, []);
            handler.apply(ctx, params);
        };
    };
    for (var name in event) {
        _loop_2(name);
    }
}
//# sourceMappingURL=setAttributes.js.map

function diff(n, o, vm) {
    var paches = comparer(n, o, "0");
    if (paches) {
        addPatch(paches, vm, n);
    }
}
function getTargetElement(el, pos) {
    var list = pos.split('-');
    for (var i = 1; i < list.length; i++) {
        el = el.childNodes[list[i]];
    }
    return el;
}
function getTargetComponent(vNode, pos) {
    var list = pos.split('-'), res = vNode;
    for (var i = 1; i < list.length; i++) {
        res = res.children[list[i]];
    }
    return res.component;
}
function addPatch(paches, vm, n, o) {
    for (var p in paches) {
        var targetEle = getTargetElement(vm.$el, p);
        for (var k in paches[p]) {
            if (k === "props") {
                var component = getTargetComponent(n, p);
                component._updateChildComponent(paches[p][k]);
            }
            else if (k === "style") {
                setStyle(targetEle, paches[p][k]);
            }
            else if (k === "replace") {
                var freshEle = void 0;
                if (paches[p][k].nodeType === "component") {
                    var component = Object.assign(vm.components[paches[p][k].tag], {
                        props: paches[p][k].props
                    });
                    paches[p][k].component = new Component(component, vm, vm.$Moon);
                    freshEle = paches[p][k].component.$el;
                }
                else {
                    freshEle = vm._createElement(paches[p][k]);
                }
                targetEle.parentNode.replaceChild(freshEle, targetEle);
            }
            else if (k === "add") {
                for (var _i = 0, _a = paches[p][k]; _i < _a.length; _i++) {
                    var node = _a[_i];
                    if (node.nodeType === "component") {
                        targetEle.appendChild(node.component.$el);
                    }
                    else {
                        targetEle.appendChild(vm._createElement(node));
                    }
                }
            }
            else if (k === "remove") {
                for (var i = 0; i < paches[p][k]; i++) {
                    var lastChild = targetEle.childNodes[targetEle.childNodes.length - 1];
                    targetEle.removeChild(lastChild);
                }
            }
            else if (k === "delete") {
                targetEle.parentNode.removeChild(targetEle);
            }
            else if (k === "on") {
                setEvents(targetEle, paches[p][k], vm);
            }
            else {
                targetEle[k] = paches[p][k];
            }
        }
    }
}
function compareChilds(n, o, d) {
    var res = {};
    if (n && !o) {
        res[d] = Object.assign({}, res[d], {
            add: [n]
        });
    }
    else if (o && !n) {
        res[d] = Object.assign({}, res[d], {
            delete: true
        });
    }
    else if (n && o) {
        if (n.length > o.length) {
            res[d] = Object.assign({}, res[d], {
                add: n.slice(o.length - n.length)
            });
            n = n.slice(0, o.length - n.length);
        }
        else if (n.length < o.length) {
            res[d] = Object.assign({}, res[d], {
                remove: o.length - n.length
            });
        }
        for (var i = 0; i < n.length; i++) {
            var m = comparer(n[i], o[i], d + "-" + i);
            if (m) {
                res = Object.assign({}, res, m);
            }
        }
    }
    return Object.keys(res).length > 0
        ? res
        : null;
}
function compareObjs(n, o) {
    var res = {};
    var _loop_1 = function (k) {
        var _a, _b;
        if (isStr(n[k])) {
            res = Object.assign({}, res, (_a = {},
                _a[k] = n[k],
                _a));
        }
        else {
            if (k === "className") {
                res[k] = Object.keys(n[k]).reduce(function (acc, item) {
                    if (n[k][item]) {
                        acc += " " + item;
                    }
                    return acc;
                }, "").slice(1);
            }
            else {
                for (var inner in n[k]) {
                    if (n[k] && o[k]) {
                        var same = true;
                        if (k === "on")
                            same = sameEvents(n[k][inner], o[k][inner]);
                        else
                            same = n[k][inner] === o[k][inner];
                        if (!same) {
                            res[k] = Object.assign({}, res[k], (_b = {},
                                _b[inner] = n[k][inner],
                                _b));
                        }
                    }
                }
            }
        }
    };
    for (var k in n) {
        _loop_1(k);
    }
    return Object.keys(res).length > 0
        ? res
        : null;
}
function sameEvents(newArr, oldArr) {
    var result = true;
    if (newArr.length !== oldArr.length)
        result = false;
    else {
        for (var i = 1; i < newArr.length; i++) {
            if (newArr[i] !== oldArr[i]) {
                result = false;
                break;
            }
        }
    }
    return result;
}
function comparer(n, o, d) {
    var res = {}, bind = n.bind, children = n.children, nodeType = n.nodeType, tag = n.tag, nodeValue = n.nodeValue, component = n.component, newObj = __rest(n, ["bind", "children", "nodeType", "tag", "nodeValue", "component"]), obind = o.bind, ochildren = o.children, onodeType = o.nodeType, otag = o.tag, onodeValue = o.nodeValue, ocomponent = o.component, oldObj = __rest(o, ["bind", "children", "nodeType", "tag", "nodeValue", "component"]), childrenRes = compareChilds(children, ochildren, d);
    res[d] = compareObjs(newObj, oldObj);
    if (childrenRes)
        res = Object.assign({}, res, childrenRes);
    if (nodeType !== onodeType || tag !== otag) {
        res[d] = Object.assign({}, res[d], {
            replace: n
        });
    }
    else if (nodeValue !== onodeValue) {
        res[d] = Object.assign({}, res[d], {
            nodeValue: nodeValue
        });
    }
    return Object.keys(res).length > 0
        ? res
        : null;
}
//# sourceMappingURL=index.js.map

var Component = (function () {
    function Component(vm, parent, Moon) {
        this.components = vm.components;
        this.data = vm.data;
        this.props = vm.props;
        this.render = vm.render;
        this.methods = vm.methods;
        this.watch = vm.watch;
        this.mounted = vm.mounted;
        this.created = vm.created;
        this.name = vm.name;
        this._binds = {};
        this._tickers = [];
        this.$el;
        this.$Moon = Moon;
        for (var key in Moon.$inserts) {
            this[key] = Moon.$inserts[key];
        }
        this._updateTimer = null;
        if (parent)
            this.$parent = parent;
        this._createComponent();
    }
    Component.prototype.$get = function (name) {
        var res;
        res = this.data
            ? this.data[name] ||
                this.data[name] === 0 ||
                this.data[name] === false ||
                this.data[name] === ""
                ? this.data[name]
                : this.props
                    ? this.props[name] ||
                        this.props[name] === 0 ||
                        this.props[name] === false ||
                        this.props[name] === ""
                        ? this.props[name]
                        : undefined
                    : undefined
            : this.props
                ? this.props[name] ||
                    this.props[name] === 0 ||
                    this.props[name] === false ||
                    this.props[name] === ""
                    ? this.props[name]
                    : undefined
                : undefined;
        if (isArr(res))
            res = res.slice(0);
        else if (isObj(res))
            res = Object.assign({}, res);
        return res;
    };
    Component.prototype.$set = function (name, value) {
        var _this = this;
        if (this.data[name] !== value) {
            this.__trigWatchers(name, value, this.data[name]);
            this.data[name] = value;
            clearTimeout(this._updateTimer);
            this._updateTimer = setTimeout(function () {
                var vNode = _this._updateVNode(_this.render(_this._createVnode.bind(_this)), _this._vNode);
                diff(vNode, _this._vNode, _this);
                _this._vNode = vNode;
            }, 0);
        }
    };
    Component.prototype.$emit = function (name) {
        var value = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            value[_i - 1] = arguments[_i];
        }
        this.$parent._binds[name] && this.$parent._binds[name].apply(this.$parent, value);
    };
    Component.prototype.$nextTick = function (callback) {
        this._tickers.push(callback);
    };
    Component.prototype.__trigTickers = function () {
        for (var _i = 0, _a = this._tickers; _i < _a.length; _i++) {
            var callback = _a[_i];
            callback();
        }
        this._tickers = [];
    };
    Component.prototype.__trigWatchers = function (name, val, old) {
        this.watch && this.watch[name] && this.watch[name].call(this, val, old);
    };
    Component.prototype._updateVNode = function (vNode, oldVnode) {
        vNode.children = vNode.children || [];
        for (var i = 0; i < vNode.children.length; i++) {
            if (vNode.children[i].nodeType === "component") {
                if (!(vNode.children[i].component instanceof Component)) {
                    if (oldVnode.children[i]) {
                        vNode.children[i] = Object.assign(vNode.children[i], {
                            component: oldVnode.children[i].component
                        });
                    }
                    else {
                        vNode.children[i].component = new Component(vNode.children[i].component, this, this.$Moon);
                    }
                }
            }
            else {
                this._updateVNode(vNode.children[i], oldVnode.children[i]);
            }
        }
        return vNode;
    };
    Component.prototype._createElement = function (vNode) {
        var ele;
        if (vNode.nodeType === 1) {
            ele = document.createElement(vNode.tag);
        }
        else if (vNode.nodeType === 3) {
            ele = document.createTextNode(vNode.nodeValue);
        }
        else {
            vNode.component = new Component(vNode.component, this, this.$Moon);
            ele = vNode.component.$el;
        }
        if (vNode.children) {
            for (var _i = 0, _a = vNode.children; _i < _a.length; _i++) {
                var childNode = _a[_i];
                ele.appendChild(this._createElement(childNode));
            }
        }
        setStyle(ele, vNode.style);
        setAttibutes(ele, vNode, this);
        return ele;
    };
    Component.prototype._createVnode = function (a, b, c) {
        var children = [], component, nodeType = 1;
        if (this.components && this.components[a]) {
            component = this.__deepClone(this.components[a]);
            if (b) {
                if (b.props && component.props) {
                    component.props = Object.assign(component.props, b.props);
                }
                if (b.bind) {
                    for (var key in b.bind) {
                        this._binds[key] = b.bind[key];
                    }
                }
            }
            nodeType = "component";
        }
        if (c && c.length > 0) {
            children = c.reduce(function (acc, child) {
                if (isObj(child))
                    acc.push(child);
                else
                    acc.push({ nodeType: 3, nodeValue: child, children: [] });
                return acc;
            }, []);
        }
        return __assign(__assign({ tag: a, children: children }, b), { component: component,
            nodeType: nodeType });
    };
    Component.prototype._updateChildComponent = function (props) {
        for (var k in props) {
            this.__trigWatchers(k, props[k], this.props[k]);
        }
        this.props = Object.assign(this.props, props);
        var vNode = this._updateVNode(this.render(this._createVnode.bind(this)), this._vNode);
        diff(vNode, this._vNode, this);
        this._vNode = vNode;
    };
    Component.prototype.__deepClone = function (obj) {
        var result = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (isObj(obj[key]) && !(obj[key] instanceof Component)) {
                    result[key] = this.__deepClone(obj[key]);
                }
                else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    };
    Component.prototype.__transferMethods = function () {
        Object.assign(this, __assign({}, this.methods));
    };
    Component.prototype._createComponent = function () {
        this.__transferMethods();
        this._vNode = this.render(this._createVnode.bind(this));
        this.$el = this._createElement(this._vNode);
        this.created && this.created();
    };
    return Component;
}());
//# sourceMappingURL=component.js.map

var StaticContext = (function () {
    function StaticContext() {
    }
    StaticContext.use = function (name, value) {
        this.$inserts[name] = value;
    };
    StaticContext.$inserts = {};
    return StaticContext;
}());
//# sourceMappingURL=instance.js.map

var Moon = (function (_super) {
    __extends(Moon, _super);
    function Moon(options) {
        var _this = _super.call(this) || this;
        _this.$options = Object.assign({
            el: "app",
            $el: null,
            render: null,
            autoRender: true
        }, options);
        _this._vm;
        if (!_this.$options.name) {
            _this._init("byy");
        }
        return _this;
    }
    Moon.prototype._init = function (pass) {
        if (pass === "byy") {
            this.$options.render(this._render.bind(this, "byy"));
        }
        else {
            warn("The function named [_init] is a inner function, you can't call it directly");
        }
    };
    Moon.prototype._triggerMounter = function (childs) {
        for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
            var child = childs_1[_i];
            if (child.nodeType === 'component') {
                child.component.mounted && child.component.mounted();
            }
            if (child.children) {
                this._triggerMounter(child.children);
            }
        }
    };
    Moon.prototype.$mount = function () {
        this.$options.$el.appendChild(this._vm.$el);
        this._vm.mounted && this._vm.mounted();
        this._triggerMounter(this._vm._vNode.children);
    };
    Moon.prototype._render = function (pass, component) {
        if (pass === "byy") {
            if (isObj(component)) {
                this.$options.$el = document.querySelector(this.$options.el || this.$options.el);
                this._vm = new Component(component, null, Moon);
                if (this.$options.autoRender)
                    this.$mount();
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
}(StaticContext));
//# sourceMappingURL=index.js.map

export default Moon;
