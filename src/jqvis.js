namespace("jqvis");

(function() {
	
	var _html = "",
		_DOM = undefined,
		_openMark = undefined,
		_closeMark = undefined,
		_markTag = undefined,
		
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
		
		query = function(q) {
			try {
				$(q, getDOM()).wrap(_openMark);
			} catch (e) {
				lastError = e;
				return;
			}
			lastError = null;
			updateHTMLfromDOM();
		},
		
		clear = function() {
			html = $(_markTag, getDOM()).children().unwrap(_openMark);
			updateHTMLfromDOM();
		},
		
		getLines = function() {
			if (!_openMark) {
				throw {name:"TypeError", message: "No mark set"};
			} 
			
			if (_html === "") {
				throw {name:"TypeError", message: "set HTML first"};
			}
			
			var lines = _html.split("\n");
			var result = [];
			var mode = "end";
			
			for (var i = 0; i < lines.length; i += 1){
				if (lines[i].indexOf(_openMark) != -1) {
					mode = "start";
				}
				if (mode === "start") {
					result.push(i);
				}
				if (lines[i].indexOf(_closeMark) != -1) {
					mode = "end";
				}
			}
			clear(_markTag);
			
			return result;
		},
		
		setMark = function(sMark, eMark) {
			if (sMark.indexOf("<") == -1 ||
				eMark.indexOf("<") == -1 || 
				eMark.indexOf("/") == -1) {
				throw {
					name: "TypeError",
					message: "setMark requires html tags e.g. <mark>"
				}
			}
			
			_openMark = sMark;
			_closeMark = eMark;
			_markTag = _openMark.substr(1, _openMark.length - 2);
		},
		
		lastError = null,
		
		getLastError = function () {
			return lastError;
		};
	
	// Public API
	jqvis.setHTML = sethtml;
	jqvis.getHTML = gethtml;
	jqvis.getDOM = getDOM;
	jqvis.query = query;
	jqvis.setMark = setMark;
	jqvis.getLines = getLines;
	jqvis.getLastError = getLastError;
	
	// Pseudo-Private API
	jqvis.clear = clear;
	jqvis.getOpenMark = function() { return _openMark};
	jqvis.getCloseMark = function() { return _closeMark};
	jqvis.getMarkTag = function() { return _markTag};
}());

