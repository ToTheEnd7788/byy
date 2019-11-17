import typescriptPlugin from "rollup-plugin-typescript";
import { terser } from 'rollup-plugin-terser';

module.exports = {
  input: "./src/core/index.ts",
  plugins: [
    // babel({
    //   exclude: 'node_modules/**',
    //   runtimeHelpers: true,
    // }),
    typescriptPlugin(),
    terser({
      ie8: true
    }),
  ],
  output: {
    file: "libs/index.js",
    format: "es"
  }
};