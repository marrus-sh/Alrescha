{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Helpers", -> describe "l10n", ->
	l10n = null
	LOCALIZATION_STRINGS = null
	testThis = LOCALIZATION_STRINGS:
		KICO: "Not Kico"
		SWAP: "$2 $1"
		TRUE: "V A L U E"

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ l10n, LOCALIZATION_STRINGS } = Kico

	it "is a function", ->
		expect l10n
			.a "function"

	it "falls back to default strings", ->
		expect l10n "KICO"
			.does.equal LOCALIZATION_STRINGS.KICO

	it "can be configured with this", ->
		expect l10n.call testThis, "KICO"
			.does.equal testThis.LOCALIZATION_STRINGS.KICO

	it "returns the empty string for undefined values", ->
		expect l10n.call { }, "NOT_DEFINED_VALUE"
			.does.equal ""

	it "accepts replacement strings", ->
		expect l10n.call testThis, "SWAP", "first", "second"
			.does.equal "second first"

	it "can be used to tag templates", ->
		expect (l10n.bind testThis)"TRUE"
			.does.equal "V A L U E"

	it "accepts replacement strings in template", ->
		expect (l10n.bind testThis)"SWAP#{ "first" }#{ "second" }"
			.does.equal "second first"
