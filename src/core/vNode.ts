import { isObj, isStr } from "../utils/index";

class VNode {
  tag?: string;
  nodeType: number | string;
  className?: string | object;
  on?: object;
  bind: object; 
  text?: any;
  component?: Components;
  children?: Array<VNode>;

  constructor(component: any) {
    this.tag;
    this.nodeType;
    this.className;
    this.on;
    this.bind;
    this.text;
    this.component;
    this.children;
    this.component = component;

    this._init();
  }

  _init() {
    this.component.render(this._create.bind(this.component));
  }

  _create(a: string, b?: any, c?: Array<VNode>) {
    console.log(333333333, a, b, c);
  }
};

export default VNode;