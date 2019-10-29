function initMoon(Moon) {
    Moon.prototype._init = function (options) {
        var el = options.el, render = options.render;
        this._el = el;
        console.log(11111, render(this._createElement.bind(this)));
    };
    Moon.prototype._createElement = function (a, b, c) {
        if (typeof a === 'object') {
            a.$get = this._get.bind(a);
            a.$set = this._set.bind(a);
            if (a.children) {
                a.children.push(this._createElement.bind(this));
            }
            else {
                a.children = [a.render(this._createElement.bind(this))];
            }
        }
        else {
            var vNode = {
                tag: a,
                attrs: b.attrs,
                children: c
            };
        }
        return a;
    };
    Moon.prototype._get = function (name) {
        return this.data[name];
    };
    Moon.prototype._set = function (name, value) {
        this.data[name] = value;
    };
}

function warn(content) {
    console.error("[ Moon Warning ]:\n" + content);
}
//# sourceMappingURL=index.js.map

function Moon(options) {
    if (!(this instanceof Moon)) {
        warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
}
initMoon(Moon);
//# sourceMappingURL=index.js.map

export default Moon;
