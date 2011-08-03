/*
Copyright(c) 2011 Sam Taylor, released under MIT License.
*/
;(function () {

  supplement.defineMethod(Array.prototype, 'copy', function () {
    return Array.toArray(this);
  });
  
  supplement.defineMethod(Array.prototype, 'exclude', function (obj) {
    var i = this.indexOf(obj)
    if (i >= 0) return this.splice(i, 1)
    return this;
  });
  
})()
