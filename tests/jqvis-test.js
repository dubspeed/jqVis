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
	}
	
});