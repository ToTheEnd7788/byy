import TestOne from "./TestOne";
import TestTwo from "./TestTwo";

export default {
  name: "app",

  data: {
    msg: "Moon",
    spanContent: "App-Page",
    name1: "byy",
    name2: "byy-1",

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
    "test-one": TestOne,
    "test-two": TestTwo
  },

  mounted() {
    // this.$set('name1', "BYY");
    // // this.$set('name2', "BYY-2")

    // setTimeout(() => {
    //   this.$set('name1', "77776766767676")
    // }, 1500);
  },

  methods: {
    // test-one组件上报的事件
    trigFromChild(name, child) {
      console.log("From Child", name, child);
    },

    clicked() {
      // let temp = this.$get('list');
      // // temp.splice(2, 1, {
      // //   name: "99999999",
      // //   id: 9
      // // },{
      // //   name: "wwwwwwwww",
      // //   id: "www"
      // // });

      // temp.push({
      //   name: "99999999",
      //   id: 9
      // })

      // temp.push({
      //   name: "wwwwwwwww",
      //   id: "www"
      // });

      // this.$set('list', temp);
    },

    renderTestOne(c) {
      return this.$get('list').map(item => {
        return c('test-one', {
          bind: {
            clickedFromTestOne: this.trigFromChild
          },
          props: {
            name: item.name,
            byy: item.id
          }
        })
      });
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
    }, this.renderTestOne(c))
  }
};