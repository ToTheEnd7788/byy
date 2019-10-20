import path from "path";

const root = path.resolve(__dirname, "../../"),
  srcRoot = path.resolve(root, "src"),
  testRoot = path.resolve(root, "test"),
  distRoot = path.resolve(root, "dist"),
  libs = path.resolve(root, "libs");

export {
  srcRoot,
  testRoot,
  distRoot,
  libs
};