/// <reference path="../../../types/typings.d.ts">
import { warn } from "../../../publics/index";
import { transformMethods, transformDatas } from "./compiler";
export function initMoon(Moon) {
  Moon.prototype._init = function(options: Options) {
    let { el, render } = options;

    this._el = el;

    console.log(33333, render(this._render.bind(this)));
  };

  Moon.prototype._render = function(vm: Component) {
    vm = this._renderComponent(vm);

    console.log(22222, this._createELement(vm));
  }

  Moon.prototype._createELement = function(vm: Component) {
    console.log(77777,vm);
    let ele = document.createElement(vm.vNode.tag);

    for (let key in vm.vNode.attrs) {
      if (key === 'style') {
        for (let styleName in vm.vNode.attrs[key]) {
          ele.style[styleName] = vm.vNode.attrs[key][styleName];
        }
      } else {
        ele[key] = vm.vNode.attrs[key];
      }
    }

    for (let child of vm.vNode.children) {
      if (typeof child === 'string') {
        ele.appendChild(document.createTextNode(child));
      } else {
        // Searching in vm.components' key, if has same name with child's tag
        // We need to render and append this component element in the position
        let name = Object.keys(vm.components).find(tagName => {
          return tagName === child.tag;
        });

        if (name) {
          ele.appendChild(this._createELement(vm.components[name]));
        }
      }
    }

    return ele;
  };

  Moon.prototype._renderVNode = function(a: any, b: any, c: any) {
    return {
      tag: a,
      attrs: b && b.attrs,
      children: c || []
    };
  }

  Moon.prototype._renderComponent = function(vm: Component) {
    vm.$get = this._get.bind(vm);
    vm.$set = this._set.bind(vm);
    vm._renderVNode = this._renderVNode;
    
    if (vm.components) {
      for (let key in vm.components) {
        vm[key] = this._renderComponent(vm.components[key]);
      }
    }

    if (vm.render) {
      vm.vNode = vm.render(vm._renderVNode);
    } else {
      warn(`The component render function is required, in [${vm.name}]`);
    }

    return vm;
  }

  Moon.prototype._get = function(name: string) {
    return this.data[name];
  };

  Moon.prototype._set = function(name: string, value: any) {
    this.data[name] = value;
  }
}