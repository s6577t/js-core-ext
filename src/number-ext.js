/*
Copyright(c) 2011 Sam Taylor, released under MIT License.
*/
(function () {
  
  supplement.defineMethod(Number.prototype, 'ordinalize', function (n) {
    return (this).toString().ordinalize();
  });
})()
