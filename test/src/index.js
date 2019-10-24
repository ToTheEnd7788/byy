import Moon from "../../libs/byy";

import App from "./components/App.js";

new Moon({
  el: "#app",
  render: createElement => createElement(App)
});