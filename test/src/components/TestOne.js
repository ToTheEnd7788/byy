export default {
  name: "test-one",

  data: {
    child: "test-one2"
  },

  created() {
    // console.log("child-created", this);
    // setTimeout(() => {
    //   this.$set('child', "byy")
    // },3000)
  },

  mounted() {
    // console.log(33333333, this);
  },

  watch: {
    name(val, old) {
      console.log(777777, val, old, this);
    },

    age(val, old) {
      console.log("age:", val, old, this);
    }
  },

  props: {
    name: {
      type: String,
      initial: "Byy"
    },

    age: {
      type: Number,
      initial: 33
    }
  },

  render(c) {
    return c('div', {
      className: "test-one",
    }, [
      this.$get("name"),
      // c('div', {}, [
      //   this.$get('age')
      // ]), 
      // this.$get('child')
    ])
  }
};