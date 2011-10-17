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

    function overrideObject (originals, overrides) {
      for(var memberName in overrides) {
        var member = overrides[memberName];
        if (typeof member === 'function') {

          var originalFunction = originals[memberName];
          var newFunction = member;

          if (!originalFunction) throw "no function to override: " + memberName.quote();

          var baseProxy = function (args) {

            return function () {

              var baseArgs = (arguments.length > 0) ? Array.toArray(arguments) : args;
              return originalFunction.apply(originals, baseArgs);
            }
          }

          originals[memberName] = function () {

            var base = baseProxy(Array.toArray(arguments))
            var newFunctionArguments = Array.toArray(arguments);
            newFunctionArguments.unshift(base);

            return newFunction.apply(originals, newFunctionArguments);
          }
        }
      }
    }

    return function (originals) {
      return {
        withObject: function (overrides) {
          return overrideObject(originals, overrides);
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