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