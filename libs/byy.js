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
        this.vm = render(this._render.bind(this));
        this.$el = this.vm.$el;
        document.querySelector(this._el).appendChild(this.$el);
        this._didInitRunner(this.vm);
    };
    Moon.prototype._didInitRunner = function (vm) {
        vm.componentDidInit && vm.componentDidInit();
        if (vm.components) {
            for (var key in vm.components) {
                this._didInitRunner(vm.components[key]);
            }
        }
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
                    ele.style.setProperty(styleName, vNode.attrs[key][styleName]);
                }
            }
            else if (key === 'className') {
                ele[key] = vNode.attrs[key].join(" ");
            }
            else {
                ele[key] = vNode.attrs[key];
            }
        }
        var _loop_1 = function (name) {
            var isSelfEvent = /^\$.+$/;
            if (isSelfEvent.test(name)) ;
            else {
                ele["on" + name] = null;
                if (Array.isArray(vNode._events[name])) {
                    var eventsBedecks = {
                        "stop": function (e) {
                            if (e.stopPropagation)
                                e.stopPropagation();
                            else
                                e.cancelBubble = true;
                        },
                        "prevent": function (e) {
                            if (e.preventDefault)
                                e.preventDefault();
                            else
                                e.returnValue = false;
                        }
                    };
                    var eventNameInfo = name.split('.'), bedeckHandler_1 = null, eventName = name;
                    if (eventNameInfo.length > 1) {
                        eventName = eventNameInfo[0];
                        if (eventsBedecks[eventNameInfo[1]]) {
                            bedeckHandler_1 = eventsBedecks[eventNameInfo[1]];
                        }
                        else {
                            warn("You have used a invalid bedecker named [" + eventNameInfo[1] + ",\nPlease check \"" + JSON.stringify(Object.keys(eventsBedecks)) + "\"");
                        }
                    }
                    ele["on" + eventName] = null;
                    ele["on" + eventName] = function (e) {
                        var evt = e || window.event;
                        if (bedeckHandler_1)
                            bedeckHandler_1(evt);
                        var argumentList = vNode._events[name].slice(1), eInstanceIndex = argumentList.findIndex(function (item) {
                            return item === '$event';
                        });
                        if (eInstanceIndex > -1) {
                            argumentList.splice(eInstanceIndex, 1, evt);
                        }
                        vNode._events[name][0].apply(vm, argumentList);
                    };
                }
                else {
                    warn("The event named [" + name + "] must be a Array<handler, ...params>");
                }
            }
        };
        for (var name in vNode._events) {
            _loop_1(name);
        }
        var _loop_2 = function (child_1) {
            var _a;
            if (typeof child_1 === 'string' || typeof child_1 === 'number' || typeof child_1 === 'boolean') {
                ele.appendChild(document.createTextNode("" + child_1));
            }
            else {
                if (vm.components) {
                    var name = Object.keys(vm.components).find(function (tagName) {
                        return tagName === child_1.tag;
                    });
                    if (name) {
                        vm.components[name].$parent = vm;
                        if (child_1._props) {
                            for (var propName in child_1._props) {
                                vm.components[name].props = Object.assign(vm.components[name].props, (_a = {},
                                    _a[propName] = {
                                        type: vm.components[name].props[propName].type,
                                        defaults: vm.components[name].props[propName].defaults,
                                        value: child_1._props[propName]
                                    },
                                    _a));
                                if (!vm._childTrigger) {
                                    vm._childTrigger = {};
                                    vm._childTrigger[name] = [propName];
                                }
                                else {
                                    vm._childTrigger[name].push(propName);
                                }
                            }
                            vm.components[name].vNode = vm.components[name].render(vm.components[name]._renderVNode);
                            vm.components[name].vNode._originTag = name;
                        }
                        if (child_1._binds) {
                            for (var method in child_1._binds) {
                                vm.components[name][method] = child_1._binds[method].bind(vm);
                            }
                        }
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
            _loop_2(child_1);
        }
        return ele;
    };
    Moon.prototype._renderVNode = function (a, b, c) {
        if (b && b.attrs) {
            var classes_1 = b.attrs.classes || [];
            if (Array.isArray(classes_1)) {
                b.attrs.className = [b.attrs.className].concat(classes_1);
            }
            else if (typeof classes_1 === 'object') {
                var classesList = Object.keys(classes_1).filter(function (name) {
                    return classes_1[name];
                });
                b.attrs.className = [b.attrs.className].concat(classesList);
            }
            else {
                warn("The attribute named [class] must be a Array or Object<string: boolean>.");
            }
            delete b.attrs['classes'];
        }
        return {
            tag: a,
            attrs: (b && b.attrs),
            _props: (b && b.props),
            _events: (b && b.on),
            _binds: (b && b.bind),
            children: c || []
        };
    };
    Moon.prototype._renderComponent = function (vm) {
        vm.componentWillInit && vm.componentWillInit();
        vm.$get = this._get.bind(vm);
        vm.$set = this._set.bind(vm);
        vm._renderVNode = this._renderVNode;
        vm._patch = this._patch;
        vm._createELement = this._createELement;
        vm._diffAttrs = this._diffAttrs;
        vm._addPatch = this._addPatch;
        vm._updatePacher = this._updatePacher;
        vm._getTargetElement = this._getTargetElement;
        vm._setterTimer = null;
        vm.$emit = this._emit;
        vm.$nextTick = this._nextTick;
        vm._queueTicker = [];
        vm._updateChildProps = this._updateChildProps;
        transformMethods(vm);
        if (vm.components) {
            for (var key in vm.components) {
                vm.components[key] = this._renderComponent(vm.components[key]);
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
    Moon.prototype._updateChildProps = function () {
        function _getValue(childs, compName, propName) {
            var value;
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].tag === compName) {
                    value = childs[i]._props[propName];
                    break;
                }
                else {
                    if (childs[i].children && childs.length > 0) {
                        value = _getValue(childs[i].children, compName, propName);
                    }
                }
            }
            return value;
        }
        for (var compName in this._childTrigger) {
            for (var _i = 0, _a = this._childTrigger[compName]; _i < _a.length; _i++) {
                var propName = _a[_i];
                this.components[compName].props &&
                    this.components[compName].props[propName] &&
                    this.components[compName].$set(propName, _getValue.call(this, this.vNode.children, compName, propName));
            }
        }
    };
    Moon.prototype._get = function (name) {
        return this.data[name] || this.data[name] === false
            ? this.data[name]
            : (this.props && (this.props[name].value || this.props[name].defaults));
    };
    Moon.prototype._set = function (name, value) {
        var pathCtrl = function () {
            var _this = this;
            clearTimeout(this._setterTimer);
            this._setterTimer = null;
            this._setterTimer = setTimeout(function () {
                _this._patch(_this.render(_this._renderVNode), _this.vNode);
                _this.vNode = _this.render(_this._renderVNode);
                for (var i = 0; i < _this._queueTicker.length; i++) {
                    _this._queueTicker[i]();
                }
                _this._queueTicker = [];
                _this._updateChildProps();
            }, 10);
        };
        if (this.data.hasOwnProperty(name)) {
            if (this.data[name] !== value) {
                if (this.watch) {
                    this.watch[name] && this.watch[name].call(this, value, this.data[name]);
                }
                this.data[name] = value;
                pathCtrl.call(this);
            }
        }
        else {
            if (this.props && this.props[name] && this.props[name].value !== value) {
                if (this.watch) {
                    var oldValue = this.props[name].value || this.props[name].defaults;
                    this.watch[name] && this.watch[name].call(this, value, oldValue);
                }
                this.props[name].value = value;
                pathCtrl.call(this);
            }
        }
    };
    Moon.prototype._nextTick = function (callback) {
        this._queueTicker.push(callback);
    };
    Moon.prototype._emit = function (name) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        this[name] && this[name].apply(this, values);
    };
    Moon.prototype._diffAttrs = function (newVal, oldVal) {
        var diff = {};
        for (var name in newVal) {
            if (Array.isArray(newVal[name])) {
                diff[name] = newVal[name];
            }
            else if (newVal[name] !== oldVal[name]) {
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
                    el[name] = differ[name].join(" ");
                }
                else {
                    el[name] = differ[name];
                }
            }
        };
    Moon.prototype._getTargetElement = function (ele, position) {
        var list = position.split("-"), target = ele;
        if (list.length === 1 && /^[\d]$/.test(list[0])) {
            target = ele.parentNode.childNodes[list[0]];
        }
        else {
            for (var i = 1; i < list.length; i++) {
                target = target.childNodes[list[i]];
            }
        }
        return target;
    };
    Moon.prototype._addPatch = function (differ) {
        for (var name in differ) {
            if (name === 'update') {
                for (var position in differ[name]) {
                    if (position === '0') {
                        this._updatePacher(this.$el, differ[name][position]);
                    }
                    else {
                        this._updatePacher(this._getTargetElement(this.$el, position), differ[name][position]);
                    }
                }
            }
        }
    };
    Moon.prototype._patch = function (newVNode, oldVNode, index) {
        var _a, _b;
        var maps = {
            update: {},
            move: {},
            insert: {}
        };
        var sign = index
            ? index
            : "0";
        if (typeof newVNode === 'string') {
            maps.update = (_a = {},
                _a[sign] = {
                    nodeValue: newVNode
                },
                _a);
        }
        else {
            if (newVNode.tag !== oldVNode.tag) {
                this.$el.parentNode.replaceChild(this._createELement(this, newVNode), this.$el);
            }
            else {
                maps.update = (_b = {},
                    _b[sign] = this._diffAttrs.call(this, newVNode.attrs, oldVNode.attrs),
                    _b);
            }
            if (newVNode.children) {
                for (var i = 0; i < newVNode.children.length; i++) {
                    this._patch.call(this, newVNode.children[i], oldVNode.children[i], sign + "-" + i);
                }
            }
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
