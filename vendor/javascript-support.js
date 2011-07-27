// Global functions, depends on jQuery

function queryParameter (name) {
  
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex_str = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp(regex_str);
  
  var results = regex.exec( window.location.href );
  
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function uuid () {
	// from: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	// http://www.ietf.org/rfc/rfc4122.txt
	var s = [];
	var hexDigits = "0123456789ABCDEF";
	for (var i = 0; i < 32; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[12] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

	var uuid = s.join("");
	return uuid;
}

function htmlEncode (value){ 
  return jQuery('<div/>').text(value).html(); 
} 

function htmlDecode (value){
  return jQuery('<div/>').html(value).text(); 
}

function isBlank(x) {
	var type = jQuery.type(x);	
	return type === 'undefined' || x === null || (type === 'string' && x === '') || (jQuery.isArray(x) && x.length === 0) || (typeof x === 'object' && jQuery.isEmptyObject(x));
}

function using (obj, f) {
  return f.call(obj, obj);
}

function merge (object) {

  return {
    into: function (target, options) {
      options = options || {};
      if (isBlank(options.overwrite)) options.overwrite = true;
       
      for (var member in object){
        if (options.overwrite || typeof target[member] === 'undefined') {
          target[member] = object[member];
        }
      }
      return merge(target)
    }
  };
};

// for use with option enabled methods
function defaultsFor (options, defaults) {
  options = options || {};
  merge(defaults).into(options, {overwrite: false});
  return options;
} 

function proxyFunction(context, phunction) {
  return function () {
    return phunction.apply(context, arguments);
  };
}

function toArray (object) {
  return Array.prototype.slice.call(object);
};

function NotImplemented () {
  throw new Exception("Not Implemented");
}

function TODO (thing) {
  console.warn("TODO" + thing ? (": " + thing) : '');
}