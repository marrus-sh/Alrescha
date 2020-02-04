{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Terms", -> describe "Resource", ->
	RDFNode = null
	Resource = null
	Graph = null
	pname = null
	instances = { }

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ RDFNode, Resource, Graph, pname } = Kico

	describe "constructor", ->

		it "is a function", ->
			expect Resource
				.a "function"

		it "requires 'new'", ->
			do expect -> do Resource
				.does.throw

		it "can be called as a constructor", ->
			do expect -> new Resource
				.does.not.throw

		it "is of undefined species", ->
			expect Resource
				.has.property Symbol.species, undefined

		it "gives its name as a primitive", ->
			expect do Resource[Symbol.toPrimitive]
				.does.equal Resource.name
