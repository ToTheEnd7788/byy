import { isObj, isStr, warn } from "../utils/index";
import differ from "./differ";


class Component {
  vm: Components | any;
  eventFilter: object;

  constructor(vm: Vm) {
    this.vm = vm;

    this.eventFilter = {
      stop: e => {
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
      },

      prevent: e => {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }
    };

    this._createComponent();
  }

  _setEvents(el: HTMLElement, event: object): void {
    for (let name in event) {
      let [n, type] = name.split('.'),
        [handler, ...params] = event[name];

      el[`on${n}`] = null;

      el[`on${n}`] = e => {
        let evt = e || window.event;

        if (type) {
          this.eventFilter[type] && this.eventFilter[type](evt);
        }

        params = params.reduce((acc, item) => {
          if (item === '$event') acc.push(evt);
          else acc.push(item);
          return acc;
        }, []);

        handler.apply(this.vm, params);
      }
    }
  }

  _setStyle(el: HTMLElement, style: object) {
    for (let key in style) {
      el.style[key] = style[key];
    }
  }

  _setAttributes(el: HTMLElement, node: object) {
    for (let key in node) {
      if (key === 'className') {
        if (isObj(node[key])) {
          el[key] = Object.keys(node[key]).filter(item => {
            return node[key][item];
          }).join(" ");
        } else if (isStr(node[key])) {
          el[key] = node[key];
        } else {
          warn(`The className must be string or object`);
        }
      } else if (key === 'on') {
        this._setEvents(el, node[key]);
      } else if (key === 'style') {
        this._setStyle(el, node[key]);
      } else if (key === 'attrs') {
        for (let attr in node[key]) {
          el[attr] = node[key][attr];
        }
      }
    }
  }

  _createElement(node: Vnode) {
    let ele;

    if (node.nodeType === 1) {
      ele = document.createElement(node.tag);

      this._setAttributes(ele, node);
    } else if (node.nodeType === 3) {
      ele = document.createTextNode(node.text);
    } else if (node.nodeType === "component") {
      ele = this.vm.components[node.tag].$el;
    }

    if (node.children && node.children.length > 0) {
      for (let child of node.children) {
        ele.appendChild(this._createElement(child));
      }
    }

    return ele;
  }

  __transferMethods() {
    this.vm = Object.assign(this.vm, {
      ...this.vm.methods
    });
  }

  _createVnode(a: string, b?: object, c?: Array<Vnode>) {
    let children,
      result;

    if (c && c.length > 0) {
      children = c.reduce((acc, item) => {
        if (isObj(item)) {
          acc.push(item)
        } else {
          acc.push({
            nodeType: 3,
            text: item
          })
        }
        return acc;
      }, []);
    }

    if (this.components && this.components[a]) {
      this.components[a].$parent = this;

      if (b.props && this.components[a].props) {
        for (let key in this.components[a].props) {
          if (b.props[key] || b.props[key] === false || b.props[key] === 0) {
            this.components[a].props[key] = Object.assign(this.components[a].props[key], {
              value: b.props[key]
            })
          }
        }
      }

      if (b.bind) {
        this._binds = Object.assign({}, this._binds, b.bind);
      }

      result = {
        tag: a,
        ...b,
        children: children,
        nodeType: "component"
      };

      this.components[a] = new Component(this.components[a]).vm;
    } else {
      result = {
        tag: a,
        ...b,
        children: children,
        nodeType: 1
      };
    }

    return result
  }

  _get(name: string) {
    return this.data[name] || this.data[name] === false || this.data[name] === 0
      ? this.data[name]
      : (this.props && this.props[name].value || this.props[name].initial);
  }

  _set(name: string, val: any) {
    if (this.data[name] !== val) {
      this.data[name] = val;
      
      clearTimeout(this._patchTimer);
      this._patchTimer = setTimeout(() => {
        let vNode = this.render(this._createVnode.bind(this));

        differ(vNode, this._vNode, this);
      }, 5)
    }
  }

  _updateChildComponent() {

  }

  _emit(name: string, ...values: any[]) {
    this.$parent._binds[name] && this.$parent._binds[name].apply(this, values);
  }

  _createComponent() {
    if (!this.vm.render) {
      warn(`The compoennt named [${this.vm.name}]'s render function is required`);
    } else {
      this.vm._createVnode = this._createVnode;
      this.$emit = this._emit;
      this.vm._patchTimer = null;
      this.__transferMethods();
      this.vm.created && this.vm.created();
      
      this.vm.$get = this._get;
      this.vm.$set = this._set;
      this.vm._vNode = this.vm.render(this._createVnode.bind(this.vm));
      this.vm.$el = this._createElement(this.vm._vNode);

      console.log(33333, this.vm);
    }
  }
};

export default Component;