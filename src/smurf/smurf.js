// class CusSimPromise {
//   private callback: Function;
//   private status: string;
//   private FULFILLED: string;
//   private PENDING: string;
//   private REJECTED: string;

//   private resolvers: Array<Function>;
//   private rejecters: Array<Function>;

//   data: any;

//   constructor(callback) {
//     this.PENDING = "PENDING";
//     this.FULFILLED = "FULFILLED";
//     this.REJECTED = "REJECTED";

//     this.status = this.PENDING;
//     this.callback = callback;

//     this.resolvers = [];
//     this.rejecters = [];

//     this.data;

//     try {
//       this.callback(this._resolve.bind(this), this._reject.bind(this));
//     } catch(err) {
//       this._reject(err);
//     }
//   }

//   then(onResolve, onReject) {
//     setTimeout(() => {
//       this.resolvers.push(onResolve);
//       this.rejecters.push(onReject);
//     }, 0)

//     return this;
//   }

//   private _resolve(data) {
//     if (this.status === this.PENDING) return;
//     this.status = this.FULFILLED;
//     this.data = data;
//   }

//   private _reject(err) {
//     if (this.status === this.PENDING) return;
//     this.status = this.REJECTED;
//     this.data = err;
//   }
// }

class Smurf {
  // configs: object;
  // _isXdr: boolean;
  // _ctx: any;

  constructor() {
    this._isXdr = window.XDomainRequest
      ? true
      : false;
    this._ctx = this._isXdr
      ? new window.XDomainRequest()
      : new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

    this.configs = {
      root: "/"
    };
  }

  _handler(res, rej) {
    if (this._isXdr) res(JSON.parse(this._ctx.responseText));
    else {
      if (this._ctx.readyState === 4) {
        if (this._ctx.status === 200 || this._ctx.status === 304) res(JSON.parse(this._ctx.responseText));
        else rej(this._ctx);
      }
    }
  }

  _serializer(data, code) {
    if (code && code !== "byy") {
      return console.error("The Function Is Private");
    }

    let result = "?";
  
      for (let key in data) {
        result += key + '=' + data[key] + '&';
      }
  
    return result.replace(/&$/, '');
  }

  get(url, data, config) {
    let root = (config && config['root']) || this.configs.root;
    url = `${root}${url}${this._serializer(data, "byy")}`;

    return new Promise((res, rej) => {
      this._ctx.open("post", url);
      this._ctx.send(null);
      this._ctx.onload = this._handler.bind(this, res, rej);

      this._ctx.onerror = () => {
        rej(this._ctx);
      }
    });
  }

  post(url, { param, query }, config) {
    let root = (config && config['root']) || this.configs.root;
    url = `${root}${url}`;

    if (query) url += `${this._serializer(query, "byy")}`;

    return new Promise((res, rej) => {
      this._ctx.open("post", url);
      this._ctx.send(JSON.stringify(param));
      this._ctx.onload = this._handler.bind(this, res, rej);

      this._ctx.onerror = () => {
        rej(this._ctx);
      }
    });
  }
}

export default new Smurf;