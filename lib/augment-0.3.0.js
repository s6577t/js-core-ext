// augment.js JavaScript 1.8.5 methods for all, version: 0.3.0
// using snippets from Mozilla - https://developer.mozilla.org/en/JavaScript
// (c) 2011 Oliver Nightingale
//
//  Released under MIT license.
//
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
if (!Array.prototype.every) {
  Array.prototype.every = function(fun /*, thisp */) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t && !fun.call(thisp, t[i], i, t))
        return false;
    }

    return true;
  };
}
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun /*, thisp */) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(fun /*, thisp */) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t)
        fun.call(thisp, t[i], i, t);
    }
  };
}
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement /*, fromIndex */) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0)
      return -1;

    var n = 0;
    if (arguments.length > 0) {
      n = Number(arguments[1]);
      if (n !== n) // shortcut for verifying if it's NaN
        n = 0;
      else if (n !== 0 && n !== (Infinity) && n !== -(Infinity))
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }

    if (n >= len)
      return -1;

    var k = n >= 0
          ? n
          : Math.max(len - Math.abs(n), 0);

    for (; k < len; k++) {
      if (k in t && t[k] === searchElement)
        return k;
    }
    return -1;
  };
}
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
Array.isArray = Array.isArray || function(o) { return Object.prototype.toString.call(o) === '[object Array]'; };
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0)
      return -1;

    var n = len;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n !== n)
        n = 0;
      else if (n !== 0 && n !== (Infinity) && n !== -(Infinity))
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }

    var k = n >= 0
          ? Math.min(n, len - 1)
          : len - Math.abs(n);

    for (; k >= 0; k--) {
      if (k in t && t[k] === searchElement)
        return k;
    }
    return -1;
  };
}
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
if (!Array.prototype.map) {
  Array.prototype.map = function(fun /*, thisp */) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t)
        res[i] = fun.call(thisp, t[i], i, t);
    }

    return res;
  };
}
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Reduce
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(fun /*, initialValue */) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    // no value to return if no initial value and an empty array
    if (len == 0 && arguments.length == 1)
      throw new TypeError();

    var k = 0;
    var accumulator;
    if (arguments.length >= 2) {
      accumulator = arguments[1];
    } else {
      do {
        if (k in t) {
          accumulator = t[k++];
          break;
        }

        // if array contains no values, no initial value to return
        if (++k >= len)
          throw new TypeError();
      }
      while (true);
    }

    while (k < len) {
      if (k in t)
        accumulator = fun.call(undefined, accumulator, t[k], k, t);
      k++;
    }

    return accumulator;
  };
}
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/ReduceRight
if (!Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function(callbackfn /*, initialValue */) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof callbackfn !== "function")
      throw new TypeError();

    // no value to return if no initial value, empty array
    if (len === 0 && arguments.length === 1)
      throw new TypeError();

    var k = len - 1;
    var accumulator;
    if (arguments.length >= 2) {
      accumulator = arguments[1];
    } else {
      do {
        if (k in this) {
          accumulator = this[k--];
          break;
        }

        // if array contains no values, no initial value to return
        if (--k < 0)
          throw new TypeError();
      }
      while (true);
    }

    while (k >= 0) {
      if (k in t)
        accumulator = callbackfn.call(undefined, accumulator, t[k], k, t);
      k--;
    }

    return accumulator;
  };
}
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some) {
  Array.prototype.some = function(fun /*, thisp */) {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisp, t[i], i, t))
        return true;
    }

    return false;
  };
}
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/now
if (!Date.now) {
  Date.now = function now () {
    return +new Date();
  };
}
if (!Date.prototype.toJSON) {
  Date.prototype.toJSON = Date.prototype.toJSON
};
if (!Date.prototype.toISOString) {
  Date.prototype.toISOString = (function () {

    var pad = function (n, length) {
      length = length || 2
      return (n = n + "", n.length === length) ? n : pad("0" + n, length);
    }

    return function () {
      var year = [this.getUTCFullYear(), pad(this.getUTCMonth() + 1), pad(this.getUTCDate())].join("-")
      var time = [pad(this.getUTCHours()), pad(this.getUTCMinutes()), pad(this.getUTCSeconds())].join(":") + "." + pad(this.getUTCMilliseconds(), 3)
      return [year, time].join("T") + "Z"
    }
  })()
};
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
if ( !Function.prototype.bind ) {

  Function.prototype.bind = function( obj ) {
    var slice = [].slice,
        args = slice.call(arguments, 1), 
        self = this, 
        nop = function () {}, 
        bound = function () {
          return self.apply( this instanceof nop ? this : ( obj || {} ), 
                              args.concat( slice.call(arguments) ) );    
        };

    nop.prototype = self.prototype;

    bound.prototype = new nop();

    return bound;
  };
}
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
if(!Object.keys) {
  Object.keys = function(o){
   if (o !== Object(o))
        throw new TypeError('Object.keys called on non-object');
   var ret=[],p;
   for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);
   return ret;
  }
}

if (!String.prototype.trim) {
  String.prototype.trim = (function () {

    var trimLeft  = /^\s+/,
        trimRight = /\s+$/

    return function () {
      return this.replace(trimLeft, "").replace(trimRight, "")
    }
  })()
};