(function () { "use strict";
var AliasVose = function(weightings) {
	this.labels = new Array();
	this.probabilities = new haxe.ds.StringMap();
	this.aliases = new haxe.ds.StringMap();
	var _sum = function(num,total) {
		return total + num;
	};
	var totalWeight = Lambda.fold(weightings,_sum,0), averageWeight = totalWeight / Lambda.count(weightings);
	var labelsSmall = new Array(), labelsLarge = new Array();
	var $it0 = weightings.keys();
	while( $it0.hasNext() ) {
		var label = $it0.next();
		this.labels.push(label);
		if(weightings.get(label) < averageWeight) labelsSmall.push(label); else labelsLarge.push(label);
		var v = weightings.get(label);
		this.probabilities.set(label,v);
		v;
	}
	while(labelsSmall.length > 0 && labelsLarge.length > 0) {
		var labelLarge = labelsLarge.pop(), labelSmall = labelsSmall.pop();
		var _g = labelLarge;
		var v = this.probabilities.get(_g) - (averageWeight - this.probabilities.get(labelSmall));
		this.probabilities.set(_g,v);
		v;
		this.aliases.set(labelSmall,labelLarge);
		labelLarge;
		if(this.probabilities.get(labelLarge) >= averageWeight) labelsLarge.push(labelLarge); else labelsSmall.push(labelLarge);
	}
	var $it1 = this.probabilities.keys();
	while( $it1.hasNext() ) {
		var label = $it1.next();
		var _g = label;
		var v = this.probabilities.get(_g) / averageWeight;
		this.probabilities.set(_g,v);
		v;
	}
	while(labelsLarge.length > 0) {
		this.probabilities.set(labelsLarge.pop(),1.0);
		1.0;
	}
	while(labelsSmall.length > 0) {
		this.probabilities.set(labelsSmall.pop(),1.0);
		1.0;
	}
};
AliasVose.__name__ = true;
AliasVose.prototype = {
	rand: function() {
		var label = this.labels[Std.random(this.labels.length)];
		var coinToss = Math.random() < this.probabilities.get(label);
		return coinToss?label:this.aliases.get(label);
	}
	,__class__: AliasVose
}
var HxOverrides = function() { }
HxOverrides.__name__ = true;
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.__name__ = true;
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
var IMap = function() { }
IMap.__name__ = true;
var Runner = function() { }
Runner.__name__ = true;
Runner.main = function() {
	var activities = (function($this) {
		var $r;
		var _g = new haxe.ds.StringMap();
		_g.set("Pillow fight",4.0);
		_g.set("Silent disco",9.0);
		_g.set("Trampolining",2.0);
		_g.set("Police ride-along",1.0);
		$r = _g;
		return $r;
	}(this));
	var picker = new AliasVose(activities);
	var results = new haxe.ds.StringMap();
	var $it0 = activities.keys();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		results.set(name,0);
		0;
	}
	var _g1 = 0;
	while(_g1 < 10000) {
		var i = _g1++;
		var _g2 = picker.rand();
		var v = results.get(_g2) + 1;
		results.set(_g2,v);
		v;
	}
	console.log(results);
}
var Std = function() { }
Std.__name__ = true;
Std.random = function(x) {
	return x <= 0?0:Math.floor(Math.random() * x);
}
var haxe = {}
haxe.ds = {}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
Runner.main();
})();
