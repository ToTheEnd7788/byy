export default {
  name: "test-three",

  props: {
    name: "test-three",
    byy: "haha"
  },

  render(c) {
    return c('div', {
      className: "test-three"
    }, [`${this.name}--${this.byy}`])
  }
};