export default {
  name: "test-one",

  data: {
    msg: "test-one",
    styleColor: "red"
  },

  methods: {
    clickText() {
      this.$set('styleColor', "orange");
    }
  },

  render(c) {
    return c('div', {
      attrs: {
        className: this.$get('msg'),
        style: {
          color: this.$get('styleColor')
        }
      },
      on: {
        click: this.clickText
      }
    }, [
      this.$get('msg').toUpperCase()
    ])
  }
};