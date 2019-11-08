import TestOne from "./TestOne";

export default {
  name: "app",

  data: {
    msg: "Moon",
    spanContent: "App-Page",
    color: "red",
    upperData: "来自父亲的数据",
    asyncData: [
      {
        name: "1",
        code: "333"
      },
      {
        name: "2",
        code: "333"
      },
      {
        name: "3",
        code: "333"
      }
    ]
  },

  components: {
    "test-one": TestOne
  },

  componentDidInit() {
    // console.log('TEST-LifeCycle: 组件即将渲染', this);

    setTimeout(() => {
      let aaa = this.$get('asyncData').slice(0);
      
      aaa.splice(1, 1);
      aaa.push({name: "tnm", code: "3333"})
      aaa.splice(0, 1);
      aaa.splice(1, 1);
      aaa.push({name: "tnm213123", code: "3333"})
      console.log(aaa);
      this.$set('asyncData', aaa);
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