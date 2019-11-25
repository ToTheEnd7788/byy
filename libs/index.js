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

function compareObjs(newObjs, oldObjs) {
    var _a, _b;
    var maps = {};
    for (var key in newObjs) {
        if (isStr(newObjs[key])) {
            if (newObjs[key] !== oldObjs[key]) {
                maps = Object.assign({}, maps, (_a = {},
                    _a[key] = newObjs[key],
                    _a));
            }
        }
        else {
            if (key === 'className') {
                maps[key] = newObjs[key];
            }
            else {
                for (var inner in newObjs[key]) {
                    if (newObjs[key][inner] !== oldObjs[key][inner]) {
                        maps[key] = Object.assign({}, (maps && maps[key]), (_b = {},
                            _b[inner] = newObjs[key][inner],
                            _b));
                    }
                }
            }
        }
    }
    return maps;
}
function diffChildren(n, o, deep) {
    var m = {};
    if (n && o) {
        if (n.length === o.length) {
            for (var i = 0; i < n.length; i++) {
                var res = diffCommonAttrs(n[i], o[i], deep + "-" + i);
                if (Object.keys(res).length > 0) {
                    m = Object.assign({}, m, res);
                }
            }
        }
        else if (n.length > o.length) {
            for (var i = 0; i < n.length; i++) {
                if (i <= o.length - 1) {
                    var res = diffCommonAttrs(n[i], o[i], deep + "-" + i);
                    if (Object.keys(res).length > 0) {
                        m = Object.assign({}, m, res);
                    }
                }
            }
            m[deep] = Object.assign({}, m[deep], {
                add: n.slice(o.length - n.length)
            });
        }
        else if (n.length < o.length) {
            for (var i = 0; i < n.length; i++) {
                var res = diffCommonAttrs(n[i], o[i], deep + "-" + i);
                if (Object.keys(res).length > 0) {
                    m = Object.assign({}, m, res);
                }
            }
            m[deep] = Object.assign({}, m[deep], {
                remove: o.length - n.length
            });
        }
        return m;
    }
}
function diffCommonAttrs(_a, _b, deep) {
    var on = _a.on, bind = _a.bind, children = _a.children, nodeType = _a.nodeType, tag = _a.tag, text = _a.text, newObjs = __rest(_a, ["on", "bind", "children", "nodeType", "tag", "text"]);
    var oon = _b.on, obind = _b.bind, ochildren = _b.children, onodeType = _b.nodeType, otag = _b.tag, otext = _b.text, oldObjs = __rest(_b, ["on", "bind", "children", "nodeType", "tag", "text"]);
    var m = {};
    if (nodeType === onodeType) {
        if (nodeType === 1 || nodeType === "component") {
            if (tag === otag) {
                var attrsRes = compareObjs(newObjs, oldObjs), childrenRes = diffChildren(children, ochildren, deep);
                if (Object.keys(attrsRes).length > 0) {
                    m[deep] = Object.assign({}, m[deep], attrsRes);
                }
                if (childrenRes) {
                    m = Object.assign({}, m, childrenRes);
                }
            }
            else {
                if (nodeType === 1) {
                    m[deep] = Object.assign({}, m[deep], {
                        freshEle: deep
                    });
                }
                else if (nodeType === "component") {
                    m[deep] = Object.assign({}, m[deep], {
                        updateComponent: "7"
                    });
                }
            }
        }
        else if (nodeType === 3) {
            if (text !== otext) {
                m[deep] = Object.assign({}, m[deep], {
                    text: text
                });
            }
        }
    }
    else {
        m[deep] = Object.assign({}, m[deep], {
            freshEle: deep
        });
    }
    return m;
}
function differ(n, o, vm) {
    var paches = diffCommonAttrs(n, o, "0");
    if (Object.keys(paches).length > 0) {
        addPatch(paches, vm, n, o);
    }
}
function getTargetElement(pos, el) {
    var res = el, posList = pos.split('-');
    for (var i = 1; i < posList.length; i++) {
        res = res.childNodes[posList[i]];
    }
    return res;
}
function addPatch(paches, vm, n, o) {
    var _loop_1 = function (pos) {
        var target = getTargetElement(pos, vm.$el);
        var _loop_2 = function (key) {
            if (key === 'remove') {
                for (var i = 0; i < paches[pos][key]; i++) {
                    target.removeChild(target.lastChild);
                }
            }
            else if (key === 'add') {
                for (var i = 0; i < paches[pos][key].length; i++) {
                    if (paches[pos][key][i].nodeType === "component") {
                        var freshComponent = new Component(paches[pos][key][i].component);
                        target.appendChild(freshComponent.$el);
                    }
                    else {
                        target.appendChild(vm._createElement(paches[pos][key][i]));
                    }
                }
            }
            else if (key === 'freshEle') {
                var childs = paches[pos][key].split('-'), targetVNode = n;
                for (var i = 1; i < childs.length; i++) {
                    targetVNode = targetVNode.children[childs[i]];
                }
                if (targetVNode.nodeType === "component") {
                    targetVNode.component = new Component(targetVNode.component);
                    target.parentNode.replaceChild(targetVNode.component.$el, target);
                }
                else {
                    target.parentNode.replaceChild(vm._createElement(targetVNode), target);
                }
            }
            else if (key === 'text') {
                target.nodeValue = paches[pos][key];
            }
            else if (key === 'props') {
                var childs = pos.split("-"), targetNVNode = n, targetOVNode = o;
                for (var i = 1; i < childs.length; i++) {
                    targetNVNode = targetNVNode.children[childs[i]];
                    targetOVNode = targetOVNode.children[childs[i]];
                }
                targetOVNode.component._updateChildComponent(target, targetNVNode.component, targetOVNode.component, paches[pos][key]);
            }
            else {
                if (key === 'style') {
                    for (var styleName in paches[pos][key]) {
                        target[key][styleName] = paches[pos][key][styleName];
                    }
                }
                else if (key === 'className') {
                    if (isStr(paches[pos][key])) {
                        target[key] = paches[pos][key];
                    }
                    else {
                        var classNames = Object.keys(paches[pos][key]).filter(function (item) {
                            return paches[pos][key][item];
                        });
                        target[key] = classNames.join(" ");
                    }
                }
                else {
                    target[key] = paches[pos][key];
                }
            }
        };
        for (var key in paches[pos]) {
            _loop_2(key);
        }
    };
    for (var pos in paches) {
        _loop_1(pos);
    }
}
//# sourceMappingURL=differ.js.map

