exports['blankNodeCollections["not"].toDOMNode()'] = `
<a href="http://www.w3.org/1999/02/22-rdf-syntax-ns#nil" xmlns="http://www.w3.org/1999/xhtml">http://www.w3.org/1999/02/22-rdf-syntax-ns#nil</a>
`

exports['blankNodeCollections["collection"].toDOMNode()'] = `
<ol resource="_:collection" xmlns="http://www.w3.org/1999/xhtml"><li property="http://www.w3.org/1999/02/22-rdf-syntax-ns#first" lang="en">Some value</li><li rel="http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"><a href="http://www.w3.org/1999/02/22-rdf-syntax-ns#nil">http://www.w3.org/1999/02/22-rdf-syntax-ns#nil</a></li></ol>
`

exports['blankNodeCollections["same"].toDOMNode()'] = `
<ol resource="_:collection" xmlns="http://www.w3.org/1999/xhtml"><li property="http://www.w3.org/1999/02/22-rdf-syntax-ns#first" lang="" datatype="http://www.w3.org/2001/XMLSchema#string">Different value</li><li rel="http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"><a href="http://www.w3.org/1999/02/22-rdf-syntax-ns#nil">http://www.w3.org/1999/02/22-rdf-syntax-ns#nil</a></li></ol>
`

exports['blankNodeCollections["other"].toDOMNode()'] = `
<ol resource="_:othercollection" xmlns="http://www.w3.org/1999/xhtml"><li rel="http://www.w3.org/1999/02/22-rdf-syntax-ns#first"></li><li rel="http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"><a href="http://www.w3.org/1999/02/22-rdf-syntax-ns#nil">http://www.w3.org/1999/02/22-rdf-syntax-ns#nil</a></li></ol>
`

exports['blankNodeCollections["empty"].toDOMNode()'] = `
<a href="http://www.w3.org/1999/02/22-rdf-syntax-ns#nil" xmlns="http://www.w3.org/1999/xhtml">http://www.w3.org/1999/02/22-rdf-syntax-ns#nil</a>
`