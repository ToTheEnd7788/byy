export default {
  name: "test-one",

  data() {
    return {
      child: "test-one2"
    };
  },

  created() {
    // console.log("child-created", this);
  },

  props: {
    name: {
      type: String,
      initial: "Byy"
    }
  },

  render(c) {
    return c('div', {
      className: "test-one",
      attrs: {
        id: "test-byy"
      }
    }, [this.$get("child")])
  }
};