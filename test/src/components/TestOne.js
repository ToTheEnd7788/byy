export default {
  name: "test-one",

  data: {
    msg: "test-one",
    styleColor: "red",
    isBoldText: false
  },

  props: {
    upperData: {
      type: String,
      default: "123"
    }
  },

  methods: {
    clickText(a, e) {
      console.log(999999, a);
      console.log(888888, e);
      this.$set('styleColor', "orange");
      this.$set('msg', "TestOne123123");

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
        click: [this.clickText, "arguments[0]", "$event"]
      }
    }, [
      this.$get('msg'),
      c('div', {
        attrs: {
          style: {
            color: "orange"
          }
        }
      }, [this.$get('upperData')])
    ])
  }
};