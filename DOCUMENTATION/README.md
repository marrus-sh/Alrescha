#  Al·rishāʼ Documentation

##  Should I use this library?

If your goal is to walk an RDF graph from resource to resource, reading metadata and building up a codex (or other structured document) as you go, then you may find this library useful.
If your goal is to interactively traverse or modify an RDF graph using simple operations at the pace of user input, this library should work fine.

However, you should think twice before using Al·rishāʼ if:

 +  You plan on spending a lot of time copying, modifying, or comparing graphs, or iterating over triples.
    Operations like these, which many RDF libraries are optimized for, may be somewhat slower in Al·rishāʼ, which is designed for graph walking, not graph iteration.
    Making graphs immutable should increase their processing speed, but, of course, such graphs cannot then be modified.

 +  You need complex reasoning.
    Al·rishāʼ supports graph actions, which can be used to implement some basic reasoning when adding new triples to graphs.
    But it is not capable of functioning as a general‐use OWL reasoner.

 +  You need to process complex graph queries or make complex graph modifications.
    Al·rishāʼ is optimized for iterating over the subjects in a graph and performing simple tests or actions on them, but offers no special solutions for anything more complex.

 +  You are afraid of ECMAScript.
    There exist people in this world who want everything to be expressable in terms of simple objects and methods, for they be ascared of the richness that a language like JavaScript has to offer.
    Al·rishāʼ is not for those people.

 +  You are afraid of special cases or strange behaviours.
    Al·rishāʼ objects don·t always act like ordinary JavaScript objects and are frequently proxied.
    Their prototypes can change dynamically and basic operations such as property assignment can have unconventional effects.
    If you want a boring library which performs everything through lengthy chains of method calls and awkward duck‐typing, there are plenty of existing RDF libraries for you.

It should be noted that Al·rishāʼ (in most practical senses) understands both RDF/JS and RDF Interfaces, so it is entirely feasible to generate a graph with Al·rishāʼ, pass that graph over to a different software for processing, and then analyse that result in Al·rishāʼ again.

##  Overview

Generally speaking, Al·rishāʼ is designed for the following workflow:

01. Reading in a file and generating a resulting graph.

    ```js
    const graph = Graph.fromTurtle(source)
    ```

02. Identifying a subject node in that graph which meets a particular set of conditions.

    ```js
    // Get all subjects which have a given type:
    const documents = graph.every(resource =>
    	resource.a(pname `foaf:document`))

    // Get a particular subject by name:
    const myDocument = graph[`example:mine`]
    ```

03. Walking the predicates of that subject node to find new nodes, until all of the desired information is obtained.

    ```js
    const abstracts = myDocument[pname `dc:abstract`]
    //  Predicates may point to a single resource, or a set of resources.
    const summary = abstracts instanceof Set
    	? abstracts.values().next().value[pname `rdf:value`]
    	: abstracts?.[pname `rdf:value`]  //  there may not be any abstracts
    ```

##  Contents

01. [The Al·rishāʼ Object](./Alrescha.md)
02. [Terms](./Terms.md)
03. [Graphs and Triples](./Graphs.md)
04. [Resources](./Resources.md)
05. [Input & Output](./IO.md)
