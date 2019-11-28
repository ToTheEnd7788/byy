import webpack from "webpack";
import copyWebpackPlugin from "copy-webpack-plugin";

import {
  testRoot,
  distRoot,
  nodeModulesRoot,
  loadersRoot
} from "./base";

export default {
  devtool: "#source-map",
  context: testRoot,
  mode: "development",
  entry: {
    index: ["./src/index.js"]
  },
  output: {
    path: distRoot,
    filename: "./js/[name].js",
    publicPath: "/dist"
  },

  resolveLoader: {
    modules: [loadersRoot, nodeModulesRoot],
  },

  module: {
    rules: [
      {
        test: /\.js/,
        include: /test\/src/,
        loader: "babel-loader"
      },
      {
        test: /\.(moon)|(m)$/,
        loader: "moon-loader"
      }
    ]
  },

  plugins:[
     // OccurrenceOrderPlugin is needed for webpack 1.x only
     new webpack.optimize.OccurrenceOrderPlugin(),
     new webpack.HotModuleReplacementPlugin(),
     // Use NoErrorsPlugin for webpack 1.x
     new webpack.NoEmitOnErrorsPlugin(),
     new copyWebpackPlugin([
       {
         from: "src/index.html",
         to: "./index.html"
       }
     ])
  ]
};