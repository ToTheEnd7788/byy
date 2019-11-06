/// <reference path="../../../types/typings.d.ts">
import { warn } from "../../../publics/index";
import { transformMethods, transformDatas } from "./compiler";
export function initMoon(Moon) {
  Moon.prototype._init = function(options: Options) {
    let { el, render } = options;

    this._el = el;
    this.vm = render(this._render.bind(this));
    this.$el = this.vm.$el;

    document.querySelector(this._el).appendChild(this.$el);
    this._didInitRunner(this.vm);

  };

  Moon.prototype._didInitRunner = function(vm) {
    vm.componentDidInit && vm.componentDidInit();

    if (vm.components) {
      for (let key in vm.components) {
        this._didInitRunner(vm.components[key]);
      }
    }
  }

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
          ele.style.setProperty(styleName, vNode.attrs[key][styleName]);
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
                    defaults: vm.components[name].props[propName].defaults,
                    value: child._props[propName]
                  }
                });

                if (!vm._childTrigger) {
                  vm._childTrigger = {};
                  vm._childTrigger[name] = [propName];
                } else {
                  vm._childTrigger[name].push(propName);
                }
              }

              vm.components[name].vNode = vm.components[name].render(vm.components[name]._renderVNode);
              vm.components[name].vNode._originTag = name;
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
    let _getValue = function(child, compName, propName) {
      let value;

      for (let i = 0; i < child.length; i++) {
        if (child[i].tag === compName) {
          value = child[i]._props && child[i]._props[propName];
          break;
        } else {
          if (child[i].children && child[i].children.length > 0) {
            value = _getValue(child[i].children, compName, propName);
          }
        }
      }

      return value;
    }

    for (let compName in this._childTrigger) {
      for (let propName of this._childTrigger[compName]) {
        this.components[compName].props &&
        this.components[compName].props[propName] &&
        this.components[compName].$set(propName, _getValue.call(this, this.vNode.children, compName, propName));

        // console.log(4444444, _getValue.call(this.vNode.children, compName, propName));
      }
    }
  };

  Moon.prototype._get = function(name: string): any {
    return this.data[name] || this.data[name] === false
      ? this.data[name]
      : (this.props && (this.props[name].value || this.props[name].defaults));
  };

  Moon.prototype._set = function(name: string, value: any) {
    console.log(111111, name, value, this);
    if (this.data[name] !== value) {
      // Trig watch
      if (this.watch) {
        this.watch[name] && this.watch[name].call(this, this.data[name], value);
      }

      // Trig child component $set with props
      if (this.data.hasOwnProperty(name)) {
        this.data[name] = value;
      } else {
        this.props && this.props[name] && (this.props[name].value = value);
      }
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
  }

  Moon.prototype._nextTick = function(callback: Function) {
    this._queueTicker.push(callback);
  };

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