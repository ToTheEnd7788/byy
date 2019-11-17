export default {
  name: "test-one",

  data: {
    child: "test-one2"
  },

  created() {
    // console.log("child-created", this);
    setTimeout(() => {
      this.$set('child', "byy")
    },3000)
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
    }, [
      this.$get("name"),
      this.$get('child')
    ])
  }
};