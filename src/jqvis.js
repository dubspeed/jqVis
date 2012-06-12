namespace("jqvis");

(function() {
	
	var _html = "",
		_DOM = undefined,
	
		sethtml = function(html) {
			if (typeof html !== "string") {
				throw {
					name:"TypeError",
					message:"setHTML only accepts strings"
				}
			}
			_html = html;
			_DOM = undefined;
		},	
	
		gethtml = function() {
			return _html;
		},
	
		getDOM = function() {
			if (typeof _DOM == "undefined") {
				_DOM = $("<div>").html(_html);
			}
			return _DOM;
		},
	
		query = function(q, mark) {
			$(q, getDOM()).addClass(mark);
		},
		
		clear = function(mark) {
			$("." + mark, getDOM()).removeClass(mark);
		}
	
	jqvis.setHTML = sethtml;
	jqvis.getHTML = gethtml;
	jqvis.getDOM = getDOM;
	jqvis.query = query;
	jqvis.clear = clear;
}());