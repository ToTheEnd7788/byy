import typescriptPlugin from "rollup-plugin-typescript";

module.exports = {
  input: "./src/core/index.ts",
  
  plugins: [
    // babel({
    //   exclude: 'node_modules/**',
    //   runtimeHelpers: true,
    // }),
    typescriptPlugin()
  ],
  output: {
    file: "libs/index.js",
    format: "es"
  }
};