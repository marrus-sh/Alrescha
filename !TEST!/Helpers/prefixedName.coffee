{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Helpers", -> describe "prefixedName", ->
	prefixedName = null
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

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ context, prefixedName } = Kico

	it "is a function", ->
		expect prefixedName
			.a "function"

	it "falls back to default strings", ->
		expect String prefixedName "as:"
			.equals String context.as

	it "returns a NamedNode", ->
		node = prefixedName "as:"
		expect node.termType
			.equals "NamedNode"
		expect node.interfaceName
			.equals "NamedNode"

	it "can be configured with this", ->
		expect String prefixedName.call testThis, "ex_1:"
			.equals testThis.context.ex_1

	it "correctly appends the local name", ->
		expect String prefixedName.call testThis, "ex_2:FEAR"
			.equals "#{ testThis.context.ex_2 }FEAR"

	it "does not accept nodes as context", ->
		expect String prefixedName.call testThisWithContextAsPrefix1, "context:"
			.equals String testThisWithContextAsPrefix1.context
		expect String prefixedName.call testThisWithContextAsPrefix1, "value:"
			.equals testThisWithContextAsPrefix1.value
		expect String prefixedName.call testThisWithContextAsPrefix2, "value:"
			.equals testThisWithContextAsPrefix2.value

	it "throws for undefined values", ->
		do expect -> prefixedName.call { }, "not_defined_value:"
			.does.throw

	it "throws when no prefix is present", ->
		do expect -> prefixedName.call testThis, "prefix_free"
			.does.throw

	it "throws for invalid prefixes", ->
		do expect -> prefixedName.call testThis, "1:2"
			.does.throw

	it "throws when the prefix does not resolve to a URL", ->
		do expect -> prefixedName.call testThis, "not_a_url:"
			.does.throw

	it "can be used to tag templates", ->
		expect String (prefixedName.bind testThis)"ex_1:"
			.equals testThis.context.ex_1

	it "accepts computed values in template", ->
		expect String (prefixedName.bind testThis)"ex_#{ 1 }:"
			.equals testThis.context.ex_1
