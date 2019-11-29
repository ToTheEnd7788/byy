import { isObj, isArr } from "../utils/index";
import { diff } from "../differ/index";
import { setStyle, setAttibutes } from "../utils/setAttributes";



class Component {
  $el: HTMLElement;
  $parent?: object;
  watch?: object;
  $Moon: any;
  render: Function;
  methods?: object;
  components?: object;
  data?: object;
  props?: object;
  mounted?: Function;
  created?: Function;
  name: string;
  
  _binds?: object;
  _vNode: object;
  _updateTimer: any;
  _tickers: Array<Function>;

  constructor(vm, parent?: object, Moon?: any) {
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

    for (let key in Moon.$inserts) {
      this[key] = Moon.$inserts[key];
    }

    this._updateTimer = null;

    if (parent) this.$parent = parent;

    this._createComponent();
  }

  $get(name: string) {
    let res;

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

    if (isArr(res)) res = res.slice(0);
    else if (isObj(res)) res = Object.assign({}, res);

    return res;
  }

  $set(name: string, value: any) {
    if (this.data[name] !== value) {
      this.__trigWatchers(name, value, this.data[name]);
      this.data[name] = value;

      clearTimeout(this._updateTimer);
      this._updateTimer = setTimeout(() => {
        let vNode =
          this._updateVNode(this.render(this._createVnode.bind(this)), this._vNode);
        diff(vNode, this._vNode, this);

        this._vNode = vNode;
      }, 0);
    }
  }

  $emit(name: string, ...value) {
    this.$parent._binds[name] && this.$parent._binds[name].apply(this.$parent, value);
  }

  $nextTick(callback) {
    this._tickers.push(callback);
  }

  __trigTickers() {
    for (let callback of this._tickers) {
      callback();
    }

    this._tickers = [];
  }

  __trigWatchers(name, val, old) {
    this.watch && this.watch[name] && this.watch[name].call(this, val, old);
  }

  // Update this._vNode After $set, And Need To Keep Child<nodeType === "component">.component
  _updateVNode(vNode, oldVnode) {
    vNode.children = vNode.children || [];

    for (let i = 0; i < vNode.children.length; i++) {
      if (vNode.children[i].nodeType === "component") {
        if (!(vNode.children[i].component instanceof Component)) {
          if (oldVnode.children[i]) {
            vNode.children[i] = Object.assign(vNode.children[i], {
              component: oldVnode.children[i].component
            });
          } else {
            vNode.children[i].component = new Component(vNode.children[i].component, this, this.$Moon);
          }
        }
      } else {
        this._updateVNode(vNode.children[i], oldVnode.children[i]);
      }
    }

    return vNode;
  }

  _createElement(vNode) {
    let ele: any;

    if (vNode.nodeType === 1) {
      ele = document.createElement(vNode.tag);
    } else if (vNode.nodeType === 3) {
      ele = document.createTextNode(vNode.nodeValue);
    } else {
      vNode.component = new Component(vNode.component, this, this.$Moon);
      ele = vNode.component.$el;
    }

    if (vNode.children) {
      for (let childNode of vNode.children) {
        ele.appendChild(this._createElement(childNode));
      }
    }

    setStyle(ele, vNode.style);
    setAttibutes(ele, vNode, this);

    return ele;
  }

  _createVnode(a: string, b?: any, c?: any) {
    let children = [],
      component,
      nodeType: number | string = 1;

      if (this.components && this.components[a]) {
      component = this.__deepClone(this.components[a]);
      
      if (b) {
        if (b.props && component.props) {
          component.props = Object.assign(component.props, b.props);
        }
  
        if (b.bind) {
          for (let key in b.bind) {
            this._binds[key] = b.bind[key]
          }
        }
      }

      nodeType = "component";
    }

    if (c && c.length > 0) {
      children = c.reduce((acc, child) => {
        if (isObj(child)) acc.push(child);
        else acc.push({ nodeType: 3, nodeValue: child, children: [] });

        return acc;
      }, []);
    }

    return {
      tag: a,
      children,
      ...b,
      component,
      nodeType
    };
  }

  // Trigger By The Component Parent
  _updateChildComponent(props) {
    for (let k in props) {
      this.__trigWatchers(k, props[k], this.props[k]);
    }
    this.props = Object.assign(this.props, props);
    let vNode = this._updateVNode(this.render(this._createVnode.bind(this)), this._vNode);

    diff(vNode, this._vNode, this);

    this._vNode = vNode;
  }

  __deepClone(obj) {
    let result = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (isObj(obj[key]) && !(obj[key] instanceof Component)) {
          result[key] = this.__deepClone(obj[key]);
        } else {
          result[key] = obj[key];
        }
      }
    }

    return result;
  }

  __transferMethods() {
    Object.assign(this, {
      ...this.methods
    });
  }

  _createComponent() {
    this.__transferMethods();
    this._vNode = this.render(this._createVnode.bind(this));
    this.$el = this._createElement(this._vNode);

    this.created && this.created();
  }
};

export { Component };