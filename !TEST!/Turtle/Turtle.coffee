{ expect } = require "chai"
{ readFileSync, readdirSync } = require "fs"
{ cwd } = require "process"

describe "Turtle", ->
	this.timeout 5000

	Graph = null
	isomorphic = null
	manifest = null

	before ->
		import("../../index.mjs").then ( { default: Al·rishāʼ } ) ->
			{ Graph } = Al·rishāʼ
			manifest = Object.preventExtensions Graph.fromTurtle.call { baseIRI: "http://www.w3.org/2013/TurtleTests/manifest.ttl" }, readFileSync "#{ do cwd }/!TEST!/Turtle/TurtleTests/manifest.ttl"
		import("../isomorphic.mjs").then ( { default: isoƒ } ) ->
			isomorphic = isoƒ

	describe "Passes W3C tests", ->
		readdirSync("!TEST!/Turtle/TurtleTests/")
			.filter ( file ) => file isnt "manifest.ttl" and file.slice(-4, Infinity) is ".ttl"
			.map ( file ) => it "Passes \"#{ file.slice(0, -4) }\"", ->
				testManifest = manifest.any ( test ) => "#{ test["http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action"] }".includes "/#{ file }"
				(expect testManifest, "manifest").to.exist
				switch
					when testManifest.a "http://www.w3.org/ns/rdftest#TestTurtlePositiveSyntax"
						do expect (=> Graph.fromTurtle.call { baseIRI: testManifest["http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action"] }, readFileSync "!TEST!/Turtle/TurtleTests/#{ file }"), "action"
							.does.not.throw
					when testManifest.a "http://www.w3.org/ns/rdftest#TestTurtleNegativeSyntax"
						do expect (=> Graph.fromTurtle.call { baseIRI: testManifest["http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action"] }, readFileSync "!TEST!/Turtle/TurtleTests/#{ file }"), "action"
							.does.throw
					when testManifest.a "http://www.w3.org/ns/rdftest#TestTurtleEval"
						ttl = Object.preventExtensions Graph.fromTurtle.call { baseIRI: testManifest["http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action"] }, readFileSync "!TEST!/Turtle/TurtleTests/#{ file }"
						n3 = Object.preventExtensions Graph.fromNT.call { baseIRI: testManifest["http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action"] }, readFileSync "#{ testManifest["http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#result"] }".replace "http://www.w3.org/2013/", "!TEST!/Turtle/"
						expect (isomorphic.call ttl, n3), "isomorphism between\n\n#{ do ttl.toNT }\n\n        and\n\n#{ do n3.toNT }\n\n        "
							.is.true
					when testManifest.a "http://www.w3.org/ns/rdftest#TestTurtleNegativeEval"
						do expect (=> Graph.fromTurtle.call { baseIRI: testManifest["http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#action"] }, readFileSync "!TEST!/Turtle/TurtleTests/#{ file }"), "action"
							.does.throw
					else expect.fail "Did not understand manifest for #{ file }."
