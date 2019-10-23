import typescriptPlugin from "rollup-plugin-typescript";

module.exports = {
  input: "./src/core/instance/index.ts",
  plugins: [
    typescriptPlugin()
  ],
  output: {
    file: "libs/byy.js",
    format: "es"
  }
};