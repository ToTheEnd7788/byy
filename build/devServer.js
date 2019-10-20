import express from "express";
import webpack from "webpack";
import path from "path";
import fs from "fs";
import webpackDevMiddleWare from "webpack-dev-middleware";
import webpackHotMiddleWare from "webpack-hot-middleware";

import webpackConfig from "./configs/webpack.config";

webpackConfig.entry = Object.keys(webpackConfig.entry).reduce((acc, entryName) => {
  let entryValue = webpackConfig.entry[entryName];

  entryValue.unshift("webpack-hot-middleware/client?reload=true");
  // entryValue.unshift("react-hot-loader/patch");
  acc[entryName] = entryValue;

  return acc;
}, {});

let compiler = webpack(webpackConfig);

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

app.use(webpackDevMiddleWare(compiler, {
  publicPath: webpackConfig.output.publicPath,
  colors: true
}));
app.use(webpackHotMiddleWare(compiler));

app.use("/dist", express.static(webpackConfig.output.path));

app.listen(3000, err => {
  if (err) console.error(err);
  console.log("The devServer is listening at port: 3000...");
})