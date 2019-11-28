class StaticContext {
  static $inserts: object = {};

  constructor() {}

  static use(name: string, value: any) {
    this.$inserts[name] = value;
  }
}

export { StaticContext };