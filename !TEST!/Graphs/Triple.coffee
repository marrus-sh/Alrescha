{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Graphs", -> describe "Triple", ->
	Term = null
	Triple = null
	instances = { }

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ Term, Triple } = Kico
		instances.triple = Object.create Triple::,
			subject: value:
				termType: "BlankNode"
				value: "sbj"
			predicate: value:
				termType: "NamedNode"
				value: "example:p"
			object: value:
				termType: "Literal"
				value: "example object"
				language: "en"
			graph: value:
				termType: "DefaultGraph"
				value: ""
		instances.other = Object.create Triple::,
			subject: value:
				termType: "BlankNode"
				value: "sbj"
			predicate: value:
				termType: "NamedNode"
				value: "example:p"
			object: value:
				termType: "Literal"
				value: "another example object"
				language: "en"
			graph: value:
				termType: "DefaultGraph"
				value: ""

	describe "constructor", ->

		it "is a function", ->
			expect Triple
				.a "function"

		it "requires 'new'", ->
			do expect -> do Triple
				.does.throw

		it "cannot be called as a constructor", ->
			do expect -> new Triple
				.does.throw

		it "is of undefined species", ->
			expect Triple
				.has.property Symbol.species, undefined

	describe "instances", ->

		it "gives its name as a string tag", ->
			expect Object::toString.call instances.triple
				.does.equal "[object Triple]"

		it "gives its actions as an empty array", ->
			expect instances.triple.actions
				.a "array"
			expect instances.triple.actions
				.does.have.property "length", 0

		it "is not empty", ->
			expect instances.triple.empty
				.is.false

		it "has a length of 1", ->
			expect instances.triple.length
				.does.equal 1

		describe "clone()", ->

			it "returns undefined for non-objects", ->
				expect Triple::clone.call undefined
					.is.undefined
				expect Triple::clone.call null
					.is.undefined

			it "clones to a new instance", ->
				expect do instances.triple.clone
					.does.not.equal instances.quad

			it "clones to a triple", ->
				expect do instances.triple.clone
					.instanceof Triple

		describe "equals()", ->

			it "checks subject, predicate and object", ->
				expect instances.triple.equals do instances.triple.clone
					.is.true
				for _, other in instances when other isnt instances.triple
					expect instances.triple.equals other
						.is.false

		describe "*resources()", ->

			it "makes a resource", ->
				expect do instances.triple.resources
					.does.respondTo "next"
				expect Array.from do instances.triple.resources
					.does.have.property "length", 1
				for resource in instances.triple.resources
					expect resource
						.instanceof Resource
				expect (do (do instances.triple.resources).next).value.equals instances.triple.subject
					.is.true

		describe "toArray()", ->

			it "gives an array containing an equivalent triple", ->
				expect do instances.triple.toArray
					.does.have.property "length", 1
				expect (do instances.triple.toArray)[0]
					.does.not.equal instances.triple
				expect (do instances.triple.toArray)[0].equals instances.triple
					.is.true

		describe "toNT()", ->

			it "returns the N-Triples representation", ->
				expect do instances.triple.toNT
					.does.equal (
						[
							"subject"
							"predicate"
							"object"
						].map ( $ ) => do (Term::clone.call instances.triple[$]).toNT
							.join " "
					) + " ."

		describe "toString()", ->

			it "returns the N-Triples representation", ->
				expect do instances.triple.toString
					.does.equal do instances.triple.toNT

		describe "*triples()", ->

			it "produces a clone of itself", ->
				expect do instances.triple.triples
					.does.respondTo "next"
				expect Array.from do instances.triple.triples
					.does.have.property "length", 1
				expect (Array.from do instances.triple.triples)[0]
					.does.not.equal instances.triple
				expect (Array.from do instances.triple.triples)[0].equals instances.triple
					.is.true

		describe "valueOf()", ->

			it "produces an object of values", ->
				expect do instances.triple.valueOf
					.does.have.property "subject", instances.triple.subject.value
				expect do instances.triple.valueOf
					.does.have.property "predicate", instances.triple.predicate.value
				expect do instances.triple.valueOf
					.does.have.property "object", instances.triple.object.value
