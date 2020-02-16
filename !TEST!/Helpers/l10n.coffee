{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Helpers", -> describe "l10n", ->
	l10n = null
	strings = null
	testThis = strings:
		"Kico: Kico.": "Not Kico"
		SWAP: "$2 $1"
		TRUE: "V A L U E"

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ l10n, strings } = Kico

	it "is a function", ->
		expect l10n
			.a "function"

	it "falls back to default strings", ->
		for key, value of strings
			expect l10n key, "$1", "$2", "$3"
				.does.equal value

	it "can be configured with this", ->
		expect l10n.call testThis, "Kico: Kico."
			.does.equal testThis.strings["Kico: Kico."]

	it "trims strings", ->
		expect (l10n.bind testThis)"    TRUE     "
			.does.equal "V A L U E"

	it "returns the key for undefined values", ->
		expect l10n.call { }, "NOT_DEFINED_VALUE"
			.does.equal "NOT_DEFINED_VALUE"

	it "accepts replacement strings", ->
		expect l10n.call testThis, "SWAP", "first", "second"
			.does.equal "second first"

	it "can be used to tag templates", ->
		expect (l10n.bind testThis)"TRUE"
			.does.equal "V A L U E"

	it "accepts replacement strings in template", ->
		expect (l10n.bind testThis)"SWAP #{ "first" } #{ "second" }"
			.does.equal "second first"
