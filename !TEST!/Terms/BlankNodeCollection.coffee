{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Terms", -> describe "BlankNodeCollection", ->
	RDFNode = null
	BlankNodeCollection = null
	Graph = null
	pname = null
	instances = { }

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ RDFNode, BlankNodeCollection, Graph, pname } = Kico
		instances.not = Object.create BlankNodeCollection::,
			interfaceName: value: "BlankNode"
			nominalValue: value: "1"
			datatype: value: "string"
		instances.collection = Object.defineProperties (Reflect.construct Array, [
			interfaceName: "Literal"
			nominalValue: "Some value"
			language: "en"
		], BlankNodeCollection),
			interfaceName: value: "BlankNode"
			nominalValue: value: "collection"
		instances.same = Object.defineProperties (Reflect.construct Array, [
			termType: "Literal"
			value: "Different value"
		], BlankNodeCollection),
			termType: value: "BlankNode"
			value: value: "collection"
		instances.other = Object.defineProperties (Reflect.construct Array, [
			interfaceName: "SomeTerm"
			nominalValue: "Some value"
		], BlankNodeCollection),
			interfaceName: value: "BlankNode"
			nominalValue: value: "other collection"
		instances.empty = Object.defineProperties (Reflect.construct Array, [ ], BlankNodeCollection),
			interfaceName: value: "BlankNode"
			nominalValue: value: "other collection"

	describe "constructor", ->

		it "is a function", ->
			expect BlankNodeCollection
				.a "function"

		it "requires 'new'", ->
			do expect -> do BlankNodeCollection
				.does.throw

		it "cannot be called as a constructor", ->
			do expect -> new BlankNodeCollection
				.does.throw

		it "is its own species", ->
			expect BlankNodeCollection
				.has.property Symbol.species, BlankNodeCollection

		it "gives its name as a primitive", ->
			expect do BlankNodeCollection[Symbol.toPrimitive]
				.does.equal BlankNodeCollection.name

	describe "instances", ->

		it "gives its toString value as a primitive", ->
			for own _, instance of instances
				expect do instance[Symbol.toPrimitive]
					.does.equal do instance.toString

		it "gives its type as a string tag", ->
			for own _, instance of instances
				expect Object::toString.call instance
					.does.equal "[object #{ instance.interfaceName }]"

		it "infers interfaceName and nominalValue", ->
			expect instances.same.interfaceName
				.does.equal instances.same.termType
			expect instances.same.nominalValue
				.does.equal instances.same.value

		it "infers termType and value", ->
			expect instances.collection.termType
				.does.equal instances.collection.interfaceName
			expect instances.collection.value
				.does.equal instances.collection.nominalValue

		it "produces a graph", ->
			graph = instances.collection.graph
			triples = instances.collection.triples
			expect graph
				.instanceof Graph
				.which.satisfies ( $ ) -> $.hasResource instances.collection
			expect (Array.from graph.triples).map ( { object, predicate, subject } ) => [
				{ subject: do subject.toNT }
				{ predicate: do predicate.toNT }
				{ object: do object.toNT }
			]
				.does.have.deep.members (Array.from triples).map ( { object, predicate, subject } ) => [
					{ subject: do subject.toNT }
					{ predicate: do predicate.toNT }
					{ object: do object.toNT }
				]

		it "produces triples", ->
			triples = do instances.collection.triples
			expect triples
				.does.respondTo "next"
			expect (Array.from triples).map ( { object, predicate, subject } ) => [
				{ subject: do subject.toNT }
				{ predicate: do predicate.toNT }
				{ object: do object.toNT }
			]
				.does.have.deep.members [
					[
						{ subject: do instances.collection.toNT }
						{ predicate: do pname"rdf:first".toNT }
						{ object: RDFNode::toNT.call instances.collection[0] }
					]
					[
						{ subject: do instances.collection.toNT }
						{ predicate: do pname"rdf:rest".toNT }
						{ object: do pname"rdf:nil".toNT }
					]
				]


		describe "clone()", ->

			it "returns undefined for non-objects", ->
				expect BlankNodeCollection::clone.call undefined
					.is.undefined
				expect BlankNodeCollection::clone.call null
					.is.undefined

			it "clones to a new instance", ->
				expect do instances.collection.clone
					.does.not.equal instances.collection

			it "clones to a BlankNode", ->
				for own _, instance of [
					instances.collection
					instances.same
					instances.other
				]
					expect do instance.clone
						.has.own.property "interfaceName", "BlankNode"

			it "clones to an equivalent term", ->
				clone = do instances.collection.clone
				expect clone.termType
					.does.equal instances.collection.interfaceName
				expect clone.value
					.does.equal instances.collection.nominalValue

			it "clones blank node collection contents", ->
				clone = do instances.collection.clone
				expect clone.termType
					.does.equal instances.collection.interfaceName
				expect clone.value
					.does.equal instances.collection.nominalValue
				expect Array.isArray clone
					.is.true
				expect RDFNode::equals.call clone[0], instances.collection[0]
					.is.true

			it "clones an empty array to rdf:nil", ->
				clone = do instances.empty.clone
				expect Array.isArray clone
					.is.false
				expect clone.equals pname"rdf:nil"
					.is.true

		describe "equals()", ->

			it "returns false for non-objects", ->
				expect instances.collection.equals undefined
					.is.false
				expect instances.collection.equals null
					.is.false

			it "cares about both interfaceName and nominalValue for equality", ->
				expect instances.collection.equals instances.other
					.is.false
				expect instances.collection.equals do instances.collection.clone
					.is.true
				expect instances.other.equals do instances.other.clone
					.is.true

			it "does not care about collection contents", ->
				expect instances.collection.equals instances.same
					.is.true

			it "cannot compare with native strings as an RDFNode", ->
				expect RDFNode::equals.call instances.collection, String do instances.collection.valueOf
					.is.false

		describe "toNT()", ->

			it "converts to N-Triples", ->
				expect (do instances.collection.toNT)
					.does.equal "_:#{ instances.collection.value }"

		describe "toString()", ->

			it "gives its value prefixed by _:", ->
				for own _, instance of instances
					expect do instance.toString
						.does.equal "_:#{ instance.nominalValue }"

		describe "valueOf()", ->

			it "gives an array of values", ->
				expect do instances.collection.valueOf
					.a "array"
					.which.has.members [ instances.collection[0].nominalValue ]
