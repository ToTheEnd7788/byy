class Component extends Components {
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
  constructor() {
    super();
    this.name = "123123";
  }

  test(name?: string) {
    this.name = "123123";
  }
};

export default Component;