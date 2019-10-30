interface Data {
  (): Object;
}

interface ParentComponent {
  (): Component;
}

interface Ctrl {
  (name: string, value?: any): void;
}

interface $WATCHER_CALLBACK {
  (newVal: any, oldVal: any): void;
}

interface VNode {
  tag: string;
  children: Array<VNode>;
  attrs?: Object;
  on?: Object;
  bind?: Object;
  _events: Object;
}

interface Options {
  el: string;
  name: string;
  render: Function;
}

interface Component {
  $el: HTMLElement;
  $set: Ctrl;
  $get: Ctrl;
  $on: Function;
  $emit: Function;
  $nextTick: Function;
  $parent: ParentComponent;
  vNode: VNode;
  data?: Data;
  components: Object;
  methods?: Object;
  props?: Object;
  watch?: Object;
  name?: string;
  component: Component;
  componentWillInit?: Function;
  componentDidInit?: Function;
  componentWillUpdate?: Function;
  componentDidUpdate?: Function;
  componentWillDestroy?: Function;
  componentDidDestroy?: Function;
  render?: Function;
  _renderVNode: Function;
  children: Array<Component>;
  _createELement: Function;
  _compareAttrs: Function;
  _createVnode: Function;
  _patch: Function
}