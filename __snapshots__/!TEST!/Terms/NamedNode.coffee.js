exports['namedNodes["base"].toDOMNode()'] = `
<a href="https://example.com" xmlns="http://www.w3.org/1999/xhtml">https://example.com</a>
`

exports['namedNodes["path"].toDOMNode()'] = `
<a href="https://example.com/path/" xmlns="http://www.w3.org/1999/xhtml">https://example.com/path/</a>
`

exports['namedNodes["doc"].toDOMNode()'] = `
<a href="https://example.com/path/doc" xmlns="http://www.w3.org/1999/xhtml">https://example.com/path/doc</a>
`

exports['namedNodes["query"].toDOMNode()'] = `
<a href="https://example.com/path/doc?query" xmlns="http://www.w3.org/1999/xhtml">https://example.com/path/doc?query</a>
`

exports['namedNodes["hash"].toDOMNode()'] = `
<a href="https://example.com/path/doc?query#hash" xmlns="http://www.w3.org/1999/xhtml">https://example.com/path/doc?query#hash</a>
`

exports['namedNodes["rdfjs"].toDOMNode()'] = `
<a href="https://example.com" xmlns="http://www.w3.org/1999/xhtml">https://example.com</a>
`

exports['namedNodes["bad"].toDOMNode()'] = `
<a href="example.com/path/doc?query#hash" xmlns="http://www.w3.org/1999/xhtml">example.com/path/doc?query#hash</a>
`
