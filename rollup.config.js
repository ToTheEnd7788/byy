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
    format: "es",
    indent: false,
    banner:
      '/*!\n' +
      ` * byy.js v${123}\n` +
      ` * (c) 2018-${new Date().getFullYear()} Horses Lee\n` +
      ' * Released under the MIT License.\n' +
      ' */'
  }
};