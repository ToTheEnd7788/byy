export function warn(content: string) {
  console.error(`Moon Error:\n${content}`);
};

export function isObj(value: any): boolean {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function isStr(value: any): boolean {
  return Object.prototype.toString.call(value) === "[object String]";
}