import webpack from "webpack";

import {
  srcRoot,
  testRoot,
  distRoot
} from "./base";

export default {
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

  module: {
    rules: [
      {
        test: /\.js/,
        include: /test\/src/,
        loader: "babel-loader"
      }
    ]
  },

  plugins:[
     // OccurrenceOrderPlugin is needed for webpack 1.x only
     new webpack.optimize.OccurrenceOrderPlugin(),
     new webpack.HotModuleReplacementPlugin(),
     // Use NoErrorsPlugin for webpack 1.x
     new webpack.NoEmitOnErrorsPlugin()
  ]
};