var Component = (function () {
    function Component(vm) {
        this.name = vm.name;
        this.props = vm.props;
        this.methods = vm.methods;
        this.watch = vm.watch;
        this.render = vm.render;
        this.components = vm.components;
        this.data = vm.data;
        this.created = vm.created;
        this.mounted = vm.mounted;
        this._vNode;
        this._binds;
        this._tickersList = [];
        this.$el;
        this.$parent;
        this.$fetch = this.__createFetch();
        this._patchTimer = null;
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
    Component.prototype.__setEvents = function (el, event) {
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
                handler.apply(_this, params);
            };
        };
        for (var name in event) {
            _loop_1(name);
        }
    };
    Component.prototype.__setStyle = function (el, style) {
        for (var key in style) {
            if (el.style.setAttribute)
                el.style.setAttribute(key, style[key]);
            else
                el.style[key] = style[key];
        }
    };
    Component.prototype.__setAttributes = function (el, node) {
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
                this_1.__setEvents(el, node[key]);
            }
            else if (key === 'style') {
                this_1.__setStyle(el, node[key]);
            }
            else if (key !== 'component' && key !== 'nodeType' && key !== 'children' && key !== "tag") {
                el[key] = node[key];
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
            this.__setAttributes(ele, node);
        }
        else if (node.nodeType === 3) {
            ele = document.createTextNode(node.text);
        }
        else if (node.nodeType === "component") {
            ele = node.component.$el;
        }
        if (node.children && node.children.length > 0) {
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.nodeType === "component") {
                    ele.appendChild(child.component.$el);
                }
                else {
                    ele.appendChild(this._createElement(child));
                }
            }
        }
        return ele;
    };
    Component.prototype.__transferMethods = function () {
        Object.assign(this, __assign({}, this.methods));
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
    Component.prototype._createVnode = function (a, b, c) {
        var component, type = 1, children;
        if (this.components && this.components[a]) {
            component = this.__deepClone(this.components[a]);
            if (b && b.props && component.props) {
                for (var key in component.props) {
                    if (b.props[key] || b.props[key] === false || b.props[key] === 0) {
                        component.props[key] = Object.assign(component.props[key], {
                            value: b.props[key]
                        });
                    }
                }
            }
            if (b && b.bind) {
                this._binds = Object.assign({}, this._binds, b.bind);
            }
            component = new Component(component);
            component.$parent = this;
            type = "component";
        }
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
        return __assign(__assign({ tag: a, children: children }, b), { component: component, nodeType: type });
    };
    Component.prototype.$get = function (name) {
        var res;
        if (this.data[name] ||
            this.data[name] === 0 ||
            this.data[name] === false ||
            this.data[name] === "") {
            res = this.data[name] ||
                this.data[name] === false ||
                this.data[name] === 0 ||
                this.data[name] === ""
                ? this.data[name]
                : undefined;
        }
        else {
            res =
                this.props &&
                    this.props[name]
                    ? (this.props[name].value ||
                        this.props[name].value === "" ||
                        this.props[name].value === 0 ||
                        this.props[name].value === false
                        ? this.props[name].value
                        : (this.props[name].initial ||
                            this.props[name].initial === "" ||
                            this.props[name].initial === 0 ||
                            this.props[name].initial === false
                            ? this.props[name].initial
                            : undefined))
                    : undefined;
        }
        return res;
    };
    Component.prototype.__watchTrigger = function (name, val) {
        var oldVal = this.$get(name);
        this.watch && this.watch[name] && this.watch[name].call(this, val, oldVal);
    };
    Component.prototype.$set = function (name, val) {
        var _this = this;
        if (this.data[name] !== val) {
            this.__watchTrigger(name, val);
            this.data[name] = val;
            clearTimeout(this._patchTimer);
            this._patchTimer = setTimeout(function () {
                var vNode = new Component(_this)._vNode;
                differ(vNode, _this._vNode, _this);
                _this._vNode = vNode;
                for (var _i = 0, _a = _this._tickersList; _i < _a.length; _i++) {
                    var ticker = _a[_i];
                    ticker.call(_this);
                }
                _this._tickersList = [];
            }, 0);
        }
    };
    Component.prototype.$nextTick = function (c) {
        this._tickersList.push(c);
    };
    Component.prototype.__createFetch = function () {
        var isXdr = window.XDomainRequest
            ? true
            : false, xhr = isXdr
            ? new XDomainRequest()
            : new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP"), loadedHandler = function (ok, err) {
            if (isXdr)
                ok(JSON.parse(xhr.responseText));
            else {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 304) {
                        ok(JSON.parse(xhr.responseText));
                    }
                    else {
                        err && err(xhr);
                    }
                }
            }
        };
        return {
            get: function (url, data, okHandler, errHandler) {
                var serializer = function (data) {
                    var result = "?";
                    for (var key in data) {
                        result += key + '=' + data[key] + '&';
                    }
                    return result.replace(/&$/, '');
                };
                url = "" + url + serializer(data) + "&t=" + new Date().getTime();
                xhr.open("get", url);
                xhr.send(null);
                xhr.onload = loadedHandler.bind(null, okHandler, errHandler);
                xhr.onerror = function () {
                    errHandler && errHandler(xhr);
                };
            },
            post: function (url, data, okHandler, errHandler) {
                if (data._queries && Object.keys(data._queries).length > 0) {
                    url += "?";
                    for (var key in data._queries) {
                        url += key + "=" + data._queries[key] + "&";
                    }
                    url = url.slice(0, -1);
                }
                delete data["_queries"];
                xhr.open("post", "" + url);
                xhr.send(JSON.stringify(data));
                xhr.onload = loadedHandler.bind(null, okHandler, errHandler);
                xhr.onerror = function () {
                    errHandler && errHandler(xhr);
                };
            }
        };
    };
    Component.prototype._updateChildComponent = function (el, n, o, props) {
        this.$el = el;
        for (var key in props) {
            this.__watchTrigger(key, props[key]);
        }
        var vNode = n._vNode;
        differ(vNode, o._vNode, this);
        this._vNode = vNode;
        for (var _i = 0, _a = this._tickersList; _i < _a.length; _i++) {
            var ticker = _a[_i];
            ticker.call(this);
        }
        this._tickersList = [];
    };
    Component.prototype.$emit = function (name) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        this.$parent._binds[name] && this.$parent._binds[name].apply(this.$parent, values);
    };
    Component.prototype._createComponent = function () {
        if (!this.render) {
            warn("The component named [" + this.name + "]'s render function is required");
        }
        else {
            this._patchTimer = null;
            this.__transferMethods();
            this.created && this.created();
            this._vNode = this.render(this._createVnode.bind(this));
            this.$el = this._createElement(this._vNode);
        }
    };
    return Component;
}());

