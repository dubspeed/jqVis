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

}(this));

