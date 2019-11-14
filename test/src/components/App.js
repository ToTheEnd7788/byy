import TestOne from "./TestOne";

export default {
  name: "app",

  data() {
    return {
      msg: "Moon",
      spanContent: "App-Page"
    };
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
      console.log('child', a);
      this.$set('msg', "moon");
    }
  },

  render(c) {
    return c('div', {
      className: "app",
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
      this.$get('msg'),
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
          }
        })
      ])
    ])
  }
};