/// <reference path="../../../types/typings.d.ts">
import { warn } from "../../../publics/index";
import { transformMethods, transformDatas } from "./compiler";
export function initMoon(Moon) {
  Moon.prototype._init = function(options: Options) {
    let { el, render } = options;

    this._el = el;
    this.vm = render(this._render.bind(this));
    this.vm._el = document.querySelector(this._el);
    this.$el = this.vm.$el;

    document.querySelector(this._el).appendChild(this.$el);
    this._didInitRunner(this.vm);

  };

  Moon.prototype._didInitRunner = function(vm) {
    vm.componentDidInit && vm.componentDidInit();
    if (vm.components) {
      for (let key in vm.components) {
        vm.components[key]._rootEl = vm._rootEl;
        this._didInitRunner(vm.components[key]);
      }
    }
  }

  Moon.prototype._render = function(vm: Component) {
    vm = this._renderComponent(vm);
    vm.$el = this._createELement(vm);
    vm._rootEl = vm.$el;
    return vm;
  }

  Moon.prototype._updateElement = function(vNode, vm, ele) {
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
          let eventsBedecks = {
            "stop": function(e) {
              if (e.stopPropagation) e.stopPropagation();
              else e.cancelBubble = true;

            },
            "prevent": function(e) {
              if (e.preventDefault) e.preventDefault();
              else e.returnValue = false;
            }
          };

          let eventNameInfo = name.split('.'),
            bedeckHandler = null,
            eventName = name;

          if (eventNameInfo.length > 1) {
            eventName = eventNameInfo[0];
            if (eventsBedecks[eventNameInfo[1]]) {
              bedeckHandler = eventsBedecks[eventNameInfo[1]];
            } else {
              warn(`You have used a invalid bedecker named [${eventNameInfo[1]},\nPlease check "${JSON.stringify(Object.keys(eventsBedecks))}"`);
            }
          }

          ele[`on${eventName}`] = null;
          ele[`on${eventName}`] = function(e) {
            let evt = e || window.event;

            if (bedeckHandler) bedeckHandler(evt);
              let argumentList = vNode._events[name].slice(1),
              eInstanceIndex = argumentList.findIndex(item => {
                return item === '$event';
              });

            if (eInstanceIndex > -1) {
              argumentList.splice(eInstanceIndex, 1, evt);
            }

            vNode._events[name][0].apply(vm, argumentList);
          }
        } else {
          warn(`The event named [${name}] must be a Array<handler, ...params>`);
        }
      }
    }

    return ele;
  }

  Moon.prototype._createELement = function(vm, isChild, node) {
    let ele,
      vNode = isChild
        ? node
        : vm.vNode;

    if (typeof vNode !== "object") {
      ele = document.createTextNode(`${vNode}`);
    } else {
      ele = document.createElement(vNode.tag);
      this._updateElement(vNode, vm, ele);

      if (vNode.children) {
        for (let node of vNode.children) {
          if (vm.components) {
            let name = Object.keys(vm.components).find(item => {
              return node.tag && (node.tag === item);
            });
  
            if (name) {
              vm.components[name].$parent = vm;
              if (node._props) {
                for (let propName in node._props) {
                  vm.components[name].props = Object.assign(vm.components[name].props, {
                    [propName]: {
                      type: vm.components[name].props[propName].type,
                      defaults: vm.components[name].props[propName].defaults,
                      value: node._props[propName]
                    }
                  });
                  

                  if (!vm._childTrigger) {
                    vm._childTrigger = {};
                    vm._childTrigger[name] = [propName];
                  } else {
                    if (!vm._childTrigger[name]) {
                      vm._childTrigger[name] = [propName];
                    } else {
                      vm._childTrigger[name].push(propName);
                    }
                  }
                }
  
                vm.components[name].vNode = vm.components[name].render(vm.components[name]._renderVNode);
                vm.components[name].vNode._originTag = name;

                if (node._binds) {
                  for (let method in node._binds) {
                    vm.components[name][method] = node._binds[method].bind(vm);
                  }
                }
              }

              ele.appendChild(vm.components[name]._createELement(vm.components[name]));
            } else {
              ele.appendChild(vm._createELement(vm, true, node));
            }
          } else {
            ele.appendChild(vm._createELement(vm, true, node));
          }
        }
      }
    }

    vm.$el = ele;
    return ele;
  };

  Moon.prototype._renderVNode = function(a: any, b: any, c: any) {
    if (b && b.attrs) {
      let classes = b.attrs.classes || [];

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
  }

  Moon.prototype._renderComponent = function(vm: Component) {
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
    vm._updateElement = this._updateElement;
    vm.$emit = this._emit;
    vm.$nextTick = this._nextTick;
    vm._queueTicker = [];
    vm._updateChildProps = this._updateChildProps;
    transformMethods(vm);
    
    if (vm.components) {
      for (let key in vm.components) {
        vm.components[key] = this._renderComponent(vm.components[key]);
      }
    }

    if (vm.render) {
      vm.vNode = vm.render(vm._renderVNode);
    } else {
      warn(`The component render function is required, in [${vm.name}]`);
    }

    return vm;
  }

  Moon.prototype._updateChildProps = function() {
    function _getValue(childs, compName, propName) {
      let result = {has: false, value: null};

      for (let i = 0; i < childs.length; i++) {
        if (childs[i].tag === compName) {
          result = {
            value: childs[i]._props[propName],
            has: true
          };
        } else {
          if (childs[i].children && childs[i].children.length > 0) {
            let { has, value } = _getValue(childs[i].children, compName, propName);
            if (has) {
              result = {
                has,
                value
              }

              break;
            }
          }
        }
      }

      return result;
    }

    for (let compName in this._childTrigger) {
      for (let propName of this._childTrigger[compName]) {
        this.components[compName].props &&
        this.components[compName].props[propName] &&
        this.components[compName].$set(propName, _getValue.call(this, this.vNode.children, compName, propName).value);
      }
    }
  };

  Moon.prototype._get = function(name: string): any {
    return this.data[name] || this.data[name] === false || this.data[name] === 0
      ? this.data[name]
      : (this.props && (this.props[name].value || this.props[name].defaults));
  };

  Moon.prototype._set = function(name: string, value: any) {
    let patchCtrl = function() {
      clearTimeout(this._setterTimer);
      this._setterTimer = null;

      // Delay to update dom tree
      this._setterTimer = setTimeout(() => {
        this._patch(this.render(this._renderVNode), this.vNode);
        this.vNode = this.render(this._renderVNode);

        // maybe nextTick function need to put here to run
        for (let i = 0; i < this._queueTicker.length; i++) {
          this._queueTicker[i]();
        }

        this._queueTicker = [];

        this._updateChildProps();
      }, 10);
    }
    if (this.data.hasOwnProperty(name)) {
      if (this.data[name] !== value) {
        // Trig watch
        if (this.watch) {
          this.watch[name] && this.watch[name].call(this, value, this.data[name]);
        }

        this.data[name] = value;
        patchCtrl.call(this);
      }
    } else {
      if (this.props && this.props[name] && this.props[name].value !== value) {
        if (this.watch) {
          let oldValue = this.props[name].value || this.props[name].defaults;
          this.watch[name] && this.watch[name].call(this, value, oldValue);
        }
        this.props[name].value = value;
        patchCtrl.call(this);
      }
    }
  }

  Moon.prototype._nextTick = function(callback: Function) {
    this._queueTicker.push(callback);
  };

  Moon.prototype._emit = function(name: string, ...values: any[] ) {
    this.$parent[name] && this.$parent[name].apply(this, values);
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
          this._createELement(this),
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