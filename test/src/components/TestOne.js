export default {
  name: "test-one",

  data: {
    msg: "test-one",
    styleColor: "red",
    isBoldText: true
  },

  methods: {
    clickText() {
      this.$set('styleColor', "orange");
      this.$set('msg', "TestOne");
    }
  },

  render(c) {
    return c('div', {
      attrs: {
        className: this.$get('msg'),
        class: {
          "test-one--bold": this.$get('isBoldText')
        },
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