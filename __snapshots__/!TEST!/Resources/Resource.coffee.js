exports['resource.toDOMNode()'] = `
<details resource="example:sbj" xmlns="http://www.w3.org/1999/xhtml"><summary><a href="example:sbj">example:sbj</a></summary><dl><dt><a href="example:p">example:p</a></dt><dd property="example:p" lang="" datatype="http://www.w3.org/2001/XMLSchema#string">example object</dd><dd property="example:p" lang="" datatype="http://www.w3.org/2001/XMLSchema#string">another example object</dd><dt><a href="example:p2">example:p2</a></dt><dd property="example:p2" lang="" datatype="http://www.w3.org/2001/XMLSchema#string">player two</dd><dt><a href="example:collection">example:collection</a></dt><dd rel="example:collection"><ol resource="_:collection"><li property="http://www.w3.org/1999/02/22-rdf-syntax-ns#first" lang="en">Some value</li><li rel="http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"><a href="http://www.w3.org/1999/02/22-rdf-syntax-ns#nil">http://www.w3.org/1999/02/22-rdf-syntax-ns#nil</a></li></ol></dd></dl></details>
`