import { rollup} from "rollup";
import typescriptPlugin from "rollup-plugin-typescript";
import { terser } from 'rollup-plugin-terser';

const inputOptions = {
  input: "./src/core/index.ts",
  plugins: [
    typescriptPlugin(),
    terser({
      ie8: true,
      output: {
        comments: false
      }
    })
  ]
},
  outputOptions = {
    file: "libs/index.js",
    format: "es",
    banner:
      '/*!\n' +
      ` * byy.js v${123}\n` +
      ` * (c) 2018-${new Date().getFullYear()} Horses Lee\n` +
      ' * Released under the MIT License.\n' +
      ' */'
  };

async function build() {
  const bundle = await rollup(inputOptions);

  const { code, map } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}

build();