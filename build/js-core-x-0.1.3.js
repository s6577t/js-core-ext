;
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
;
;
// supplement.js JavaScript Extras, version: 0.1.0
// (c) 2011 Oliver Nightingale
//
//  Released under MIT license.
//
/**
 * Namespace
 * @private
 */
supplement = (function () {

  var clashCallbacks = []

  var callClashCallbacks = function (obj, methodName, fn) {
    clashCallbacks.forEach(function (cb) {
      cb(obj, methodName, fn)
    })
  }

  /**
   * ## supplement.onClash
   * A callback that will be called when supplement attempts to define a method that would cause a clash.
   * The callback function will be passed the object that was trying to be modified by supplement, the
   * property name that was trying to be set and the value that the property was being set to.
   *
   * Use this to decide whether a clash is fatal for your application and throw a big error if so.
   *
   * @params {Function} the callback function
   */
  var onClash = function (fn) {
    if (typeof fn !== "function") throw new TypeError ()
    clashCallbacks.push(fn)
  }

  /**
   * ## supplement.defineAlias
   * A utility function for providing an alias to an objects method.
   *
   * @see supplement.defineMethod
   */
  var defineAlias = function (obj, alias, original) {
    this.defineMethod(obj, alias, obj[original])
  }

  /**
   * ## supplement.defineMethod
   * A utility function for supplementing any object with new methods.  It wraps the ES5 Object.defineProperty
   * method and uses that wherever possible, falling back to plain property assignment in older browsers.
   *
   * The function will have `this` set to the object passed as the first parameter.
   *
   * @param {Object} the object on which to define the method
   * @param {String} the name of the new method
   * @param {Function} the function that makes up the body of the method for the object.
   *
   * ### Example
   *     supplement.defineMethod(Array, 'first', function () {
   *       return this[0]
   *     })
   */
  var defineMethod = function (obj, name, fn) {
    if (obj[name]) return callClashCallbacks(obj, name, fn)

    // if defineProperties is supported then a working version
    // of defineProperty will be available.  Work around for IE8's
    // broken implementation of defineProperty.
    if (typeof Object.defineProperties == 'function') {
      Object.defineProperty(obj, name, {
        value: fn,
        enumerable: false,
        configurable: false
      })
    } else {
      obj[name] = fn
    };
  }

  /**
   * Exposing methods
   * @private
   */
  return {
    defineAlias: defineAlias,
    defineMethod: defineMethod,
    onClash: onClash
  }
})()

/*!
 * Supplement - Array
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

/**
 * ## Array.wrap
 * Wraps the parameter in an array, ensures that the return value is always an array.  Useful when combined
 * with array enumerators to prevent accidently calling methods on null or undefined.
 *
 * When passed null or undefined an empty array is returned.  When passed an array that array is returned
 * unchanged, anything else is pushed as the first element to a new empty array and that array is returned.
 *
 * @param {Object} the thing to wrap in an array.
 * @returns {Array}
 *
 * ### Example
 *     Array.wrap("foo")      // returns ["foo"]
 *     Array.wrap([1,2,3])    // returns [1,2,3]
 *     Array.wrap(undefined)  // returns []
 */
supplement.defineMethod(Array, 'wrap',  function (obj) { "use strict";
   if (obj == null || obj == undefined) return []
   if (Array.isArray(obj)) return obj
   return [obj]
});

/**
 * ## Array.prototype.uniq
 * Returns a new array with all the dupicate elements removed.  Elements are checked for duplicity using ===
 *
 * @returns {Array} a new array with all the duplicates of the original array removed.
 *
 * ### Example
 *      [1,1,2,3,4,4].uniq()  // returns [1,2,3,4]
 */
supplement.defineMethod(Array.prototype, 'uniq',  function () { "use strict";
  return this.reduce(function (out, elem) {
    if (out.indexOf(elem) === -1) out.push(elem)
    return out
  }, [])
});

/**
 * ## Array.range
 * Returns a new array with elements between and including the start and end params.
 *
 * @param {Number} start - where to start the range from
 * @param {Number} end - where to end the range, inclusive.
 * @returns {Array} the newly created and populated array.
 * @throws {TypeError} if either the start or end params are omitted.
 *
 * ### Example
 *     Array.range(4,7)    // returns [4,5,6,7]
 */
supplement.defineMethod(Array, 'range',  function (start, end) { "use strict";
  if ((typeof start !== 'number') || (typeof end !== 'number')) throw new TypeError ('Array.range called with no range start or end')
  var a = []
  for (var i=start; i <= end; i++) {
   a.push(i)
  };
  return a
});

