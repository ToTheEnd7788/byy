import { isObj, isStr, warn } from "../utils/index";
import differ from "./differ";
import VNode from "./vNode";


class Component {
  render: Render;
  name: string;
  props: object;
  methods: object;
  watch: object;
  components: object;
  _vNode: Vnode;
  _patchTimer: any;
  _binds: object;
  _tickersList: Array<Function>;
  data: object;
  created: Function;
  mounted: Function;

  $el: HTMLElement;
  $parent: Component;
  $fetch: object;


  eventFilter: object;

  constructor(vm: Vm) {
    this.name = vm.name;
    this.props = vm.props;
    this.methods = vm.methods;
    this.watch = vm.watch;
    this.render = vm.render;
    this.components = vm.components;
    this.data = vm.data;
    this.created = vm.created;
    this.mounted = vm.mounted;
    
    this._vNode;
    this._binds;
    this._tickersList = [];
    this.$el;
    this.$parent;
    this.$fetch = this.__createFetch()
    this._patchTimer = null;

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

  __setEvents(el: HTMLElement, event: object): void {
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

        handler.apply(this, params);
      }
    }
  }

  __setStyle(el: HTMLElement, style: object) {
    for (let key in style) {
      if (el.style.setAttribute) el.style.setAttribute(key, style[key]);
      else el.style[key] = style[key];
    }
  }

  __setAttributes(el: HTMLElement, node: object) {
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
        this.__setEvents(el, node[key]);
      } else if (key === 'style') {
        this.__setStyle(el, node[key]);
      } else if (key !== 'component' && key !== 'nodeType' && key !== 'children' && key !== "tag") {
        el[key] = node[key];
      }
    }
  }

  _createElement(node) {
    let ele;

    if (node.nodeType === 1) {
      ele = document.createElement(node.tag);
      this.__setAttributes(ele, node);
    } else if (node.nodeType === 3) {
      ele = document.createTextNode(node.text);
    } else if (node.nodeType === "component") {
      ele = node.component.$el;
    }
    
    if (node.children && node.children.length > 0) {
      for (let child of node.children) {
        if (child.nodeType === "component") {
          ele.appendChild(child.component.$el);
        } else {
          ele.appendChild(this._createElement(child));
        }
      }
    }

    return ele;
  }

  __transferMethods() {
    Object.assign(this, {
      ...this.methods
    });
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

  _createVnode(a: string, b?: any, c?: Array<Vnode>) {
    let component,
      type: number | string = 1,
      children;

    if (this.components && this.components[a]) {
      component = this.__deepClone(this.components[a]);

      if (b && b.props && component.props) {
        for (let key in component.props) {
          if (b.props[key] || b.props[key] === false || b.props[key] === 0) {
            component.props[key] = Object.assign(component.props[key], {
              value: b.props[key]
            });
          }
        }
      }

      if (b && b.bind) {
        this._binds = Object.assign({}, this._binds, b.bind);
      }

      component = new Component(component);
      component.$parent = this;

      type = "component";
    }

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

    return  {
      tag: a,
      children,
      ...b,
      component,
      nodeType: type
    };
  }

  $get(name: string) {
    let res;

    if (
      this.data[name] ||
      this.data[name] === 0 ||
      this.data[name] === false ||
      this.data[name] === ""
    ) {
      res = this.data[name] ||
        this.data[name] === false ||
        this.data[name] === 0 ||
        this.data[name] === ""
          ? this.data[name]
          : undefined;
    } else {
      res =
        this.props &&
        this.props[name]
          ? (
            this.props[name].value ||
            this.props[name].value === "" ||
            this.props[name].value === 0 ||
            this.props[name].value === false
              ? this.props[name].value
              : (
                  this.props[name].initial ||
                  this.props[name].initial === "" ||
                  this.props[name].initial === 0 ||
                  this.props[name].initial === false
                    ? this.props[name].initial
                    : undefined
                )
          )
          : undefined;
    }

    return res;
  }

  __watchTrigger(name, val) {
    let oldVal = this.$get(name);

    this.watch && this.watch[name] && this.watch[name].call(this, val, oldVal);
  }

  $set(name: string, val: any) {
    if (this.data[name] !== val) {
      this.__watchTrigger(name, val);
      this.data[name] = val;
      
      clearTimeout(this._patchTimer);
      this._patchTimer = setTimeout(() => {
        let vNode = new Component(this)._vNode;
        differ(vNode, this._vNode, this);
        this._vNode = vNode;

        for (let ticker of this._tickersList) {
          ticker.call(this);
        }

        this._tickersList = [];
      }, 0);
    }
  }

  $nextTick(c: Function) {
    this._tickersList.push(c);
  }

  __createFetch() {
    let isXdr = window.XDomainRequest
      ? true
      : false,
      xhr = isXdr
        ? new XDomainRequest()
        : new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP"),

        loadedHandler = (ok, err) => {
          if (isXdr) ok(JSON.parse(xhr.responseText));
          else {
            if (xhr.readyState === 4) {
              if (xhr.status === 200 || xhr.status === 304) {
                ok(JSON.parse(xhr.responseText));
              } else {
                err && err(xhr);
              }    
            }
          }
        }

    return {
      get: (url, data, okHandler, errHandler) => {
        let serializer = (data) => {
          var result = "?";
      
          for (var key in data) {
            result += key + '=' + data[key] + '&';
          }
      
          return result.replace(/&$/, '');
        }

        url = `${url}${serializer(data)}&t=${new Date().getTime()}`;

        xhr.open("get", url);
        xhr.send(null);

        xhr.onload = loadedHandler.bind(null, okHandler, errHandler)

        xhr.onerror = () => {
          errHandler && errHandler(xhr);
        };
      },

      post: (url, data, okHandler, errHandler) => {
        if (data._queries && Object.keys(data._queries).length > 0) {
          url += "?"
          for (let key in data._queries) {
            url += `${key}=${data._queries[key]}&`
          }
          url = url.slice(0, -1);
        }

        delete data["_queries"];

        xhr.open("post", `${url}`);
        xhr.send(JSON.stringify(data));

        xhr.onload = loadedHandler.bind(null, okHandler, errHandler);
    
        xhr.onerror = () => {
          errHandler && errHandler(xhr);
        };
      }
    };
  }

  _updateChildComponent(el, n, o, props) {
    this.$el = el;
    for (let key in props) {
      this.__watchTrigger(key, props[key]);
    }

    let vNode = n._vNode;

    differ(vNode, o._vNode, this);
    this._vNode = vNode;

    for (let ticker of this._tickersList) {
      ticker.call(this);
    }

    this._tickersList = [];
  }

  $emit(name: string, ...values: any[]) {
    this.$parent._binds[name] && this.$parent._binds[name].apply(this.$parent, values);
  }

  _createComponent() {
    if (!this.render) {
      warn(`The component named [${this.name}]'s render function is required`);
    } else {
      this._patchTimer = null;
      this.__transferMethods();
      this.created && this.created();
      this._vNode = this.render(this._createVnode.bind(this));
      this.$el = this._createElement(this._vNode);
    }
  }
};

export default Component;