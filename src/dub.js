(function (global){
	
	function namespace(name) {
		var elements = name.split(".");
		var parentEl = global;
		
		for (var count = 0; count < elements.length; count ++) {
			if (typeof parentEl[elements[count]] == "undefined") {
				parentEl[elements[count]] = {};
			}
			parentEl = parentEl[elements[count]];
		}
	};
	
	global.namespace = namespace;
	
	namespace("util");
	
	// returns # of token occurences in string
	util.count = function(token, string) {
		var nr = 0;
		while (string.indexOf(token) != -1) {
			nr += 1;
			string = string.slice(string.indexOf(token)+1);
		}
		return nr;
	};
	
}(this));

