describe('Object.extend', function () {

  describe('with a prefix', function () {
    it("should gain members and their names have prefix", function() {
      var obj = {}
      var obj2 = {name: 'Boris'};

      Object.extend(obj, {prefix: '_meow_'}).withObject(obj2);

      expect(obj._meow_name).toEqual('Boris');
    });
  })

  it('it gains members of the extensions', function () {
    var obj = {
      member1: 'member1'
    };

    var obj2 = {
      member2: 'member2'
    };

    var obj3 = {
      member3: 'member3'
    };

    Object.extend(obj).withObject(obj2, obj3);

    expect(obj.member1).toEqual('member1');
    expect(obj.member2).toEqual('member2');
    expect(obj.member3).toEqual('member3');
  });

  it('assign members in order of the arguments', function () {
    var obj = {
      member1: 'member1'
    };

    var obj2 = {
      member2: 'member2'
    };

    var obj3 = {
      member2: 'member2obj3'
    };

    Object.extend(obj).withObject(obj2, obj3);

    expect(obj.member1).toEqual('member1');
    expect(obj.member2).toEqual('member2');
  });

  it('does not overwrite members of the target object', function () {
    var obj = {
      member1: 'member1'
    };

    var obj2 = {
      member1: 'member1obj2'
    };

    Object.extend(obj).withObject(obj2);

    expect(obj.member1).toEqual('member1');
  });

  it('with returns the target object', function () {
    var obj = {};
    var result = Object.extend(obj).withObject();
    expect(result).toBe(obj);
  });

  it('returns a new object if no object is passed to extend', function () {
    var obj = Object.extend().withObject();
    expect(obj).not.toBeNull();
  });
});

describe('Object.overwrite', function () {
  it('the members are overwritten with priority of arguments in ascending order', function () {
    var obj = {
      member1: 'member1'
    };

    var obj2 = {
      member1: 'member1obj2',
      member2: 'member2'
    };

    var obj3 = {
      member2: 'member2obj3'
    };

    Object.overwrite(obj).withObject(obj2, obj3);

    expect(obj.member1).toEqual('member1obj2');
    expect(obj.member2).toEqual('member2obj3');
  });
});

describe('Object.override', function () {
  describe("the new method implemenation", function() {
    it("should work with the same method signature as the original", function () {

      var args, overrideArgs;

      var obj = {
        func: function () { args = Array.toArray(arguments); }
      }

      Object.override(obj).withObject({
        func: function (base) {
          base();
          overrideArgs = Array.toArray(arguments);
        }
      })

      obj.func(1,2,3)

      expect(args.length).toEqual(3);
      expect(overrideArgs.length).toEqual(4);
      expect(overrideArgs[0]).toBeAFunction();
    });
    it("should receive a proxy for the original implementation ('base') as the first parameter", function () {

      var _base;

      var obj = {
        func: function () { args = Array.toArray(arguments); }
      }

      spyOn(obj, 'func');
      var f = obj.func;

      Object.override(obj).withObject({
        func: function (base) {
          _base = base
        }
      })

      obj.func();

      _base(1,2,3,4);

      expect(f).toHaveBeenCalledWith(1,2,3,4);
    });
    it("should receive any original paramters after base", function () {
       var overrideArgs;

        var obj = {
          func: function () { }
        }

        Object.override(obj).withObject({
          func: function (base) {
            overrideArgs = Array.toArray(arguments);
          }
        })

        obj.func('hello there');

        expect(overrideArgs.slice(1)[0]).toEqual('hello there');
    });
    it("should be called in the context of the overridden object", function () {
      var overrideContext;

      var obj = {
        func: function () { }
      }

      Object.override(obj).withObject({
        func: function () {
          overrideContext = this;
        }
      })
      
      obj.func();
      
      expect(overrideContext).toBe(obj);
    });
  });
  describe("calling base to invoke the original implementation", function () {
    it("calls the original in the context of the object owner", function () {
      var fContext;

      var obj = {
        func: function () { fContext = this; }
      }

      Object.override(obj).withObject({
        func: function (base) {
          base();
        }
      })

      obj.func();

      expect(fContext).toBe(obj);
    });
    it("should pass arguments to the original function by calling base() (with no parameters)", function () {

      var args;

      var obj = {
        func: function () { args = Array.toArray(arguments) }
      }

      Object.override(obj).withObject({
        func: function (base) {
          base()
        }
      })

      obj.func(1, 2, 3);

      expect(args.length).toBe(3);
    });
    it("should pass a modified parameter set to the original if base is called with parameters", function () {
      var args;

      var obj = {
        func: function () { args = Array.toArray(arguments) }
      }

      Object.override(obj).withObject({
        func: function (base) {
          base(1,2,3,4,5,6,7,8,9,0)
        }
      })

      obj.func(1, 2, 3);

      expect(args.length).toBe(10);
    });
  });
});
