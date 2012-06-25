$(document).ready(function() {
	
	var editor = undefined,
	
	message = $("section p.message"),

	tabs = $("#tabs").children(),

	vis = Object.create(jqvis),

	lastMarker = undefined,

	clearMarkers = function() {
		if (lastMarker) {
			for ( var i = 0; i < lastMarker.length; i += 1) {
				editor.clearMarker(lastMarker[i]);
			}
		}
	},

	setMarkers = function(lines) {
		lastMarker = lines;
		for ( var i = 0; i < lines.length; i += 1) {
			editor.setMarker(lines[i],
					"<div class='highlight_line'>%N%</div>"); // ,
																// className)
		}
	},
	
	showResult = function(lines) {
		if (vis.getLastError() !== null) {
			message.text(vis.getLastError());
			message.slideDown();
		} else if (lines.length == 0) {
			message.text("Your query did not return any valid results")
			message.slideDown();
		} else {
			message.slideUp();
			setMarkers(lines);
		}
	},

	loadExampleFile = function(name) {
		var xmlReq = $.get(name).success(function(data) {
			$("textarea#editor").text(xmlReq.responseText);
			createEditor();
		});
	},
	
	createEditor = function() {
		editor = CodeMirror.fromTextArea($("#editor")[0], {
			lineNumbers : true,
			matchBrackets : true
		});
	},

	showTab = function(tabNr) {
		tabs.hide();
		$(tabs[tabNr]).show();
	},

	/* Event handling */
	queryEvent = function(evt) {
		evt.preventDefault();
		clearMarkers();
		vis.setHTML(editor.getValue());
		vis.query($("#query").val());
		showResult(vis.getLines());
	},

	
	showTabEvent = function(evt) {
		evt.preventDefault();
		var id = $(this).val()
		showTab(id);
		$("nav li").removeClass("nav_selected");
		$(this).toggleClass("nav_selected");
	};
	
	/* View logic */

	vis.setMark("<mark>", "</mark>");

	$("#submit").bind("click", queryEvent);
	$("#submit").bind("hover", function() {
		$(this).toggleClass("button_hover");
	});
	$("nav li").bind("click", showTabEvent);
	$("nav li").bind("hover", function() {
		$(this).toggleClass("nav_hover");
	});
	
	message.hide();
	loadExampleFile("example.html");
	showTab(0);

});
