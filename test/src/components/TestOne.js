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

  watch: {
    styleColor(newVal, oldVal) {
      console.log(newVal, oldVal, this);
    }
  },

  methods: {
    clickText(a, e) {
      this.$set('styleColor', "orange");
      this.$set('msg', "TestOne123123");
      this.$set('msg',a);
      this.$nextTick(() => {
        // console.log(33, this.$el);
      })

      // this.$emit("triggerParentTestMethod", "byy", "wmd");
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
        "click.stop": [this.clickText, "arguments[0]", "$event"]
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