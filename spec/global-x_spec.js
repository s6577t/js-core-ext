describe('when an object is extended', function () {
  
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
    
    extend(obj).with(obj2, obj3);
    
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
    
    extend(obj).with(obj2, obj3);
    
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
    
    extend(obj).with(obj2);
    
    expect(obj.member1).toEqual('member1');
  });
  
  it('with returns the target object', function () {
    var obj = {};
    var result = extend(obj).with();
    expect(result).toBe(obj);
  });
  
  it('returns a new object if no object is passed to extend', function () {
    var obj = extend().with();
    expect(obj).not.toBeNull();
  });
});

describe('when an object is overwitten', function () {
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
    
    overwrite(obj).with(obj2, obj3);
    
    expect(obj.member1).toEqual('member1obj2');
    expect(obj.member2).toEqual('member2obj3');
  });
});

describe('when calling using with an object and function', function () {
  it ('calls the function in the context of that object', function () {
   var obj = {};
   using(obj, function () {
     expect(this).toBe(obj);
   }); 
  });
});

describe('proxy functions', function () {
  it('runs the function in the given context', function () {
    var context = {};
    var anotherObject = {
      f: function () {
        expect(this).toBe(context);
      }
    };
    var fProxy = proxyFunction(context, anotherObject.f);
    fProxy();
  });
});

describe('override(f, g)', function () {
  var obj = {}, g, fThis, gThis;
  beforeEach(function () {
    obj.f = function () {
      fThis = this;
    }
    g = function (base) {
      base()
      gThis = this;
    }
  })
  
  it('runs f in the context of the owner', function () {
    obj.ovrd = override(obj.f, function (base) {
      base()
    });
    
    obj.ovrd();
    expect(fThis).toBe(obj);
  });
  it('runs g in the context of the owner', function () {
    obj.ovrd = override(obj.f, g);
    
    obj.ovrd();
    expect(gThis).toBe(obj);
  });
  it('calls g with the first argument f and any other arguments after', function () {
    var args;
    var ovrd = override(obj.f, function (base) {
      base();
      args = Array.toArray(arguments);
    });
    
    ovrd(1,2,3,4,5,6,7,8);
    expect(args.length).toEqual(9);
  });
  it('base() call automatically passes override args', function () {
    var args;
    var ovrd = override(function () {
      args = Array.toArray(arguments);
    }, function (base) {
      base();
      
    });
    
    ovrd(1,2,3,4,5,6,7,8);
    expect(args.length).toEqual(8);
  });
  it('base() call with arguments passes overridden arguments', function () {
    var args;
    var ovrd = override(function () {
      args = Array.toArray(arguments);
    }, function (base) {
      base(3,2,1);
      
    });
    
    ovrd(1,2,3,4,5,6,7,8);
    expect(args.length).toEqual(3);
  })
});