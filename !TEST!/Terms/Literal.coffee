{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Terms", -> describe "Literal", ->
	RDFNode = null
	Literal = null
	pname = null
	instances = { }

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ RDFNode, Literal, pname } = Kico
		instances.simple = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "A string"
			nT: value: "\"A string\""
		instances.en = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "A string"
			language: value: "en"
			nT: value: "\"A string\"@en"
		instances.en_US = Object.create Literal::,
			termType: value: "Literal"
			value: value: "A string"
			language: value: "en-US"
			datatype: value: "example:discard"
			nT: value: "\"A string\"@en-us"
		instances.sco = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "A streng"
			language: value: "sco"
			nT: value: "\"A streng\"@sco"
		instances.true = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "1"
			datatype: value: pname"xsd:boolean"
			nT: value: "\"1\"^^#{ do pname"xsd:boolean".toNT }"
			turtle: value: "true"
			js: value: true
		instances.integer = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "1"
			datatype: value: pname"xsd:integer"
			nT: value: "\"1\"^^#{ do pname"xsd:integer".toNT }"
			turtle: value: "1"
			js: value: 1
		instances.decimal = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "1."
			datatype: value: pname"xsd:decimal"
			nT: value: "\"1.\"^^#{ do pname"xsd:decimal".toNT }"
			turtle: value: "1.0"
			js: value: 1
		instances.double = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "1.1"
			datatype: value: pname"xsd:double"
			nT: value: "\"1.1\"^^#{ do pname"xsd:double".toNT }"
			turtle: value: "1.1e1"
			js: value: 1.1
		instances.ninf = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "-INF"
			datatype: value: pname"xsd:double"
			nT: value: "\"-INF\"^^#{ do pname"xsd:double".toNT }"
			js: value: -Infinity
		instances.uri = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "http://example.com"
			datatype: value: pname"xsd:anyURI"
			nT: value: "\"http://example.com\"^^#{ do pname"xsd:anyURI".toNT }"
			js: value: new URL ("http://example.com")
		instances.base64 = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "YmFzZTY0"
			datatype: value: pname"xsd:base64Binary"
			nT: value: "\"YmFzZTY0\"^^#{ do pname"xsd:base64Binary".toNT }"
			js: value: (new Uint8Array (Buffer.from "YmFzZTY0", "base64")).buffer
		instances.hex = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "686578"
			datatype: value: pname"xsd:hexBinary"
			nT: value: "\"686578\"^^#{ do pname"xsd:hexBinary".toNT }"
			js: value: (new Uint8Array (Buffer.from "686578", "hex")).buffer
		instances.bad = Object.create Literal::,
			interfaceName: value: "Literal"
			nominalValue: value: "0"
			datatype: value: "not an IRI"

	describe "constructor", ->

		it "is a function", ->
			expect Literal
				.a "function"

		it "requires 'new'", ->
			do expect -> do Literal
				.does.throw

		it "cannot be called as a constructor", ->
			do expect -> new Literal
				.does.throw

		it "is its own species", ->
			expect Literal
				.has.property Symbol.species, Literal

		it "gives its name as a primitive", ->
			expect do Literal[Symbol.toPrimitive]
				.does.equal Literal.name

	describe "instances", ->

		it "gives its toString() value as a primitive when called with string hint", ->
			for own _, instance of instances
				expect instance[Symbol.toPrimitive] "string"
					.does.equal do instance.toString

		it "gives its native primitive value as a primitive", ->
			for own _, instance of [
				instances.simple
				instances.true
				instances.integer
				instances.decimal
				instances.double
				instances.ninf
			]
				expect do instance[Symbol.toPrimitive]
					.does.equal do instance.valueOf

		it "gives its type as a string tag", ->
			for own _, instance of instances
				expect Object::toString.call instance
					.does.equal "[object #{ instance.interfaceName }]"

		it "infers interfaceName and nominalValue", ->
			expect instances.en_US.interfaceName
				.does.equal instances.en_US.termType
			expect instances.en_US.nominalValue
				.does.equal instances.en_US.value

		it "infers termType and value", ->
			expect instances.simple.termType
				.does.equal instances.simple.interfaceName
			expect instances.simple.value
				.does.equal instances.simple.nominalValue

		it "has a string language", ->
			for own _, instance of instances
				expect instance
					.does.have.property "language"
				expect instance.language
					.a "string"

		describe "clone()", ->

			it "returns undefined for non-objects", ->
				expect Literal::clone.call undefined
					.is.undefined
				expect Literal::clone.call null
					.is.undefined

			it "clones to a new instance", ->
				expect do instances.simple.clone
					.does.not.equal instances.simple

			it "clones to a Literal", ->
				for own _, instance of instances when instance isnt instances.bad
					expect do instance.clone
						.has.own.property "interfaceName", "Literal"

			it "clones to an equivalent term", ->
				for own _, instance of instances when instance isnt instances.bad
					clone = do instance.clone
					clone2 = do instance.clone
					expect clone.termType
						.does.equal clone2.interfaceName
					expect clone.value
						.does.equal clone2.nominalValue
					expect clone.language
						.does.equal clone2.language
					expect clone.datatype.equals clone2.datatype
						.is.true

			it "lowercases the language", ->
				clone = do instances.en_US.clone
				expect clone.language
					.does.equal do instances.en_US.language.toLowerCase

			it "produces a NamedNode datatype", ->
				for own _, instance of instances when instance isnt instances.bad
					clone = do instance.clone
					expect clone
						.does.have.property "datatype"
					expect clone.datatype
						.does.have.property "interfaceName", "NamedNode"

			it "ignores datatype when cloning language-tagged nodes", ->
				clone = do instances.en_US.clone
				expect clone.datatype.equals pname"rdf:langString"
					.is.true

			it "throws when cloning invalid datatypes", ->
				do expect -> do instance.bad.clone
					.does.throw

		describe "equals()", ->

			it "returns false for non-objects", ->
				expect instances.simple.equals undefined
					.is.false
				expect instances.simple.equals null
					.is.false

			it "cares about all literal properties for equality", ->
				for [ instance, other ] in [
					[ instances.simple, instances.en ]
					[ instances.en, instances.en_US ]
					[ instances.simple, instances.true ]
					[ instances.true, instances.integer ]
					[ instances.integer, instances.decimal ]
				]
					expect instance.equals other
						.is.false

			it "can compare with native strings as an RDFNode", ->
				expect RDFNode::equals.call instances.simple, String do instances.simple.valueOf
					.is.true
				expect RDFNode::equals.call instances.true, instances.true.js
					.is.true
				expect RDFNode::equals.call instances.integer, instances.integer.js
					.is.true
				expect RDFNode::equals.call instances.decimal, instances.decimal.js
					.is.true
				expect RDFNode::equals.call instances.double, instances.double.js
					.is.true

		describe "toNT()", ->

			it "converts to N-Triples", ->
				for own _, instance of instances when instance isnt instances.bad
					expect do (do instance.clone).toNT
						.does.equal instance.nT

		describe "toTurtle()", ->

			it "converts to Turtle", ->
				for own _, instance of instances when instance isnt instances.bad
					expect do (do instance.clone).toTurtle
						.does.equal (instance.turtle ? instance.nT)

		describe "toString()", ->

			it "gives its value", ->
				for own _, instance of instances
					expect do instance.toString
						.does.equal instance.nominalValue

		describe "valueOf()", ->

			it "gives its native value", ->
				for own _, instance of instances when instance isnt instances.bad
					value = do instance.valueOf
					if typeof value isnt "object"
						expect value
							.does.equal (instance.js ? instance.nominalValue)
					else if value instanceof URL
						expect value.href
							.does.equal instance.js.href
					else if value instanceof ArrayBuffer
						view = new DataView value
						instanceView = new DataView instance.js
						expect view.byteLength
							.does.equal ((Buffer.from instance.js).toString "binary").length
						for index in [ 0...view.byteLength ]
							expect view.getUint8 index
								.does.equal (instanceView.getUint8 index), "#{ instance.nominalValue }@#{ index }"
