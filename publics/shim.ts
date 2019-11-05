if (!Function.prototype.bind) {
  Function.prototype.bind = function (o) {
    if (typeof this !== 'function') { throw TypeError("Bind must be called on a function"); }

    var args = Array.prototype.slice.call(arguments, 1),
        self = this,
        nop = function() {},
        bound = function () {
          return self.apply(this instanceof nop ? this : o,
            args.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype)
      nop.prototype = this.prototype;
      bound.prototype = new nop();
      return bound;
  };
}

if (!Array.isArray) {
  Array.isArray = function (o) {
    return Boolean(o &&
      Object.prototype.toString.call(Object(o)) === '[object Array]');
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function(callback) {
    let result;

    if (!callback) {
      console.error("[Find]: params[0] is invalid");
    } else {
      const o = this;

      for (let i = 0; i < o.length; i++) {
        if (callback(o[i], i)) {
          result = o[i];
          break;
        }
      }
    }

    return result;
  }
}

if (!Array.prototype.find) {
  Array.prototype.find = function(callback) {
    let index = -1;

    if (!callback) {
      console.error("[Find]: params[0] is invalid");
    } else {
      const o = this;

      for (let i = 0; i < o.length; i++) {
        if (callback(o[i], i)) {
          index = i;
          break;
        }
      }
    }

    return index;
  }
}

if (!Object.keys) {
  Object.keys = function(o) {
    let res = [];
    for (let key in o) {
      res.push(key);
    }

    return res;
  }
}
