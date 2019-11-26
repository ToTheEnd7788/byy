import TestOne from "./TestOne";

export default {
  name: "app",

  data: {
    msg: "Moon",
    spanContent: "App-Page"
  },

  render(c) {
    return c('div', {
      className: {
        "app": true,
        "hide": true
      },
      style: {
        color: "orange",
        padding: "40px"
      }
    }, [
      123123
    ])
  }
};