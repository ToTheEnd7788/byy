import Moon from "../../libs/index";

import App from "./components/App.js";

new Moon({
  el: "#app",
  render: (c) => {
    return c(App);
  }
});