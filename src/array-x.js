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
