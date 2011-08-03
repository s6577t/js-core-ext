/*
Copyright(c) 2011 Sam Taylor, released under MIT License.
*/
;(function () {

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
})()
