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

See [DOCUMENTATION](./DOCUMENTATION/README.md) for more.


## Features

 +  Passes all [RDF 1.1 Test Cases](https://www.w3.org/TR/rdf11-testcases/) for [RDF 1.1 N‐Triples](http://www.w3.org/2013/N-TriplesTests/) and [RDF 1.1 Turtle](http://www.w3.org/2013/TurtleTests/).

 +  Resource‐based design ideal for programs which do not need complicated RDF graph analysis.

 +  Convenient properties for accessing resource information and generating descriptive HTML nodes.

 +  Partially implements RDF Interfaces and RDF/JS data models.
    Note that RDF Interfaces and RDF/JS definitions might conflict somewhat—for example, the RDF Interfaces definition of `RDFNode.toString()` overrides the RDF/JS definition of `Term.toString()`, with differing results in the case of `BlankNode`.

 +  Single source file; no imports or dependencies.
    Does not require DOM to run, only ECMAScript 2020.
    Designed to interface well with ECMAScript 2020 code.

 +  Supports Turtle and N‐Triples I/O.

 +  Public domain.


## Limitations

 +  Does not validate datatypes.
    Operations on literals with invalid datatypes (e.g., `"1.2"^^xsd:integer`) may be somewhat unpredictable.

 +  HTML output is not sanitized and may include HTML `<SCRIPT>` elements or other unsafe things.

 +  Not optimized for complex reasoning (e.g., OWL) or operations on huge numbers of triples.
    Not suitable for Big Data.

 +  Not a full implementation of RDF Interfaces or RDF/JS.
    Objects and methods should communicate perfectly well with other implementations, but no `RDFEnvironment` or `DataFactory` is provided.
    RDF/JS methods assume triples, not quads.

 +  No support for named graphs, N‐Quads, etc.

 +  Not linted, minified, or transpiled.

 +  Esoteric source code.


##  Versioning

✨ fuck around and find out ✨

(The current default branch provides the latest recommended version for usage.
Notable points in development may be “tagged” but there will be no named patch releases.)
