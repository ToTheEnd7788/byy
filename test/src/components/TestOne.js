export default {
  name: "test-one",

  data: {
    msg: "test-one",
    styleColor: "red",
    isBoldText: false
  },

  methods: {
    clickText() {
      this.$set('styleColor', "orange");
      this.$set('msg', "TestOne");

      this.$emit("triggerParentTestMethod", "byy", "wmd");
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