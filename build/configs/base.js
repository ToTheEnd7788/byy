import path from "path";

const root = path.resolve(__dirname, "../../"),
  srcRoot = path.resolve(root, "src"),
  testRoot = path.resolve(root, "test"),
  distRoot = path.resolve(root, "dist"),
  libs = path.resolve(root, "libs"),
  nodeModulesRoot = path.resolve(root, "node_modules"),
  loadersRoot = path.resolve(root, "build/loaders");

export {
  srcRoot,
  testRoot,
  distRoot,
  libs,
  nodeModulesRoot,
  loadersRoot
};