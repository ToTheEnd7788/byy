declare type Vnode = {
  key?: string;
  tag?: string;
  nodeType: number | string;
  attrs?: object;
  className?: string | object;
  on?: object;
  bind?: object;
  children?: Array<Vnode>;
  text?: any;
  component?: Components;
}

declare type CreateVNode = {
  (a: string, b: object, c: Array<any>): Vnode;
}

declare type Render = {
  (c: Function): Vnode
}
declare type Configs = {
  el: string;
  render: Render;
  autoRender?: Boolean;
}

declare type Vm = {
  name: string;
  props: object;
  methods: object;
  watch: object;
  render: Render;
  components: object;
  computed: object;
  _vNode: Vnode;
  data: object;
  created: Function;
  mounted: Function;
}

declare interface Components extends Vm  {
  $el: HTMLElement;
  $emit: Function;
  $on: Function;
  $nextTick: Function;
  $get: Function;
  $set: Function;
  $parent: Function;
  __deepClone: Function;
}