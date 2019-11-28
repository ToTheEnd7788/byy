import TestOne from "./TestOne";
// import TestTwo from "./TestTwo";

export default {
  name: "app",

  data: {
    msg: "Moon",
    spanContent: "App-Page",
    name1: "byy",
    name2: "byy-1",

    id: "",

    list: [
      {
        name: "lb-1",
        id: 1
      },
      {
        name: "lb-2",
        id: 2
      },
      {
        name: "lb-3",
        id: 3
      }
    ]
  },

  components: {
    "test-one": TestOne,
    // "test-two": TestTwo
  },

  mounted() {
    // console.log(3333, "App-mounted");
  },

  watch: {
    name1(val, old) {
      console.log("watch-app", val, old);
    }
  },

  methods: {
    // test-one组件上报的事件
    trigFromChild(name, child) {
      console.log("From Child", name, child);
    },

    clicked(id) {
      if (this.$get('id') !== id) this.$set('id', id);
      else this.$set('id', "");
    }
  },

  render(c) {
    return c('div', {
      className: {
        "app": true,
        "hide": true
      },
      on: {
        "click.stop": [this.clicked]
      },
      style: {
        color: "white",
        padding: "40px",
        background: "green",
        borderRadius: "8px",
        marginLeft: "20px"
      }
    }, [
      c('div', {
        className: "aaaa"
      }, [
        c('test-one', {
          bind: {
            clickedFromTestOne: this.clicked
          },
          props: {
            id: this.$get('id'),
            name: "1"
          }
        }),
        c('test-one', {
          bind: {
            clickedFromTestOne: this.clicked
          },
          props: {
            id: this.$get('id'),
            name: "2"
          }
        })
      ])
    ])
  }
};