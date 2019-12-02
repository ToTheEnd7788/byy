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

    list: []
  },

  mounted() {
    let list = [
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
    ];

    setTimeout(() => {
      this.$set('list', list);
    }, 2000);
  },

  components: {
    "test-one": TestOne
  },

  methods: {
    clickedFromTestOne(name) {
      console.log(777777, name);
    },

    renderTestOne(c) {
      return this.$get('list').map(item => {
        return c('test-one', {
          props: {
            id: item.id,
            name: item.name
          },
          bind: {
            clickedFromTestOne: this.clickedFromTestOne
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