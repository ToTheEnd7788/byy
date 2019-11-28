import TestOne from "./TestOne";
// import TestTwo from "./TestTwo";

export default {
  name: "app",

  data: {
    msg: "Moon",
    spanContent: "App-Page",
    name1: "byy",
    name2: "byy-1",

    id: "",

    list: [
      {
        name: "lb-1",
        id: 1
      },
      {
        name: "lb-2",
        id: 2
      },
      {
        name: "lb-3",
        id: 3
      }
    ]
  },

  components: {
    "test-one": TestOne
  },

  methods: {
    clicked() {
      let temp = this.$get('list');

      temp.unshift({
        name: "77777",
        id: 7
      });

      this.$set('list', temp);
    },

    clickedFromTestOne(name) {
      console.log("From Child", name);
    },

    renderTestOne(c) {
      return this.$get('list').map(item => {
        return c('test-one', {
          bind: {
            clickedFromTestOne: this.clickedFromTestOne
          },
          props: {
            name: item.name,
            byy: item.id
          }
        })
      })
    }
  },

  render(c) {
    return c('div', {
      className: {
        "app": true,
        "hide": true
      },
      on: {
        "click.stop": [this.clicked]
      },
      style: {
        color: "white",
        padding: "40px",
        background: "green",
        borderRadius: "8px",
        marginLeft: "20px"
      }
    }, [
      c('div', {
        className: "aaaa"
      }, this.renderTestOne(c))
    ])
  }
};