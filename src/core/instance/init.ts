/// <reference path="../../../types/typings.d.ts">
import { warn } from "../../../publics/index";
import { transformMethods, transformDatas } from "./compiler";
export function initMoon(Moon) {
  Moon.prototype._init = function(options: Options) {
    // 
    this._initOptions(options);
  };

  Moon.prototype._initOptions = function(options: Options) {
    let { el, render } = options;
    let _el: HTMLElement | null = document.querySelector(el);

    if (!_el) {
      warn(`The mounted element is not exsist, please check < el: ${el} >`);
      return;
    }

    if (!render) {
      warn(`The component's render function is required`);
      return;
    }

    this._el = _el;
    let frag = document.createDocumentFragment();
    this._el
      .appendChild(this._createFragment(render(this._createElement.bind(this))));
  };

  Moon.prototype._createFragment = function(vNode) {
    let ele;

    if (typeof vNode === 'string') {
      ele = document.createTextNode(vNode);
    } else {
      ele = document.createElement(vNode.tag);
    }

    for (let key in vNode.attrs) {
      if (key === 'style') {
        for (let styleName in vNode.attrs.style) {
          ele.style[styleName] = vNode.attrs.style[styleName]; 
        }
      } else {
        ele[key] = vNode.attrs[key];
      }
    }

    for (let evt in vNode.on) {
      if (/^\$.+$/.test(evt)) {

      } else {
        ele[`on${evt}`] = null;
        ele[`on${evt}`] = vNode.on[evt];
      }
    }

    if (vNode.children && vNode.children.length > 0) {
      for (let node of vNode.children) {
        ele.appendChild(this._createFragment(node));
      }
    }
    
    return ele;
  };

  Moon.prototype._patch = function(oldVNode: VNode, newVNode: VNode) {
    console.log(33333, oldVNode);
    console.log(44444, newVNode);
  }

  Moon.prototype._set = function(name: string, value: any) {
    if (this.data[name] !== value) {
      this[name] = value;

      this._patch(this.vNode, this.render(this._createElement));
      // need to change this instance's vnode to newVNode, after patched
      // ... ...
    }
  }

  Moon.prototype._get = function(name: string) {
    return this[name];
  }

  Moon.prototype._createElement = function(a: any, b: any, c: any ) {
    let vNode: any = {};

    if (typeof a === 'object') {
      const vm: Component = a;

      if (vm.render) {
        vm.componentWillInit.call(vm);

        transformDatas(vm);
        transformMethods(vm);

        vNode = vm.render(this._createElement.bind(this));
        vm.vNode = vNode;
        vm.$get = this._get.bind(vm);
        vm.$set = this._set.bind(vm);
        vm._createElement = this._createElement;
        vm._patch = this._patch;
      }
    } else {
      vNode.tag = a;
      vNode.attrs = b.attrs || {};
      vNode.on = b.on || {};
      vNode.children = c || [];
    }

    return vNode;
  }
};