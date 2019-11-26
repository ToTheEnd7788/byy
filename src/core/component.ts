import { isObj, isStr, warn } from "../utils/index";
import differ from "./differ";
import VNode from "./vNode";
import Moon from "./index";


class Component {
  $el: HTMLElement;
  $options: any;
  watch: object;
  _vm: any;
  _vNode: object;
  _propsData: object;

  constructor(vm, options) {
    this.$options = options;
    this._vm = vm;
    this._propsData;

    this._createComponent();
  }

  _createElement(vNode) {
    let ele: any;

    if (vNode.nodeType === 1) {
      ele = document.createElement(vNode.tag);
    } else if (vNode.nodeType === 3) {
      ele = document.createTextNode(vNode.value);
    } else {

    }

    if (vNode.children) {
      for (let childNode of vNode.children) {
        ele.appendChild(this._createElement(childNode));
      }
    }

    return ele;
  }

  _createVnode(a: string, b?: object, c?: any) {
    let children = [];

    if (c && c.length > 0) {
      children = c.reduce((acc, child) => {
        if (isObj(child)) acc.push(child);
        else acc.push({ nodeType: 3, value: child });

        return acc;
      }, []);
    }

    return {
      tag: a,
      children,
      ...b,
      nodeType: 1
    };
  }

  $mount() {
    this.$options.$el.parentNode.replaceChild(this.$el, this.$options.$el);
  }

  // Used By Component Self
  _updateChildComponent() {

  }

  _createComponent() {
    this._vNode = this._vm.render(this._createVnode.bind(this._vm));
    this.$el = this._createElement(this._vNode);
    this.$mount();
  }
};

export default Component;