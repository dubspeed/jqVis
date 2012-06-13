TestCase ("jqVisTest", {
	"test should have a jqvis namespace": function() {
		assertObject(jqvis);
	},
	
	"test should have a setHTML method": function() {
		assertFunction(jqvis.setHTML);
	},
	
	"test should hava method getHTML": function() {
		assertFunction(jqvis.getHTML);
	},
	
	"test should retrieve previosly set html": function() {
		var html = "<html></html>";
		jqvis.setHTML(html);
		assertEquals(html, jqvis.getHTML());
	},
	
	"test set html should only accept strings": function() {
		assertException (function() {
			jqvis.setHTML(43242);
		}, "TypeError");

		assertException (function() {
			jqvis.setHTML({});
		}, "TypeError");
		
		assertException (function() {
		jqvis.setHTML([]);
		}, "TypeError");
		
		assertNoException (function() {
			jqvis.setHTML("huhu");
		});
	},
	
	"test should have method getDOM": function() {
		assertFunction(jqvis.getDOM);
	},
	
	"test given html code should be accessible as DOM": function() {
		var html = "<html><body><p id='test'>test</p></body></html>";
		var dom;
		jqvis.setHTML(html);
		dom = jqvis.getDOM();
		assertObject($("#test", dom)[0]);
		assertEquals("test", $("#test", dom).text());
	},
	
	"test getDOM should always reflect setHTML": function () {
		var html = "<html><body><p id='test'>test</p></body></html>";
		var htmlNew = "<html><body><p id='test'>pest</p></body></html>";
		var dom;
		jqvis.setHTML(html);
		jqvis.setHTML(htmlNew);
		dom = jqvis.getDOM();
		assertEquals("pest", $("#test", dom).text());
	},
	
	"test should mark a query": function() {
		var html = "<html><body><p id='test'>test</p></body></html>";
		var mark = "__BOM__";
		jqvis.setHTML(html);
		jqvis.query("p#test", mark);
		assert($("#test", jqvis.getDOM()).hasClass(mark));
	},
	
	"test should remove all marks from html": function() {
		var html = "<html><body><p class='__B__'>test</p><p class='__B__'>foo</p></body></html>";
		var mark = "__B__";
		jqvis.setHTML(html);
		jqvis.clear(mark);
		assertFalse($("p", jqvis.getDOM()).hasClass(mark))
	},
	
	"test ascii html should reflect DOM manipulation": function() {
		var html = "<html><body><p id='test'>test</p></body></html>";
		var mark = "__BOM__";
		// <html><body> gets stripped when using <div> instead of iframe!
		var markedHtml = "<p class=\"__BOM__\" id=\"test\">test</p>";
		jqvis.setHTML(html);
		jqvis.query("p#test", mark);
		assertEquals(markedHtml, jqvis.getHTML());
	},
	
	/*"test should access html by line number": function() {
		var html = "<html>\n<body>\n<p id='test'>test</p>\n</body>\n</html>\n";
		jqvis.setHTML(html);
		assertEquals("</body>", jqvis.getLine(3));
	},
	*/
	"test should return all line-numbers where matching class __B__ items are found": function() {
		var html = "<html>\n<body>\n<p class='__B__'>test</p>\n<p class='__B__'>foo</p>\n</body>\n</html>\n";
		var mark = "__B__";
		jqvis.setHTML(html);
		var result = jqvis.getLines(mark);
		assertArray(result);
		assertEquals(2, result.length);
		assertEquals([2,3], result);
	},
	
	"test getLines should work with multiple linesbreaks": function() {
		var html = "<div>\nNot selected\n</div>\n<p>This\nis\nSparta!</p>\n";
		var mark = "__B__";
		jqvis.setHTML(html);
		jqvis.query("p", mark);
		var result = jqvis.getLines(mark);
		assertEquals([3,4,5], result);
	},
	
	"test no markers are left in html code after query": function() {
		var html = "<div>\nNot selected\n</div>\n<p>This\nis\nSparta!</p>\n";
		var mark = "__B__";
		jqvis.setHTML(html);
		jqvis.query("p", mark);
		var result = jqvis.getLines(mark);
		jstestdriver.console.log(jqvis.getHTML());
		assertEquals(-1, jqvis.getHTML().indexOf(mark));
		//assertEquals(-1, jqvis.getHTML().indexOf("mark"));
		//assertEquals(html, jqvis.getHTML());
	}
	
	
});