import webpack from "webpack";
import webpackConfigs from "./configs/webpack.config";
import webpackTsConfigs from "./configs/webpack.ts.config";

let config = process.env.CONFIG_NAME === "webpackTsConfigs"
  ? webpackTsConfigs
  : webpackConfigs;

webpack(config, (err, stats) => {
  if (err) console.error(err);

  console.log(stats.toString({
    colors: true
  }));
});
