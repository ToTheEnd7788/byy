import TestThree from "./TestThree";

export default {
  name: "test-one",

  data: {
    child: "test-one66666"
  },

  components: {
    "test-three": TestThree
  },

  props: {
    name: "test-one",
    byy: "aaa"
  },

  mounted() {
    // console.log("test-one__mounted", this);
  },

  render(c) {
    return c('div', {
      className: "test-one",
      style: {
        borderBottom: "1px solid red"
      }
    }, [
      c('p', {
        className: "test-one__three"
      }, [
        c('test-three', {
          props: {
            name: this.$get('name'),
            byy: this.$get('byy')
          }
        }
      )])
    ])
  }
};