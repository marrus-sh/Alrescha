{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Terms", -> describe "Term", ->
	Term = null
	instance = null
	instançe = null
	differentInstance = null

	before -> import("../../index.mjs").then ( { default: Kico } ) ->
		{ Term } = Kico
		instance = Object.create Term::,
			termType: value: "MyTerm"
			value: value: "MyTerm value"
		instançe = Object.create Term::,
			termType: value: "MyTerm"
			value: value: "MyTerm true"
		differentInstance = Object.create Term::,
			termType: value: "MoiTerm"
			value: value: "MoiTerm value"

	describe "constructor", ->

		it "is a function", ->
			expect Term
				.a "function"

		it "requires 'new'", ->
			do expect -> do Term
				.does.throw

		it "cannot be called as a constructor", ->
			do expect -> new Term
				.does.throw

		it "gives its name as a primitive", ->
			expect do Term[Symbol.toPrimitive]
				.does.equal Term.name

	describe "instances", ->

		it "gives its value as a primitive", ->
			expect do instance[Symbol.toPrimitive]
				.does.equal instance.value

		it "gives its type as a string tag", ->
			expect Object::toString.call instance
				.does.equal "[object #{ instance.termType }]"

		describe "clone()", ->

			it "returns undefined for non-objects", ->
				expect Term::clone.call undefined
					.is.undefined
				expect Term::clone.call null
					.is.undefined

			it "clones to a new instance", ->
				expect do instance.clone
					.does.not.equal instance

			it "clones to an equivalent term", ->
				expect (do instance.clone).termType
					.does.equal instance.termType
				expect (do instance.clone).value
					.does.equal instance.value

		describe "equals()", ->

			it "returns false for non-objects", ->
				expect instance.equals undefined
					.is.false
				expect instance.equals null
					.is.false

			it "only cares about termType for equality", ->
				expect instance.equals instançe
					.is.true
				expect instance.equals differentInstance
					.is.false

		describe "toString()", ->

			it "gives its value", ->
				expect do instance.toString
					.does.equal instance.value
