import TestOne from "./TestOne";

export default {
  name: "app",

  data: {
    msg: "Moon",
    spanContent: "App-Page",
    color: "green",
    tagName: "span",
    list: [
      {
        name: "111",
        id: 1
      },
      {
        name: "222",
        id: 2
      },
      {
        name: "333",
        id: 3
      },
      {
        name: "444",
        id: 4
      }
    ]
  },

  components: {
    "test-one": TestOne
  },

  watch: {
    msg(val, old) {
      console.log('watch:', val, old, this);
    }
  },

  created() {
    // console.log(3333333, 666, this);
  },

  mounted() {
    console.log("mounted", this.name);
  },

  methods: {
    test(e, data) {
      console.log("parent", e, data);
    },

    childClicked(a) {
      // let temp = this.$get('list').slice(0);
      // temp.splice(2, 0, {
      //   name: "77777777",
      //   id: 7
      // }, {
      //   name: "88888888",
      //   id: 8
      // });

      // this.$set('list', temp);
      // this.$set('color', "red");
      this.$set('msg', "byyyyyyy");

      this.$nextTick(() => {
        console.log(4444444, this.$el);
      });
    },

    // 模拟渲染列表
    renderList(c) {
      return this.$get('list').map(item => {
        return c('test-one', {
          props: {
            name: item.name
          }
        });
      });
    }
  },

  render(c) {
    return c('div', {
      className: {
        "app": true,
        "hide": true
      },
      style: {
        color: "orange",
        padding: "40px"
      },
      on: {
        "click": [this.test, "$event", 33]
      }
    }, [
      c('div', {
        className: this.$get('msg'),
        style: {
          color: this.$get('color')
        }
      }, ["byy"]),
      ...this.renderList(c),
      c(this.$get('tagName'), {
        className: "app-span",
        style: {
          padding: "5px 10px",
          background: this.$get("color"),
          color: "white",
          borderRadius: "8px",
          display: "inline-block"
        },
        on: {
          "click.stop": [this.childClicked, "byy"]
        }
      }, [
        this.$get('msg')
        // c("test-one", {
        //   props: {
        //     name: this.$get('msg')
        //   },
        //   bind: {
        //     "emitFromChild": this.test
        //   }
        // })
      ])
    ])
  }
};