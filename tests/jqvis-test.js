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
		
	}
	
});