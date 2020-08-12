{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"
snapshot = require "snap-shot-it"
{ DOMImplementation, XMLSerializer } = require "xmldom"

describe "Terms", -> describe "NamedNode", ->
	RDFNode = null
	NamedNode = null
	instances = { }
	serializer = new XMLSerializer

	before -> import("../../index.mjs").then ( { default: Kico } ) ->
		{ RDFNode, NamedNode } = Kico
		implementation = new DOMImplementation
		Kico.defaultDocument = implementation.createDocument "http://www.w3.org/1999/xhtml", "html", implementation.createDocumentType "html", null, null
		instances.base = Object.create NamedNode::,
			interfaceName: value: "NamedNode"
			nominalValue: value: "https://example.com"
		instances.path = Object.create NamedNode::,
			interfaceName: value: "NamedNode"
			nominalValue: value: "https://example.com/path/"
		instances.doc = Object.create NamedNode::,
			interfaceName: value: "NamedNode"
			nominalValue: value: "https://example.com/path/doc"
		instances.query = Object.create NamedNode::,
			interfaceName: value: "NamedNode"
			nominalValue: value: "https://example.com/path/doc?query"
		instances.hash = Object.create NamedNode::,
			interfaceName: value: "NamedNode"
			nominalValue: value: "https://example.com/path/doc?query#hash"
		instances.rdfjs = Object.create NamedNode::,
			termType: value: "NamedNode"
			value: value: "https://example.com"
		instances.bad = Object.create NamedNode::,
			interfaceName: value: "NamedNode"
			nominalValue: value: "example.com/path/doc?query#hash"

	describe "constructor", ->

		it "is a function", ->
			expect NamedNode
				.a "function"

		it "requires 'new'", ->
			do expect -> do NamedNode
				.does.throw

		it "cannot be called as a constructor", ->
			do expect -> new NamedNode
				.does.throw

		it "gives its name as a primitive", ->
			expect do NamedNode[Symbol.toPrimitive]
				.does.equal NamedNode.name

	describe "instances", ->

		it "gives its toString() value as a primitive", ->
			for own _, instance of instances
				expect do instance[Symbol.toPrimitive]
					.does.equal do instance.toString

		it "gives its type as a string tag", ->
			for own _, instance of instances
				expect Object::toString.call instance
					.does.equal "[object #{ instance.interfaceName }]"

		it "infers interfaceName and nominalValue", ->
			expect instances.rdfjs.interfaceName
				.does.equal instances.rdfjs.termType
			expect instances.rdfjs.nominalValue
				.does.equal instances.rdfjs.value

		it "infers termType and value", ->
			expect instances.base.termType
				.does.equal instances.base.interfaceName
			expect instances.base.value
				.does.equal instances.base.nominalValue

		it "provides text", ->
			expect instances.base.text
				.does.equal do instances.base.toString

		it "has URL properties", ->
			url = new URL instances.hash
			for prop in [
				"hash"
				"host"
				"hostname"
				"href"
				"origin"
				"password"
				"pathname"
				"port"
				"protocol"
				"search"
				"username"
			]
				expect (do instances.hash.clone)[prop]
					.does.equal url[prop]

		describe "clone()", ->

			it "returns undefined for non-objects", ->
				expect NamedNode::clone.call undefined
					.is.undefined
				expect NamedNode::clone.call null
					.is.undefined

			it "clones to a new instance", ->
				expect do instances.base.clone
					.does.not.equal instances.base

			it "clones to a NamedNode", ->
				for own _, instance of instances when instance isnt instances.bad
					expect do instance.clone
						.has.own.property "interfaceName", "NamedNode"

			it "clones to an equivalent term", ->
				clone = do instances.base.clone
				expect clone.termType
					.does.equal instances.base.interfaceName
				expect clone.value
					.does.equal instances.base.nominalValue

			it "throws when cloning invalid names", ->
				do expect -> do instance.bad.clone
					.does.throw

		describe "dir()", ->

			it "correctly gets the dir", ->
				expect (do instances.hash.dir).equals instances.path
					.is.true

		describe "doc()", ->

			it "correctly gets the doc", ->
				expect (do instances.hash.doc).equals instances.query
					.is.true

		describe "equals()", ->

			it "returns false for non-objects", ->
				expect instances.base.equals undefined
					.is.false
				expect instances.base.equals null
					.is.false

			it "cares about both interfaceName and nominalValue for equality", ->
				expect instances.base.equals instances.hash
					.is.false
				expect instances.base.equals do instances.base.clone
					.is.true

			it "can compare with native strings as an RDFNode", ->
				expect RDFNode::equals.call instances.base, String do instances.base.valueOf
					.is.true

		describe "id()", ->

			it "correctly gets the id", ->
				expect (do instances.hash.id)
					.does.equal "hash"

		describe "toDOMNode()", ->

			it "generates a correct DOM node", ->
				for own key, instance of instances
					snapshot "namedNodes[\"#{ key }\"].toDOMNode()", serializer.serializeToString do instance.toDOMNode

		describe "toNT()", ->

			it "converts to N-Triples", ->
				expect (do instances.hash.toNT)
					.does.equal "<#{ instances.hash }>"

		describe "toString()", ->

			it "gives its value", ->
				for own _, instance of instances
					expect do instance.toString
						.does.equal instance.nominalValue

		describe "valueOf()", ->

			it "gives its value", ->
				for own _, instance of instances
					expect do instance.valueOf
						.does.equal instance.nominalValue
