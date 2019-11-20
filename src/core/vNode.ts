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

  _create(ctx, a: string, b?: any, c?: Array<VNode>) {
    let children,
      res;

    if (c && c.length > 0) {
      children = c.reduce((acc, item, index) => {
        if (isObj(item)) acc.push(item);
        else acc.push({nodeType: 3, text: item})
        return acc;
      }, []);
    }

    ctx.tag = a;
    ctx.children = children;

    if (this.components && this.components[a]) {
      ctx.nodeType = "component";
      ctx.component = this.components[a];
    } else {
      ctx.nodeType = 1;
    }


  }
};

export default VNode;