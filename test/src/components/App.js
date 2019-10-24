
export default {
  name: "app",

  data() {
    return {
      msg: "Moon"
    };
  },

  methods: {
    test() {
      console.log(3333333, this.msg);
    }
  },

  render(h) {
    return h('div', {
      staticClass: "app-page",
      style: {
        color: "red",
        id: this.data().msg
      }
    }, ["App-Page"]);
  }
};