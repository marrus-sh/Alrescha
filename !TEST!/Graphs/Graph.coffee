{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Graphs", -> describe "Graph", ->
	Graph = null
	GraphView = null
	RDFNode = null
	Resource = null
	TripleAction = null
	createGraph = null
	pname = null

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ Graph, GraphView, RDFNode, Resource, TripleAction, createGraph, pname } = Kico

	describe "constructor", ->

		it "is a function", ->
			expect Graph
				.a "function"

		it "requires 'new'", ->
			do expect -> do Graph
				.does.throw

		it "cannot be called as a constructor", ->
			do expect -> new Graph
				.does.throw

		it "is its own species", ->
			expect Graph
				.has.property Symbol.species, Graph

	describe "instances", ->

		it "gives its name as a string tag", ->
			instance = do createGraph
			expect Object::toString.call instance
				.does.equal "[object Graph]"

		it "gives its actions as an array", ->
			instance = do createGraph
			expect instance.actions
				.a "array"
			expect instance.actions
				.does.have.property "length", 0
			instance.addAction
				action: ->
				test: ->
			expect instance.actions
				.does.have.property "length", 1
			expect instance.actions[0]
				.instanceof TripleAction

		it "knows whether it is empty", ->
			instance = do createGraph
			expect instance.empty
				.is.true
			instance.add
				subject: "example:sbj"
				predicate: "example:p"
				object: "example object"
			expect instance.empty
				.is.false

		it "knows its length", ->
			instance = do createGraph
			expect instance.length
				.does.equal 0
			instance.add
				subject: "example:sbj"
				predicate: "example:p"
				object: "example object"
			instance.add
				subject: "example:sbj"
				predicate: "example:p"
				object: "example object"
			instance.add
				subject: "example:sbj"
				predicate: "example:p"
				object: "another example object"
			expect instance.length
				.does.equal 2

		describe "proxy", ->

			it "gets a resource with accessors", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect instance["example:sbj"]
					.instanceof Resource
					.which.has.property "example:p"
				expect instance["example:sbj"]["example:p"]
					.does.have.property "nominalValue", "example object"
				expect instance["example:notSbj"]
					.is.undefined

			it "fails to set a resource with accessors", ->
				"use strict"
				instance = do createGraph
				do expect => instance["example:sbj"] = new Resource "example:sbj"
					.does.throw

			it "sets a resource with defineProperty", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				Object.defineProperty instance, "example:sbj", value:
					interfaceName: "NamedNode"
					nominalValue: "example:sbj"
					"example:p": "a different object"
				Object.defineProperty instance, "example:sbj",
					configurable: true
					value:
						interfaceName: "NamedNode"
						nominalValue: "example:sbj"
						"example:p": "a different object"
					writable: true
				do expect -> (
					Object.defineProperty instance, "example:sbj",
						configurable: false
						value:
							interfaceName: "NamedNode"
							nominalValue: "example:sbj"
							"example:p": "a nonconfigurable subject"
				)
					.does.throw
				do expect -> (
					Object.defineProperty instance, "example:sbj",
						writable: false
						value:
							interfaceName: "NamedNode"
							nominalValue: "example:sbj"
							"example:p": "a nonwritable subject"
				)
					.does.throw
				do expect -> (
					Object.defineProperty instance, "example:sbj",
						get: ->
						value:
							interfaceName: "NamedNode"
							nominalValue: "example:sbj"
							"example:p": "an accessor subject"
				)
					.does.throw
				do expect -> (
					Object.defineProperty instance, "example:sbj",
						configurable: false
						value:
							interfaceName: "NamedNode"
							nominalValue: "example:notSbj"
							"example:p": "the wrong subject"
				)
					.does.throw
				expect instance["example:sbj"]
					.instanceof Resource
				expect instance["example:sbj"]["example:p"]
					.does.have.property "nominalValue", "a different object"
				Object.defineProperty instance, "example:sbj", value: undefined
				expect instance
					.does.not.have.own.property "example:sbj"

			it "deletes a resource with delete", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect delete instance["example:sbj"]
					.is.true
				expect instance["example:sbj"]
					.is.undefined
				expect delete instance["example:sbj"]
					.is.true

			it "gets a resource descriptor with getOwnPropertyDescriptor", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				descriptor = Object.getOwnPropertyDescriptor instance, "example:sbj"
				expect descriptor
					.does.have.property "configurable"
					.which.is.true
				expect descriptor
					.does.have.property "enumerable"
					.which.is.true
				expect descriptor
					.does.have.property "get"
					.a "function"
				expect Object.getOwnPropertyDescriptor instance, "example:notSbj"
					.is.undefined

			it "checks for presence of a resource with in", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect "example:sbj" of instance
					.is.true
				expect "example:notSbj" of instance
					.is.false

			it "includes resources in own keys", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect (Object.keys instance).includes "example:sbj"
					.is.true
				expect (Object.keys instance).includes "example:notSbj"
					.is.false

			it "properly prevents extensions", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				Object.preventExtensions instance
				expect instance["example:sbj"]
					.instanceof Resource
				expect instance["example:sbj"]["example:p"]
					.does.have.property "nominalValue", "example object"
				expect instance["example:notSbj"]
					.is.undefined
				expect "example:sbj" of instance
					.is.true
				expect "example:notSbj" of instance
					.is.false
				descriptor = Object.getOwnPropertyDescriptor instance, "example:sbj"
				expect descriptor
					.does.have.property "configurable"
					.which.is.false
				expect descriptor
					.does.have.property "enumerable"
					.which.is.true
				expect descriptor
					.does.have.property "get"
					.a "function"
				expect Object.getOwnPropertyDescriptor instance, "example:notSbj"
					.is.undefined

		describe "add()", ->

			it "adds", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect instance["example:sbj"]
					.instanceof Resource
					.which.has.property "example:p"

			it "runs actions", ->
				instance = do createGraph
				instance.addAction
					action: ( $, graph ) -> graph.add
						subject: "example:dupSbj"
						predicate: $.predicate
						object: $.object
					test: ( $ )-> $.subject.nominalValue isnt "example:dupSbj"
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect instance["example:dupSbj"]
					.instanceof Resource
					.which.has.property "example:p"

			it "returns this", ->
				instance = do createGraph
				expect instance.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.does.equal instance

		describe "addAction()", ->

			it "adds actions", ->
				instance = do createGraph
				action1 =
					action: run: ->
					test: test: ->
				action2 =
					action: run: ->
					test: test: ->
				instance
					.addAction action1
					.addAction action2
				expect instance.actions
					.does.have.property "length", 2
				expect instance.actions[0]
					.instanceof TripleAction
				expect instance.actions[1]
					.instanceof TripleAction

			it "runs the action if run is true", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				.add
					subject: "example:sbj"
					predicate: "example:otherP"
					object: "another example object"
				.add
					subject: "example:otherSbj"
					predicate: "example:thirdP"
					object: "a different example object"
				.addAction
					action: ( { predicate, object }, graph ) -> graph.add
						subject: "example:dupSbj"
						predicate: predicate
						object: object
					test: ( $ ) -> "example:sbj" is String $.subject
					yes
				expect instance["example:dupSbj"]["example:p"]
					.does.have.property "nominalValue", "example object"
				expect instance["example:dupSbj"]["example:otherP"]
					.does.have.property "nominalValue", "another example object"
				expect instance["example:dupSbj"]["example:thirdP"]
					.is.undefined

			it "returns this", ->
				instance = do createGraph
				expect instance.addAction
						action: ->
						test: ->
					.does.equal instance

		describe "addAll()", ->

			it "adds all", ->
				instance = do createGraph
				other = (do createGraph)
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "another example object"
				instance.addAll other
				expect instance.isomorphic other
					.is.true

			it "runs actions", ->
				instance = do createGraph
				instance.addAction
					action: ( $, graph ) -> graph.add
						subject: "example:dupSbj"
						predicate: $.predicate
						object: $.object
					test: ( $ )-> $.subject.nominalValue isnt "example:dupSbj"
				instance.addAll (do createGraph).add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect instance["example:dupSbj"]
					.instanceof Resource
					.which.has.property "example:p"

			it "returns this", ->
				instance = do createGraph
				expect instance.addAll (do createGraph).add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.does.equal instance

		describe "any()", ->

			it "returns undefined when none match", ->
				instance = do createGraph
				expect instance.any -> true
					.is.undefined
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect instance.any -> false
					.is.undefined

			it "returns match when present", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect instance.any -> true
					.instanceof Resource
					.which.has.property "nominalValue", "example:sbj"
				instance.add
					subject: "example:otherSbj"
					predicate: "example:p"
					object: "another example object"
				expect instance.any ( $ ) -> $["example:p"].nominalValue isnt "example object"
					.instanceof Resource
					.which.has.property "nominalValue", "example:otherSbj"

		describe "all()", ->

			it "returns an empty set when none match", ->
				instance = do createGraph
				expect instance.all -> true
					.a "set"
					.which.has.property "size", 0
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect instance.all -> false
					.a "set"
					.which.has.property "size", 0

			it "returns matches when present", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				instance.add
					subject: "example:otherSbj"
					predicate: "example:p"
					object: "another example object"
				instance.add
					subject: "example:otherSbj"
					predicate: "example:p"
					object: "another example object on the same subject"
				expect instance.all -> true
					.a "set"
					.which.has.property "size", 2
				instance.add
					subject: "example:thirdSbj"
					predicate: "example:p"
					object: "yet another example object"
				expect instance.all ( $ ) -> $["example:p"].nominalValue is "example object"
					.a "set"
					.which.has.property "size", 1

		describe "clear()", ->

			it "clears", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				instance.add
					subject: "example:otherSbj"
					predicate: "example:p"
					object: "another example object"
				expect instance
					.does.have.property "length", 2
				do instance.clear
				expect instance
					.does.have.property "length", 0

			it "returns undefined", ->
				instance = do createGraph
				expect do instance.clear
					.is.undefined

			it "clears as a fallback", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				instance.add
					subject: "example:otherSbj"
					predicate: "example:p"
					object: "another example object"
				expect instance
					.does.have.property "length", 2
				Graph::clear.call instance
				expect instance
					.does.have.property "length", 0

			it "returns undefined as a fallback", ->
				instance = do createGraph
				expect Graph::clear.call instance
					.is.undefined

		describe "clone()", ->

			it "returns undefined for non-objects", ->
				expect Graph::clone.call undefined
					.is.undefined
				expect Graph::clone.call null
					.is.undefined

			it "clones to a new instance", ->
				instance = do createGraph
				expect do instance.clone
					.does.not.equal instance

			it "clones to a Graph", ->
				instance = do createGraph
				expect do instance.clone
					.instanceof Graph

			it "clones triples", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				clone = do instance.clone
				expect clone
					.does.have.property "example:sbj"
					.instanceof Resource
					.which.has.property "nominalValue", "example:sbj"
				expect clone["example:sbj"]["example:p"]
					.does.have.property "nominalValue", "example object"

			it "clones actions", ->
				instance = do createGraph
				instance.addAction
					test: ->
					action: ->
				clone = do instance.clone
				expect clone.actions
					.a "array"
					.which.has.property "length", 1
				expect clone.actions[0]
					.instanceof TripleAction

		describe "every()", ->

			it "returns true for an empty graph", ->
				instance = do createGraph
				expect instance.every { test: -> no }
					.is.true

			it "returns false on failure", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect instance.every { test: -> no }
					.is.false

			it "returns true on success", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect instance.every ( $ ) -> $.subject.nominalValue is "example:sbj"
					.is.true

		describe "filter()", ->

			it "returns a new graph", ->
				instance = do createGraph
				expect instance.filter { test: -> yes }
					.instanceof Graph
					.does.not.equal instance

			it "clones triples", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				clone = instance.filter { test: -> yes }
				expect clone
					.does.have.property "example:sbj"
					.instanceof Resource
					.which.has.property "nominalValue", "example:sbj"
				expect clone["example:sbj"]["example:p"]
					.does.have.property "nominalValue", "example object"

			it "clones actions", ->
				instance = do createGraph
				instance.addAction
					test: ->
					action: ->
				clone = instance.filter { test: -> yes }
				expect clone.actions
					.a "array"
					.which.has.property "length", 1
				expect clone.actions[0]
					.instanceof TripleAction

			it "filters", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "another example object"
				clone = instance.filter { test: ( $ ) -> $.object.nominalValue isnt "example object" }
				expect clone
					.does.have.property "example:sbj"
					.instanceof Resource
					.which.has.property "nominalValue", "example:sbj"
				expect clone["example:sbj"]["example:p"]
					.does.have.property "nominalValue", "another example object"

		describe "forEach()", ->

			it "does nothing for an empty graph", ->
				instance = do createGraph
				result = on
				instance.forEach { run: -> result = no }
				expect result
					.is.true

			it "runs for each triple on the graph", ->
				instance = do createGraph
				result = 0
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "another example object"
				instance.add
					subject: "example:otherSbj"
					predicate: "example:p"
					object: "an example object on a different subject"
				instance.forEach { run: -> result++ }
				expect result
					.equals 3

		describe "isomorphic()", ->

			###
			If there are bugs here, they should (hopefully) show up in the Turtle/N‑Triples tests.
			###

			it "is a function", ->
				instance = do createGraph
				expect instance
					.does.respondTo "isomorphic"

		describe "match()", ->

			it "returns an empty graph for no match", ->
				instance = do createGraph
				match = instance.match null, null, null
				expect match
					.instanceof Graph
				expect match.empty
					.is.true
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "an example object"
				match = instance.match null, null, null
				expect match.empty
					.is.false

			it "clones for null", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "an example object"
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "another example object"
				match = instance.match null, null, null
				expect match
					.instanceof Graph
				expect match
					.does.have.property "length", 2
				expect Array.from do match.valueOf
					.does.have.deep.members [
						{
							subject: "example:sbj"
							predicate: "example:p"
							object: "an example object"
						}
						{
							subject: "example:sbj"
							predicate: "example:p"
							object: "another example object"
						}
					]

			it "matches", ->
				instance = do createGraph
				expected =
					subject: "example:sbj"
					predicate: "example:p"
					object: "an example object"
				instance.add expected
				instance.add
					subject: "example:otherSbj"
					predicate: "example:otherP"
					object: "an example object on a different triple"
				expect Array.from do (instance.match expected.subject, null, null).valueOf
					.does.have.deep.members [ expected ]
				expect Array.from do (instance.match null, expected.predicate, null).valueOf
					.does.have.deep.members [ expected ]
				expect Array.from do (instance.match null, null, expected.object).valueOf
					.does.have.deep.members [ expected ]

			it "respects the limit", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "an example object"
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "another example object"
				expect instance.match null, null, null, 0
					.does.have.property "length", 2
				expect instance.match null, null, null, 1
					.does.have.property "length", 1
				expect instance.match null, null, null, 2
					.does.have.property "length", 2

			it "clones actions", ->
				instance = do createGraph
				instance.addAction
					test: ->
					action: ->
				clone = instance.match null, null, null
				expect clone.actions
					.a "array"
					.which.has.property "length", 1
				expect clone.actions[0]
					.instanceof TripleAction

		describe "matches()", ->

			it "returns false for an empty graph", ->
				instance = do createGraph
				expect instance.matches null, null, null
					.is.false

			it "returns true for null", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "an example object"
				expect instance.matches null, null, null
					.is.true

			it "matches", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "an example object"
				expect instance.matches "example:sbj", "example:p", "an example object"
					.is.true
				expect instance.matches "example:notSbj", null, null
					.is.false
				expect instance.matches null, "example:notP", null
					.is.false
				expect instance.matches null, null, "a different example object"
					.is.false

		describe "merge()", ->

			it "adds all", ->
				instance = do createGraph
				other = (do createGraph)
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "another example object"
				expect (instance.merge other).isomorphic other
					.is.true

			it "runs actions", ->
				instance = do createGraph
				instance.addAction
					action: ( $, graph ) -> graph.add
						subject: "example:dupSbj"
						predicate: $.predicate
						object: $.object
					test: ( $ )-> $.subject.nominalValue isnt "example:dupSbj"
				merge = instance.merge (do createGraph).add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect merge["example:dupSbj"]
					.instanceof Resource
					.which.has.property "example:p"

			it "returns a new instance", ->
				instance = do createGraph
				expect instance.merge (do createGraph).add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.instanceof Graph
					.does.not.equal instance

		describe "remove()", ->

			it "removes", ->
				instance = (do createGraph)
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "another example object"
				instance.remove
					subject: "example:sbj"
					predicate: "example:p"
					object: "another example object"
				expect instance["example:sbj"]["example:p"]
					.instanceof RDFNode
					.which.has.property "nominalValue", "example object"

			it "returns this", ->
				instance = do createGraph
				expect instance.remove
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.does.equal instance

		describe "removeMatches()", ->

			it "removes", ->
				instance = (do createGraph)
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "another example object"
					.add
						subject: "example:sbj"
						predicate: "example:otherP"
						object: "example object"
					.add
						subject: "example:otherSbj"
						predicate: "example:p"
						object: "example object"
					.add
						subject: "example:otherSbj"
						predicate: "example:p"
						object: "another example object"
				instance.removeMatches null, "example:p", "example object"
				expect instance
					.does.have.property "length", 3
				instance.removeMatches "example:sbj", null, null
				expect instance
					.does.have.property "length", 1

			it "removes all with null", ->
				instance = (do createGraph)
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "another example object"
					.add
						subject: "example:sbj"
						predicate: "example:otherP"
						object: "example object"
				instance.removeMatches null, null, null
				expect instance
					.does.have.property "length", 0

			it "returns this", ->
				instance = do createGraph
				expect instance.removeMatches null, null, null
					.does.equal instance

		describe "*resources()", ->

			it "gets the resources", ->
				instance = do createGraph
				expect do instance.resources
					.does.respondTo "next"
				expect Array.from do instance.resources
					.does.have.property "length", 0
				instance
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "another example object"
					.add
						subject: "example:sbj"
						predicate: "example:otherP"
						object: "example object"
					.add
						subject: "example:otherSbj"
						predicate: "example:p"
						object: "example object"
					.add
						subject: "example:otherSbj"
						predicate: "example:p"
						object: "another example object"
				expect Array.from do instance.resources
					.does.have.property "length", 2
				for resource in instance.resources
					expect resource
						.instanceof Resource
				expect (Array.from do instance.resources).map ( $ ) => $.nominalValue
					.does.have.members [ "example:sbj", "example:otherSbj" ]

		describe "set()", ->

			it "sets", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				resource = new Resource "example:sbj"
				resource["example:p"] = "a different object"
				instance.set "example:sbj", resource
				expect instance["example:sbj"]
					.instanceof Resource
					.which.has.property "example:p"
				expect instance["example:sbj"]["example:p"]
					.does.have.property "nominalValue", "a different object"

			it "throws setting the wrong resource", ->
				instance = do createGraph
				resource = new Resource "example:otherSbj"
				resource["example:p"] = "a different object"
				do expect -> instance.set "example:sbj", resource
					.does.throw

			it "removes when setting to undefined", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				instance.set "example:sbj", undefined
				expect instance
					.does.not.have.property "example:sbj"

			it "does not run actions", ->
				instance = do createGraph
				instance.addAction
					action: ( $, graph ) -> graph.add
						subject: "example:dupSbj"
						predicate: $.predicate
						object: $.object
					test: ( $ )-> $.subject.nominalValue isnt "example:dupSbj"
				resource = new Resource "example:sbj"
				resource["example:p"] = "a different object"
				instance.set "example:sbj", resource
				expect instance
					.does.not.have.property "example:dupSbj"

			it "returns this", ->
				instance = do createGraph
				expect instance.set "example:sbj", undefined
					.does.equal instance

		describe "some()", ->

			it "returns false for an empty graph", ->
				instance = do createGraph
				expect instance.some { test: -> yes }
					.is.false

			it "returns true on success", ->
				instance = do createGraph
				instance
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.add
						subject: "example:otherSbj"
						predicate: "example:p"
						object: "example object"
				expect instance.some { test: ( $ ) -> $.subject.nominalValue is "example:sbj" }
					.is.true
				expect instance.some { test: ( $ ) -> $.subject.nominalValue is "example:otherSbj" }
					.is.true

			it "returns false on failure", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect instance.some -> false
					.is.false

		describe "toArray()", ->

			it "produces an array of triples", ->
				instance = do createGraph
				instance
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "another example object"
					.add
						subject: "example:sbj"
						predicate: "example:p2"
						object: "player two"
					.add
						subject: "example:collectionSbj"
						predicate: "example:collection"
						object: Object.defineProperties [
							interfaceName: "Literal"
							nominalValue: "Some value"
							language: "en"
						],
							interfaceName: value: "BlankNode"
							nominalValue: value: "collection"
				expect (do instance.toArray).map ( { object, predicate, subject } ) => [
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
							{ subject: "<example:collectionSbj>" }
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

		describe "toNT()", ->

			it "converts to N-Triples", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect do instance.toNT
					.does.equal "<example:sbj> <example:p> \"example object\" ."

		describe "toTurtle()", ->

			it "converts to Turtle", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect do instance.toNT
					.does.equal "<example:sbj> <example:p> \"example object\" ."

		describe "*tripleActions()", ->

			it "produces actions", ->
				instance = do createGraph
				instance.addAction
					action: ->
					test: ->
				tripleActions = do instance.tripleActions
				expect tripleActions
					.does.respondTo "next"
				actions = Array.from tripleActions
				expect actions
					.does.have.property "length", 1
				expect actions[0]
					.instanceof TripleAction

		describe "*triples()", ->

			it "produces triples", ->
				instance = do createGraph
				instance
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					.add
						subject: "example:sbj"
						predicate: "example:p"
						object: "another example object"
					.add
						subject: "example:sbj"
						predicate: "example:p2"
						object: "player two"
					.add
						subject: "example:collectionSbj"
						predicate: "example:collection"
						object: Object.defineProperties [
							interfaceName: "Literal"
							nominalValue: "Some value"
							language: "en"
						],
							interfaceName: value: "BlankNode"
							nominalValue: value: "collection"
				triples = do instance.triples
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
							{ subject: "<example:collectionSbj>" }
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

			it "gives a set of triple values", ->
				instance = do createGraph
				instance.add
					subject: "example:sbj"
					predicate: "example:p"
					object: "example object"
				expect do instance.valueOf
					.a "set"
					.which.has.property "size", 1
				expect Array.from do instance.valueOf
					.does.have.deep.members [
						subject: "example:sbj"
						predicate: "example:p"
						object: "example object"
					]

		describe "view()", ->

			it "creates a graph view", ->
				instance = do createGraph
				expect instance.view "example:sbj"
					.instanceof GraphView
