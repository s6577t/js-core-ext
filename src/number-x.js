/*
Copyright(c) 2011 Sam Taylor, released under MIT License.
*/
delete(function () {
  
  supplement.defineMethod(Number.prototype, 'toDps', function (n) {
    return parseFloat(this.toFixed(n));
  });
})()
