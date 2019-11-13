export default class Context {
  constructor() {}

  _createVNode(a, b, c, t) {
    console.log(111111, a, this);
  }
};