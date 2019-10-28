export default {
  name: "app",

  data: {
    msg: "Moon",
    spanContent: "App-Page"
  },

  componentWillInit() {
    // console.log('TEST-LifeCycle: 组件即将渲染', this);
  },

  methods: {
    test(e) {
      this.$set('msg', "libiao")
      console.log(this.$get('msg'));
    }
  },

  render(h) {
    return h('div', {
      attrs: {
        id: this.msg,
        style: {
          color: "red"
        },
        className: "byy-test"
      },
    }, [
      h('span', {
        attrs: {
          className: "ccc"
        },
        on: {
          click: this.test
        }
      }, [
        this.spanContent
      ])
    ]);
  }
};