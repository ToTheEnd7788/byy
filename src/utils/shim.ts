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

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(callback) {
    let index = -1;

    if (!callback) {
      console.error("[FindIndex]: params[0] is invalid");
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

if (!Array.prototype.map) {
  Array.prototype.map = function(callback) {
    let res = [],
      o = this.slice(0);

    for (let i = 0; i < o.length; i++) {
      res.push(callback(o[i], i, o));
    }

    return res;
  }
}

if (!Array.prototype.filter) {
  Array.prototype.filter = function(callback) {
    let res = [],
      o = this.slice(0);

    for (let i = 0; i < o.length; i++) {
      if (callback(o[i], i)) {
        res.push(o[i]);
      };
    }

    return res;
  }
}

if (typeof Object.assign !== 'function') {
  Object.assign = function assign(target, varArgs) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    let to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (let nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  }
}

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback) {
    if (this === null) {
      throw new TypeError( 'Array.prototype.reduce ' + 
        'called on null or undefined' );
    }
    if (typeof callback !== 'function') {
      throw new TypeError( callback +
        ' is not a function');
    }

    var o = Object(this);

    var len = o.length >>> 0; 

    var k = 0; 
    var value;

    if (arguments.length >= 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in o)) {
        k++; 
      }

      if (k >= len) {
        throw new TypeError( 'Reduce of empty array ' +
          'with no initial value' );
      }
      value = o[k++];
    }

    while (k < len) {
      if (k in o) {
        value = callback(value, o[k], k, o);
      }

      k++;
    }

    return value;
  }
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    var len = O.length >>> 0;

    if (len === 0) {
      return -1;
    }

    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    if (n >= len) {
      return -1;
    }

    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    while (k < len) {
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
