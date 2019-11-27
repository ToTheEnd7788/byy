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
        addPatch(paches, vm, n, o);
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
                var component = getTargetComponent(o, p);
                component._updateChildComponent(paches[p][k]);
            }
            else if (k === "style") {
                setStyle(targetEle, paches[p][k]);
            }
            else if (k === "replace") ;
            else if (k === "remove") {
                for (var i = 0; i < paches[p][k]; i++) {
                    var lastChild = targetEle.childNodes[targetEle.childNodes.length - 1];
                    targetEle.removeChild(lastChild);
                }
            }
            else if (k === "delete") {
                targetEle.parentNode.removeChild(targetEle.parentNode);
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
            n = n.slice(o.length - n.length);
            res[d] = Object.assign({}, res[d], {
                add: n
            });
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
                    if (n[k][inner] !== o[k][inner]) {
                        res[k] = Object.assign({}, res[k], (_b = {},
                            _b[inner] = n[k][inner],
                            _b));
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
function comparer(n, o, d) {
    var res = {}, on = n.on, bind = n.bind, children = n.children, nodeType = n.nodeType, tag = n.tag, nodeValue = n.nodeValue, component = n.component, newObj = __rest(n, ["on", "bind", "children", "nodeType", "tag", "nodeValue", "component"]), oon = o.on, obind = o.bind, ochildren = o.children, onodeType = o.nodeType, otag = o.tag, onodeValue = o.nodeValue, ocomponent = o.component, oldObj = __rest(o, ["on", "bind", "children", "nodeType", "tag", "nodeValue", "component"]), childrenRes = compareChilds(children, ochildren, d);
    res[d] = compareObjs(newObj, oldObj);
    if (childrenRes)
        res = Object.assign({}, res, childrenRes);
    if (nodeType !== onodeType || tag !== otag) {
        res[d] = Object.assign({}, res[d], {
            repalce: n
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

var Component = (function () {
    function Component(vm, parent) {
        this.components = vm.components;
        this.data = vm.data;
        this.props = vm.props;
        this.render = vm.render;
        this.methods = vm.methods;
        this.watch = vm.watch;
        this.mounted = vm.mounted;
        this.name = vm.name;
        this.$el;
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
            this.data[name] = value;
            clearTimeout(this._updateTimer);
            this._updateTimer = setTimeout(function () {
                var vNode = _this.render(_this._createVnode.bind(_this));
                diff(vNode, _this._vNode, _this);
                _this._updateVNode(vNode);
                _this._vNode = vNode;
            }, 0);
        }
    };
    Component.prototype._updateVNode = function (vNode) {
        for (var i = 0; i < vNode.children.length; i++) {
            if (vNode.children[i].nodeType === "component") {
                vNode.children[i].component = this._vNode.children[i].component;
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
            vNode.component = new Component(vNode.component, this);
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
                    acc.push({ nodeType: 3, nodeValue: child });
                return acc;
            }, []);
        }
        return __assign(__assign({ tag: a, children: children }, b), { component: component,
            nodeType: nodeType });
    };
    Component.prototype._updateChildComponent = function (props) {
        this.props = Object.assign(this.props, props);
        var vNode = this.render(this._createVnode.bind(this));
        diff(vNode, this._vNode, this);
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
    };
    return Component;
}());
//# sourceMappingURL=component.js.map

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
    Moon.prototype._triggerMounter = function (component) {
        component.mounted && component.mounted();
        var vNode = component._vNode, children = vNode.children;
        if (vNode.nodeType === "component") {
            vNode.component.mounted && vNode.component.mounted();
        }
        if (children) {
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                if (child.nodeType === "component") {
                    this._triggerMounter(child.component);
                }
            }
        }
    };
    Moon.prototype._render = function (pass, component) {
        if (pass === "byy") {
            if (isObj(component)) {
                this.$options.$el = document.querySelector(this.$options.el || this.$options.el);
                this._vm = new Component(component);
                this.$options.$el.appendChild(this._vm.$el);
                this._triggerMounter(this._vm);
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
