export default class Smurf {
  static configs: object = {
    root: "/"
  };

  _isXdr: boolean;
  _ctx: any;

  constructor() {
    this._isXdr = window.XDomainRequest
      ? true
      : false;
    this._ctx = this._isXdr
      ? new window.XDomainRequest()
      : new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
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
    let root = config['root'] || Smurf.configs.root;
    url = `${root}${url}${this._serializer(data, "byy")}`;

    return new Promise((res, rej) => {
      this._ctx.open("post", url);
      this._ctx.send(null);
      this._ctx.onload = this._handler.bind(null, res, rej);

      this._ctx.onerror = () => {
        rej(this._ctx);
      }
    })
  }

  post(url, { params, query }, config) {
    let root = config['root'] || Smurf.configs.root;
    url = `${root}${url}`;

    if (query) url += `${this._serializer(query, "byy")}`;

    return new Promise((res, rej) => {
      this._ctx.open("post", url);
      this._ctx.send(JSON.stringify(params));
      this._ctx.onload = this._handler.bind(null, res, rej);

      this._ctx.onerror = () => {
        rej(this._ctx);
      }
    })
  }
}