/**
 * ## Array.prototype.detect
 * Returns the first item from the array for which the function evaluates to true.  Stops iterating as soon
 * as the function evaluates to true.
 *
 * The passed function will be called for each element in the array, it will be passed the current element
 * to be evaluated, the index of this element in the array and finally the whole array itself.  The function
 * will be called with its context set to the optional context param.
 *
 * @param {Function} fn - a function to be executed for each element of the array
 * @param {Object} context - an optional param that will be used as the context of fn
 * @returns {Object} the first element of the array for which the function returns true
 *
 * ### Example
 *     [1,2,3,4,5].detect(function (num) {
 *       return (num == 3)
 *     })  // returns 3
 */
supplement.defineMethod(Array.prototype, 'detect',  function (fn, context) { "use strict";
  var length = this.length
  var out = null

  for (var i=0; i < length; i++) {
   if (fn.call(context, this[i], i, this)) {
     out = this[i]
     break
   };
  };
  return out
});

/**
 * ## Array.toArray
 * Converts an array like object, most likely the arguments object, into an Array.
 *
 * @param {Object} args an arguments object which will get turned into a real array.
 * @returns {Array} the args object as an array.
 * @throws {TypeError} when passed a string.
 *
 * ### Example
 *     function () {
 *       var args = Array.toArray(arguments)
 *     }
 */
supplement.defineMethod(Array, 'toArray',  function (args) { "use strict";
  if (typeof args === "string") throw new TypeError('Array.toArray called on non-arguments');
  return Array.prototype.slice.call(args, 0)
})

/**
 * ## Array.prototype.head
 * Returns the first element from an array.  If the array is empty undefined is returned.
 * The original array is left un-mutated.
 *
 * @returns {Anything} the first element from the array or undefined.
 *
 * ### Example
 *     var a = [1,2,3]
 *     a.head() // returns 1
 */
supplement.defineMethod(Array.prototype, 'head', function () { "use strict";
  return this[0]
})

/**
 * ## Array.prototype.tail
 * Returns everything except the head of the array.  If the array is empty an empty array
 * is returned.  The original array is left un-mutated.
 *
 * @returns {Array} everything but the head of the array.
 *
 * ### Example
 *     var a = [1,2,3]
 *     a.tail() // returns [2,3]
 */
supplement.defineMethod(Array.prototype, 'tail', function () { "use strict";
  return this.slice(1)
})

/**
 * ## Array.prototype.compact
 * Returns a copy of the array with all undefined or null values removed, other falsy values
 * are left alone.
 */
supplement.defineMethod(Array.prototype, 'compact', function () { "use strict";
  return this.filter(function (element) { return (element !== null && element !== undefined) })
})

/**
 * ## Array.prototype.group
 * Return an object where each key is the group name and the value is the elements form the
 * array that fit in that group.
 *
 * Grouping is done by the passed function, this grouping function is called for each element
 * in the array and passed 3 arguments; the current element of the array, the index of that item
 * in the array and the entire array.  The context of the grouping function can be changed by passing
 * a second argument to group.
 *
 * @params {Function} the grouping function
 * @params {Object} an optional context object for the grouping function
 * @throws {TypeError} when a non function is passed as the grouping function
 * @returns {Object} an object containing the array split into groups
 *
 * ## Example
 *     var drinks = ["absinthe", "beer", "cider"]
 *     drinks.group(function (drink) {
 *       return drink.charAt(0)
 *     }) // returns {"a": ["absinthe"], "b": ["beer"], "c": ["cider"]}
 */
supplement.defineMethod(Array.prototype, 'group', function (fn, context) { "use strict";
  if (typeof fn !== "function") throw new TypeError ()

  return this.reduce(function (grouped, elem, index, arr) {
    var key = fn.call(context, elem, index, arr)
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(elem)
    return grouped
  }, {})
})

/**
 * ## Array.prototype.reject
 * Returns a new array containing items from this array for which the function returns a truthy value.
 * The function passed 3 arguments, the current element from the array, the index of this item in
 * the array and the whole array.  The context of the function can be set by passing an optional second
 * parameter.
 *
 * @params {Function} The function which will do the rejecting
 * @params {Object} An optional context object for the rejecting function
 * @throws {TypeError} When called without a function
 * @returns {Array}
 */
