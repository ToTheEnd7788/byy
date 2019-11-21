import { isObj, isStr } from "../utils/index";

class VNode {
  tag?: string;
  nodeType: number | string;
  className?: string | object;
  on?: object;
  bind: object; 
  text?: any;
  _vm?: Components;
  component?: any;
  children?: Array<VNode>;

  constructor(vm: any) {
    this.tag;
    this.nodeType;
    this.className;
    this.on;
    this.bind;
    this.text;
    this._vm;
    this.children;
    this.component;
    this._vm = vm;

    this._init();

    console.log(3333333, this);
  }

  _init() {
    this._vm.render(this._create.bind(this._vm, this));
  }

  _create(ctx, a: string, b?: any) {
      let res,
      type: number | string = 1,
      component,
      text;

    if (ctx.components && ctx.components[a]) {
    }

    this.tag = a;
    this.nodeType = type;
    this.component = ctx.components[a];
    this.on = b.on;
    this.className = b.className;
    this.text
  }
};

export default VNode;