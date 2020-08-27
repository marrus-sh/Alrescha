exports['namedNodes["base"].toHTML()'] = `
<a href="https://example.com" xmlns="http://www.w3.org/1999/xhtml">https://example.com</a>
`

exports['namedNodes["path"].toHTML()'] = `
<a href="https://example.com/path/" xmlns="http://www.w3.org/1999/xhtml">https://example.com/path/</a>
`

exports['namedNodes["doc"].toHTML()'] = `
<a href="https://example.com/path/doc" xmlns="http://www.w3.org/1999/xhtml">https://example.com/path/doc</a>
`

exports['namedNodes["query"].toHTML()'] = `
<a href="https://example.com/path/doc?query" xmlns="http://www.w3.org/1999/xhtml">https://example.com/path/doc?query</a>
`

exports['namedNodes["hash"].toHTML()'] = `
<a href="https://example.com/path/doc?query#hash" xmlns="http://www.w3.org/1999/xhtml">https://example.com/path/doc?query#hash</a>
`

exports['namedNodes["full"].toHTML()'] = `
<a href="http://user:pass@foo:21/bar;par?b#c" xmlns="http://www.w3.org/1999/xhtml">http://user:pass@foo:21/bar;par?b#c</a>
`

exports['namedNodes["rdfjs"].toHTML()'] = `
<a href="https://example.com" xmlns="http://www.w3.org/1999/xhtml">https://example.com</a>
`

exports['namedNodes["bad"].toHTML()'] = `
<a href="example.com/path/doc?query#hash" xmlns="http://www.w3.org/1999/xhtml">example.com/path/doc?query#hash</a>
`