supplement.defineMethod(Array.prototype, 'reject', function (fn, context) { "use strict";
  if (typeof fn !== "function") throw new TypeError ()

  return this.reduce(function (keepers, elem, index, arr) {
    if (!fn.call(context, elem, index, arr)) keepers.push(elem)
    return keepers
  }, [])
})

/**
 * ## Array.prototype.take
 * Returns the first n items from the array.  Doesn't modify the array.
 *
 * @param {Number} the number of items to take from the array
 */
supplement.defineMethod(Array.prototype, 'take', function (n) { "use strict";
  if (!n) throw new TypeError ()

  return this.slice(0, n)
})

/**
 * ## Array.prototype.drop
 * Drops the first n items from the array and returns the rest.  Doesn't modify the array.
 *
 * @param {Number} the number of items to drop from the front of the array
 */
supplement.defineMethod(Array.prototype, 'drop', function (n) { "use strict";
  if (!n) throw new TypeError ()

  return this.slice(n)
})
/**
 * ## Function.prototype.singleUse
 * Returns a version of the function that can only be called once, after which the function will behave
 * as a no-op.
 *
 * @returns {Function} a function with the same behaviour that can only be called once.
 */
supplement.defineMethod(Function.prototype, 'singleUse', function () { "use strict";
  var fn = this
  var alreadyCalled = false

  return function () {
    if (alreadyCalled) return
    alreadyCalled = true
    var args = Array.prototype.slice.call(arguments, 0)
    return fn.apply(null, args)
  }
});

/**
 * ## Function.prototype.curry
 * Returns a copy of the function with one or more arguments already set.
 *
 * @params {Object} any number of arguments to prefil the original funciton with.
 * @returns {Function}
 *
 * ### Example
 *     var add = function (a, b) { return a + b }
 *     var addFive = add.curry(5)
 *     add(5, 10) === addFive(10)
 *
 */
supplement.defineMethod(Function.prototype, 'curry', function () { "use strict";
  var args = Array.prototype.slice.call(arguments, 0)
  var fn = this

  return function () {
    Array.prototype.slice.call(arguments, 0).forEach(function (arg) { args.push(arg) })
    return fn.apply(null, args)
  }
});

/**
 * ## Function.prototype.throttle
 * Returns a copy of the function with the same behaviour but which will only execute once every x amount
 * of miliseconds.  This can be useful when reducing the load on a funciton that could be triggered many
 * times, perhaps as a result of a keyup event.
 *
 * @params {Number} the rate limit in miliseconds for the minimum pause between executions of the function
 * @returns {Function} the throttled function.
 */
supplement.defineMethod(Function.prototype, 'throttle', function (rate) { "use strict";
  var fn = this
  var callTime, lastCallTime

  return function () {
    var args = Array.prototype.slice.call(arguments, 0)
    callTime = new Date ()
    lastCallTime = lastCallTime || 0
    if ((callTime - lastCallTime) < rate) return
    lastCallTime = callTime
    return fn.apply(null, args)
  }
});

/**
 * ## Function.prototype.debounce
 * Returns a copy of the funciton that will only execute after it has stopped being called for x miliseconds.
 * This can be useful for functions used as keyup handlers where the action should only happen once the user
 * has stopped typing.
 *
 * @params {Number} the time in miliseconds between calling the funciton and the function executing.
 *
 * ### Example
 *     var keyupHandler = function () {
 *       // awesome code goes here!
 *     }
 *     
 *     input.addEventListener('keyup', keyupHandler.debounce(100))
 *     // keyupHandler will only be called 100 miliseconds after
 *     // the keyup event stops being fired.
 *
 */
supplement.defineMethod(Function.prototype, 'debounce', function (time) { "use strict";
  var fn = this
  var timeout

  return function () {
    var args = Array.prototype.slice.call(arguments, 0)
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      return fn.apply(null, args)
    }, time)
  }
});
/**
 * ## Number.prototype.times
 * Executes the supplied function x number of times, where x is the value of the number, the function
 * will be yielded the index of the iteration each time it is called.
 *
 * @param {Function} the function to be called each time.
 *
 * ### Example
 *     (5).times(function (i) { console.log(i) })
 *     // prints 0 1 2 3 4
 */
supplement.defineMethod(Number.prototype, 'times', function (fn) { "use strict";
  for (var i=0; i < this; i++) {
    fn(i)
  };
})

/**
 * ## Number.prototype.seconds
 * Returns the number of seconds converted to milliseconds.
 *
 * @see Number.prototype.second
 * @returns {Number}
 */
