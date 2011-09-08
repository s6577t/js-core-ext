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

  supplement.defineMethod(String.prototype, 'variableize', function (globalName) {
    var matches = this.split(/([^a-z])/g)
    var parts = [];
        
    for (var i = 0; i < matches.length; i++) {
      var match = matches[i];
      if (!match) continue;
      
      if (match.match(/^[A-Z]$/)) {
        var str = match + matches[++i];
        parts.push(str);
      } else if (match.match(/[-_]/)) {
        parts.push(matches[++i].titleize());
      } else {
        parts.push(match);
      }
    }
    
    var str = parts.join('');

    if (str[0]) {
      str = str.split('');
      str[0] = globalName ? str[0].toUpperCase() : str[0].toLowerCase();
      str = str.join('');
    }
    
    return str;    
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
