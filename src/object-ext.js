/*
Copyright(c) 2011 Sam Taylor, released under MIT License.
*/
(function() {
  supplement.defineMethod(Object, 'extend', function (object, options) {

    options = options || {};
    object = object || {};

    return {
      withObject: function () {

        Array.toArray(arguments).forEach(function(other) {
          for (var member in other) {
            if (options.overwrite || (typeof object[member] === 'undefined')) {
              var name = (typeof options.prefix === 'undefined' || options.prefix === null) ? member : "" + options.prefix + member;
              object[name] = other[member];
            }
          }
        });

        return object;
      },
      mixin: function (mixin) {
        return typeof mixin === 'function' ? this.withObject(new mixin) : this.withObject(mixin);
      }
    };
  });

  supplement.defineMethod(Object, 'overwrite', function (object) {
    return Object.extend(object, {overwrite: true});
  });

  supplement.defineMethod(Object, 'override', (function () {
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

    return function (a) {
      return {
        withObject: function (b) {
          if (typeof a === 'function' && typeof b === 'function') {
            return ovrdFunction(a, b);
          }
          return ovrdObj(a, b);
        }
      }
    }
  })());

  supplement.defineMethod(Object, 'shallowCopy', function (obj) {
    return jQuery.extend({}, obj);
  });

  supplement.defineMethod(Object, 'deepCopy', function (obj) {
    return jQuery.extend(true, {}, obj);
  });
})();