supplement.defineMethod(Number.prototype, 'seconds', function () { "use strict";
  return this * 1000
})
supplement.defineAlias(Number.prototype, 'second', 'seconds')

/**
 * ## Number.prototype.minutes
 * Returns the number of minutes converted to milliseconds
 *
 * @see Number.prototype.minute
 * @returns {Number}
 */
supplement.defineMethod(Number.prototype, 'minutes', function () { "use strict";
  return this.seconds() * 60
})
supplement.defineAlias(Number.prototype, 'minute', 'minutes')

/**
 * ## Number.prototype.hours
 * Returns the number of hours converted to milliseconds
 *
 * @see Number.prototype.hour
 * @returns {Number}
 */
supplement.defineMethod(Number.prototype, 'hours', function () { "use strict";
  return this.minutes() * 60
})
supplement.defineAlias(Number.prototype, 'hour', 'hours')

/**
 * ## Number.prototype.pad
 * Returns a string representation of the number with n zeroes padding the number.
 *
 * @params {Number} the number of zeroes to pad the number with
 * @returns {String}
 */
supplement.defineMethod(Number.prototype, 'pad', function (zeroes) { "use strict";
  if (typeof zeroes !== "number") throw new TypeError
  if (zeroes < 0) throw new RangeError

  var out = this + ""
  while (Math.floor(zeroes--)) {
    out = "0" + out
  }
  return out
})

/**
 * ## Object.values
 * Returns all the enumeralbe values of an object.  Will not return any values from higher up the prototype
 * chain.
 *
 * @param {Object} the object whose values you want
 * @returns {Array} an array of this objects values
 * @throws {TypeError} when passed a non plain object
 *
 * ### Example
 *     Object.values({foo: "bar"})
 *     // returns ["foo"]
 */
supplement.defineMethod(Object, 'values', function (obj) { "use strict";
  if (obj !== Object(obj)) throw new TypeError('Object.values called on non-object');
  return Object.keys(obj).map(function (key) { return obj[key] })
});

/**
 * Object.provide
 * Returns a property of an object which is nested arbitrarily deep within another object.  If at any point
 * along the chain of properties it finds a property that doesn't exist it populates that property with a 
 * blank object and continues.
 *
 * @param {Object} the object for which you wish to navigate through
 * @params {String} any number of properties which will be nested within each other in the object
 * @returns {Object} the object at the end of the nested properties
 *
 * ### Example
 *     var a = {}
 *     Object.provide(a, 'foo', 'bar', 'baz)
 *     // returns {} which is equal to a.foo.bar.baz
 */
supplement.defineMethod(Object, 'provide', function (obj) { "use strict";
  if (obj !== Object(obj)) throw new TypeError('Object.provide called on non-object');
  var properties = Array.prototype.slice.call(arguments, 1)
  var node = obj
  properties.forEach(function (prop) {
    if (!node[prop]) {
      node[prop] = {}
    } else if (node[prop] !== Object(node[prop])) {
      throw new TypeError('Object.provide can only add properties to a plain object')
    }
    node = node[prop]
  })
  return node
});
;
;
/*
Copyright(c) 2011 Sam Taylor, released under MIT License.
*/

