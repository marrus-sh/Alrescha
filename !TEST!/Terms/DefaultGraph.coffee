{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Terms", -> describe "DefaultGraph", ->
	DefaultGraph = null
	instance = null
	instançe = null
	differentInstance = null

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ DefaultGraph } = Kico
		instance = Object.create DefaultGraph::,
			termType: value: "DefaultGraph"
			value: value: ""
		instançe = Object.create DefaultGraph::,
			termType: value: "DefaultGraph"
			value: value: "this doesnʼt matter"

	describe "constructor", ->

		it "is a function", ->
			expect DefaultGraph
				.a "function"

		it "requires 'new'", ->
			do expect -> do DefaultGraph
				.does.throw

		it "cannot be called as a constructor", ->
			do expect -> new DefaultGraph
				.does.throw

		it "is its own species", ->
			expect DefaultGraph
				.has.property Symbol.species, DefaultGraph

		it "gives its name as a primitive", ->
			expect do DefaultGraph[Symbol.toPrimitive]
				.does.equal DefaultGraph.name

	describe "instances", ->

		it "gives its value as a primitive", ->
			expect do instance[Symbol.toPrimitive]
				.does.equal instance.value

		it "gives its type as a string tag", ->
			expect Object::toString.call instance
				.does.equal "[object #{ instance.termType }]"

		describe "clone()", ->

			it "returns undefined for non-objects", ->
				expect DefaultGraph::clone.call undefined
					.is.undefined
				expect DefaultGraph::clone.call null
					.is.undefined

			it "clones to a new instance", ->
				expect do instance.clone
					.does.not.equal instance

			it "clones to an equivalent term", ->
				expect (do instance.clone).termType
					.does.equal instance.termType

		describe "equals()", ->

			it "returns false for non-objects", ->
				expect instance.equals undefined
					.is.false
				expect instance.equals null
					.is.false

			it "only cares about termType for equality", ->
				expect instance.equals instançe
					.is.true

		describe "toString()", ->

			it "gives its value", ->
				expect do instance.toString
					.does.equal instance.value
