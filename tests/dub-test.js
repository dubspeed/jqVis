TestCase("DubTests", {
	
	"test global should have a method namespace": function() {
		assertFunction(namespace);
	},
	
	"test namespace function should create a namespace": function() {
		namespace("test");
		assertObject(test);
	},
	
	"test should not override a namespace": function() {
		namespace("test");
		test.something = "test";
		namespace("test");
		assertEquals("test", test.something);
	},
	
	"test should accept . string": function() {
		namespace("its.name.is.awsome");
		assertObject(its.name.is.awsome);
	}
}); 