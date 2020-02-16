{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "N-Triples", ->
	Graph = null
	manifest = null

	before -> import("../../Kico.mjs").then ( { default: Kico } ) ->
		{ Graph } = Kico
		manifest = Graph.fromTurtle.call { baseURI: "http://www.w3.org/2013/TurtleTests/manifest.ttl" }, readFileSync "#{ do cwd }/!TEST!/N-Triples/TESTS/manifest.ttl"

	describe "Passes W3C tests", ->
		readdirSync("!TEST!/N-Triples/TESTS/")
			.filter ( file ) => file.slice(-3, Infinity) is ".nt"
			.map ( file ) => it "Passes \"#{ file.slice(0, -3) }\"", ->
				testManifest = manifest.any ( test ) => "#{ test["http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action"] }".includes "/#{ file }"
				(expect testManifest, "manifest").to.exist
				if testManifest.a "http://www.w3.org/ns/rdftest#TestNTriplesNegativeSyntax"
					do expect (=> Graph.fromNT readFileSync "!TEST!/N-Triples/TESTS/#{ file }"), "action"
						.does.throw
				else
					do expect (=> Graph.fromNT readFileSync "!TEST!/N-Triples/TESTS/#{ file }"), "action"
						.does.not.throw
