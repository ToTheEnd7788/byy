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
      } else if (key === 'className') {
        ele[key] = vNode.attrs[key].join(" ");
      } else {
        ele[key] = vNode.attrs[key];
      }
    }

    for (let name in vNode._events) {
      let isSelfEvent = /^\$.+$/;

      if (isSelfEvent.test(name)) {

      } else {
        ele[`on${name}`] = null;

        if (Array.isArray(vNode._events[name])) {
          ele[`on${name}`] = function(e) {
            let argumentList = vNode._events[name].slice(1);

            let eInstanceIndex = argumentList.findIndex(item => {
              return item === '$event';
            });

            if (eInstanceIndex > -1) {
              argumentList.splice(eInstanceIndex, 1, e);
            }

            vNode._events[name][0].apply(vm, argumentList);
          }
        } else {
          ele[`on${name}`] = vNode._events[name].bind(vm, undefined);
        }
      }
    }

    for (let child of vNode.children) {
      if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
        ele.appendChild(document.createTextNode(`${child}`));
      } else {
        // Searching in vm.components' key, if has same name with child's tag
        // We need to render and append this component element in the position
        if (vm.components) {
          let name = Object.keys(vm.components).find(tagName => {
            return tagName === child.tag;
          });
  
          if (name) {
            vm.components[name].$parent = vm;
            if (child._props) {
              for (let propName in child._props) {
                vm.components[name].props = Object.assign(vm.components[name].props, {
                  [propName]: {
                    type: vm.components[name].props[propName].type,
                    default: vm.components[name].props[propName].default,
                    value: child._props[propName]
                  }
                });
              }

              vm.components[name].vNode = vm.components[name].render(vm.components[name]._renderVNode);
            }

            if (child._binds) {
              for (let method in child._binds) {
                vm.components[name][method] = child._binds[method].bind(vm);
              }
            }

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
    if (b && b.attrs) {
      let classes = b.attrs.class || [];

      if (Array.isArray(classes)) {
        b.attrs.className = [b.attrs.className].concat(classes);
      } else if (typeof classes === 'object') {
        let classesList = Object.keys(classes).filter(name => {
          return classes[name];
        });

        b.attrs.className = [b.attrs.className].concat(classesList);
      } else {
        warn(`The attribute named [class] must be a Array or Object<string: boolean>.`);
      }

      delete b.attrs['class'];
    }

    return {
      tag: a,
      attrs: (b && b.attrs),
      _props: (b && b.props),
      _events: (b && b.on),
      _binds: (b && b.bind),
      children: c || []
    };
  }

  Moon.prototype._renderComponent = function(vm: Component) {
    vm.$get = this._get.bind(vm);
    vm.$set = this._set.bind(vm);
    vm._renderVNode = this._renderVNode;
    vm._patch = this._patch;
    vm._createELement = this._createELement;
    vm._diffAttrs = this._diffAttrs;
    vm._addPatch = this._addPatch;
    vm._updatePacher = this._updatePacher;
    vm._getTargetElement = this._getTargetElement;
    vm.$emit = this._emit;

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

  Moon.prototype._get = function(name: string): any {
    return this.data[name] || this.data[name] === false
      ? this.data[name]
      : (this.props && (this.props[name].value || this.props[name].default));
  };

  Moon.prototype._set = function(name: string, value: any) {
    this.data[name] = value;
    this._patch(this.render(this._renderVNode), this.vNode);
    this.vNode = this.render(this._renderVNode);
  }

  Moon.prototype._emit = function(name: string, ...values: any[] ) {
    this[name] && this[name].apply(this, values);
  }

  Moon.prototype._diffAttrs = function(newVal, oldVal) {
    let diff = {};
    for (let name in newVal) {
      if (Array.isArray(newVal[name])) {
        diff[name] = newVal[name];
      } else if (newVal[name] !== oldVal[name]) {
        if (typeof newVal[name] === 'object') {
          if (diff[name]) {
            diff[name] = Object.assign(
              diff[name],
              this._diffAttrs.call(this, newVal[name], oldVal[name])
            ); 
          } else {
            diff[name] = Object.assign(
              {},
              this._diffAttrs.call(this, newVal[name], oldVal[name])
            );
          }
        } else {
          diff[name] = newVal[name];
        }
      }
    }

    return diff;
  },

  Moon.prototype._updatePacher = function(el: HTMLElement, differ: any) {
    for (let name in differ) {
      if (name === 'style') {
        for (let styleName in differ[name]) {
          el.style[styleName] = differ[name][styleName];
        }
      } else if (name === 'className') {
        el[name] = differ[name].join(" ");
      } else {
        el[name] = differ[name];
      }
    }
  }

  Moon.prototype._getTargetElement = function(ele, position) {
    let list = position.split("-"),
      target = ele;

    if (list.length === 1 && /^[\d]$/.test(list[0])) {
      target = ele.parentNode.childNodes[list[0]]
    } else {
      for (let i = 1; i < list.length; i++) {
        target = target.childNodes[list[i]];
      }
    }

    return target;
  };

  Moon.prototype._addPatch = function(differ: any) {
    for (let name in differ) {
      if (name === 'update') {
        for (let position in differ[name]) {
          if (position === '0') {
            this._updatePacher(this.$el, differ[name][position]);
          } else {
            this._updatePacher(
              this._getTargetElement(this.$el, position),
              differ[name][position]
            );
          }
        }
      };
    }
  };

  Moon.prototype._patch = function(newVNode, oldVNode, index) {
    let maps = {
      update: {},
      move: {},
      insert: {}
    };

    let sign = index
      ? index
      : "0"

    if (typeof newVNode === 'string') {
      maps.update = {
        [sign]: {
          nodeValue: newVNode
        }
      };
    } else {
      if (newVNode.tag !== oldVNode.tag) {
        this.$el.parentNode.replaceChild(
          this._createELement(this, newVNode),
          this.$el
        );
      } else {
        maps.update = {
          [sign]: this._diffAttrs.call(this, newVNode.attrs, oldVNode.attrs)
        };
      }

      if (newVNode.children) {
        for (let i = 0; i < newVNode.children.length; i++) {
          this._patch.call(this, newVNode.children[i], oldVNode.children[i], `${sign}-${i}`);
        }
      }
      
    }

    this._addPatch(maps);
  }
}