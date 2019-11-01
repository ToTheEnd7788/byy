import TestOne from "./TestOne";

export default {
  name: "app",

  data: {
    msg: "Moon",
    spanContent: "App-Page",
    color: "red"
  },

  components: {
    "test-one": TestOne
  },

  componentWillInit() {
    // console.log('TEST-LifeCycle: 组件即将渲染', this);
  },

  methods: {
    test(name1, name2) {
      console.log(11111, name1, name2);
    }
  },

  render(h) {
    return h('div', {
      attrs: {
        className: "app",
        style: {
          color: this.$get('color')
        }
      },
      on: {
        // click: this.test
      },
      bind: {
        "triggerParentTestMethod": this.test
      }
    }, [
      h('span', {
        attrs: {
          className: "app-span"
        }
      }, [
        this.$get('msg'),
        h('test-one')
      ])
    ])
  }
};