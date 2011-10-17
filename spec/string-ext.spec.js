describe('string x', function () {
  describe('variableize', function () {

    it("should lowerCamelize names-and-namespaces-like-this", function() {
      expect('names-and-namespaces-like-this'.variableize()).toEqual('namesAndNamespacesLikeThis');
    });

    it("should lowerCamelize NamesAndNamespacesLikeThis", function() {
      expect('NamesAndNamespacesLikeThis'.variableize()).toEqual('namesAndNamespacesLikeThis');
    });

    it("should lowerCamelize names_like_this", function() {
      expect('names_like_this'.variableize()).toEqual('namesLikeThis');
    });

    it("should lowerCamelize namesLikeThis", function() {
      expect('namesLikeThis'.variableize()).toEqual('namesLikeThis');
    });

    it('should return "" on ""', function () {
      expect(''.variableize()).toEqual('');
    })

    it("should UpperCamelize namesLikeThis when passing true", function() {
      expect('namesLikeThis'.variableize(true)).toEqual('NamesLikeThis');
    });

    it("should lower camelize names like this", function () {
      expect('names like this'.variableize()).toEqual('namesLikeThis');
    });

    it('should prepend an underscore to avoid starting with a number', function () {
      expect('123'.variableize()).toEqual('_123');
    })
  })


  describe("quote", function() {
    it("encloses the string with the specified string", function() {
      expect("ur".quote('ch')).toEqual('church')
    });
  });

  describe("quote", function() {
    it('encloses the string with the " (quotation mark) by default', function() {
      expect("expense claims".quote()).toEqual('"expense claims"')
    });
  });
})