(function () {

  supplement.defineMethod(Array.prototype, 'copy', function () {
    return Array.toArray(this);
  });
  
  supplement.defineMethod(Array.prototype, 'exclude', function (obj) {
    var i = this.indexOf(obj);
    if (i >= 0) return this.splice(i, 1);
    return this;
  });
  
  supplement.defineMethod(Array.prototype, 'remove', function (obj) {
    delete this[this.indexOf(obj)];
    return this;
  });
  
  supplement.defineMethod(Array.prototype, 'contains', function (obj) {
    return !!this.detect(function (e) {
      return e === obj;
    });
  });
  
  supplement.defineMethod(Array.prototype, 'isEmpty', function (obj) {
    return this.length === 0;
  });
  
  supplement.defineMethod(Array.prototype, 'first', function (obj) {
    return this[0];
  });
  
  supplement.defineMethod(Array.prototype, 'last', function (obj) {
    return this[this.length - 1];
  });
  
})();
;
;
;
/*
Copyright(c) 2011 Sam Taylor, released under MIT License.
*/
function uuid () {
	// from: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	// http://www.ietf.org/rfc/rfc4122.txt
	var s = [];
	var hexDigits = "0123456789ABCDEF";
	for (var i = 0; i < 32; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[12] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

	var uuid = s.join("");
	return uuid;
};

function using () {
  var args = Array.toArray(arguments);
  var f = args.splice(args.length-1, 1);
  if (typeof f !== 'function') return;
  
  return f.apply(args[0], args);
};

function extend (object, overwrite) {
  
  object = object || {};
  
  return {
    with: function () {
      
      Array.toArray(arguments).forEach(function(other) {
        for (var member in other) {
          if (overwrite || (typeof object[member] === 'undefined')) {
            object[member] = other[member];
          }           
        }
      });
      
      return object;
    },
    mixin: function (mixin) {
      return typeof mixin === 'function' ? this.with(new mixin) : this.with(mixin);
    }
  };
};

function overwrite (object) {
  return extend(object, true);
};

// for use with option enabled methods
function defaultsFor (options, defaults) {
  return extend(options).with(defaults);
};

function proxyFunction (context, phunction) {
  return function () {
    return phunction.apply(context, arguments);
  };
};

override = (function () {
  function ovrdFunction (f, g) {
    return function () {
      var thiz = this;
      var args = Array.toArray(arguments);

      args.unshift(function () {
        var baseArgs = (arguments.length > 0) ? Array.toArray(arguments) : args.slice(1);
        return f.apply(thiz, baseArgs);
      });

      return g.apply(thiz, args);
    }
  }
  
  function ovrdObj (obj, overrides) {
    for (var o in overrides) {
      if (typeof obj[o] === 'function' && typeof overrides[o] === 'function') {
        obj[o] = ovrdFunction(obj[o], overrides[o]);
      } else {
        throw new Error('no function to override: ' + o);
      }
    }
    return obj;
  }

  return function (a, b) {
    if (typeof a === 'function' && typeof b === 'function') {
      return ovrdFunction(a, b);
    } 
    return ovrdObj(a, b);
  }
})();

function shallowCopy (obj) {
  return jQuery.extend({}, obj);
};

function deepCopy (obj) {
  return jQuery.extend(true, {}, obj);
};

function NotImplemented () {
  throw "Not Implemented";
};

function TODO (thing) {
  console.warn("TODO" + thing ? (": " + thing) : '');
};
;
;
/*
Copyright(c) 2011 Sam Taylor, released under MIT License.
*/
delete(function () {
  
  supplement.defineMethod(Number.prototype, 'toDps', function (n) {
    return parseFloat(this.toFixed(n));
  });
})()
;
;
/*
Copyright(c) 2011 Sam Taylor, released under MIT License.
*/
delete(function () {
  
  supplement.defineMethod(String.prototype, 'isUpperCase', function () {
    return this.toLowerCase() != this;
  });
  
  supplement.defineMethod(String.prototype, 'isLowerCase', function () {
    return this.toUpperCase() != this;
  });
  
  supplement.defineMethod(String.prototype, 'decamelize', function () {
    var chrs = [];
    
    for (var i = 0, j = 1; i < this.length; i++, j++) {
      var cur = this[i];
      var next = this[j];
      
      chrs.push(cur);
      
      if (next && next.isUpperCase() && /[a-zA-Z\d]/.test(cur)) {
        chrs.push(' ');
      }
    }
        
    return chrs.join('');
  });

  supplement.defineMethod(String.prototype, 'startsWith', function(s) {
    return new RegExp('^'+s).test(this);
  });
  
  supplement.defineMethod(String.prototype, 'contains', function(s) {
    return new RegExp(s).test(this);
  });

  supplement.defineMethod(String.prototype, 'endsWith', function(s) {
    return this.substr(s.length) === s;
  });

  supplement.defineMethod(String.prototype, 'squash', function () {
    return this.replace(/^\s+|\s+$/g, '');
  });

  supplement.defineMethod(String.prototype, 'enquote', function (quoteCharacter) {
    var q =  quoteCharacter || "'"
    return q + this + q;
  });

  // taken from http://stackoverflow.com/questions/6857552/regular-expression-in-crockfords-string-supplant
  supplement.defineMethod(String.prototype, 'supplant', function (dictionary) {
    return this.replace(/{([^{}]*)}/g, function (target, name) {

      var replacement = dictionary[name];

      return typeof replacement === 'string' || 
      typeof replacement === 'number' || 
      typeof replacement === 'boolean' 
      ? replacement : target;
    });
  });
  
  supplement.defineMethod(String.prototype, 'toFloat', function () {
    return parseFloat(this);
  });
  
  supplement.defineMethod(String.prototype, 'toInteger', function () {
    return parseInt(this);
  });  
})()
;
