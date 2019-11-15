import TestOne from "./TestOne";

export default {
  name: "app",

  data: {
    msg: "Moon",
    spanContent: "App-Page"
  },

  components: {
    "test-one": TestOne
  },

  created() {
    // console.log(3333333, 666, this);
  },

  methods: {
    test(e, data) {
      console.log("parent", e, data);
    },
    childClicked(a) {
      this.$set('msg', a);
    }
  },

  render(c) {
    return c('div', {
      className: {
        "app": true,
        "hide": true
      },
      attrs: {
        placeholder: "byy"
      },
      style: {
        color: "orange",
        padding: "40px"
      },
      on: {
        "click": [this.test, "$event", 33]
      }
    }, [
      this.$get('spanContent'),
      c('span', {
        className: "app-span",
        style: {
          padding: "5px 10px",
          background: "green",
          color: "white",
          borderRadius: "8px",
          display: "inline-block"
        },
        on: {
          "click.stop": [this.childClicked, "byy"]
        }
      }, [
        c("test-one", {
          props: {
            name: this.$get('msg')
          },
          bind: {
            "emitFromChild": this.test
          }
        })
      ])
    ])
  }
};