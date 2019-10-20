import {
  srcRoot,
  libs
} from "./base";

export default {
  context: srcRoot,
  mode: "development",
  entry: {
    index: ["./index.ts"]
  },
  output: {
    path: libs,
    filename: "./[name].js",
  },

  target: "web",

  module: {
    rules: [
      {
        test: /\.ts/,
        loader: "ts-loader"
      }
    ]
  },

  plugins:[
     // OccurrenceOrderPlugin is needed for webpack 1.x only
    //  new webpack.optimize.OccurrenceOrderPlugin(),
    //  new webpack.HotModuleReplacementPlugin(),
    //  // Use NoErrorsPlugin for webpack 1.x
    //  new webpack.NoEmitOnErrorsPlugin()
  ]
};