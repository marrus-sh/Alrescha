{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Turtle", ->
	Graph = null
	manifestResources = null

	before -> import("../../Kico.mjs").then ({ default: Codex }) ->
		{ Graph, Resource } = Codex
		manifestResources = Array.from Resource.fromTurtle.call { baseURI: "http://www.w3.org/2013/TurtleTests/manifest.ttl" }, readFileSync "#{ do cwd }/!TEST!/Turtle/TurtleTests/manifest.ttl"

	describe "Passes W3C tests", ->
		readdirSync("!TEST!/Turtle/TurtleTests/")
			.filter ( file ) => file isnt "manifest.ttl" and file.slice(-4, Infinity) is ".ttl"
			.map ( file ) => it "Passes \"#{ file.slice(0, -4) }\"", ->
				testManifest = manifestResources.find ( test ) => "#{ test.getPredicate("http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action") }".includes "/#{ file }"
				(expect testManifest, "manifest").to.exist
				switch
					when testManifest.a "http://www.w3.org/ns/rdftest#TestTurtlePositiveSyntax"
						do expect (=> Graph.fromTurtle.call { baseURI: testManifest.getPredicate "http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action" }, readFileSync "!TEST!/Turtle/TurtleTests/#{ file }"), "action"
							.does.not.throw
					when testManifest.a "http://www.w3.org/ns/rdftest#TestTurtleNegativeSyntax"
						do expect (=> Graph.fromTurtle.call { baseURI: testManifest.getPredicate "http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action" }, readFileSync "!TEST!/Turtle/TurtleTests/#{ file }"), "action"
							.does.throw
					when testManifest.a "http://www.w3.org/ns/rdftest#TestTurtleEval"
						ttl = Graph.fromTurtle.call { baseURI: testManifest.getPredicate "http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action" }, readFileSync "!TEST!/Turtle/TurtleTests/#{ file }"
						n3 = Graph.fromNT.call { baseURI: testManifest.getPredicate "http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action" }, readFileSync "#{ testManifest.getPredicate "http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#result" }".replace "http://www.w3.org/2013/", "!TEST!/Turtle/"
						expect (ttl.isomorphic n3), "isomorphism between\n\n#{ do ttl.toNT }\n\n        and\n\n#{ do n3.toNT }\n\n        "
							.is.true
					when testManifest.a "http://www.w3.org/ns/rdftest#TestTurtleNegativeEval"
						do expect (=> Graph.fromTurtle.call { baseURI: testManifest.getPredicate "http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action" }, readFileSync "!TEST!/Turtle/TurtleTests/#{ file }"), "action"
							.does.throw
					else expect.fail "Did not understand manifest for #{ file }."
