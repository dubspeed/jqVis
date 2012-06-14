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
		var html = "<div><p id='test'>test</p></div>";
		jqvis.setHTML(html);
		jqvis.setMark("<mark>","</mark>");
		jqvis.query("p#test");
		assertObject($("mark", jqvis.getDOM())[0]);
	},
	
	"test ascii html should reflect DOM manipulation": function() {
		var html = "<html><body><p id='test'>test</p></body></html>";
		// <html><body> gets stripped when using <div> instead of iframe!
		var markedHtml = "<mark><p id=\"test\">test</p></mark>";
		jqvis.setHTML(html);
		jqvis.setMark("<mark>","</mark>");
		jqvis.query("p#test");
		assertEquals(markedHtml, jqvis.getHTML());
	},
	
});

TestCase ("jqvis.setMarkTests", {
	"test setMark should be present": function() {
		assertNotUndefined(jqvis["setMark"]);
	},
	
	"test setMark requires html tags as marks": function () {
		assertException(function() {
			jqvis.setMark("test", "test");
		}, "TypeError");
		assertNoException(function() {
			jqvis.setMark("<mark>", "</mark>");
		});
	},
	
	"test marks should be set": function() {
		jqvis.setMark("<mark>","</mark>");
		assertEquals("<mark>", jqvis.getOpenMark());
		assertEquals("</mark>", jqvis.getCloseMark());
	},
	
	"test markTag should be = mark without <>": function() {
		jqvis.setMark("<mark>","</mark>");
		assertEquals("mark", jqvis.getMarkTag());
	}
});

TestCase ("jqvis.GetLineTsts", {
	setUp: function() {
		this.vis = Object.create(jqvis);
	},
	
	"test should throw if no mark is set": function () {
		var html = "<html>\n<body>\n<p>test</p>\n<p>foo</p>\n</body>\n</html>\n";
		this.vis.setHTML(html);
		assertException(function(){
			this.vis.getLines();
		}, "TypeError");
	}, 
	
	"test should throw if no html is set": function () {
		this.vis.setHTML("");
		this.vis.setMark("<mark>", "</mark>");
		assertException(function(){
			this.vis.getLines();
		}, "TypeError");
	},
	
	"test should return all line-numbers where matching 'mark'": function() {
		var html = "<html>\n<body>\n<mark><p>test</p></mark>\n<mark><p>foo</p></mark>\n</body>\n</html>\n";
		this.vis.setHTML(html);
		var result = this.vis.getLines();
		assertArray(result);
		assertEquals(2, result.length);
		assertEquals([2,3], result);
	},
	
	"test getLines should work with multiple linesbreaks": function() {
		var html = "<div>\nNot selected\n</div>\n<p>This\nis\nSparta!</p>\n";
		this.vis.setHTML(html);
		this.vis.setMark("<mark>","</mark>");
		this.vis.query("p");
		var result = this.vis.getLines();
		assertEquals([3,4,5], result);
	},
	
	"test no markers are left in html code after query": function() {
		var html = "<div>\nNot selected\n</div>\n<p>This\nis\nSparta!</p>\n";
		this.vis.setMark("<mark>","</mark>");
		this.vis.setHTML(html);
		this.vis.query("p");
		this.vis.getLines();
		assertEquals(-1, this.vis.getHTML().indexOf("mark"));
		assertEquals(html, this.vis.getHTML());
	}

});
