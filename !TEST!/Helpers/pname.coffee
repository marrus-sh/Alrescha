{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Helpers", -> describe "pname", ->
	pname = null
	context = null
	testThis = context:
		1: "example:1"
		ex_1: "example:co"
		ex_2: "example:no"
		prefix_free: "example:bad"
		not_a_url: "example worse"
	testThisWithContextAsPrefix1 =
		context:
			termType: "NamedNode"
			toString: -> "example:something"
		value: "example:value"
	testThisWithContextAsPrefix2 =
		context: interfaceName: "NamedNode"
		value: "example:value"

	before -> import("../../index.mjs").then ( { default: Al·rishāʼ } ) ->
		{ context, pname } = Al·rishāʼ

	it "is a function", ->
		expect pname
			.a "function"

	it "falls back to default strings", ->
		expect String pname "as:"
			.does.equal String context.as

	it "returns a NamedNode", ->
		node = pname "as:"
		expect node.termType
			.does.equal "NamedNode"
		expect node.interfaceName
			.does.equal "NamedNode"

	it "can be configured with this", ->
		expect String pname.call testThis, "ex_1:"
			.does.equal testThis.context.ex_1

	it "correctly appends the local name", ->
		expect String pname.call testThis, "ex_2:FEAR"
			.does.equal "#{ testThis.context.ex_2 }FEAR"

	it "does not accept nodes as context", ->
		expect String pname.call testThisWithContextAsPrefix1, "context:"
			.does.equal String testThisWithContextAsPrefix1.context
		expect String pname.call testThisWithContextAsPrefix1, "value:"
			.does.equal testThisWithContextAsPrefix1.value
		expect String pname.call testThisWithContextAsPrefix2, "value:"
			.does.equal testThisWithContextAsPrefix2.value

	it "throws for undefined values", ->
		do expect -> pname.call { }, "not_defined_value:"
			.does.throw

	it "throws when no prefix is present", ->
		do expect -> pname.call testThis, "prefix_free"
			.does.throw

	it "throws for invalid prefixes", ->
		do expect -> pname.call testThis, "1:2"
			.does.throw

	it "throws when the prefix does not resolve to a URL", ->
		do expect -> pname.call testThis, "not_a_url:"
			.does.throw

	it "can be used to tag templates", ->
		expect String (pname.bind testThis)"ex_1:"
			.does.equal testThis.context.ex_1

	it "accepts computed values in template", ->
		expect String (pname.bind testThis)"ex_#{ 1 }:"
			.does.equal testThis.context.ex_1
