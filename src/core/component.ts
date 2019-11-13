import Context from "./context";

class Component extends Context {
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
    this.$el;
    this.name = "123";
    this.props;
    this.methods;
    this.watch;
    this.computed;
    this.vNode;
    this.$emit;
    this.$on;
    this.$nextTick;
    this.$get;
    this.$set;
    this.$parent;
    this.data;
    this.created;
    this.mounted;
  }
};

export default Component;