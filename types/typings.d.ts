interface Vnode {
  key?: string;
  tag?: string;
  nodeType: number;
  attrs?: object;
  className?: string | object;
  on?: object;
  bind?: object;
  children?: Array<Vnode>;
}

interface CreateVNode {
  (a: string, b: object, c: Array<any>): Vnode;
}

interface Render {
  (c: Function): Vnode
}
declare class Configs {
  el: string;
  render: Render;
  autoRender?: Boolean;
}

declare class Components {
  $el: HTMLElement;
  name: string;
  props: object;
  methods: object;
  watch: object;
  computed: object;
  vNode: Vnode;
  $emit: Function;
  $on: Function;
  $nextTick: Function;
  $get: Function;
  $set: Function;
  $parent: Function;
  data: Function;
  created: Function;
  mounted: Function;
}