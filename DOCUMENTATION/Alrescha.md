#  Al·rishāʼ Documentation :: The Al·rishāʼ Object

Al·rishāʼ only exports a single default object, which this documentation will refer to as <dfn>the Al·rishāʼ object</dfn>.
The properties of this object provide access to the fundamental classes and configuration of the Al·rishāʼ library.

All of the properties of the Al·rishāʼ object are configurable, so you can, hypothetically, overwrite any of them.
This will not have any adverse effects on the library itself.
However, it may make your own life more difficult, so generally speaking, this is not advised.

The following properties of the Al·rishāʼ object are described in other sections of this documentation:

 +  **In [<cite>Terms</cite>](./Terms.md):**

     +  `.BlankNode`
     +  `.BlankNodeCollection`
     +  `.Literal`
     +  `.NamedNode`
     +  `.RDFNode`
     +  `.Term`

 +  **In [<cite>Graphs and Triples</cite>](./Graphs.md):**

     +  `.Graph`
     +  `.Triple`
     +  `.TripleAction`
     +  `.TripleCallback`
     +  `.TripleFilter`
     +  `.TripleMap`
     +  `.TripleReduce`
     +  `.createGraph()`

 +  **In [<cite>Resources</cite>](./Resources.md):**

     +  `.Resource`
     +  `.ResourceCollection`
     +  `.LinkedResource`
     +  `.LinkedResourceCollection`


##  Configuration

Two properties on the Al·rishāʼ object are used for basic configuration, and consequently have tangible impact on library behaviours.
These are: `.defaultDocument` and `.baseIRI`.

The `.defaultDocument` property provides access to the default DOM `Document` to use when creating new DOM nodes.
It defaults to `globalThis?.document`, meaning it will be the current document in browser contexts, and `undefined` in contexts such as Node.
The `.defaultDocument` property is writable, so it can be changed through simple assignment.

The `.baseIRI` property gives a base IRI for use with IRI resolution.
The string value of this property must be an absolute IRI.
Attempting to resolve a relative IRI when no `Al·rishāʼ.baseIRI` is set will throw an error.
The default value is `globalThis?.document?.baseURI`, which is to say, the base URL of the current document, if defined.
The `.baseIRI` property is writable, so it can be changed through simple assignment.


##  Localization

The `.strings` property defines an object whose properties match strings to localizations.
Within localization strings, numbers preceded by a dollar sign (`$1`, `$2`, etc) provide localization arguments.
Presently, Al·rishāʼ only uses localization strings for errors.

The `.l10n()` function can be used as a tag for a template literal to produce the equivalent localization string.
The tagged literal is trimmed, and then the corresponding property on the `.strings` object is accessed, with template substitutions used to fill in the `$N` arguments in the string.
For example:

```js
Al·rishāʼ.l10n `الرشآء: Al·rishāʼ. `
//→ "Al·rishāʼ"

Al·rishāʼ.l10n `الرشآء: Requires new. ${ MyConstructor }`
//→ "Constructor MyConstructor requires 'new'."
```


##  Prefixed names

The `.pname()` function can be used as a tag for a template literal to expand a prefixed name into an `Al·rishāʼ.NamedNode`.

The `.context` property is an object which provides the default prefix mappings to use when expanding prefixed names.
This defaults to the [RDFa Core Initial Context](https://www.w3.org/2011/rdfa-context/rdfa-1.1) and is *not* writable or extensible, and so *may not* be changed through simple assignment.
However, it *is* configurable, so you can change it using `Object.defineProperties()` if you really feel the need.

You can also bind `.pname()` to a different context using `Function.prototype.bind()`.
For example:

```js
Al·rishāʼ.pname `as:name`
//→ NamedNode("https://www.w3.org/ns/activitystreams#name")

const myPname = Al·rishāʼ.pname.bind({ as: `example:as:` })
myPname `as:name`
//→ NamedNode("example:as:name")
myPname `foaf:name`  //  falls back to Al·rishāʼ.context
//→ NamedNode("http://xmlns.com/foaf/0.1/name")
```


##  Symbols

The `.symbols` property publicizes some symbols which Al·rishāʼ uses for various purposes in its API.
In general, you should not need these unless you are planning on re·implementing Al·rishāʼ functionality.
