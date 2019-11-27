export default {
  name: "test-two",

  data: {
    name: "test-two"
  },

  props: {
    name: "test-two"
  },

  render(c) {
    return c("div", {
      className: "test-two"
    }, [this.$get("name")])
  }
};