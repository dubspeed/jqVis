namespace("jqvis");

(function() {
	
	var _html = "";
	
	var sethtml = function(html) {
		if (typeof html !== "string") {
			throw {
				name:"TypeError",
				message:"setHTML only accepts strings"
			}
		}
		_html = html;
	};	
	
	var gethtml = function() {
		return _html;
	}
	
	var getDOM = function() {
		return $("<div>").html(_html);
	}
	
	jqvis.setHTML = sethtml;
	jqvis.getHTML = gethtml;
	jqvis.getDOM = getDOM;
}());