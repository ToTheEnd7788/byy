import TestThree from "./TestThree";

export default {
  name: "test-one",

  data: {
    child: "test-one"
  },

  components: {
    "test-three": TestThree
  },

  props: {
    name: "test-one",
    byy: "aaa",
    id: ""
  },

  methods: {
    test() {
      this.$emit("clickedFromTestOne", this.$get('name'));
    }
  },

  mounted() {
    // console.log("test-one__mounted", this.BYY);
  },

  render(c) {
    return c('div', {
      className: "test-one",
      on: {
        "click.stop": [this.test]
      },
      style: {
        borderBottom: "1px solid red"
      }
    }, [
      c('p', {
        on: {
          "click.stop": [this.test]
        },
        className: "test-one__three"
      }, [`${this.$get('id')}-${this.$get('name')}`])
    ])
  }
};