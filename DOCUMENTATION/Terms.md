#  [Al·rishāʼ Documentation](./) :: Terms

Every RDF node in Al·rishāʼ is both an `Al·rishāʼ.Term` and an `Al·rishāʼ.RDFNode`, with the latter inheriting from the former.
The available types of RDF nodes are as follows:

 +  `Al·rishāʼ.NamedNode`
 +  `Al·rishāʼ.BlankNode`
     +  `Al·rishāʼ.BlankNodeCollection` (inherits from `Al·rishāʼ.BlankNode`)
 +  `Al·rishāʼ.Literal`

These implement the interfaces described in [<cite>RDF Interfaces</cite>](https://www.w3.org/TR/rdf-interfaces/) and [<cite>RDF/JS</cite>](https://rdf.js.org/data-model-spec/), respectively.
`Al·rishāʼ.BlankNodeCollection` is an Al·rishāʼ extension for representing anonymous collections (as in Turtle); it is an array (in that `Array.isArray()` returns `true`) and can be iterated over.

RDF nodes cannot be created directly with constructors.
Instead, the factory static methods on `Al·rishāʼ.RDFNode` can be used.
These are:

 +  `.fromNT()`: Creates a new `Al·rishāʼ.RDFNode` from an N‐Triples representation.

 +  `.fromTurtle()`: Creates a new `Al·rishāʼ.RDFNode` from a Turtle representation.

Term prototype methods are intentionally generic, meaning they can be called on graphs which were not obtained from Al·rishāʼ.
So, the following code also works and will return an `Al·rishāʼ.Literal`:

```js
const example_literal = Al·rishāʼ.RDFNode.prototype.clone(
	{ interfaceName: "Literal"
	, nominalValue: "example" })
```

It is important to note that <cite>RDF Interfaces</cite> and <cite>RDF/JS</cite> specify different algorithms for the `.equals()` prototype methods.
You will need to call `Al·rishāʼ.RDFNode.prototype.equals()` directly if you need the <cite>RDF Interfaces</cite> semantics.

All Al·rishāʼ RDF nodes are frozen (immutable).
Al·rishāʼ does not assume this to be true of nodes received from other sources.
As a result, some methods are slightly faster when called directly on an Al·rishāʼ node than when accessed from the prototype.


##  Al·rishāʼ Extensions for All RDF Nodes

The static `[Symbol.hasInstance]` method returns true for all RDF node classes if the passed object implements a correct interface (either <cite>RDF Interfaces</cite>, <cite>RDF/JS</cite>, or both).
In other words, it simply verifies that the passed object is usable with the provided prototype methods; it does *not* check for prototype inheritance.
Use `Function.prototype[Symbol.hasInstance]` if you need the default ECMAScript `instanceof` semantics.

The static `[Symbol.toPrimitive]` method simply returns `.name` of `this` class as a string; it is designed as a boon for functional programming where you might be passing RDF node classes themselves around.
The `.name` of node classes matches the `.interfaceValue` of their instances (so note that `BlankNodeCollection.name` is `"BlankNode"`).

The `.text` prototype getter returns a textual representation of the node’s `.nominalValue`.
This is the same as `.toString()` for all nodes which are not typed literals.

The `.clone()` prototype method returns a new instance with the same value as `this`.
It can be called with a manual `this` value to generate Al·rishāʼ nodes from plain objects or nodes obtained from other implementations.

The `.toHTML()`, `.toNT()`, and `.toTurtle()` methods convert the node into the appropriate format.
Note that Al·rishāʼ presently only supports HTML output, not input, and consequently the output format should not be considered stable.


##  Al·rishāʼ Extensions for Named Nodes

Al·rishāʼ validates named nodes according to [RFC 3987](https://tools.ietf.org/html/rfc3987).
If Al·rishāʼ is made to generate a named node which does not follow IRI syntax, it will throw an error.
This does not stop you from creating your own invalid named nodes and assigning them the `Al·rishāʼ.NamedNode` prototype, although some properties and methods will not work.

The `.absolute`, `.authority`, `.fragment`, `.hierarchicalPart`, `.host`, `.iri`, `.path`, `.port`, `.query`, `.scheme`, and `.userinfo` properties provide the corresponding parts of the node·s `.nominalValue`.
In addition, the `[Symbol.iterator]` property provides an iterator over the components of the `.hierarchicalPart`, and the `.parts` property provides an array of these components.
These are all defined both as own properties and as prototype getters, so an object need not be created by Al·rishāʼ to access them (it need only have the correct prototype).
However, if you need to access them often, consider using the `.clone()` prototype method to obtain a genuine Al·rishāʼ object, as the own properties are stored directly in memory and thus faster.


##  Al·rishāʼ Extensions for Blank Nodes

Al·rishāʼ adds a new `Al·rishāʼ.BlankNodeCollection` for representing Turtle anonymous collections.
These are arrays in the sense of returning `true` for `Array.isArray()`, although they inherit from `Al·rishāʼ.BlankNode`·s prototype and not the `Array` prototype.
Because they are arrays, array indexing and the `.length` property function as expected (although, they are still immutable).

Because `Al·rishāʼ.BlankNodeCollection`s represent an RDF collection, they share some similarities with resources and graphs.
The `*.triples()` prototype method is a generator function which yields `Al·rishāʼ.Triple`s representing the collection; new blank nodes are generated as necessary for this.
The  `.graph` prototype getter constructs a new `Al·rishāʼ.Graph` containing only these triples.

The  `.first` prototype getter gets the first node in the collection as an `Al·rishāʼ.RDFNode`, akin to `rdf:first`.
Similarly, `.rest` returns a new `Al·rishāʼ.BlankNodeCollection` containing all but the first node, akin to `rdf:rest`.

The `[Symbol.iterator]()`, `.entries()`, `.keys()`, and `.values()` prototype methods exhibit normal `Array` behaviour, with the caveat that `.values()` will be converted to new `Al·rishāʼ.RDFNode`s.
The `.valueOf()` prototype method returns a new array of the `.valueOf()` return values for each item in the collection.


##  Al·rishāʼ Extensions for Literals

Al·rishāʼ supports a great deal many more datatypes than is required by <cite>RDF Interfaces</cite> or <cite>RDF/JS</cite>.
The `[Symbol.toPrimitive]()` prototype method converts those datatypes which have ECMAScript primitive equivalents into the corresponding value, and returns the `.nominalValue` otherwise.
The supported datatypes are:

 +  `rdf:HTML` or `rdf:XMLLiteral`:
    If a document and parser is available, the `.textContent` of the result of parsing `.nominalValue` as HTML or XML, respectively.

 +  `xsd:dateTime`, `xsd:dateTimeStamp`, `xsd:gYear`, `xsd:gYearMonth`, `xsd:gMonth`, `xsd:gMonthDay`, `xsd:gDay`, or `xsd:time`:
    If the passed argument is not `"string"`, the number of seconds since 01 January 1970.
    For datatypes which do not specify all datetime components, property values from the `xsd:dateTime` `1972-12-31T00:00:00` are used, according to the XSD Date/time Seven‐property Model.

 +  `xsd:decimal`, `xsd:integer`, `xsd:long`, `xsd:int`, `xsd:short`, `xsd:byte`, `xsd:nonNegativeInteger`, `xsd:positiveInteger`, `xsd:unsignedLong`, `xsd:unsignedInt`, `xsd:unsignedShort`, `xsd:unsignedByte`, `xsd:nonPositiveInteger`, `xsd:negativeInteger`, `xsd:float`, or `xsd:double`:
    If the passed argument is not `"string"`, the corresponding ECMAScript value, as a number.
    Note that in the case of `xsd:integer`, manually converting the `.nominalValue` to a bigint may provide better results.

 +  `xsd:boolean`:
    If the passed argument is not `"string"`, the corresponding ECMAScript boolean.
    Otherwise, the string value of the same.

The `.valueOf()` prototype method is not limited to returning primitive values, and so adds additional results for various datatypes:

 +  `rdf:HTML` or `rdf:XMLLiteral`:
    If a document and parser is available, a `DocumentFragment` with the result of parsing `.nominalValue` as HTML or XML, respectively.

 +  `xsd:dateTime`, `xsd:dateTimeStamp`, `xsd:date`, `xsd:gYear`, `xsd:gYearMonth`, `xsd:gMonth`, `xsd:gMonthDay`, `xsd:gDay`, or `xsd:time`:
    The corresponding ECMAScript `Date` object.
    For datatypes which do not specify all datetime components, property values from the `xsd:dateTime` `1972-12-31T00:00:00` are used, according to the XSD Date/time Seven‐property Model.

 +  `xsd:anyURI`:
    The corresponding `URL`, if supported.

 +  `xsd:base64Binary` or `xsd:hexBinary`:
    An `ArrayBuffer` holding the corresponding binary data.

The value of `.text` prototype getter for `Al·rishāʼ.Literal`s is the value of the `[Symbol.toPrimitive]()` prototype method when called with an argument of `"string"`.
