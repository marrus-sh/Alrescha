{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"
snapshot = require "snap-shot-it"
{ DOMImplementation, XMLSerializer } = require "xmldom"

describe "Resources", -> describe "Resource", ->
	RDFNode = null
	Resource = null
	Graph = null
	pname = null
	serializer = new XMLSerializer

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ RDFNode, Resource, Graph, pname } = Kico
		implementation = new DOMImplementation
		Kico.defaultDocument = implementation.createDocument "http://www.w3.org/1999/xhtml", "html", implementation.createDocumentType "html", null, null

	describe "constructor", ->

		it "is a function", ->
			expect Resource
				.a "function"

		it "requires 'new'", ->
			do expect -> do Resource
				.does.throw

		it "can be called as a constructor", ->
			do expect -> new Resource "example:sbj"
				.does.not.throw

		it "gives its name as a primitive", ->
			expect do Resource[Symbol.toPrimitive]
				.does.equal Resource.name

	describe "instances", ->

		it "gives its toString value as a primitive", ->
			instance = new Resource "example:co"
			expect do instance[Symbol.toPrimitive]
				.does.equal do instance.toString

		it "gives its type as a string tag", ->
			instance = new Resource "example:co"
			expect Object::toString.call instance
				.does.equal "[object #{ instance.interfaceName }]"

		it "infers interfaceName and nominalValue", ->
			instance = Object.create Resource::,
				termType: value: "NamedNode"
				value: value: "example:co"
			expect instance.interfaceName
				.does.equal instance.termType
			expect instance.nominalValue
				.does.equal instance.value

		it "infers termType and value", ->
			instance = Object.create Resource::,
				interfaceName: value: "NamedNode"
				nominalValue: value: "example:co"
			expect instance.termType
				.does.equal instance.interfaceName
			expect instance.value
				.does.equal instance.nominalValue

		it "provides text", ->
			resource = new Resource "example:sbj"
			expect resource.text
				.does.equal do resource.toString

		it "knows whether it is empty", ->
			resource = new Resource "example:sbj"
			expect resource.empty
				.is.true
			resource["example:p"] = "example object"
			expect resource.empty
				.is.false

		it "produces a graph", ->
			resource = new Resource "example:sbj"
			resource["example:p"] = "example object"
			resource["example:p"] = "another example object"
			resource["example:p2"] = "player two"
			resource["example:collection"] = Object.defineProperties [
				interfaceName: "Literal"
				nominalValue: "Some value"
				language: "en"
			],
				interfaceName: value: "BlankNode"
				nominalValue: value: "collection"
			graph = resource.graph
			triples = do resource.triples
			expect graph
				.instanceof Graph
				.which.satisfies ( $ ) -> $[resource]?
			expect (Array.from do graph.triples).map ( { object, predicate, subject } ) => [
				{ subject: do subject.toNT }
				{ predicate: do predicate.toNT }
				{ object: do object.toNT }
			]
				.does.have.deep.members (Array.from triples).map ( { object, predicate, subject } ) => [
					{ subject: do subject.toNT }
					{ predicate: do predicate.toNT }
					{ object: do object.toNT }
				]

		describe "proxy", ->

			it "gets and sets a predicate with accessors", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				expect resource["example:p"]
					.instanceof RDFNode
					.which.has.property "nominalValue", "example object"
				expect resource["example:notP"]
					.is.undefined

			it "sets a predicate with defineProperty", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				Object.defineProperty resource, "example:p", value: "a different object"
				Object.defineProperty resource, "example:p",
					configurable: true
					value: "a different object"
					writable: true
				do expect -> (
					Object.defineProperty resource, "example:p",
						configurable: false
						value: "a nonconfigurable object"
				)
					.does.throw
				do expect -> (
					Object.defineProperty resource, "example:p",
						writable: false
						value: "a nonwritable object"
				)
					.does.throw
				do expect -> (
					Object.defineProperty resource, "example:p",
						get: ->
						value: "an accessor object"
				)
					.does.throw
				expect resource["example:p"]
					.instanceof RDFNode
					.which.has.property "nominalValue", "a different object"
				Object.defineProperty resource, "example:p", value: undefined
				expect resource
					.does.not.have.own.property "example:p"

			it "deletes a predicate with delete", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				expect delete resource["example:p"]
					.is.true
				expect resource["example:p"]
					.is.undefined
				expect delete resource["example:p"]
					.is.true

			it "gets a predicate descriptor with getOwnPropertyDescriptor", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				descriptor = Object.getOwnPropertyDescriptor resource, "example:p"
				expect descriptor
					.does.have.property "configurable"
					.which.is.true
				expect descriptor
					.does.have.property "enumerable"
					.which.is.true
				expect descriptor
					.does.have.property "get"
					.a "function"
				expect Object.getOwnPropertyDescriptor resource, "example:notP"
					.is.undefined

			it "checks for presence of a predicate with in", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				expect "example:p" of resource
					.is.true
				expect "example:notP" of resource
					.is.false

			it "includes predicates in own keys", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				expect (Object.keys resource).includes "example:p"
					.is.true
				expect (Object.keys resource).includes "example:notP"
					.is.false

			it "properly prevents extensions", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				Object.preventExtensions resource
				expect resource["example:p"]
					.instanceof RDFNode
					.which.has.property "nominalValue", "example object"
				expect resource["example:notP"]
					.is.undefined
				expect "example:p" of resource
					.is.true
				expect "example:notP" of resource
					.is.false
				descriptor = Object.getOwnPropertyDescriptor resource, "example:p"
				expect descriptor
					.does.have.property "configurable"
					.which.is.false
				expect descriptor
					.does.have.property "enumerable"
					.which.is.true
				expect descriptor
					.does.have.property "get"
					.a "function"
				expect Object.getOwnPropertyDescriptor resource, "example:notP"
					.is.undefined

			it "sets additively", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "first"
				resource["example:p"] = "second"
				resource["example:p"] = new Set [ "third", "fourth" ]
				expect resource["example:p"]
					.a "set"
					.which.has.property "size", 4
				expect (Array.from resource["example:p"]).map ($) => $.nominalValue
					.does.have.members [ "first", "second", "third", "fourth" ]

			it "does not add duplicates", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "obj"
				resource["example:p"] = "obj"
				expect resource["example:p"]
					.not.a "set"

		describe "a()", ->

			it "returns false when type is not defined", ->
				resource = new Resource "example:sbj"
				expect resource.a pname"foaf:Thing"
					.is.false

			it "checks the type", ->
				resource = new Resource "example:sbj"
				resource[pname"rdf:type"] = pname"foaf:Thing"
				expect resource.a pname"foaf:Thing"
					.is.true
				expect resource.a "example:Thing"
					.is.false
				resource[pname"rdf:type"] = new URL "example:Thing"
				expect resource.a pname"foaf:Thing"
					.is.true
				expect resource.a "example:Thing"
					.is.true

		describe "add()", ->

			it "adds", ->
				resource = new Resource "example:sbj"
				resource.add "example:p", "first"
				resource.add "example:p", "second"
				resource.add "example:p", new Set [ "third", "fourth" ]
				expect resource["example:p"]
					.a "set"
					.which.has.property "size", 4
				expect (Array.from resource["example:p"]).map ($) => $.nominalValue
					.does.have.members [ "first", "second", "third", "fourth" ]

			it "returns this", ->
				resource = new Resource "example:sbj"
				expect resource.add "example:p", "first"
					.does.equal resource

		describe "any()", ->

			it "returns undefined when none match", ->
				resource = new Resource "example:sbj"
				expect resource.any "example:p", -> true
					.is.undefined
				resource["example:p"] = "example object"
				expect resource.any "example:p", -> false
					.is.undefined

			it "returns match when present", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				resource["example:p"] = "example object"
				expect resource.any "example:p", -> true
					.does.have.property "nominalValue", "example object"
				resource["example:p"] = "another example object"
				expect resource.any "example:p", ( $ ) -> $.nominalValue isnt "example object"
					.does.have.property "nominalValue", "another example object"

		describe "all()", ->

			it "returns an empty set when none match", ->
				resource = new Resource "example:sbj"
				expect resource.all "example:p", -> true
					.a "set"
					.which.has.property "size", 0
				resource["example:p"] = "example object"
				expect resource.all "example:p", -> false
					.a "set"
					.which.has.property "size", 0

			it "returns matches when present", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				resource["example:p"] = "another example object"
				expect resource.all "example:p", -> true
					.a "set"
					.which.has.property "size", 2
				resource["example:p"] = "yet another example object"
				expect resource.all "example:p", ( $ ) -> $.nominalValue is "example object"
					.a "set"
					.which.has.property "size", 1

		describe "clear()", ->

			it "clears", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				resource["example:p2"] = "player two"
				expect Array.from resource.predicates()
					.does.have.property "length", 2
				do resource.clear
				expect Array.from resource.predicates()
					.does.have.property "length", 0

			it "returns undefined", ->
				resource = new Resource "example:sbj"
				expect do resource.clear
					.is.undefined

			it "clears as a fallback", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				resource["example:p2"] = "player two"
				expect Array.from resource.predicates()
					.does.have.property "length", 2
				Resource::clear.call resource
				expect Array.from resource.predicates()
					.does.have.property "length", 0

			it "returns undefined as a fallback", ->
				resource = new Resource "example:sbj"
				expect Resource::clear.call resource
					.is.undefined

		describe "clone()", ->

			it "returns undefined for non-objects", ->
				expect Resource::clone.call undefined
					.is.undefined
				expect Resource::clone.call null
					.is.undefined

			it "clones to a new instance", ->
				resource = new Resource "example:sbj"
				expect do resource.clone
					.does.not.equal resource

			it "clones to a Resource", ->
				resource = new Resource "example:sbj"
				expect do resource.clone
					.instanceof Resource

			it "does not clone to a Resource as an RDFNode", ->
				resource = new Resource "example:sbj"
				expect RDFNode::clone.call resource
					.not.instanceof Resource

			it "clones to an equivalent term", ->
				resource = new Resource "example:sbj"
				clone = do resource.clone
				expect resource.termType
					.does.equal resource.interfaceName
				expect resource.value
					.does.equal resource.nominalValue

			it "clones predicates", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				clone = do resource.clone
				expect clone
					.does.have.property "example:p"
				expect clone["example:p"].termType
					.does.equal resource["example:p"].interfaceName
				expect clone["example:p"].value
					.does.equal resource["example:p"].nominalValue

		describe "equals()", ->

			it "returns false for non-objects", ->
				resource = new Resource "example:sbj"
				expect resource.equals undefined
					.is.false
				expect resource.equals null
					.is.false

			it "cares exclusively about interfaceName and nominalValue for equality", ->
				resource = new Resource "example:sbj"
				same = Object.create RDFNode::,
					interfaceName: value: "NamedNode"
					nominalValue: value: "example:sbj"
				other = Object.create RDFNode::,
					interfaceName: value: "OtherNode"
					nominalValue: value: "example:sbj"
				expect resource.equals same
					.is.true
				expect resource.equals other
					.is.false

			it "cannot compare with native strings as an RDFNode", ->
				resource = new Resource "example:sbj"
				expect RDFNode::equals.call resource, String do resource.valueOf
					.is.false

		describe "matches()", ->

			it "returns false for no predicate", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				expect resource.matches null, "example object"
					.is.false

			it "returns false for undefined object", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				expect resource.matches "example:p"
					.is.false

			it "checks predicate presence for null object", ->
				resource = new Resource "example:sbj"
				expect resource.matches "example:p", null
					.is.false
				resource["example:p"] = "example object"
				expect resource.matches "example:p", null
					.is.true

			it "matches a predicate and object", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				expect resource.matches "example:p", "example object"
					.is.true
				expect resource.matches "example:notP", "example object"
					.is.false
				expect resource.matches "example:p", "not object"
					.is.false

			it "matches a predicate and multiple objects", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				expect resource.matches "example:p", new Set [
					"example object"
					"another example object"
				]
					.is.false
				resource["example:p"] = "another example object"
				expect resource.matches "example:p", new Set [
					"example object"
					"another example object"
				]
					.is.true

		describe "*predicates()", ->

			it "gets the predicates", ->
				resource = new Resource "example:sbj"
				expect do resource.predicates
					.does.respondTo "next"
				expect Array.from do resource.predicates
					.does.have.property "length", 0
				resource["example:p"] = "example object"
				resource["example:p"] = "another example object"
				resource["example:p2"] = "player two"
				expect (Array.from do resource.predicates).map ( $ ) => $.nominalValue
					.does.have.members [ "example:p", "example:p2" ]

			it "gets the predicates as a fallback", ->
				resource = new Resource "example:sbj"
				expect Resource::predicates.call resource
					.does.respondTo "next"
				expect Array.from Resource::predicates.call resource
					.does.have.property "length", 0
				resource["example:p"] = "example object"
				resource["example:p"] = "another example object"
				resource["example:p2"] = "player two"
				expect (Array.from Resource::predicates.call resource).map ( $ ) => $.nominalValue
					.does.have.members [ "example:p", "example:p2" ]

		describe "remove()", ->

			it "removes", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				resource["example:p"] = "another example object"
				resource.remove "example:p", "another example object"
				expect resource["example:p"]
					.instanceof RDFNode
					.which.has.property "nominalValue", "example object"

			it "returns whether an object was removed", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				resource["example:p"] = "another example object"
				expect resource.remove "example:p", "not present"
					.is.false
				expect resource.remove "example:p", "another example object"
					.is.true
				expect resource.remove "example:p", "another example object"
					.is.false
				expect resource.remove "example:p", "example object"
					.is.true
				expect resource.remove "example:p", "example object"
					.is.false

			it "removes as a fallback", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				resource["example:p"] = "another example object"
				Resource::remove.call resource, "example:p", "another example object"
				expect resource["example:p"]
					.instanceof RDFNode
					.which.has.property "nominalValue", "example object"

			it "returns whether an object was removed as a fallback", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				resource["example:p"] = "another example object"
				expect Resource::remove.call resource, "example:p", "not present"
					.is.false
				expect Resource::remove.call resource, "example:p", "another example object"
					.is.true
				expect Resource::remove.call resource, "example:p", "another example object"
					.is.false
				expect Resource::remove.call resource, "example:p", "example object"
					.is.true
				expect Resource::remove.call resource, "example:p", "example object"
					.is.false

		describe "set()", ->

			it "sets", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				resource.set "example:p", "a different object"
				expect resource["example:p"]
					.instanceof RDFNode
					.which.has.property "nominalValue", "a different object"

			it "returns this", ->
				resource = new Resource "example:sbj"
				expect resource.set "example:p", "a different object"
					.does.equal resource

		describe "toDOMNode()", ->

			it "generates a correct DOM node", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				resource["example:p"] = "another example object"
				resource["example:p2"] = "player two"
				resource["example:collection"] = Object.defineProperties [
					interfaceName: "Literal"
					nominalValue: "Some value"
					language: "en"
				],
					interfaceName: value: "BlankNode"
					nominalValue: value: "collection"
				snapshot "resource.toDOMNode()", serializer.serializeToString do resource.toDOMNode

		describe "toNT()", ->

			it "converts to N-Triples", ->
				named = new Resource "example:sbj"
				blank = new Resource "_:sbj"
				expect do named.toNT
					.does.equal "<example:sbj>"
				expect do blank.toNT
					.does.equal "_:sbj"

		describe "toString()", ->

			it "gives its value, prefixed by _: for blank nodes", ->
				named = new Resource "example:sbj"
				blank = new Resource "_:sbj"
				expect (do named.toString)
					.does.equal "example:sbj"
				expect (do blank.toString)
					.does.equal "_:sbj"

		describe "*triples()", ->

			it "produces triples", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				resource["example:p"] = "another example object"
				resource["example:p2"] = "player two"
				resource["example:collection"] = Object.defineProperties [
					interfaceName: "Literal"
					nominalValue: "Some value"
					language: "en"
				],
					interfaceName: value: "BlankNode"
					nominalValue: value: "collection"
				triples = do resource.triples
				expect triples
					.does.respondTo "next"
				expect (Array.from triples).map ( { object, predicate, subject } ) => [
					{ subject: do subject.toNT }
					{ predicate: do predicate.toNT }
					{ object: do object.toNT }
				]
					.does.have.deep.members [
						[
							{ subject: "<example:sbj>" }
							{ predicate: "<example:p>" }
							{ object: "\"example object\"" }
						]
						[
							{ subject: "<example:sbj>" }
							{ predicate: "<example:p>" }
							{ object: "\"another example object\"" }
						]
						[
							{ subject: "<example:sbj>" }
							{ predicate: "<example:p2>" }
							{ object: "\"player two\"" }
						]
						[
							{ subject: "<example:sbj>" }
							{ predicate: "<example:collection>" }
							{ object: "_:collection" }
						]
						[
							{ subject: "_:collection" }
							{ predicate: do pname"rdf:first".toNT }
							{ object: "\"Some value\"@en" }
						]
						[
							{ subject: "_:collection" }
							{ predicate: do pname"rdf:rest".toNT }
							{ object: do pname"rdf:nil".toNT }
						]
					]

		describe "valueOf()", ->

			it "gives a map of values", ->
				resource = new Resource "example:sbj"
				resource["example:p"] = "example object"
				expect (do (do (do resource.valueOf).entries).next).value
					.a "array"
					.does.have.members [
						"example:p"
						"example object"
					]
