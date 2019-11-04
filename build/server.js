import express from "express";
import path from "path";
import fs from "fs";

import webpackConfig from "./configs/webpack.config";

const app = express();

app.get("/", (req, res) => {
  let filePath = path.resolve(webpackConfig.output.path, `index.html`);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.set("Content-Type", "text/html");
      res.send(data);
    }
  });
});

// app.use(webpackDevMiddleWare(compiler, {
//   publicPath: webpackConfig.output.publicPath,
//   colors: true
// }));
// app.use(webpackHotMiddleWare(compiler));

app.use("/dist", express.static(webpackConfig.output.path));

app.listen(3000, err => {
  if (err) console.error(err);
  console.log("The devServer is listening at port: 3000...");
})