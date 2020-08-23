# Al·rishāʼ
<b>♓️🌟 An ECMAScript library for walking RDF graphs.</b>

<dfn>Al·rishāʼ</dfn> is a JavaScript (handcoded ECMAScript 2020) library for walking RDF graphs.
Do not use if phrases like <i>**currently a very slow operation in every browser and JavaScript engine**</i> scare you.
This library is designed for flexibility, not performance.


## Nomenclature

The ASCII name for this library is <i>Alrescha</i>, the International Astronomical Union–approved name for <i>α Piscium</i>, the binary star which links together the Pisces constellation.
It derives from the Arabic <i lang="ar">الرشآء</i>, which is used internally.
The preferred romanization is <i>Al·rishāʼ</i> in contexts where Unicode is supported; that’s

|   | A | l | · | r | i | s | h | ā | ʼ |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| U+⁓ | 0041 | 006C | 00B7 | 0072 | 0069 | 0073 | 0068 | 0101 | 02BC |

which, yes, is a valid ECMAScript identifier.


## Usage

```js
import Al·rishāʼ from "./index.mjs"  //  call it whatever you want
```

See [DOCUMENTATION](./DOCUMENTATION.md) for more.
(To come.)


## Features

 +  Passes all [RDF 1.1 Test Cases](https://www.w3.org/TR/rdf11-testcases/) for [RDF 1.1 N‐Triples](http://www.w3.org/2013/N-TriplesTests/) and [RDF 1.1 Turtle](http://www.w3.org/2013/TurtleTests/).

 +  Resource‐based design ideal for programs which do not need complicated RDF graph analysis.

 +  Convenient properties for accessing resource information and generating descriptive HTML nodes.

 +  Partially implements RDF Interfaces and RDF/JS data models.
    Note that RDF Interfaces and RDF/JS definitions might conflict somewhat—for example, the RDF Interfaces definition of `RDFNode.toString()` overrides the RDF/JS definition of `Term.toString()`, with differing results in the case of `BlankNode`.

 +  Single source file; no imports or dependencies.
    Does not require DOM to run, only ECMAScript 2020.
    Designed to interface well with ECMAScript 2020 code.

 +  Public domain.


## Limitations

 +  Does not validate datatypes.
    Operations on literals with invalid datatypes (e.g., `"1.2"^^xsd:integer`) may be somewhat unpredictable.

 +  HTML output is not sanitized and may include HTML `SCRIPT` elements or other unsafe things.

 +  Not optimized for complex reasoning (e.g., OWL) or operations on huge numbers of triples.
    Not suitable for Big Data.

 +  Not a full implementation of RDF Interfaces or RDF/JS.
    Objects and methods should communicate perfectly well with other implementations, but no `RDFEnvironment` or `DataFactory` is provided.
    RDF/JS methods assume triples, not quads.

 +  No support for named graphs, N‐Quads, etc.

 +  Not linted, minified, or transpiled.

 +  Esoteric source code.


##  Versioning

Al·rishāʼ uses a (somewhat informal) **_version_**, **_draft_**, **_revision_** versioning system.
Each commit forms a separate revision, and versions and drafts are signified by branch names of the form `vMdN`.
The following guarantees are made:

 +  The (intended/documented) API will not break between *revisions* of a given draft.

 +  Output produced by previous *drafts* of a given version will be comprehensible as input to later drafts of the same version, with similar (although potentially refined) meaning.
    Al·rishāʼ will not introduce incompatibilities on the level of interchange between systems running different drafts of the same version (although it makes no guarantees that the systems themselves will be compatible).

Al·rishāʼ makes no guarantees regarding additions or deletions to its API between drafts, provided input/output compatibility is maintained.
