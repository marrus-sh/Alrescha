#  [Al·rishāʼ Documentation](./) :: Graphs and Triples

Al·rishāʼ implements graphs and triples as `Al·rishāʼ.Graph` and `Al·rishāʼ.Triple`.
The latter inherits from the former:
Every triple is a graph.
Al·rishāʼ graphs and triples implement the interfaces described in [<cite>RDF Interfaces</cite>](https://www.w3.org/TR/rdf-interfaces/) and [<cite>RDF/JS</cite>](https://rdf.js.org/data-model-spec/), respectively.
Graphs implement the [<cite>RDF/JS</cite> `DatasetCore` interface](https://rdf.js.org/dataset-spec/#datasetcore-interface), but not the `Dataset` interface (except where there is overlap with <cite>RDF Interfaces</cite>).

Al·rishāʼ does not support named graphs or quads.

Instead of representing graphs as a set of triples, the Al·rishāʼ model instead views them as a collection of *resources*, which is to say, subject nodes.
You can access a resource from a graph using its IRI; for example the resource at `<example:rsrc>` can be viewed on graph `gr` using the following code:

```js
const gr = Al·rishāʼ.createGraph()
gr[`example:rsrc`]
//→ LinkedResource("example:rsrc")
```

The `Al·rishāʼ.pname()` function may be useful in constructing long IRIs.

Graphs and triples cannot be created directly with constructors.
Instead, the factory static methods on `Al·rishāʼ.Graph` can be used.
These are:

 +  `.fromNT()`: Creates a new `Al·rishāʼ.Graph` from an N‐Triples representation.

 +  `.fromTurtle()`: Creates a new `Al·rishāʼ.Graph` from a Turtle representation.

In addition, the function `Al·rishāʼ.createGraph()` creates a new `Al·rishāʼ.Graph` with no triples.

Graph prototype methods are intentionally generic, meaning they can be called on graphs which were not obtained from Al·rishāʼ.
However, due to most RDF implementations using a very different data model, operations on alien graphs will likely be significantly slower than those on Al·rishāʼ graphs.
Calling the `Al·rishāʼ.Graph` prototype `.clone()` method to create a new Al·rishāʼ graph is ideal before working extensively with a graph obtained from other sources.


##  Getting and Setting Resources

As shown above, resources can be easily accessed on Al·rishāʼ graphs using their IRI.
For valid subjects on unlocked Al·rishāʼ graphs, this will *always* return a resource—even if no triple with that subject node exists on the graph.
Resources exist for the lifetime of a graph, so this can lead to a memory leak if you are checking for the presence of large numbers of resources on graphs which do not have them.

In contrast, the `.getResource()` and `.hasResource()` prototype methods do not create new resources if the given subject does not exist on the graph.
These methods work even when called on a graph which was not created by Al·rishāʼ (although the resulting resource will not be linked).
And, of course, a locked graph never creates new resources.

The `in` operator works similarly to `.hasResource()` for Al·rishāʼ graphs.

The triples leading away from a resource can be set at once using the `=` operator; for example:

```js
const gr = Al·rishāʼ.createGraph()
gr[`example:rsrc`] =
	{ "example:p": `example value`
	, "example:p2": `another example value` }
```

This will remove any existing triples with `example:rsrc` as the subject and then add the new ones.
If the passed value is nullish, then the existing triples are removed and nothing is added.
Otherwise, if the passed value is not an object, then it will be treated as though the `rdf:value` predicate had been supplied.

The `.setResource()` prototype method works similarly, except that it requires its argument to be convertible to an `Al·rishāʼ.Resource`, whose `.nominalValue` will determine the subject of the triples.
This is cumbersome unless you are trying to copy over a resource you obtained from another graph, in which case it should perform slightly faster.

The `.deleteResource()` prototype method removes all the triples associated with the given subject from a graph.
It does *not* remove all occurrences of the given node—the node may still appear as an object or predicate.
The `delete` operator works similarly to `.deleteResource()` for Al·rishāʼ graphs.

The `*.resources()` prototype method is a generator function which yields the (nonempty) resources present on a given graph.

The `.all()` prototype method returns a new `Set` containing all the resources for which calling the function provided by the first argument returns `true`.
Similarly, the `.any()` prototype method returns a single resource for which calling the function provided by the first argument returns `true`, or `undefined` if none exists.
For example:

```js
gr.all($ => $.a(Al·rishāʼ.pname `foaf:Document`))
//→ Set([Resource()])
gr.any($ => $.a(Al·rishāʼ.pname `foaf:Document`))
//→ Resource() or undefined
```

A `this` value for the above callback functions may be provided as the second argument.


##  Locked Graphs

Calling `Object.preventExtensions()` on an Al·rishāʼ graph will “lock” it, preventing it from gaining or losing resources or triples.
Because the triples of the graph are immutable, a number of operations are made faster on locked graphs.
The `.lock()` prototype method is a convenience function for calling `Object.preventExtensions()` on `this` graph.

Locking is irreversible.
If you need to modify a locked graph, you must first create a new graph with `.clone()`.


##  Al·rishāʼ Extensions for Working with Triples

The `.empty` prototype getter returns `true` if `this` graph has no triples, and `false` otherwise.

The `.addAll()` prototype method needn’t be called with an actual graph.
It looks for triples in the following places, in decreasing priority:

 +  `.toArray()`, as an `Array` of triples
 +  `.triples()`, as an iterator of triples
 +  `[Symbol.iterator]()`, as an iterator of triples

The `.clear()` prototype method removes all of the triples in `this` graph.

The `.clone()` prototype method creates a new graph with the same triples and graph actions as `this` one.

The `.valueOf()` prototype method creates a new `Array` of the result of calling the `Al·rishāʼ.Triple` prototype `.valueOf()` method with each triple in the graph.


##  Al·rishāʼ Extensions for Triple Objects

`Al·rishāʼ.Triple` subclasses `Al·rishāʼ.Graph`; Al·rishāʼ treats triples as graphs of a single triple.
This means that all of the graph prototype methods are available on triples, although in many cases their implementation is rather trivial.

Triples are not frozen, but their `.subject`, `.object`, and `.predicate` are nonconfigurable and nonwritable.

The `.valueOf()` prototype method creates a new `Object` whose `.subject`, `.predicate`, and `.object` own properties are the result of the `.valueOf()` prototype method of the appropriate Al·rishāʼ node class.


##  Graph Output

The `.toHTML()`, `.toNT()`, and `.toTurtle()` methods convert the graph into the appropriate format.
Note that Al·rishāʼ presently only supports HTML output, not input, and consequently the output format should not be considered stable.
