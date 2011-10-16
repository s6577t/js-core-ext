describe("globals", function() {

  describe("uuid()", function() {
    it("should be 16 characters long with only hexadecimal digits", function() {
      expect(uuid()).toMatch(/^[0-9A-F]{32}$/) // not upto RFC 4122
    });
  });

  describe("proxyFunction()", function() {
    it("should call the function in the context of the specified object", function() {
      var context = null;
      var f = function () { context = this; }
      var obj = {}

      proxyFunction(obj, f)()

      expect(context).toBe(obj)
    });
  });

  describe("defaultsFor", function() {
    it("should populate the options object with the specified defaults, not overwriting anything", function() {

      var options = defaultsFor({
        one: 1
      }, {
        one: 2,
        two: 2
      })

      expect(options.one).toEqual(1)
      expect(options.two).toEqual(2)
    });
  });

  describe("NotImplemented", function() {
    it("should raise a runtime exception with the message Not Implemented", function() {
      expect(NotImplemented).toThrow('Not Implemented')
    });
  });
});