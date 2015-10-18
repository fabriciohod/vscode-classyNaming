/// <reference path="../typings/tsd.d.ts" />
var Parser = require('../out/csharpParser').CsharpParser;

describe("C# parser that extracts types from plaintext string", function () {
	var target = new Parser();
	var wellKnownInterface = "ISomeInterface";
	var wellKnownTextLine = " public TestConstructor(ISomeInterface ";
	
	
	it("should extract last word from first constructor parameter as a type", function () {
		var result = target.extractType(wellKnownTextLine);
		expect(result).toBe(wellKnownInterface);
	});

	it("should extract last word from other constructor parameters as a type", function () {
		var testInput = " public TestConstructor(SomeType type, ISomeInterface ";
		var result = target.extractType(testInput);
		expect(result).toBe(wellKnownInterface);
	});

	it("should break the interface in parts based on case, without I", function () {
		var result = target.splitTypeName(wellKnownInterface);
		expect(result).toEqual(["Some", "Interface"]);
	});

	it("should break the className in parts based on case", function () {
		var result = target.splitTypeName("TestCaseServiceProvider");
		expect(result).toEqual(["Test", "Case", "Service", "Provider"]);
	});

	it('should be able to provide suggested names', function () {
		var result = target.getSuggestions(wellKnownTextLine);
		expect(result).toEqual([
			'interface',
			'someInterface'
		]);
	});
});