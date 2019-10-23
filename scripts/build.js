import { rollup, watch } from "rollup";
import typescriptPlugin from "rollup-plugin-typescript";

const inputOptions = {
  input: "./src/core/instance/index.ts",
  plugins: [
    typescriptPlugin()
  ]
},
  outputOptions = {
    file: "libs/byy.js",
    format: "es"
  };

async function build() {
  const bundle = await rollup(inputOptions);

  const { code, map } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}

build();