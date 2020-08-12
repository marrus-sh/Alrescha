{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"
{ DOMImplementation } = require "xmldom"

describe "Terms", -> describe "RDFNode", ->
	RDFNode = null
	pname = null
	instances = { }

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ RDFNode, pname } = Kico
		implementation = new DOMImplementation
		Kico.defaultDocument = implementation.createDocument "http://www.w3.org/1999/xhtml", "html", implementation.createDocumentType "html", null, null
		instances.instance = Object.create RDFNode::,
			interfaceName: value: "MyTerm"
			nominalValue: value: "MyTerm value"
			datatype: value: "string"
		instances.instançe = Object.create RDFNode::,
			termType: value: "MyTerm"
			value: value: "MyTerm true"
			language: value: "en"
		instances.bN = Object.create RDFNode::,
			interfaceName: value: "BlankNode"
			nominalValue: value: "MyTerm true"
		instances.bNC = Object.defineProperties (Reflect.construct Array, [
			interfaceName: "Literal"
			nominalValue: "Some value"
		], RDFNode),
			interfaceName: value: "BlankNode"
			nominalValue: value: "MyTerm_true"
		instances.l1 = Object.create RDFNode::,
			interfaceName: value: "Literal"
			nominalValue: value: "MyTerm true"
		instances.l2 = Object.create RDFNode::,
			interfaceName: value: "Literal"
			nominalValue: value: "true"
			datatype: value: pname"xsd:boolean"
		instances.l3 = Object.create RDFNode::,
			interfaceName: value: "Literal"
			nominalValue: value: "真"
			language: value: "cmn"
		instances.nN = Object.create RDFNode::,
			interfaceName: value: "NamedNode"
			nominalValue: value: "example:co"

	describe "constructor", ->

		it "is a function", ->
			expect RDFNode
				.a "function"

		it "requires 'new'", ->
			do expect -> do RDFNode
				.does.throw

		it "cannot be called as a constructor", ->
			do expect -> new RDFNode
				.does.throw

		it "gives its name as a primitive", ->
			expect do RDFNode[Symbol.toPrimitive]
				.does.equal RDFNode.name

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
				expect RDFNode::clone.call undefined
					.is.undefined
				expect RDFNode::clone.call null
					.is.undefined

			it "clones to a new instance", ->
				expect do instances.instance.clone
					.does.not.equal instances.instance

			it "clones to an equivalent term", ->
				clone = do instances.instance.clone
				expect clone.termType
					.does.equal instances.instance.interfaceName
				expect clone.value
					.does.equal instances.instance.nominalValue

			it "clones blank node collection contents", ->
				clone = do instances.bNC.clone
				console.log clone[0].interfaceName
				expect clone.termType
					.does.equal instances.bNC.interfaceName
				expect clone.value
					.does.equal instances.bNC.nominalValue
				expect Array.isArray clone
					.is.true
				expect clone[0].equals instances.bNC[0]
					.is.true

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

			it "cares about all literal properties on literals", ->
				for literal in [ instances.l1, instances.l2, instances.l3 ]
					for other in [ instances.l1, instances.l2, instances.l3 ]
						expect literal.equals do other.clone
							.equals literal is other

		describe "toDOMNode()", ->

			it "generates a DOM node when defined", ->
				for n in [
					instances.l1
					instances.l2
					instances.l3
					instances.bN
					instances.bNC
					instances.nN
				]
					expect do n.toDOMNode
						.does.have.property "nodeType"
				for n in [
					instances.instance
					instances.instançe
				]
					expect do n.toDOMNode
						.is.null

		describe "toNT()", ->

			it "converts to N-Triples when defined", ->
				for n in [
					instances.l1
					instances.l2
					instances.l3
					instances.bN
					instances.bNC
					instances.nN
				]
					expect do n.toNT
						.a "string"
				for n in [
					instances.instance
					instances.instançe
				]
					expect do n.toNT
						.is.null

		describe "toString()", ->

			it "gives its value, prefixed by _: for blank nodes", ->
				for own _, instance of instances
					if instance.interfaceName is "BlankNode"
						expect do instance.toString
							.does.equal "_:#{ instance.nominalValue }"
					else
						expect do instance.toString
							.does.equal instance.nominalValue

		describe "valueOf()", ->

			it "is a function", ->
				expect RDFNode::valueOf
					.a "function"