var Context = (function () {
    function Context() {
    }
    Context.prototype._c = function (a) {
        return new Component(a);
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
            autoMode: true
        }, config), el = _a.el, autoRender = _a.autoRender, render = _a.render, autoMode = _a.autoMode;
        _this.el = el;
        _this.render = render;
        _this._autoMode = autoMode;
        _this.autoRender = autoRender;
        _this.children;
        _this.__init();
        return _this;
    }
    Moon.prototype._mountedTrigger = function (children) {
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            if (child.nodeType === 'component') {
                child.component.mounted && child.component.mounted();
            }
            if (child.children) {
                this._mountedTrigger(child.children);
            }
        }
    };
    Moon.prototype.$mount = function () {
        this._el = document.querySelector(this.el);
        this._el.appendChild(this.children.$el);
        this.children.mounted && this.children.mounted();
        this._mountedTrigger(this.children._vNode.children);
    };
    Moon.prototype.__init = function () {
        if (!this.el || !document.querySelector(this.el)) {
            warn("Please set valid el value, then I can get correct mounted element");
        }
        else if (!this.render) {
            warn("The render function is required, please check");
        }
        else {
            this.children = this.render(this._c.bind(this));
            if (this._autoMode) {
                this.$mount();
            }
        }
    };
    return Moon;
}(Context));
//# sourceMappingURL=index.js.map

export default Moon;
