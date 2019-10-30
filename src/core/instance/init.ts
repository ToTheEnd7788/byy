/// <reference path="../../../types/typings.d.ts">
import { warn } from "../../../publics/index";
import { transformMethods, transformDatas } from "./compiler";
export function initMoon(Moon) {
  Moon.prototype._init = function(options: Options) {
    let { el, render } = options;

    this._el = el;
    this.$el = render(this._render.bind(this)).$el;

    document.querySelector(this._el).appendChild(this.$el);
  };

  Moon.prototype._render = function(vm: Component) {
    vm = this._renderComponent(vm);
    vm.$el = this._createELement(vm);

    return vm;
  }

  Moon.prototype._createELement = function(vm: Component, child: any) {
    let vNode = child
      ? (child.vNode
          ? child.vNode
          : child)
      : vm.vNode,
      ele = document.createElement(vNode.tag);

    for (let key in vNode.attrs) {
      if (key === 'style') {
        for (let styleName in vNode.attrs[key]) {
          ele.style[styleName] = vNode.attrs[key][styleName];
        }
      } else {
        ele[key] = vNode.attrs[key];
      }
    }

    for (let name in vNode._events) {
      let isSelfEvent = /^\$.+$/;

      if (isSelfEvent.test(name)) {

      } else {
        ele[`on${name}`] = null;
        ele[`on${name}`] = vNode._events[name];
      }
    }

    for (let child of vNode.children) {
      if (typeof child === 'string') {
        ele.appendChild(document.createTextNode(child));
      } else {
        // Searching in vm.components' key, if has same name with child's tag
        // We need to render and append this component element in the position
        if (vm.components) {
          let name = Object.keys(vm.components).find(tagName => {
            return tagName === child.tag;
          });
  
          if (name) {
            vm.components[name].$parent = vm;
            vm.components[name].$el = this._createELement(vm, vm.components[name]);
            ele.appendChild(vm.components[name].$el);
          } else {
            ele.appendChild(this._createELement(vm, child));
          }
        } else {
          ele.appendChild(this._createELement(vm, child));
        }
      }
    }

    return ele;
  };

  Moon.prototype._renderVNode = function(a: any, b: any, c: any) {
    return {
      tag: a,
      attrs: (b && b.attrs),
      _events: (b && b.on),
      children: c || []
    };
  }

  Moon.prototype._renderComponent = function(vm: Component) {
    vm.$get = this._get.bind(vm);
    vm.$set = this._set.bind(vm);
    vm._renderVNode = this._renderVNode;
    vm._patch = this._patch;
    vm._createELement = this._createELement;
    vm._compareAttrs = this._compareAttrs;

    transformMethods(vm);
    
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
    this._patch(this.render(this._renderVNode), this.vNode);
  }

  Moon.prototype._compareAttrs = function(newVal, oldVal) {
    let attrs = {};

    if (typeof newVal === 'string') {
      if (newVal !== oldVal) {
        attrs = newVal;
      }
    } else {
      for (let newName in newVal) {
        let result = this._compareAttrs.call(this, newVal[newName], oldVal[newName]);
        // console.log(333333, typeof result === 'string');
        if (Object.keys(result).length > 0) {
          if (attrs[newName]) {
            attrs[newName].push({
              position: 0,
              name: newName,
              value: result
            })
          } else {
            attrs[newName] = [{
              position: 0,
              name: newName,
              value: result
            }];
          }
        }
      }
    }

    return attrs;
  },

  Moon.prototype._patch = function(newVNode, oldVNode) {
    let maps = {
      update: {},
      move: {},
      insert: {}
    };

    if (newVNode.tag !== oldVNode.tag) {
      this.$el.parentNode.replaceChild(
        this._createELement(this, newVNode),
        this.$el
      );
    } else {
      // console.log(22222, newVNode.attrs, oldVNode.attrs);
      // update:style
      // update:className
      // update:attribute
      // move:
      // insert:position/begin/end

      console.log(999999, this._compareAttrs.call(this, newVNode.attrs, oldVNode.attrs));
    }

    console.log(2222222, maps);
  }
}