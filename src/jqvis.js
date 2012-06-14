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
	
		updateHTMLfromDOM = function() {
			_html = $(_DOM).html();
		},
		
		query = function(q, mark) {
			$(q, getDOM()).wrap(mark);
			updateHTMLfromDOM();
		},
		
		clear = function(mark) {
			html = $(mark, getDOM()).children().unwrap(mark);
			updateHTMLfromDOM();
		},
		
		getLines = function(mark) {
			var lines = "";
			var result = [];
			
			lines =  _html.split("\n");
			var mode = "end";
			for (var i = 0; i < lines.length; i += 1){
				if (lines[i].indexOf("<mark>") != -1) {
					mode = "start";
				}
				if (mode === "start") {
					result.push(i);
				}
				if (lines[i].indexOf("</mark>") != -1) {
					mode = "end";
				}
			}
			clear("mark");
			
			return result;
		};
	
	// Public API
	jqvis.setHTML = sethtml;
	jqvis.getHTML = gethtml;
	jqvis.getDOM = getDOM;
	jqvis.query = query;
	jqvis.clear = clear;
	jqvis.getLines = getLines;
}());