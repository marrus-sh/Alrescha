{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"
snapshot = require "snap-shot-it"
{ DOMImplementation, XMLSerializer } = require "xmldom"

describe "Terms", -> describe "BlankNode", ->
	RDFNode = null
	BlankNode = null
	instances = { }
	serializer = new XMLSerializer

	before -> import("../../index.mjs").then ( { default: Al·rishāʼ } ) ->
		{ RDFNode, BlankNode } = Al·rishāʼ
		implementation = new DOMImplementation
		Al·rishāʼ.defaultDocument = implementation.createDocument "http://www.w3.org/1999/xhtml", "html", implementation.createDocumentType "html", null, null
		instances.instance = Object.create BlankNode::,
			interfaceName: value: "BlankNode"
			nominalValue: value: "1"
			datatype: value: "string"
		instances.instançe = Object.create BlankNode::,
			termType: value: "BlankNode"
			value: value: "2"
		instances.collection = Object.defineProperties (Reflect.construct Array, [
			interfaceName: "SomeTerm"
			nominalValue: "Some value"
		], BlankNode),
			interfaceName: value: "BlankNode"
			nominalValue: value: "collection"

	describe "constructor", ->

		it "is a function", ->
			expect BlankNode
				.a "function"

		it "requires 'new'", ->
			do expect -> do BlankNode
				.does.throw

		it "cannot be called as a constructor", ->
			do expect -> new BlankNode
				.does.throw

		it "gives its name as a primitive", ->
			expect do BlankNode[Symbol.toPrimitive]
				.does.equal BlankNode.name

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
			expect instances.instançe.interfaceName
				.does.equal instances.instançe.termType
			expect instances.instançe.nominalValue
				.does.equal instances.instançe.value

		it "infers termType and value", ->
			expect instances.instance.termType
				.does.equal instances.instance.interfaceName
			expect instances.instance.value
				.does.equal instances.instance.nominalValue

		it "provides text", ->
			expect instances.instance.text
				.does.equal do instances.instance.toString

		describe "clone()", ->

			it "returns undefined for non-objects", ->
				expect BlankNode::clone.call undefined
					.is.undefined
				expect BlankNode::clone.call null
					.is.undefined

			it "clones to a new instance", ->
				expect do instances.instance.clone
					.does.not.equal instances.instance

			it "clones to a BlankNode", ->
				for own _, instance of instances
					expect do instance.clone
						.has.own.property "interfaceName", "BlankNode"

			it "clones to an equivalent term", ->
				clone = do instances.instance.clone
				expect clone.termType
					.does.equal instances.instance.interfaceName
				expect clone.value
					.does.equal instances.instance.nominalValue

			it "does not clone blank node collection contents", ->
				clone = do instances.collection.clone
				expect clone.termType
					.does.equal instances.collection.interfaceName
				expect clone.value
					.does.equal instances.collection.nominalValue
				expect Array.isArray clone
					.is.false

		describe "equals()", ->

			it "returns false for non-objects", ->
				expect instances.instance.equals undefined
					.is.false
				expect instances.instance.equals null
					.is.false

			it "cares about both interfaceName and nominalValue for equality", ->
				expect instances.instance.equals instances.instançe
					.is.false
				expect instances.instance.equals do instances.instance.clone
					.is.true
				expect instances.instançe.equals do instances.instançe.clone
					.is.true

			it "can compare with native strings as an RDFNode", ->
				expect RDFNode::equals.call instances.instance, String do instances.instance.valueOf
					.is.true

		describe "toDOMNode()", ->

			it "generates a correct DOM node", ->
				for own key, instance of instances
					snapshot "blankNodes[\"#{ key }\"].toDOMNode()", serializer.serializeToString do instance.toDOMNode

		describe "toNT()", ->

			it "converts to N-Triples", ->
				expect (do instances.instance.toNT)
					.does.equal "_:#{ instances.instance.value }"

		describe "toString()", ->

			it "gives its value prefixed by _:", ->
				for own _, instance of instances
					expect do instance.toString
						.does.equal "_:#{ instance.nominalValue }"

		describe "valueOf()", ->

			it "gives its value", ->
				for own _, instance of instances
					expect do instance.valueOf
						.does.equal instance.nominalValue
