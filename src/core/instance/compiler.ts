export const transformMethods = (vm) => {
  for (let name in vm.methods) {
    vm[name] = vm.methods[name].bind(vm);
  }
}

export const transformDatas = (vm) => {
  for (let key in vm.data) {
    vm[key] = vm.data[key];
  }
}