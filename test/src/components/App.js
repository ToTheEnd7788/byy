import TestOne from "./TestOne";

export default {
  name: "app",

  data: {
    msg: "Moon",
    spanContent: "App-Page",
    color: "red",
    upperData: "来自父亲的数据",
    asyncData: "123"
  },

  components: {
    "test-one": TestOne
  },

  componentDidInit() {
    // console.log('TEST-LifeCycle: 组件即将渲染', this);

    setTimeout(() => {
      this.$set('asyncData', "456")
    }, 1000)
  },

  methods: {
    test(name1, name2) {
      this.$set('msg', `${name1}@${name2}`);
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
        click: [this.test, "libiao", "wmd"]
      },
    }, [
      h('div', {
        attrs: {
          className: "app__aaa"
        }
      }),
      this.$get("asyncData"),
      h('test-one', {
        props: {
          asyncData: this.$get("asyncData")
        }
      })
    ])
  }
};