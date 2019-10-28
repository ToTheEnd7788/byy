export default {
  name: "test-one",

  data: {
    msg: "test-one"
  },

  render(c) {
    return c('div', {
      attrs: {
        className: this.$get('msg')
      },
    }, [
      this.$get('msg').toUpperCase()
    ])
  }
};