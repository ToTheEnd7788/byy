import { rollup} from "rollup";
import typescriptPlugin from "rollup-plugin-typescript";
import { terser } from 'rollup-plugin-terser';

const inputOptions = {
  input: "./src/core/index.ts",
  plugins: [
    typescriptPlugin(),
    terser({
      ie8: true
    })
  ]
},
  outputOptions = {
    file: "libs/index.js",
    format: "es"
  };

async function build() {
  const bundle = await rollup(inputOptions);

  const { code, map } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}

build();