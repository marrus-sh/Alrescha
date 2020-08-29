//  Al·rishāʼ
//  ♓️🌟 An ECMAScript library for walking RDF graphs
//  Developed ⌨⃝ 2020 kibigo!

/*  ⁂  *\

The author(s) of the following code have dedicated it, to the fullest extent, to the public domain via a ‘CC0 1.0 Universal Public Domain Dedication’. No warrantees of any kind, express or implied, are provided regarding this software or its use. You employ it at your own risk.

For more information, see: ‹ https://creativecommons.org/publicdomain/zero/1.0/ ›.

\*  ⁂  */

//  🐟 · ★ · 🎣 · ★ · 🐟  //

export default (( ) => {  //  strict IIFE, though unnecessary
	"use strict";
	var undefined  //  initializes to... well... undefined (alright there’s no point in this)
	const
		$ϕ = Symbol `phony`
		, $℘ = Object.defineProperty.bind(Object)
		, $℘s = Object.defineProperties.bind(Object)
		, $ꝛ = String.raw.bind(String)
		, الرشآء = Object.create(null)
		, HEX = $ꝛ `[0-9A-Fa-f]`
		, UCHAR = $ꝛ `\\u(?:${ HEX }{4})|\\U(?:${ HEX }{8})`
		, IRIREF = $ꝛ `<(?:[^\x00-\x20<>\x22\x7B\x7D|^\x60\\]|${ UCHAR })*>`
		, PN_CHARS_BASE = $ꝛ `[A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}]`
		, PN_CHARS_U = $ꝛ `${ PN_CHARS_BASE }|_`
		, NT·PN_CHARS_U = $ꝛ `${ PN_CHARS_BASE }|_|:`
		, PN_CHARS = $ꝛ `${ PN_CHARS_U }|[-0-9\xB7\u0300-\u036F\u203F-\u2040]`
		, NT·PN_CHARS = $ꝛ `${ NT·PN_CHARS_U }|[-0-9\xB7\u0300-\u036F\u203F-\u2040]`
		, PN_PREFIX = $ꝛ `(?:${ PN_CHARS_BASE })(?:(?:${ PN_CHARS }|\.)*(?:${ PN_CHARS }))?`
		, PNAME_NS = $ꝛ `(?:${ PN_PREFIX })?:`
		, PERCENT = $ꝛ `%(?:${ HEX }){2}`
		, PN_LOCAL_ESC = $ꝛ `\\[-_~.!$&'()*+,;=/?#@%]`
		, PLX = $ꝛ `${ PERCENT }|${ PN_LOCAL_ESC }`
		, PN_LOCAL = $ꝛ `(?:${ PN_CHARS_U }|[:0-9]|${ PLX })(?:(?:${ PN_CHARS }|[.:]|${ PLX })*(?:${ PN_CHARS }|:|${ PLX }))?`
		, PNAME_LN = $ꝛ `(?:${ PNAME_NS })(?:${ PN_LOCAL })`
		, BLANK_NODE_LABEL = $ꝛ `_:(?:${ PN_CHARS_U }|[0-9])(?:(?:${ PN_CHARS }|\.)*(?:${ PN_CHARS }))?`
		, NT·BLANK_NODE_LABEL = $ꝛ `_:(?:${ NT·PN_CHARS_U }|[0-9])(?:(?:${ NT·PN_CHARS }|\.)*(?:${ NT·PN_CHARS }))?`
		, LANGTAG = $ꝛ `@[a-zA-Z]+(?:-[a-zA-Z0-9]+)*`
		, EOL = $ꝛ `[\x0D\x0A]+`
		, INTEGER = $ꝛ `[+-]?[0-9]+`
		, DECIMAL = $ꝛ `[+-]?[0-9]*\.[0-9]+`
		, EXPONENT = $ꝛ `[eE][+-]?[0-9]+`
		, DOUBLE = $ꝛ `[+-]?(?:[0-9]+\.[0-9]*(?:${ EXPONENT })|\.[0-9]+(?:${ EXPONENT })|[0-9]+(?:${ EXPONENT }))`
		, ECHAR = $ꝛ `\\[tbnrf"'\\]`
		, STRING_LITERAL_QUOTE = $ꝛ `"(?:[^\x22\x5C\x0A\x0D]|${ ECHAR }|${ UCHAR })*"`
		, STRING_LITERAL_SINGLE_QUOTE = $ꝛ `'(?:[^\x27\x5C\x0A\x0D]|${ ECHAR }|${ UCHAR })*'`
		, STRING_LITERAL_LONG_SINGLE_QUOTE = $ꝛ `'''(?:(?:'|'')?(?:[^'\\]|${ ECHAR }|${ UCHAR }))*'''`
		, STRING_LITERAL_LONG_QUOTE = $ꝛ `"""(?:(?:"|"")?(?:[^"\\]|${ ECHAR }|${ UCHAR }))*"""`
		, WS = $ꝛ `[\x20\x09\x0D\x0A]`
		, ANON = $ꝛ `\[(?:${ WS })*\]`
		, sub·delims = $ꝛ `[!\$&'()*+,;=]`
		, gen·delims = $ꝛ `[:/?#\[\]@]`
		, reserved = $ꝛ `${ gen·delims }|${ sub·delims }`
		, unreserved = $ꝛ `[A-Za-z0-9\-\._~]`
		, pct·encoded = $ꝛ `%[0-9A-Fa-f][0-9A-Fa-f]`
		, dec·octet = $ꝛ `[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]`
		, IPv4address = $ꝛ `(?:${ dec·octet })\.(?:${ dec·octet })\.(?:${ dec·octet })\.(?:${ dec·octet })`
		, h16 = $ꝛ `[0-9A-Fa-f]{1,4}`
		, ls32 = $ꝛ `(?:${ h16 }):(?:${ h16 })|${ IPv4address }`
		, IPv6address = $ꝛ `(?:(?:${ h16 }):){6}(?:${ ls32 })|::(?:(?:${ h16 }):){5}(?:${ ls32 })|(?:${ h16 })?::(?:(?:${ h16 }):){4}(?:${ ls32 })|(?:(?:(?:${ h16 }):){0,1}(?:${ h16 }))?::(?:(?:${ h16 }):){3}(?:${ ls32 })|(?:(?:(?:${ h16 }):){0,2}(?:${ h16 }))?::(?:(?:${ h16 }):){2}(?:${ ls32 })|(?:(?:(?:${ h16 }):){0,3}(?:${ h16 }))?::(?:${ h16 }):(?:${ ls32 })|(?:(?:(?:${ h16 }):){0,4}(?:${ h16 }))?::(?:${ ls32 })|(?:(?:(?:${ h16 }):){0,5}(?:${ h16 }))?::(?:${ h16 })|(?:(?:(?:${ h16 }):){0,6}(?:${ h16 }))?::`
		, IPvFuture = $ꝛ `v[0-9A-Fa-f]{1,}\.(?:${ unreserved }|${ sub·delims }|:)`
		, IP·literal = $ꝛ `\[(?:${ IPv6address }|${ IPvFuture })\]`
		, port = $ꝛ `[0-9]*`
		, scheme = $ꝛ `[A-Za-z][A-Za-z0-9+\-\.]*`
		, iprivate = $ꝛ `[\u{E000}-\u{F8FF}\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}]`
		, ucschar = $ꝛ `[\u{A0}-\u{D7FF}\u{F900}-\u{FDCF}\u{FDF0}-\u{FFEF}\u{10000}-\u{1FFFD}\u{20000}-\u{2FFFD}\u{30000}-\u{3FFFD}\u{40000}-\u{4FFFD}\u{50000}-\u{5FFFD}\u{60000}-\u{6FFFD}\u{70000}-\u{7FFFD}\u{80000}-\u{8FFFD}\u{90000}-\u{9FFFD}\u{A0000}-\u{AFFFD}\u{B0000}-\u{BFFFD}\u{C0000}-\u{CFFFD}\u{D0000}-\u{DFFFD}\u{E0000}-\u{EFFFD}]`
		, iunreserved = $ꝛ `[A-Za-z0-9\-\._~]|${ ucschar }`
		, ipchar = $ꝛ `${ iunreserved }|${ pct·encoded }|${ sub·delims }|[:@]`
		, ifragment = $ꝛ `(?:${ ipchar }|[/?])*`
		, iquery = $ꝛ `(?:${ ipchar }|${ iprivate }|[/?])*`
		, isegment·nz·nc = $ꝛ `(?:${ iunreserved }|${ pct·encoded }|${ sub·delims }|@)+`
		, isegment·nz = $ꝛ `(?:${ ipchar })+`
		, isegment = $ꝛ `(?:${ ipchar })*`
		, ipath·empty = $ꝛ ``
		, ipath·rootless = $ꝛ `(?:${ isegment·nz })(?:/(?:${ isegment }))*`
		, ipath·noscheme = $ꝛ `(?:${ isegment·nz·nc })(?:/(?:${ isegment }))*`
		, ipath·absolute = $ꝛ `/(?:(?:${ isegment·nz })(?:/(?:${ isegment }))*)?`
		, ipath·abempty = $ꝛ `(?:/(?:${ isegment }))*`
		, ipath = $ꝛ `${ ipath·abempty }|${ ipath·absolute }|${ ipath·noscheme }|${ ipath·rootless }|${ ipath·empty }`
		, ireg·name = $ꝛ `(?:${ iunreserved }|${ pct·encoded }|${ sub·delims })*`
		, ihost = $ꝛ `${ IP·literal }|${ IPv4address }|${ ireg·name }`
		, iuserinfo = $ꝛ `(?:${ iunreserved }|${ pct·encoded }|${ sub·delims }|:)*`
		, iauthority = $ꝛ `(?:(${ iuserinfo })@)?(${ ihost })(?::(${ port }))?`
		, irelative·part = $ꝛ `//(${ iauthority })(${ ipath·abempty })|(${ ipath·absolute })|(${ ipath·noscheme })|(${ ipath·empty })`
		, irelative·ref = $ꝛ `(${ irelative·part })(?:\?(${ iquery }))?(?:#(${ ifragment }))?`
		, ihier·part = $ꝛ `//(${ iauthority })(${ ipath·abempty })|(${ ipath·absolute })|(${ ipath·rootless })|(${ ipath·empty })`
		, absolute·IRI = $ꝛ `(${ scheme }):(${ ihier·part })(?:\?(${ iquery }))?`
		, IRI = $ꝛ `(${ scheme }):(${ ihier·part })(?:\?(${ iquery }))?(?:#(${ ifragment }))?`
		, IRI·reference = $ꝛ `(${ IRI })|(${ irelative·ref })`
		, A͢ = Object.setPrototypeOf(
			$℘s(Array.from.bind(Array),
				{ [Symbol.hasInstance]: { value: $ => $ instanceof Array }
				, M̃: { value: $℘s(( ) => { },  // metaärray
					{ [Symbol.hasInstance]: { value: function hasInstance ( $ ) {
						return $ == Array || Function[Ꝕ][Ʃ͢.hasInstance].call(this, $) } }
					, prototype: { value: Array } }) }
				, prototype: { value: Array.prototype }
				, ɫ: { value: $ => {  // LengthOfArrayLike
/*  ⁂  *\

This produces larger lengths than can actually be stored in arrays, because no such restrictions exist on arraylike methods.  Use isNdx() to determine if a value is an actual array index.

\*  ⁂  */
					const ɫ = +$[Ɫ]
					return ɫ == 0/0 || ɫ <= 0 ? 0
						: Math.min(Math.max(ɫ, 0), 9007199254740991) } }
				, ʔ: { value: $ => {  //  is argument a collection‐like object?
/*  ⁂  *\

This is more exacting than ECMAScript’s definition of an arraylike object, because it requires the .length property to not be undefined.  It also explicitly excludes Resources which are not collections, even though all Resources are arraylike.

\*  ⁂  */
					try { return typeof $ == `object` && $ != Ꝋ && Ɫ in $ && (+$[Ɫ], true)
						&& !(Function[Ꝕ][Ʃ͢.hasInstance].call(ꞰR, $)
							&& !ꞰRC[Ʃ͢.hasInstance]($)) }
					catch ( ɛ ) { return false } } } }), Array)
		, O͢ = Object
		, RX͢ = RegExp
		, S͢ = String
		, WHATWG·URL = URL == null
			? class WHATWG·URL extends String { }  //  fake it 🛹✨
			: URL
		, a2b = $ => {  //  array buffer from base64
			const
				$u6s = A͢[Ꝕ].map.call(S͢[Ꝕ].replace.call($, /=*$/u, ``), ch => {
					const code = ch.charCodeAt(0)
					return code >= 0x41 && code <= 0x5A ? code - 65
						: code >= 0x61 && code <= 0x7A ? code - 71
						: code >= 0x30 && code <= 0x39 ? code + 4
						: code == 0x2B ? 62
						: code == 0x2F ? 63
						: 0 })
				, ɫ = $u6s[Ɫ]
				, ꝺV = new DataView (new ArrayBuffer (Math.floor(ɫ * 3 / 4)))
				for ( let ꝟndx = 0 ; ꝟndx < ɫ - 1 ; ) {
					const
						ndx = Math.ceil(ꝟndx * 3 / 4)
						, _mod = ndx % 3
					if ( _mod == 0 )
						ꝺV.setUint8(ndx, ($u6s[ꝟndx++] << 2) + ($u6s[ꝟndx] >> 4))
					else if ( _mod == 1 )
						ꝺV.setUint8(ndx, (($u6s[ꝟndx++] & 0xF) << 4) + ($u6s[ꝟndx] >> 2))
					else ꝺV.setUint8(ndx, (($u6s[ꝟndx++] & 0x3) << 6) + $u6s[ꝟndx++]) }
				return ꝺV.buffer }
		, actns = function *actionIterator ( ) {  //  yields new actions from this
			for ( const actn of this ?? [ ] ) {
				if ( actn != Ꝋ ) yield new Ʞ3A ( actn.test, actn.action ) } }
		, ad3 = function addTriple ( graph, { subject, predicate, object } ) {  // add triple to graph
			const
				$sbj = [ ꞰÑN, ꞰBN ].some(Ꞇ => hasꞆ.call(subject, Ꞇ))
					? defaultMethodOf(`toString`, subject)()
					: S͢(nSbj(subject))
				, hasSbj = this.has($sbj)
				, _sbj = hasSbj ? this.get($sbj) : new ꞰⱢR (graph, subject, this)
			if ( !hasSbj ) this.set($sbj, _sbj)
			if ( hasꞆ.call(subject, ꞰBN) && A͢.ʔ(subject) )
				for ( const $3 of nº1MethodOf.call(subject, `triples`, subject, ꞰBNC[Ꝕ])() ) {
					graph.add($3) }
			_sbj[predicate] = object
			return this }
		, adActn = function addAction ( { test, action } ) {  //  push new action to this
			const $actn = new Ʞ3A ( test, action )
			this?.push?.($actn)
			return $actn }
		, b2a = $ => {  //  (big‐endian) base64 from typed array / buffer / string
			const
				$buf = $ instanceof ArrayBuffer ? $
					: $ instanceof DataView || $ instanceof ꝕ(Uint8Array) ? $.buffer
					: ($str => A͢[Ꝕ].reduce.call($str,
						( ꝵ, ch, ndx ) => (ꝵ.setUint16(ndx * 2, ch.charCodeAt(0)), ꝵ),
						new DataView(new ArrayBuffer($str.length * 2))).buffer)(S͢($))
				, ꝺV = new DataView ($buf)
				, ɫ = $buf.byteLength
				, _ɫ = Math.ceil(ɫ * 4 / 3)
				, ꝵs = new Array (_ɫ + (3 - (_ɫ % 3)) % 3).fill(`=`)
			for ( let ꝟndx = 0 ; ꝟndx < ɫ ; ) {
				const
					$ndx = Math.ceil(ꝟndx * 4 / 3)
					, ndx = ꝟndx % 3 == 0 && ꝵs[$ndx] != `=` ? $ndx + 1 : $ndx
					, _mod = ndx % 4
					, __u6 = _mod == 0 ? ꝺV.getUint8(ꝟndx) >> 2
						: _mod == 1 ? ((ꝺV.getUint8(ꝟndx++) & 0x3) << 4)
							+ (ꝟndx < ɫ ? ꝺV.getUint8(ꝟndx) >> 4 : 0)
						: _mod == 2 ? ((ꝺV.getUint8(ꝟndx++) & 0xF) << 2)
							+ (ꝟndx < ɫ ? ꝺV.getUint8(ꝟndx) >> 6 : 0)
						: ꝺV.getUint8(ꝟndx++) & 0x3F
				ꝵs[ndx] = __u6 < 26 ? __u6 + 65
					: __u6 < 52 ? __u6 + 71
					: __u6 < 62 ? __u6 - 4
					: __u6 < 63 ? 43
					: __u6 < 64 ? 47
					: 65 }
			return S͢.fromCharCode(...ꝵs) }
		, cdr = $ => /\.cd+r$/u.test($) ? `${ $.slice(0, -1) }dr` : `${ $ }.cdr`  //  cdr bnode name
		, dſ𝒫 = Object.getOwnPropertyDescriptor.bind(Object)
		, defaultMethodOf = function ( method, $ ) {  //  default prototype method for this
			return getꞆ.call($)[Ꝕ][method].bind(this === Ꝋ ? $ : this) }
		, getꞆ = function ( ) {  //  internal constructor for this
			if ( hasꞆ.call(this, ꞰÑN) ) return ꞰÑN
			else if ( hasꞆ.call(this, ꞰBN) )
				if ( A͢.isArray(this) ) return ꞰBNC
				else return ꞰBN
			else if ( hasꞆ.call(this, ꞰL) ) return ꞰL
			else if ( this?.interfaceName != Ꝋ ) return ꞰRDFN
			else return ꞰT }
		, get𝒫 = function ( property, constructor ) {  //  get property from this or prototype
			const $Ꝟ = this?.[property]
			return $Ꝟ == Ꝋ && typeof this == `object` && this != Ꝋ && !(property in this)
				? dſ𝒫(constructor[Ꝕ], property).get.call(this)
				: $Ꝟ }
		, hasꞆ = function ( $ ) {  //  is $ a particular type of term?
			const tꞆ = this?.termType
			return S͢(tꞆ ?? this?.interfaceName) == $ }
		, htm4ÐˢDoc = function html ( strs, ...elts ) { // make HTML for this document
			const fm̃t = this.createDocumentFragment()
			for ( let ꝟndx = 0 ; ꝟndx < strs[Ɫ] ; ꝟndx++ ) {
				const
					elt = elts[ꝟndx]
					, str = strs[ꝟndx]
				if ( str ) fm̃t.appendChild(this.createTextNode(str))
				if ( elt == Ꝋ ) continue
				else if ( typeof elt == `string` ) fm̃t.appendChild(this.createTextNode(elt))
				else if ( elt.ownerDocument == this ) fm̃t.appendChild(elt)
				else if ( elt.nodeName != Ꝋ ) fm̃t.appendChild(this.importNode(elt, true))
				else {
					const { attributes, content, handler, localName, namespaceURI } = elt
					if ( localName ) {
						const elt = fm̃t.appendChild(
							this.createElementNS(namespaceURI ?? `http://www.w3.org/1999/xhtml`, localName))
						if ( attributes != Ꝋ ) Object
							.keys(attributes)
							.forEach(attr => {
								const $Ꝟ = attributes[attr]
								if ( $Ꝟ !== Ꝋ ) elt.setAttribute(attr, attributes[attr]) })
						if ( content != Ꝋ )
							elt.appendChild(content.nodeName != Ꝋ ? content
								: A͢.isArray(content)
								? htm4ÐˢDoc.call(this, new Array (content.length), ...content)
								: typeof content == `object`
								? htm4ÐˢDoc.call(this, [ , ], content)
								: this.createTextNode(content))
						if ( typeof handler == `function` ) handler.call(element) } } }
			return fm̃t }
		, isIRI = $℘($ => isIRI.rx.test(S͢($)), `rx`, { value: RX͢(`^(?:${ IRI })$`, `u`) })
		, isNdx = $ => {  //  is $ a valid array index?
			if ( typeof $ != `string` ) return false
			else {
				const n = +$
				return Number.isInteger(n) && n >= 0 && n <= 4294967296 && $ === S͢(n) } }
		, l10n = function l10n ( $, ...$s ) {  //  localize string
			const
				key = (typeof $ == `string` ? $ : A͢.ʔ($) ? S͢($[0]) : S͢($)).trim()
				, strs = this?.strings ?? الرشآء.strings
				, _str = strs[key]
			return (_str == Ꝋ ? key : S͢(_str)).replace(/\$0*([1-9][0-9]*)/g, (N, Ⅰ) => $s[+Ⅰ - 1]) }
		, mixin = function mixin ( ...otherClasses ) {  //  mixin
			return otherClasses.reduce(( ꝵ, Ʞ ) =>
				Reflect.ownKeys(Ʞ[Ꝕ]).reduce(( ꝵ, $ ) => {
					if ( !($ in ꝵ[Ꝕ]) ) { $℘(ꝵ[Ꝕ], $, dſ𝒫(Ʞ[Ꝕ], $)) }
					return ꝵ }, ꝵ), this) }
		, n3 = function fromNT ( $, ...$s ) {  //  make Set of Resources from N‑Triples
/*  ⁂  *\

☞  Note:  The N‑Triples specification grammar does not permit lines with only whitespace.  However, Example 1 in the N‑Triples specification clearly shows them as allowed, so they are permitted here.

\*  ⁂  */
			const
				$WHITESPACE = $ꝛ `(?:[\x20\x09]|#(?:(?!${ EOL })[^])*)*`
				, $src = typeof $ == `string` ? $ : $[𝒫] `raw` ? S͢.raw($, ...$s) : S͢($)
				, empty = RX͢($ꝛ `(?:(?:${ $WHITESPACE })(?:${ EOL }))*(?:${ $WHITESPACE })`, "uy")
				, whitespace = RX͢($WHITESPACE, `uy`)
				, ꝯſꝸ = ꝯſꝸr.bind(
					{ get ndx ( ) { return ꝟndx }
					, set ndx ( $ ) { ꝟndx = $ }
					, ñ: `RDF N‑Triples`
					, src: $src })
				, ꝿ = new ꞰꝾ
			let ꝟndx = 0
			ꝯſꝸ(empty)
			while ( ꝟndx < $src[Ɫ] ) {
				const sbj = ꝯſꝸ(RX͢($ꝛ `${ IRIREF }|${ NT·BLANK_NODE_LABEL }`, `uy`))
				ꝯſꝸ(whitespace)
				const p = ꝯſꝸ(RX͢($ꝛ `${ IRIREF }`, `uy`))
				ꝯſꝸ(whitespace)
				const obj = ꝯſꝸ(RX͢($ꝛ `${ IRIREF }|${ NT·BLANK_NODE_LABEL }|(?:${ STRING_LITERAL_QUOTE })(?:(?:${ $WHITESPACE })(?:\^\^(?:${ $WHITESPACE })(?:${ IRIREF })|${ LANGTAG }))?`, `uy`))
				ꝯſꝸ(whitespace)
				ꝯſꝸ(RX͢($ꝛ `\.(?:${ $WHITESPACE })(?:${ EOL })`, `uy`))
				ꝿ.add(new Ʞ3 (ꞇObj(sbj), ꞇObj(p), ꞇObj(obj)))
				ꝯſꝸ(empty) }
			return ꝿ }
		, n3Obj = function fromNT ( $ ) {  //  make object from N‑Triples
			if ( !RX͢($ꝛ `^${ IRIREF }|${ NT·BLANK_NODE_LABEL }|(?:${ STRING_LITERAL_QUOTE })${ whitespace }(?:\^\^${ whitespace }(?:${ IRIREF })|${ LANGTAG })?$`).test( $ ) )
					throw ꞆƐ͢(l10n `الرشآء: Invalid node. ${ `RDF N‑Triples` }${ $ }`)
				return ꞇObj($) }
		, nObj = function fromValue ( $ ) {  //  new valid object from given
			try {
				if ( $ == Ꝋ ) return Ꝋ
				else if ( [ ꞰBN, ꞰÑN, ꞰL ].some(tꞆ => hasꞆ.call($, tꞆ)) ) return nT($)
				else if ( typeof $ == `object` && Symbol.iterator in $ ) {
					const ꝵ = new Set
					for ( const ĩ of $ ) {
						const $obj = nObj(ĩ)
						if ( $obj == Ꝋ ) return Ꝋ
						else if ( $obj instanceof Set ) $obj.forEach(obj => ꝵ.add(obj))
						else ꝵ.add($obj) }
					return ꝵ.size == 0 ? __RDF·nil
						: ꝵ.size == 1 ? ꝵ.values().next()[Ꝟ]
						: ꝵ }
				else return $ instanceof WHATWG·URL ? new ꞰÑN ($)
					: $ instanceof Date
					? new ꞰL (Date[Ꝕ].toJSON.call($), __XSD·dateTimeStamp)
					: $ instanceof DataView
					|| $ instanceof ꝕ(Uint8Array)
					|| $ instanceof ArrayBuffer
					? new ꞰL (b2a($), __XSD·base64Binary)
					: typeof $ == `number`
					? Number.isInteger($) ? new ꞰL (S͢($), __XSD·integer)
						: $ == 1/0 ? new ꞰL (`INF`, __XSD·double)
						: $ == -1/0 ? new ꞰL (`-INF`, __XSD·double)
						: new ꞰL (S͢($), __XSD·double)
					: typeof $ == `boolean` ? new ꞰL (S͢($), __XSD·boolean)
					: new ꞰL ($) }
			catch ( ɛ ) { return Ꝋ } }
		, nSbj = function ( $ ) {  //  new valid subject (with this target if present)
			try {
				return $ == Ꝋ ? Ꝋ
					: hasꞆ.call($, ꞰBN) ? this == Ꝋ ? new ꞰBN ($) : ꝯﬆʞ(ꞰBN, [ $ ], this)
					: hasꞆ.call($, ꞰÑN) ? this == Ꝋ ? new ꞰÑN ($) : ꝯﬆʞ(ꞰÑN, [ $ ], this)
					: get𝒫.call($, `nominalValue`, ꞰRDFN) ? Ꝋ
					: S͢[Ꝕ][ẞ].call($, 0, 2) == `_:` ? this == Ꝋ ? new ꞰBN (S͢[Ꝕ][ẞ].call($, 2))
						: ꝯﬆʞ(ꞰBN, [ S͢[Ꝕ][ẞ].call($, 2) ], this)
					: this == Ꝋ ? new ꞰÑN ($) : ꝯﬆʞ(ꞰÑN, [ $ ], this) }
			catch ( ɛ ) { return Ꝋ } }
		, nT = $ => $ == Ꝋ ? __RDF·nil : new (getꞆ.call($)) ($)
		, nº1MethodOf = function ( method, ...$s ) {  //  method of first argument with method
			for ( let $ of $s ) {
				const ƒ = $?.[method]
				if ( typeof ƒ == `function` ) return this != Ꝋ ? ƒ.bind(this) : ƒ }
			return Ꝋ }
		, nº1𝒫Of = function ( ...$s ) {  //  value of first argument with this property
			for ( let $ of $s ) {
				const
					$𝒫 = dſ𝒫(this ?? { }, $)
					, $Ꝟ = $𝒫?.[Ꝟ]
				if ( $Ꝟ != Ꝋ ) return $Ꝟ }
			return Ꝋ }
		, phony = Ʞ => { // creates a phony class, modifying the original to point to it
			if ( Ʞ[𝒫]($ϕ) ) return Ʞ[$ϕ]
			else {
				const
					$ꝕ = ꝕ(Ʞ)
					, Ↄ = function ( ) {
						if ( new.target != Ꝋ ) throw ꞆƐ͢(l10n `الرشآء: Invalid constructor. `)
						else throw ꞆƐ͢(l10n `الرشآء: Requires new. ${ Ʞ.name }`) }
				O͢.setPrototypeOf(Ↄ, O͢.create(
					$ꝕ !== Ꝋ && $ꝕ != Function[Ꝕ] ? phony($ꝕ) : Function[Ꝕ],
					{ toString: { [Ꝯ]: 1, [Ꝟ]: ( ) =>
						`function ${ Ʞ.name }() {\n    [hidden code]\n}`, [ꝶ]: 1 } }))
				Ʞ[Ꝕ].constructor = Ꝋ
				$℘(Ʞ, $ϕ, { [Ꝟ]: Ↄ })
				return Reflect.ownKeys(Ʞ).reduce(( Ↄ, $ ) => $℘(Ↄ, $, dſ𝒫(Ʞ, $)), Ↄ) } }
		, pxÑ = function pname ( $, ...$s ) {  //  make IRI from prefixed
			const ñ = typeof $ == `string` ? $ : $[𝒫] `raw` ? S͢.raw($, ...$s) : S͢($)
			if ( RX͢(`^(${ PNAME_LN }|${ PNAME_NS })$`, `u`).test(ñ) ) {
				const
					$loclꝯ = this?.context
					, $ndx = ñ.indexOf `:`
					, loclꝯ = this == Ꝋ ? Ꝋ
						: $loclꝯ != Ꝋ
							&& $loclꝯ.interfaceName == Ꝋ
							&& $loclꝯ.termType == Ꝋ
						? $loclꝯ
						: this
					, loclñ = ñ[ẞ]($ndx + 1).replace(/\\[^]/g, x => x[1])
					, px = ñ[ẞ](0, $ndx)
					, ꝯ = الرشآء.context ?? _ꝯ
					, _xp = loclꝯ?.[𝒫]?.(px) ? loclꝯ[px] : ꝯ?.[𝒫]?.(px) ? ꝯ[px] : Ꝋ
				if ( _xp == Ꝋ ) throw ꞆƐ͢(l10n `PNAME_UNDEFINED${ px }`)
				else
					try { return new ꞰÑN (`${ _xp }${ loclñ }`) }
					catch ( ɛ ) { throw ꞆƐ͢(l10n `الرشآء: PName expansion error. ${ px }`) } }
			else throw ꞆƐ͢(l10n `الرشآء: PName syntax error. ${ ñ }`) }
		, rm3Match = function removeTripleMatches ( subject, predicate, object ) {
			if ( subject === null ) {
				let ꝟꝵ = false
				for ( const $sbj of this.values() ) {
					ꝟꝵ = rm3Match.call(this, $sbj, predicate, object) || ꝟꝵ }
				return ꝟꝵ }
			else {
				const $sbj = [ ꞰÑN, ꞰBN ].some(Ꞇ => hasꞆ.call(subject, Ꞇ))
					? getꞆ.call(subject)[Ꝕ].toString.call(subject)
					: S͢(nSbj(subject))
				if ( this.has($sbj) ) {
					const sbj = this.get($sbj)
					if ( predicate === null ) {
						if ( object === null ) return this.delete($sbj)
						else {
							let ꝟꝵ = false
							for ( const $p of sbj.predicates() ) {
								ꝟꝵ = sbj.remove($p, object) || ꝟꝵ
								if ( sbj.empty ) this.delete($sbj) }
							return ꝟꝵ } }
					else {
						const ꝵ = object === null
							? sbj[𝒫](predicate) && delete sbj[predicate]
							: sbj.remove(predicate, object)
						if ( sbj.empty ) this.delete($sbj)
						return ꝵ } }
				else return false } }
		, rs = function *resources ( ) {  //  yield resources from this
			for ( const r of this.values() ) { yield r } }
		, turtify = $ => {  //  make RDF Turtle from object
			//  TK: Resources
			if ( $ instanceof WHATWG·URL || hasꞆ.call($, ꞰÑN) ) {
				const ñꝞ = S͢($)
				const
					ꝯ = الرشآء.context ?? _ꝯ
					, px = ꝯ == Ꝋ ? Ꝋ : O͢.keys(ꝯ).find(px => {
						const xp = ꝯ[px]
						return xp == ñꝞ[ẞ](0, xp[Ɫ]) })
				return px
					? `${ px }:${ ñꝞ.substring(ꝯ[px].length).replace(/>/g, `\\u003E`) }`
					: `<${ ñꝞ.replace(/>/g, `\\u003E`) }>` }
			else return $ instanceof Set ? A͢($, turtify).join `, `
				: A͢.ʔ($) ? `( ${ A͢[Ꝕ].map.call($, turtify).join ` ` } )`
				: [ ꞰBN, ꞰL ].some(tꞆ => hasꞆ.call($, tꞆ)) ? getꞆ.call($)[Ꝕ].toTurtle.call($)
				: typeof $ == `number` && !Number.isInteger($)
				? S͢(new ꞰL ($, __XSD·double))
				: `"${ String[Ꝕ].replace.call($, /["\\\n\r]/g, $$ =>
					({ "\"": $ꝛ `\"`
					, "\\": $ꝛ `\\`
					, "\n": $ꝛ `\n`
					, "\r": $ꝛ `\r` }[$$])) }"` }
		, unpack = $ => $ == Ꝋ ? [ ]  //  flatten an iterable into an array, or make a singleton
			: typeof $[Ʃ͢.iterator] == `function`
			? A͢($, unpack).reduce((ꝵ, ĩ) => ꝵ.concat(ĩ))
			: [ $ ]
		, Ʃ͢ = Symbol
		, ʃActns = Ʃ͢ `actionIterator`
		, ʃAd3 = Ʃ͢ `addTriple`
		, ʃAdActn = Ʃ͢ `addAction`
		, ʃRm3Match = Ʃ͢ `removeTripleMatches`
		, ʃR = Ʃ͢ `getResource`
		, ʃRs = Ʃ͢ `resourceIterator`
		, Ɫ = `length`
		, ẞ = `substring`
		, ℹ = $℘s(function ( $, ...$s ) {  //  make NamedNode
			if ( $ instanceof WHATWG·URL || hasꞆ.call($, ꞰÑN) ) return new ꞰÑN ($)
			else {
				const
					$base = this?.baseIRI == Ꝋ ? Ꝋ : new ꞰÑN (this.baseIRI)
					, $src = (typeof $ == `string` ? $ : $[𝒫] `raw` ? S͢.raw($, ...$s)
						: S͢($)).replace(/\\(?:U([0-9A-Fa-f]{8})|u([0-9A-Fa-f]{4}))/g,
						(N, Ⅰ, Ⅱ) => S͢.fromCodePoint(parseInt(Ⅰ || Ⅱ, 0x10)))
					, match = ℹ.rx.exec($src)
				if ( match?.[1] != Ꝋ ) return new ꞰÑN ($src)
				else if ( match == Ꝋ || $base == Ꝋ )
					throw ꞆƐ͢(l10n `الرشآء: NamedNode invalid IRI. `)
				else {
					const
							[ irelative·ref
							, irelative·part
							, iauthority
							, iuserinfo
							, ihost
							, port
							, ipath·abempty
							, ipath·absolute
							, ipath·noscheme
							, ipath·empty
							, iquery
							, ifragment ] = match.slice(14)
						, _path = (ipath·abempty ?? ipath·absolute ?? ipath·noscheme
							?? ipath·empty)
					let authority, path, query
					if ( iauthority != Ꝋ ) {
						authority = iauthority
						path = ℹ.un·(_path)
						query = iquery }
					else {
						if ( _path == `` ){
							path = $base.path
							query = iquery ?? $base.query }
						else {
							if ( _path.startsWith(`/`) ) path = ℹ.un·(_path)
							else path = ℹ.un·(
								$base.authority != Ꝋ && $base.path == `` ? `/${ _path }`
									: `${ $base.path.substring(0,
										$base.path.lastIndexOf(`/`) + 1) }${ _path }`)
							query = iquery }
						authority = $base.authority }
					const parts = [ $base.scheme, `:` ]
					if ( authority != Ꝋ ) {
						parts.push(`//`)
						parts.push(authority) }
					parts.push(path)
					if ( query != Ꝋ ) {
						parts.push(`?`)
						parts.push(query) }
					if ( ifragment != Ꝋ ) {
						parts.push(`#`)
						parts.push(ifragment) }
					return new ꞰÑN (parts.join(``)) } } },
			{ un·: { value: path => {
				let
					npt = path
					, out = [ ]
				while ( npt != `` ) {
					if ( npt.startsWith(`../`) ) npt = npt.substring(3)
					else if ( npt.startsWith(`./`) ) npt = npt.substring(2)
					else if ( npt.startsWith(`/./`) ) npt = `/${ npt.substring(3) }`
					else if ( npt == `/.` ) npt = `/`
					else if ( npt.startsWith(`/../`) ) {
						npt = `/${ npt.substring(4) }`
						out = out.slice(0, -1) }
					else if ( npt == `/..`) {
						npt = `/`
						out = out.slice(0, -1) }
					else if ( npt == `.` || npt == `..` ) break
					else {
						const nextPathNdx = npt.indexOf(`/`, 1)
						if ( nextPathNdx == -1 ) {
							out.push(npt)
							break }
						else {
							out.push(npt.substring(0, nextPathNdx))
							npt = npt.substring(nextPathNdx) } } }
				return out.join(``) } }
			, rx: { value: RX͢(`^(?:${ IRI·reference })$`, `u`) } })
		, Ꝋ = undefined
		, Ꝕ = `prototype`
		, ꝕ = Object.getPrototypeOf.bind(Object)
		, Ꝟ = `value`
		, Ꝯ = `configurable`
		, ꝯſꝸr = function ($) {  //  consume and return
			const
				{ ndx: $ndx
				, src: $src } = this
			let ꝟndx = $ndx
			if ($ instanceof RX͢) {
				$.lastIndex = ꝟndx
				if ( !$.test($src) )
					throw ꞆƐ͢(l10n `الرشآء: Expected match. ${ this.ñ }${ $ }${ ꝟndx }`)
				ꝟndx = $.lastIndex }
			else {
				const
					$$ = S͢($)
					, ɫ = $$[Ɫ]
				if ( $src[ẞ](ꝟndx, ꝟndx + ɫ) != $$ )
					throw ꞆƐ͢(l10n `الرشآء: Expected match. ${ this.ñ }${ `'${ $$ }'` }${ ꝟndx }`)
				ꝟndx += ɫ }
			return $src[ẞ]($ndx, this.ndx = ꝟndx) }
		, ꝯﬆʞ = Reflect.construct.bind(Reflect)
		, ꝯﬆʞr = function ( dꞰ ) {  //  constructor for this
			const
				$Ʞ = this.constructor
				, Ʞ = $Ʞ === Ꝋ ? Ꝋ : $Ʞ[Ʃ͢.species]  //  not permitted to be null
			return Ʞ ?? dꞰ }
		, ꝴ = `enumerable`
		, ꝶ = `writable`
		, ꞆƐ͢ = TypeError
		, ꞇObj = function fromTurtle ( $, ...$s ) {  //  make object from RDF Turtle or N‐Triples
			const
				$WHITESPACE = $ꝛ `(?:${ WS }|#(?:(?!${ EOL })[^])*)*`
				, $src = typeof $ == `string` ? $ : $[𝒫] `raw` ? S͢.raw($, ...$s) : S͢($)
				, ɫ = $src[Ɫ]
				if ( RX͢($ꝛ `^(?:${ IRIREF }|${ PNAME_LN }|${ PNAME_NS })$`, "u").test($src) )
					return $src[0] == "<" ? ℹ.call(this, $src.slice(1, -1)) : pxÑ.call(this, $src)
				else if ( RX͢($ꝛ `^(?:${ NT·BLANK_NODE_LABEL }|${ ANON })$`, "u").test($src) )
					return new ꞰBN ($src[0] == "_" ? $src[ẞ](2) : "")
				else if ( RX͢($ꝛ `^(?:${ DOUBLE }|${ DECIMAL }|${ INTEGER })$`, "u").test($src) )
					return !/[.e]/i.test($src) ? new ꞰL ($src, null, __XSD·integer)
						: /e/i.test($src) ? new ꞰL ($src, null, __XSD·double)
						: new ꞰL ($src, null, __XSD·decimal)
				else if ( RX͢($ꝛ `^(?:true|false)$`, `u`).test($src) )
					return new ꞰL ($src, null, __XSD·boolean)
				else {
					const match = (RX͢($ꝛ `^(?:(${ STRING_LITERAL_LONG_SINGLE_QUOTE }|${ STRING_LITERAL_LONG_QUOTE })|(${ STRING_LITERAL_QUOTE }|${ STRING_LITERAL_SINGLE_QUOTE }))(?:(?:${ $WHITESPACE })(?:(${ LANGTAG })|\^\^(?:${ $WHITESPACE })(${ IRIREF }|${ PNAME_LN }|${ PNAME_NS })))?$`, `u`).exec($src))
					if ( match ) {
						const
							$ꝺꞆ = match[4]
							, ñꝞ = ((match[2] || ``).slice(1, -1)
								|| (match[1] || ``).slice(3, -3))
								.replace(/\\[tbnrf\x22\x27\x5C]/gu, $ => (
									{ "\\t": `\t`
									, "\\b": `\b`
									, "\\n": `\n`
									, "\\r": `\r`
									, "\\f": `\f`
									, "\\\"": `\x22`
									, "\\'": `\x27`
									, "\\\\": `\x5C` }[$])).replace(
									/\\(?:U([0-9A-Fa-f]{8})|u([0-9A-Fa-f]{4}))/g,
									(N, Ⅰ, Ⅱ) => S͢.fromCodePoint(parseInt(Ⅰ || Ⅱ, 0x10)))
							, ɫᵹ = (match[3] || ``)[ẞ](1)
							, ꝺꞆℹ = $ꝺꞆ == Ꝋ ? __XSD·string : ꞇObj.call(this, $ꝺꞆ)
						return new ꞰL (ñꝞ, ɫᵹ, ꝺꞆℹ) }
					else throw ꞆƐ͢(l10n `الرشآء: Invalid node. ${ "RDF Turtle" }${ $ }`) } }
		, ꞇꞇl = function fromTurtle ( $, ...$s ) {  //  make Graph from RDF Turtle
			const
				$WHITESPACE = $ꝛ `(?:${ WS }|#(?:(?!${ EOL })[^])*)*`
				, $src = typeof $ == `string` ? $ : $[𝒫] `raw` ? S͢.raw($, ...$s) : S͢($)
				, $ꝯ = this?.context
				, bidM = { }
				, directive = RX͢($ꝛ `@prefix(?:${ $WHITESPACE })(?:${ PNAME_NS })(?:${ $WHITESPACE })(?:${ IRIREF })(?:${ $WHITESPACE })\.|@base(?:${ $WHITESPACE })(?:${ IRIREF })|[Pp][Rr][Ee][Ff][Ii][Xx](?:${ $WHITESPACE })(?:${ PNAME_NS })(?:${ $WHITESPACE })(?:${ IRIREF })|[Bb][Aa][Ss][Ee](?:${ $WHITESPACE })(?:${ IRIREF })`, `uy`)
				, whitespace = RX͢($WHITESPACE, `uy`)
				, ꝯ = $ꝯ == Ꝋ ? { } : O͢.keys($ꝯ).reduce((ꝯ, px) => (ꝯ[px] = $ꝯ[px], ꝯ), { })
				, ꝯſꝸ = ꝯſꝸr.bind(
					{ get ndx ( ) { return ꝟndx }
					, set ndx ( $ ) { ꝟndx = $ }
					, ñ: `RDF Turtle`
					, src: $src })
				, ꝯſꝸDirective = ( ) => {
					const sparql = $src[ꝟndx] != `@`
					if ( !sparql ) ꝯſꝸ `@`
					if ( $src[ꝟndx].toUpperCase() == `P` ) {
						ꝯſꝸ(/prefix/iuy)
						ꝯſꝸ(whitespace)
						const px = ꝯſꝸ(RX͢(PNAME_NS, `uy`)).slice(0, -1)
						ꝯſꝸ(whitespace)
						ꝯ[px] = ꝯſꝸT()
						if ( !sparql ) {
							ꝯſꝸ(whitespace)
							ꝯſꝸ `.` } }
					else {
						ꝯſꝸ(/base/iuy)
						ꝯſꝸ(whitespace)
						ꝟbℹ = ꝯſꝸT()
						if ( !sparql ) {
							ꝯſꝸ(whitespace)
							ꝯſꝸ `.` } } }
				, ꝯſꝸPObjs = ( ) => {
					let $ꝟcontinue = 1
					while ( $ꝟcontinue ) {
						const p = (( ) => {
							try { return ꝯſꝸT() }
							catch ( ɛ ) {
								try {
									ꝯſꝸ `a`
									return __RDF·type
								}
								catch ( ɛ ) {
									throw ꞆƐ͢(l10n `الرشآء: Turtle missing term error. ${ ꝟndx }`) } } })()
						let ꝟcontinue = 1
						if ( !hasꞆ.call(p, ꞰÑN) )
							throw ꞆƐ͢(l10n `الرشآء: Turtle unnamed predicate error. ${ ꝟndx }`)
						ꝯſꝸ(whitespace)
						while ( ꝟcontinue ) {
							const obj = ꝯſꝸT()
							ꝿ.add(new Ʞ3 (ꝟsbj, p, obj))
							try { ꝯſꝸ(RX͢($ꝛ `${ $WHITESPACE },${ $WHITESPACE }`, `uy`)) }
							catch ( ɛ ) { ꝟcontinue = 0 } }
						try { ꝯſꝸ(RX͢($ꝛ `(${ $WHITESPACE };${ $WHITESPACE })+`, `uy`)) }
						catch ( ɛ ) { $ꝟcontinue = 0 }
						if ( `.]`.includes($src[ꝟndx]) ) $ꝟcontinue = 0 } }
				, ꝯſꝸT = ( ) => {
					const
						$matcher =
							[ RX͢($ꝛ `${ IRIREF }|${ PNAME_LN }|${ PNAME_NS }`, `uy`)
							, RX͢($ꝛ `${ BLANK_NODE_LABEL }|${ ANON }`, `uy`)
							, RX͢($ꝛ `(?:${ STRING_LITERAL_LONG_SINGLE_QUOTE }|${ STRING_LITERAL_LONG_QUOTE }|${ STRING_LITERAL_QUOTE }|${ STRING_LITERAL_SINGLE_QUOTE })(?:(?:${ $WHITESPACE })(?:${ LANGTAG }|\^\^(?:${ $WHITESPACE })(?:${ IRIREF }|${ PNAME_LN }|${ PNAME_NS })))?`, `uy`)
							, RX͢($ꝛ `${ DOUBLE }|${ DECIMAL }|${ INTEGER }`, `uy`)
							, RX͢($ꝛ `true|false`, `uy`) ].find($ => {
								$.lastIndex = ꝟndx
								return $.test($src) })
						, $ndx = $matcher == Ꝋ ? Ꝋ : $matcher.lastIndex
					if ( $ndx != Ꝋ ) {
						const
							$n = ꞇObj.call(
								{ baseIRI: ꝟbℹ, context: ꝯ },
								$src[ẞ](ꝟndx, ꝟndx = $ndx))
							, ñꝞ = $n[Ꝟ]
						return $n instanceof ꞰBN ? ñꝞ == `` ? new ꞰBN (++ꝟbid)
								: bidM[𝒫](ñꝞ) ? new ꞰBN (bidM[ñꝞ])
								: new ꞰBN (bidM[ñꝞ] = ++ꝟbid)
							: $n }
					else if ( $src[ꝟndx] == `(` ) {
						ꝯſꝸ `(`
						ꝯſꝸ(whitespace)
						const c = [ ]
						try {
							while ( 1 ) {
								c.push(ꝯſꝸT())
								ꝯſꝸ(whitespace) } }
						catch ( ɛ ) { }
						ꝯſꝸ `)`
						return new ꞰBNC (++ꝟbid, c) }
					else if ( $src[ꝟndx] == `[` ) {
						ꝯſꝸ `[`
						ꝯſꝸ(whitespace)
						const sbj = ꝟsbj
						const n = ꝟsbj = new ꞰBN (++ꝟbid)
						ꝯſꝸPObjs()
						ꝟsbj = sbj
						ꝯſꝸ(whitespace)
						ꝯſꝸ `]`
						return n }
					else throw ꞆƐ͢(l10n `الرشآء: Turtle missing term error. ${ ꝟndx }`) }
				, ꝯſꝸTriples = ( ) => {
					const anon = RX͢(ANON, `uy`)
					anon.lastIndex = ꝟndx
					if ( $src[ꝟndx] == `[` && !anon.test($src) ) {
						ꝟsbj = ꝯſꝸT()
						ꝯſꝸ(whitespace)
						if ( $src[ꝟndx] != `.` ) {
							ꝯſꝸPObjs()
							ꝯſꝸ(whitespace) }
						ꝯſꝸ `.` }
					else {
						const sbj = ꝯſꝸT()
						if ( sbj instanceof ꞰL )
							throw ꞆƐ͢(l10n `الرشآء: Turtle literal subject error. ${ ꝟndx }`)
						ꝟsbj = sbj
						ꝯſꝸ(whitespace)
						ꝯſꝸPObjs()
						ꝯſꝸ(whitespace)
						ꝯſꝸ `.` } }
				, ꝿ = new ꞰꝾ
			let
				ꝟbℹ = this == Ꝋ || this.baseIRI == Ꝋ ? Ꝋ : this.baseIRI
				, ꝟbid = 0
				, ꝟndx = 0
				, ꝟsbj
			ꝯſꝸ(whitespace)
			for ( directive.lastIndex = ꝟndx ; ꝟndx < $src[Ɫ] ; directive.lastIndex = ꝟndx ) {
				directive.test($src) ? ꝯſꝸDirective() : ꝯſꝸTriples()
				ꝯſꝸ(whitespace) }
			return ꝿ }
		, 𝒫 = `hasOwnProperty`
		, ꞰTS = class TermSet extends Set {
/*  ⁂  *\

Not exposed.  Expects node values as provided by PredicateMap, except for .delete().

\*  ⁂  */
			constructor ( terms ) {
				$℘(super(), `™`, { [Ꝟ]: new Map })
				for ( const term of terms ?? [ ] ) { this.add(term) }
				return this }
			[Ʃ͢.iterator] ( ) {
				const si = Set[Ꝕ][Ʃ͢.iterator].call(this)
				return O͢.create(ꝕ(si), { next: { [Ꝟ]: function next ( ) {
					const { [Ꝟ]: nxꝞ, done } = si.next()
					return { [Ꝟ]: nxꝞ == Ꝋ ? Ꝋ : this[`™`].get(nxꝞ), done } }.bind(this) } }) }
			add ( value ) {
				const n3 = S͢(ꞰRDFN[Ꝕ].toNT.call(value))
				this[`™`].set(n3, value)
				return Set[Ꝕ].add.call(this, n3) }
			clear ( ) {
				this[`™`].clear()
				return Set[Ꝕ].clear.call(this) }
			delete ( value ) {
				if ( typeof value == `object` ) {
					const n3 = S͢(ꞰRDFN[Ꝕ].toNT.call(value))
					if ( n3 != Ꝋ ) {
						this[`™`].delete(n3)
						return Set[Ꝕ].delete.call(this, n3) } }
				else {  //  literal values may match multiple terms
					let ꝟ = false
					for ( const entry of this[`™`].entries() ) {
						if ( ꞰRDFN[Ꝕ].equals.call(entry[1], value) ) {
							const n3 = entry[0]
							this[`™`].delete(n3)
							ꝟ = Set[Ꝕ].delete.call(this, n3) || ꝟ } }
					return ꝟ } }
			entries ( ) {
				const si = Set[Ꝕ].entries.call(this)
				return O͢.create(ꝕ(si), { next: { [Ꝟ]: function next ( ) {
					const
						{ [Ꝟ]: $nx, done } = si.next()
						, nxꝞ = $nx?.[0]
					return { [Ꝟ]: nxꝞ == Ꝋ ? Ꝋ
						: new Array (2).fill(this[`™`].get(nxꝞ)), done } }.bind(this) } }) }
			forEach ( callbackFn, thisArg ) {
				return Set[Ꝕ].forEach.call(this, $ =>
					callbackFn.call(thisArg, this[`™`].get($))) }
			has ( value ) {
				return Set[Ꝕ].has.call(this, S͢(ꞰRDFN[Ꝕ].toNT.call(value))) }
			keys ( ) {
				const si = Set[Ꝕ].keys.call(this)
				return O͢.create(ꝕ(si), { next: { [Ꝟ]: function next ( ) {
					const { [Ꝟ]: nxꝞ, done } = si.next()
					return { [Ꝟ]: nxꝞ == Ꝋ ? Ꝋ : this[`™`].get(nxꝞ), done } }.bind(this) } }) }
			values ( ) {
				const si = Set[Ꝕ].values.call(this)
				return O͢.create(ꝕ(si), { next: { [Ꝟ]: function next ( ) {
					const { [Ꝟ]: nxꝞ, done } = si.next()
					return { [Ꝟ]: nxꝞ == Ꝋ ? Ꝋ : this[`™`].get(nxꝞ), done } }.bind(this) } }) } }
		, ꞰPM = class PredicateMap extends Map {
/*  ⁂  *\

Not exposed.  All methods expect a string predicate (as provided by ResourceProxy) except for .delete().

\*  ⁂  */
			constructor ( ) { return super() }
			[Ʃ͢.iterator] ( ) {
				const mi = Map[Ꝕ].keys.call(this)
				return O͢.create(ꝕ(mi), { next: { [Ꝟ]: function next ( ) {
					const { [Ꝟ]: nxkey, done } = mi.next()
					return { [Ꝟ]:
						[ new ꞰÑN (nxKey)
						, ꞰPM[Ꝕ].get.call(this, nxKey) ], done } } } }) }
			add ( predicate, object ) {
				if ( !O͢.isExtensible(this) )
					throw ꞆƐ͢(l10n `الرشآء: Nonextensible predicate addition error. `)
				else if ( object instanceof Set )
					object.forEach(ꞰPM[Ꝕ].add.bind(this, predicate))
				else if ( object != Ꝋ ) {
					const
						existing = Map[Ꝕ].get.call(this, predicate)
						, provided = nObj(object)
					if ( provided != Ꝋ )
						if ( existing == Ꝋ ) Map[Ꝕ].set.call(this, predicate, provided)
						else if ( existing instanceof Set ) existing.add(provided)
						else {
							const objs = new ꞰTS ([ existing, provided ])
							Map[Ꝕ].set.call(this, predicate, objs.size > 1 ? objs
								: objs.values().next()[Ꝟ]) } }
				return this }
			clear ( predicate ) {
				if ( !O͢.isExtensible(this) )
					throw ꞆƐ͢(l10n `الرشآء: Nonextensible predicate clearing error. `)
				else {
					const existing = Map[Ꝕ].get.call(this, predicate)
					if ( existing instanceof Set ) existing.clear()  //  for the sake of iterators
					return Map[Ꝕ].delete.call(this, predicate) } }
			clearAll ( ) {
				for ( const predicate of Map[Ꝕ].keys.call(this) ) {
					ꞰPM[Ꝕ].clear.call(this, predicate) }  //  for the sake of iterators
				return Map[Ꝕ].clear.call(this) }
			delete ( predicate, object ) {
				if ( !O͢.isExtensible(this) )
					throw ꞆƐ͢(l10n `الرشآء: Nonextensible predicate deletion error. `)
				else {
					const $p = S͢(predicate)
					if ( Map[Ꝕ].has.call(this, $p) ) {
						const existing = Map[Ꝕ].get.call(this, $p)
						if ( object == Ꝋ ) return false
						else if ( existing instanceof Set ) {
							const deleted = existing.delete(object)  //  for the sake of iterators
							if ( existing.size < 1 ) Map[Ꝕ].delete.call(this, $p)
							else if ( existing.size == 1 )
								Map[Ꝕ].set.call(this, predicate, existing.values().next()[Ꝟ])
							return deleted }
						else if ( ꞰRDFN[Ꝕ].equals.call(existing, object) )
							return Map[Ꝕ].delete.call(this, $p)
						else return false }
					else return false } }
			entries ( ) {
				const mi = Map[Ꝕ].keys.call(this)
				return O͢.create(ꝕ(mi), { next: { [Ꝟ]: function next ( ) {
					const { [Ꝟ]: nxkey, done } = mi.next()
					return { [Ꝟ]:
						[ new ꞰÑN (nxKey)
						, ꞰPM[Ꝕ].get.call(this, nxKey) ], done } } } }) }
			forEach ( callbackFn, thisArg ) {
				return Map[Ꝕ].forEach.call(this, ( [ key, $ ] ) =>
					callbackFn.call(thisArg, $ instanceof ꞰTS
						? [ new ꞰÑN (key), ꞰPM[Ꝕ].get.call(this, key) ]
						: [ new ꞰÑN (key), $ ])) }
			get ( predicate ) {
				const existing = Map[Ꝕ].get.call(this, predicate)
				if ( existing == Ꝋ ) return existing
				else if ( existing instanceof ꞰTS ) return $℘s(new Set (existing),
					{ [Ʃ͢.iterator]: { [Ꝟ]:
						ꞰPM[Ꝕ].iterate.bind(this, predicate, Ʃ͢.iterator, existing) }
					, entries: { [Ꝟ]:
						ꞰPM[Ꝕ].iterate.bind(this, predicate, `entries`, existing) }
					, keys: { [Ꝟ]:
						ꞰPM[Ꝕ].iterate.bind(this, predicate, `keys`, existing) }
					, values: { [Ꝟ]:
						ꞰPM[Ꝕ].iterate.bind(this, predicate, `values`, existing) } })
				else return existing }
			has ( predicate ) { return Map[Ꝕ].has.call(this, predicate) }
			*iterate ( predicate, method, initial ) {  //  iterate over underlying term set
/*  ⁂  *\

This iterates first over the initial set, then checks to see if a new set has taken its place, and, if so, iterates over that one too, starting from the previous final index.  This handles the case where, during the course of a single iteration, the value of a predicate (1) stops being a set, and then (2) becomes a set again (and indeed, a set with a greater number of values than the current iteration index).

This is an ※extreme※ edge‐case which code is unlikely to ever encounter in practice (for all intents and purposes, this functions just like a starred yield to the corresponding set method).

\*  ⁂  */
				let
					ꝟndx = 0
					, ꝟĩ = null
				for ( const ĩ of initial[method]() ) {
					++ꝟndx
					ꝟĩ = ĩ
					yield ĩ }
				const existing = Map[Ꝕ].get.call(this, predicate)
				if ( existing instanceof ꞰTS && existing !== initial ) {
					const
						$ĩs = ꞰPM[Ꝕ].get.call(this, predicate)[method]()
						, { [Ꝟ]: ĩ } = $ĩs.next()
					if ( ꝟĩ == Ꝋ || !ꞰRDFN[Ꝕ].equals.call(ꝟĩ, ĩ) ) --ꝟndx  //  first new isn’t last old
					if ( existing.size - 1 > ꝟndx ) while ( ꝟndx-- > 0 ) $ĩs.next()
					yield *$ĩs } }
			keys ( ) {
				const mi = Map[Ꝕ].keys.call(this)
				return O͢.create(ꝕ(mi), { next: { [Ꝟ]: function next ( ) {
					const { [Ꝟ]: nxKey, done } = mi.next()
					return { [Ꝟ]: nxKey == Ꝋ ? nxKey : new ꞰÑN (nxKey), done } } } }) }
			set ( predicate, object ) {
				if ( object == Ꝋ ) return ꞰPM[Ꝕ].clear.call(this, predicate), this
				else if ( !O͢.isExtensible(this) )
					throw ꞆƐ͢(l10n `الرشآء: Nonextensible predicate addition error. `)
				else {
					const obj = nObj(object)
					if ( obj instanceof Set ) {
						const objs = new ꞰTS (obj)
						Map[Ꝕ].set.call(this, predicate, objs.size > 1 ? objs
							: objs.values().next()[Ꝟ]) }
					else if ( obj != Ꝋ ) Map[Ꝕ].set.call(this, predicate, obj) }
				return this }
			values ( ) {
				const mi = Map[Ꝕ].keys.call(this)
				return O͢.create(ꝕ(mi), { next: { [Ꝟ]: function next ( ) {
					const { [Ꝟ]: nxkey, done } = mi.next()
					return { [Ꝟ]: ꞰPM[Ꝕ].get.call(this, key), done } } } }) } }
		, ꞰRPX = class ResourceProxy extends null {  //  proxy for resources
			constructor ( resourceMap, predicateMap ) {
				return O͢.create(ꞰRPX[Ꝕ],
					{ predicateMap: { [Ꝟ]: predicateMap }
					, resourceMap: { [Ꝟ]: resourceMap } }) }
			a ( O, V ) {  //  is O a V?
				const $Ꞇ = O͢.isExtensible(O) ? this.predicateMap.get(__RDF·type)
					: O[__RDF·type]
				if ( $Ꞇ == Ꝋ ) return false
				else if ( $Ꞇ instanceof Set ) {
					for ( const Ꞇ of $Ꞇ ) { if ( ꞰRDFN[Ꝕ].equals.call(Ꞇ, V) ) return true }
					return false }
				else return ꞰRDFN[Ꝕ].equals.call($Ꞇ, V) }
			defineProperty ( O, P, Desc ) {
				if ( !O͢.isExtensible(O) || dſ𝒫(O, P) != Ꝋ )
					return Reflect.defineProperty(O, P, Desc)
				else if ( P == Ɫ ) {
					const $ꝕ = this.getPrototypeOf(O)
					if ( Desc[Ꝯ] == 0 || Desc[ꝴ] == 0 || Desc[ꝶ] == 0 || `get` in Desc || `set` in Desc )
						return false  //  keep configurable, non‐enumerable, & writable
					else if ( !(Ꝟ in Desc) ) return Reflect.defineProperty(O, P, Desc)
					else if ( $ꝕ == ꞰRC[Ꝕ] || $ꝕ instanceof ꞰRC )
						return this.setCollectionLength(O, Desc[Ꝟ])
					else {
						const
							$Ꝟ = Desc[Ꝟ]
							, ɫ = $Ꝟ >>> 0
							, oⱢ𝒫 = dſ𝒫(O, Ɫ)
						if ( ɫ != +$Ꝟ )
							throw RangeError(l10n `الرشآء: Invalid length. ${ Desc[Ꝟ] }`)
						if ( !oⱢ[ꝶ] ) return false
						if ( !Reflect.defineProperty(O, Ɫ,
							{ [Ꝯ]: Desc[Ꝯ], [ꝴ]: Desc[ꝴ], [Ꝟ]: $Ꝟ, [ꝶ]: 1 }) ) return false
						for ( let ꝟndx = oⱢ𝒫[Ꝟ] ; ꝟndx > ɫ ; )
							if ( !Reflect.delete(O, --ꝟndx) ) {
								$℘(O, Ɫ,
									{ [Ꝯ]: Desc[Ꝯ], [ꝴ]: Desc[ꝴ], [Ꝟ]: ꝟndx + 1, [ꝶ]: 1 })
								return false }
						return true } }
				else if ( isNdx(P) ) {
					const
						ndx = P >>> 0
						, $ꝕ = this.getPrototypeOf(O)
					if ( Desc[Ꝯ] == 0 || Desc[ꝴ] == 0 || Desc[ꝶ] == 0 || `get` in Desc || `set` in Desc )
						return false  //  keep configurable, enumerable, & writable
					else if ( !(Ꝟ in Desc) ) return Reflect.defineProperty(O, P, Desc)
					else if ( $ꝕ == ꞰRC[Ꝕ] || $ꝕ instanceof ꞰRC ) {
						const obj = nObj(Desc[Ꝟ])
						if ( this.resourceMap == Ꝋ )
							return Reflect.defineProperty(O, P, { [Ꝟ]: obj })
						else if ( __RDF·nil.equals(O) ) return false
						else {
							let ꝟr = this.getTarget(O)
							for ( let ꝟndx = 0 ; ꝟndx < ndx ; ++ꝟndx ) {
								const rest = ꝟr.any(__RDF·rest, $ =>
									!__RDF·nil.equals($))
								if ( rest == Ꝋ ) {
									const ñ = cdr(ꝟr)
									const r = (( ) => {
										if ( rM.has(ñ) ) {
											let ꝟ = 1
											while ( rM.has(`${ ñ }${ ꝟ }`) ) ++ꝟ
											return new ꞰR(`${ ñ }${ ꝟ }`) }
										else return new ꞰR (ñ) })()
									r[__RDF·rest] = __RDF·nil
									if ( !Reflect.defineProperty(ꝟr, S͢(__RDF·rest), { [Ꝟ]: r }) )
										return false
									ꝟr = ꝟr[__RDF·rest] } }
							return Reflect.defineProperty(ꝟr, S͢(__RDF·first), { [Ꝟ]: obj }) } }
					else {
						const
							oⱢ𝒫 = dſ𝒫(O, Ɫ)
							, _oⱢ𝒫Ꝟ = oⱢ𝒫[Ꝟ]
						if ( ndx >= _oⱢ𝒫Ꝟ && !oⱢ[ꝶ] ) return false
						if ( !this.defineProperty(O, S͢(__PN `rdf:_${ ndx + 1 }`), Desc ) ) return false
						if ( ndx >= _oⱢ𝒫Ꝟ ) return this.defineProperty(O, Ɫ,
							{ [Ꝯ]: oⱢ𝒫[Ꝯ], [ꝴ]: oⱢ𝒫[ꝴ], [Ꝟ]: ndx + 1, [ꝶ]: 1 }) }
					return true }
				else if ( isIRI(P) ) {
					if ( Desc[Ꝯ] == 0 || Desc[ꝴ] == 0 || Desc[ꝶ] == 0 || `get` in Desc || `set` in Desc )
						return false  //  keep configurable, enumerable, & writable
					else {
						const $Ꝟ = Desc[Ꝟ]
						if ( this.resourceMap == Ꝋ ) {
							const $ꝕ = this.getPrototypeOf(O)
							if ( $ꝕ == ꞰRC[Ꝕ] || $ꝕ instanceof ꞰRC )
								if ( S͢(__RDF·first) == P )
									return Reflect.defineProperty(O, `0`, { [Ꝟ]: nObj($Ꝟ) })
								else if ( S͢(__RDF·rest) == P )
									try {
										A͢[Ꝕ].splice.call(O, 1, Infinity,
											A͢[Ꝕ].map.call($Ꝟ, nObj))
										return true }
									catch ( ɛ ) { return false } }
						else if ( S͢(__RDF·rest) == P && __RDF·nil.equals($Ꝟ) ) {
							const r = this.get(O, S͢(__RDF·rest), O)
							if ( r != Ꝋ
								&& !Reflect.has(r, S͢(__RDF·first))
								&& __RDF·nil.equals(Reflect.get(r, S͢(__RDF·rest), r))
								&& !Reflect.deleteProperty(r, S͢(__RDF·rest)) ) return false }
						else if ( $Ꝟ instanceof ꞰR )
							this.getTarget(O).parent.addAll($Ꝟ)
						else if ( hasꞆ.call($Ꝟ, ꞰBN) && A͢.ʔ($Ꝟ) )
							for ( const $3 of nº1MethodOf.call($Ꝟ, `triples`, $Ꝟ, ꞰBNC[Ꝕ])() ) {
								this.getTarget(O).parent.add($3) }
						return !!this.predicateMap.set(P, $Ꝟ) } }
				else return Reflect.defineProperty(O, P, Desc) }
			deleteArrayIndex ( O, ndx ) {
				const $ꝕ = this.getPrototypeOf(O)
				if ( $ꝕ == ꞰRC[Ꝕ] || $ꝕ instanceof ꞰRC ) {
					const rM = this.resourceMap
					if ( rM == Ꝋ ) return Reflect.deleteProperty(O, S͢(ndx))
					else {
						let ꝟr = __RDF·nil.equals(O) ? Ꝋ : this.getTarget(O)
						for ( let ꝟndx = 0
							; ꝟndx < ndx && ꝟr != Ꝋ
							; ꝟr = ꝟr.any(__RDF·rest, $ => !__RDF·nil.equals($)) ) ++ꝟndx
						return ꝟr == Ꝋ || __RDF·nil.equals(ꝟr) ? true
							: Reflect.deleteProperty(ꝟr, S͢(__RDF·first)) } }
				else return this.deleteProperty(O, S͢(__PN `rdf:_${ ndx + 1 }`)) }
			deleteProperty ( O, P ) {
				return !O͢.isExtensible(O) || P != Ɫ && dſ𝒫(O, P) != Ꝋ
					? Reflect.delete(O, P)
					: P == Ɫ ? false
					: isNdx(P) ? this.deleteArrayIndex(O, +P)
					: isIRI(P) ? this.predicateMap.clear(P) || true
					: Reflect.delete(O, P) }
			get ( O, P, Receiver ) {
				return !O͢.isExtensible(O) || P != Ɫ && dſ𝒫(O, P) != Ꝋ
					? Reflect.get(O, P, Receiver)
					: P == Ɫ ? this.getLength(O, Receiver)
					: isNdx(P) ? this.getArrayIndex(O, +P, Receiver)
					: isIRI(P) ? this.getPredicate(O, P)
					: Reflect.get(O, P, Receiver) }
			getArrayIndex ( O, ndx, Receiver ) {
				const $ꝕ = this.getPrototypeOf(O)
				if ( $ꝕ == ꞰRC[Ꝕ] || $ꝕ instanceof ꞰRC ) {
					if ( this.resourceMap == Ꝋ ) return Reflect.get(O, S͢(ndx), Receiver)
					else {
						let ꝟr = __RDF·nil.equals(O) ? Ꝋ : this.getTarget(O)
						for ( let ꝟndx = 0
							; ꝟndx < ndx && ꝟr != Ꝋ
							; ꝟr = ꝟr.any(__RDF·rest, $ => !__RDF·nil.equals($)) ) ++ꝟndx
						return ꝟr == Ꝋ ? Ꝋ : ꝟr[__RDF·first] } }
				else return this.get(O, S͢(__PN `rdf:_${ ndx + 1 }`), Receiver) }
			getLength ( O, Receiver ) {
				const $ꝕ = this.getPrototypeOf(O)
				return $ꝕ == ꞰRC[Ꝕ] || $ꝕ instanceof ꞰRC
					? this.getCollectionLength(O)
					: Reflect.get(O, Ɫ, Receiver) }
			getCollectionLength ( O ) {
				const rM = this.resourceMap
				if ( rM == Ꝋ ) return  Reflect.get(O, Ɫ, O)
				else {
					let ꝟndx = 0
					for ( let ꝟr = __RDF·nil.equals(O) ? Ꝋ : this.getTarget(O)
						; ꝟr != Ꝋ
						; ꝟr = ꝟr.any(__RDF·rest, $ => !__RDF·nil.equals($)) ) ++ꝟndx
					return ꝟndx } }
			getOwnPropertyDescriptor ( O, P ) {
				if ( !O͢.isExtensible(O) || P != Ɫ && dſ𝒫(O, P) != Ꝋ )
					return Reflect.getOwnPropertyDescriptor(O, P)
				else if ( P == Ɫ ) return (
					{ [Ꝯ]: 1
					, [ꝴ]: 0
					, get: ꞰRPX[Ꝕ].getLength.bind(this, O, O)
					, set: ꞰRPX[Ꝕ].setLength.bind(this, O) })
				else if ( isNdx(P) ) {
					const ndx = +P
					return this.hasArrayIndex(O, ndx) ?
						{ [Ꝯ]: 1
						, [ꝴ]: 1
						, get: ꞰRPX[Ꝕ].getArrayIndex.bind(this, O, ndx, O)
						, set: ꞰRPX[Ꝕ].setArrayIndex.bind(this, O, ndx) } : Ꝋ }
				else return isIRI(P) ? this.predicateMap.has(P) ?
						{ [Ꝯ]: 1
						, [ꝴ]: 1
						, get: ꞰRPX[Ꝕ].getPredicate.bind(this, O, P)
						, set: ꞰRPX[Ꝕ].setPredicate.bind(this, O, P) } : Ꝋ
					: Reflect.getOwnPropertyDescriptor(O, P) }
			getPredicate ( O, P ) {
				return this.getTarget(this.predicateMap.get(P)) }
			getPrototypeOf ( O ) {
				return O͢.isExtensible(O) && O instanceof ꞰR
					? this.resourceMap == Ꝋ
						? A͢.isArray(this) ? ꞰRC[Ꝕ] : ꞰR[Ꝕ]
						: this.a(O, __RDF·List)
						|| this.has(O, __RDF·first)
						|| this.has(O, __RDF·rest) ? ꞰⱢRC[Ꝕ]
						: ꞰⱢR[Ꝕ]
					: Reflect.getPrototypeOf(O) }
			getTarget ( target ) {
				const rM = this.resourceMap
				if ( target == Ꝋ || rM == Ꝋ ) return target
				else if ( target instanceof Set ) {
					return new Set (A͢(target).map(ꞰRPX[Ꝕ].getTarget.bind(this))) }
				else {
					const obj = S͢(target)
					return ![ ꞰÑN, ꞰBN ].some(hasꞆ.bind(target)) || !rM.has(obj) ? target
						: rM.get(obj) } }
			has ( O, P ) {
				return !O͢.isExtensible(O) ? Reflect.has(O, P)
					: dſ𝒫(O, P) != Ꝋ ? true
					: isNdx(P) ? this.hasArrayIndex(O, +P)
					: isIRI(P) ? this.predicateMap.has(P)
					: Reflect.has(O, P) }
			hasArrayIndex ( O, ndx ) {
				const $ꝕ = this.getPrototypeOf(O)
				if ( $ꝕ == ꞰRC[Ꝕ] || $ꝕ instanceof ꞰRC ) {
					if ( this.resourceMap == Ꝋ ) return Reflect.has(O, S͢(ndx))
					else {
						let ꝟr = __RDF·nil.equals(O) ? Ꝋ : this.getTarget(O)
						for ( let ꝟndx = 0
							; ꝟndx < ndx && ꝟr != Ꝋ
							; ꝟr = ꝟr.any(__RDF·rest, $ => __RDF·nil.equals($)) ) ++ꝟndx
						return ꝟr != Ꝋ } }
				else return this.has(O, S͢(__PN `rdf:_${ ndx + 1 }`)) }
			ownKeys ( O ) {
				if ( !O͢.isExtensible(O) ) return Reflect.ownKeys(O)
				else {
					const
						$ɫ = this.get(O, Ɫ, O)
						, indices = new Array
					for ( let ꝟndx = 0 ; ꝟndx < $ɫ ; ++ꝟndx )
						if ( this.hasArrayIndex(O, ꝟndx) ) indices.push(ꝟndx)
					return indices.concat(
						Reflect.ownKeys(O),
						A͢(this.predicateMap.keys()).map($ => S͢($))) } }
			preventExtensions ( O ) {
				if ( O͢.isExtensible(O) ) {
					const $ꝕ = this.getPrototypeOf(O)
					Object.setPrototypeOf(O, $ꝕ)
					if ( $ꝕ == ꞰRC[Ꝕ] || $ꝕ instanceof ꞰRC )
						$℘(O, Ɫ,
							{ [Ꝯ]: 0
							, [ꝴ]: 0
							, get: ꞰRPX[Ꝕ].getCollectionLength.bind(this, O)
							, set: ꞰRPX[Ꝕ].setCollectionLength.bind(this, O) })
					for ( let ꝟndx = 0 ; ꝟndx < O[Ɫ] ; ++ꝟndx ) {
						if ( this.hasArrayIndex(O, ꝟndx) )
							$℘(O, ꝟndx,
								{ [Ꝯ]: 0
								, [ꝴ]: 1
								, get: ꞰRPX[Ꝕ].getArrayIndex.bind(this, O, ꝟndx)
								, set: Ꝋ }) }
					for ( const p of Map[Ꝕ].keys.call(this.predicateMap) ) {
						$℘(O, p,
							{ [Ꝯ]: 0
							, [ꝴ]: 1
							, get: ꞰRPX[Ꝕ].getPredicate.bind(this, O, p)
							, set: Ꝋ }) }
					O͢.preventExtensions(this.predicateMap) }
				return Reflect.preventExtensions(O) }
			set ( O, P, V, Receiver ) {
				return !O͢.isExtensible(O) || P != Ɫ && dſ𝒫(O, P) != Ꝋ
					? Reflect.set(O, P, V, Receiver)
					: P == Ɫ ? this.setLength(O, V)
					:  isNdx(P) ? this.setArrayIndex(O, +P, V)
					: isIRI(P) ? this.setPredicate(O, P, V)
					: Reflect.set(O, P, V, Receiver) }
			setArrayIndex ( O, ndx, V ) { return this.defineProperty(O, S͢(ndx), { [Ꝟ]: V }) }
			setCollectionLength ( O, V ) {
				const $ꝕ = this.getPrototypeOf(O)
				if ( $ꝕ == ꞰRC[Ꝕ] || $ꝕ instanceof ꞰRC ) {
					const rM = this.resourceMap
					if ( rM == Ꝋ ) return Reflect.set(O, Ɫ, V, O)
					else if ( !isNdx(V) ) return false
					else {
						const $ɫ = this.get(O, Ɫ, O)
						let ꝟɫ = V >>> 0
						if ( ꝟɫ > $ɫ ) return this.defineProperty(O, ꝟɫ - 1, Ꝋ)
						else if ( ꝟɫ < $ɫ ) {
							const rs = new Array ($ɫ - ꝟɫ)
							for ( let ꝟr = this.get(O, ꝟɫ - 1, O)
								; ꝟr != Ꝋ
								; ꝟr = ꝟr.any(__RDF·rest, $ => !__RDF·nil.equals($)) ) rs.push(ꝟr)
							for ( let ꝟr of rs.reverse() ) {
								if ( !Reflect.defineProperty(ꝟr, S͢(__RDF·rest), { [Ꝟ]: __RDF·nil }) ) return false } }
						return true } } }
			setLength ( O, V ) {
				const $ꝕ = this.getPrototypeOf(O)
				return $ꝕ == ꞰRC[Ꝕ] || $ꝕ instanceof ꞰRC
					? this.setCollectionLength(O, V)
					: this.defineProperty(O, Ɫ, { [Ꝟ]: V }) }
			setPredicate ( O, P, V ) {
				if ( this.resourceMap != Ꝋ )
					if ( V instanceof ꞰR ) this.getTarget(O).parent.addAll(V)
					else if ( hasꞆ.call(V, ꞰBN) && A͢.ʔ(V) )
						for ( const $3 of nº1MethodOf.call(V, `triples`, V, ꞰBNC[Ꝕ])() ) {
							this.getTarget(O).parent.add($3) }
				return !!(this.predicateMap.add(P, V)) }
			setPrototypeOf ( O, V ) {
				return V === this.getPrototypeOf(O) ? true
					: V === ꞰR[Ꝕ] ? Reflect.setPrototypeOf(O, V)
					: V instanceof ꞰR ? false
					: Reflect.setPrototypeOf(O, V) } }
		, ꞰꝾPX = class GraphProxy extends null {
			constructor ( resourceMap ) {
				return O͢.create(ꞰꝾPX[Ꝕ], { resourceMap: { [Ꝟ]: resourceMap } }) }
			defineProperty ( O, P, Desc ) {
				if ( !O͢.isExtensible(O) || dſ𝒫(O, P) != Ꝋ || typeof P != `string` )
					return Reflect.defineProperty(O, P, Desc)
				else {
					const $sbj = nSbj(P)
					if ( $sbj == Ꝋ ) return Reflect.defineProperty(O, P, Desc)
					else if ( Desc[Ꝯ] == 0 || Desc[ꝴ] == 0 || Desc[ꝶ] == 0 || `get` in Desc || `set` in Desc )
						return false  //  keep configurable, enumerable, & writable
					else {
						const
							V = Desc[Ꝟ]
							, sbj = S͢($sbj)
						this.deleteProperty(O, sbj)
						if ( V instanceof Map )
							for ( const entry of V ) {
								const p = entry[0]
								if ( isIRI(p) ) O[ʃAd3](
									{ object: entry[1]
									, predicate: entry[0]
									, subject: $sbj }) }
						else if ( typeof V == `object` )
							for ( const p in V ) {
								if ( isIRI(p) ) O[ʃAd3](
									{ object: V[p]
									, predicate: p
									, subject: $sbj }) }
						else if ( V != Ꝋ ) O[ʃAd3](
							{ object: V
							, predicate: __RDF·value
							, subject: $sbj })
						return true } } }
			deleteProperty ( O, P ) {
				if ( !O͢.isExtensible(O) || dſ𝒫(O, P) != Ꝋ || typeof P != `string` )
					return Reflect.delete(O, P)
				else {
					const
						$sbj = nSbj(P)
						, existing = this.resourceMap.get(S͢($sbj))
					return $sbj == Ꝋ ? Reflect.delete(O, P)
						: existing == Ꝋ ? true
						: existing.clear() || true } }
			get ( O, P, Receiver ) {
				if ( !O͢.isExtensible(O) || dſ𝒫(O, P) != Ꝋ || typeof P != `string` )
					return Reflect.get(O, P, Receiver)
				else {
					const $$sbj = nSbj(P)
					if ( $$sbj == Ꝋ ) return Reflect.get(O, P, Receiver)
					else {
						const
							$sbj = S͢($$sbj)
							, sbj = this.resourceMap.get($sbj)
						if ( sbj == Ꝋ ) {
							const _sbj = new ꞰⱢR (O, P, this.resourceMap)
							this.resourceMap.set($sbj, _sbj)
							return _sbj }
						else return sbj } } }
			getOwnPropertyDescriptor ( O, P ) {
				if ( !O͢.isExtensible(O) || dſ𝒫(O, P) != Ꝋ || typeof P != `string` )
					return Reflect.getOwnPropertyDescriptor(O, P)
				else {
					const $sbj = nSbj(P)
					if ( $sbj == Ꝋ ) return Reflect.getOwnPropertyDescriptor(O, P)
					else {
						const
							sbj = S͢($sbj)
							, _sbj = this.resourceMap.get(sbj)
						return _sbj == Ꝋ || _sbj.empty ? Ꝋ : { [Ꝯ]: 1, [ꝴ]: 1, get:
							ꞰPM[Ꝕ].get.bind(this.resourceMap, sbj) } } } }
			has ( O, P ) {
				if ( !O͢.isExtensible(O) || typeof P != `string` ) return Reflect.has(O, P)
				else if ( dſ𝒫(O, P) != Ꝋ ) return true
				else {
					const
						sbj = nSbj(P)
						, _sbj = sbj == Ꝋ ? Ꝋ : this.resourceMap.get(S͢(sbj))
					return sbj == Ꝋ ? Reflect.has(O, P) : !(_sbj == Ꝋ || _sbj.empty) } }
			ownKeys ( O ) {
				if ( !O͢.isExtensible(O) ) return Reflect.ownKeys(O)
				else {
					const ꝵ = [ ]
					for ( const [ sbj, rsrc ] of this.resourceMap.entries() ) {
						if ( !rsrc.empty ) ꝵ.push(sbj) }
					return Reflect.ownKeys(O).concat(ꝵ) } }
			preventExtensions ( O ) {
				if ( O͢.isExtensible(O) ) {
					$℘s(O,
						{ [ʃAd3]: { [Ꝯ]: 0, [Ꝟ]: Ꝋ }
						, [ʃAdActn]: { [Ꝯ]: 0, [Ꝟ]: Ꝋ }
						, [ʃRm3Match]: { [Ꝯ]: 0, [Ꝟ]: Ꝋ } })
					for ( const [ sbj, rsrc ] of this.resourceMap.entries() ) {
						O͢.preventExtensions(rsrc)
						if ( !rsrc.empty ) $℘(O, sbj, { [Ꝯ]: 0, [ꝴ]: 1, get:
							Map[Ꝕ].get.bind(this.resourceMap, sbj) }) } }
				return Reflect.preventExtensions(O) }
			set ( O, P, V, Receiver ) {
				return !O͢.isExtensible(O) || dſ𝒫(O, P) != Ꝋ || typeof P != `string`
					? Reflect.set(O, P, V, Receiver)
					: nSbj(P) != Ꝋ ? this.defineProperty(O, P, { [Ꝟ]: V })
					: Reflect.set(O, P, V, Receiver) } }
		, ꞰT = class Term {  //  RDF/JS Term
			constructor ( termType, value ) {
				const
					tꞆ = termType == Ꝋ && new.target != Ꝋ ? new.target.name : termType
					, _ðˢ = $℘s(this,
						{ termType: { [Ꝟ]: tꞆ == Ꝋ ? `` : S͢(tꞆ) }
						, [Ꝟ]: { [Ꝯ]: 1, [Ꝟ]: value == Ꝋ ? `` : S͢(value) } })
				return new.target === ꞰT ? O͢.freeze(_ðˢ) : _ðˢ }
			static [Ʃ͢.hasInstance] ( instance ) {
				return typeof this.termType == `string`
					&& typeof this.value == `string` }
			static [Ʃ͢.toPrimitive] ( hint ) { return this.name }
			get [Ʃ͢.toStringTag] ( ) { return S͢(this.termType) }
			[Ʃ͢.toPrimitive] ( hint ) { return S͢(this[Ꝟ]) }
			clone ( ) {
				if ( this == Ꝋ ) return Ꝋ
				else {
					const
						$ñꝞ𝒫 = dſ𝒫(this, Ꝟ)
						, ñꝞ = this[Ꝟ]
					return [ ꞰBN, ꞰL, ꞰÑN ].some(hasꞆ.bind(this))
						|| this[𝒫](`interfaceName`)
						? ꞰRDFN[Ꝕ].clone.call(this)
						: ꝯﬆʞ(ꞰT,
							[ S͢(this.termType)
							, ñꝞ == Ꝋ ? `` : S͢(ñꝞ) ], ꝯﬆʞr.call(this, ꞰT)) } }
			equals ( other ) {
				return other == Ꝋ ? false
					: [ ꞰBN, ꞰL, ꞰÑN ].some(hasꞆ.bind(this))
					? hasꞆ.call(other, get𝒫.call(this, `termType`, ꞰRDFN))
					: other.termType == S͢(this.termType) }
			toString ( ) { return S͢(this[Ꝟ]) } }
		, ꞰRDFN = class RDFNode extends ꞰT {  //  RDF Interfaces RDFNode
			constructor ( interfaceName, nominalValue ) {
				const _ðˢ = $℘s(ꝯﬆʞ(ꞰT, [ interfaceName ], new.target),
					{ interfaceName: { get: dſ𝒫(ꞰRDFN[Ꝕ], `interfaceName`).get }
					, nominalValue: { [Ꝯ]: 1, [Ꝟ]: nominalValue ?? null }
					, text: { get: dſ𝒫(ꞰRDFN[Ꝕ], `text`).get }
					, [Ꝟ]: { [Ꝯ]: 0, get: dſ𝒫(ꞰRDFN[Ꝕ], Ꝟ).get } })
				return new.target === ꞰRDFN ? O͢.freeze(_ðˢ) : _ðˢ }
			static [Ʃ͢.hasInstance] ( instance ) {
				return [ ꞰBN, ꞰL, ꞰÑN ].some(hasꞆ.bind(instance)) }
			get [Ʃ͢.toStringTag] ( ) { return S͢(get𝒫.call(this, `interfaceName`, ꞰRDFN)) }
			get interfaceName ( ) {
				const tꞆ = nº1𝒫Of.call(this, `interfaceName`, `termType`)
				return tꞆ == Ꝋ ? `` : S͢(tꞆ) }
			get nominalValue ( ) {
				const ñꝞ = nº1𝒫Of.call(this, `nominalValue`, Ꝟ)
				return ñꝞ == Ꝋ ? `` : S͢(ñꝞ) }
			get termType ( ) {
				const tꞆ = nº1𝒫Of.call(this, `termType`, `interfaceName`)
				return tꞆ == Ꝋ ? `` : S͢(tꞆ) }
			get text ( ) {
				return hasꞆ.call(this, ꞰL) ? dſ𝒫(ꞰL[Ꝕ], `text`).get.call(this)
					: ꞰRDFN[Ꝕ].toString.call(this) }
			get value ( ) {
				const ñꝞ = nº1𝒫Of.call(this, Ꝟ, `nominalValue`)
				return ñꝞ == Ꝋ ? `` : S͢(ñꝞ) }
			[Ʃ͢.toPrimitive] ( hint ) { return ꞰRDFN[Ꝕ].toString.call(this) }
			clone ( ) {
				if ( this == Ꝋ ) return Ꝋ
				else if ( hasꞆ.call(this, ꞰL) ) return ꞰL[Ꝕ].clone.call(this)
				else if ( hasꞆ.call(this, ꞰÑN) ) return ꞰÑN[Ꝕ].clone.call(this)
				else if ( hasꞆ.call(this, ꞰBN) )
					return A͢.ʔ(this) ? ꞰBNC[Ꝕ].clone.call(this) : ꞰBN[Ꝕ].clone.call(this)
				else {
					const
						$ñꝞ𝒫 = dſ𝒫(this, `nominalValue`)
						, tꞆ = get𝒫.call(this, `interfaceName`, ꞰRDFN)
						, ñꝞ = get𝒫.call(this, `nominalValue`, ꞰRDFN)
						, { [Ꝯ]: isꝮ, [ꝴ]: isꝴ, [ꝶ]: isꝶ } = $ñꝞ𝒫 == Ꝋ ? { } : $ñꝞ𝒫
					return ꝯﬆʞ(ꞰRDFN, [ tꞆ, ñꝞ ], ꝯﬆʞr.call(this, ꞰRDFN)) } }
			equals ( toCompare ) {
				return toCompare != Ꝋ && typeof toCompare == `object`
					? get𝒫.call(this, `interfaceName`, ꞰRDFN)
					=== get𝒫.call(toCompare, `interfaceName`, ꞰRDFN)
					&& get𝒫.call(this, `nominalValue`, ꞰRDFN)
					=== get𝒫.call(toCompare, `nominalValue`, ꞰRDFN)
					&& (!hasꞆ.call(this, ꞰL) || ꞰL[Ꝕ].equals.call(this, toCompare))
					: toCompare === ꞰRDFN[Ꝕ].valueOf.call(this) }
			toHTML ( document ) {
				return hasꞆ.call(this, ꞰÑN) ? ꞰÑN[Ꝕ].toHTML.call(this, document)
					: hasꞆ.call(this, ꞰL) ? ꞰL[Ꝕ].toHTML.call(this, document)
					: hasꞆ.call(this, ꞰBN) ?
						 A͢.ʔ(this) ? ꞰBNC[Ꝕ].toHTML.call(this, document)
						 : ꞰBN[Ꝕ].toHTML.call(this, document)
					: null }
			toNT ( ) {
				return hasꞆ.call(this, ꞰÑN) ? ꞰÑN[Ꝕ].toNT.call(this)
					: hasꞆ.call(this, ꞰL) ? ꞰL[Ꝕ].toNT.call(this)
					: hasꞆ.call(this, ꞰBN) ? ꞰBN[Ꝕ].toNT.call(this)
					: null }
			toString ( ) {
				return hasꞆ.call(this, ꞰBN) ? `_:${ get𝒫.call(this, `nominalValue`, ꞰRDFN) }`
					: get𝒫.call(this, `nominalValue`, ꞰRDFN) }
			toTurtle ( ) {
				return hasꞆ.call(this, ꞰÑN) ? ꞰÑN[Ꝕ].toTurtle.call(this)
					: hasꞆ.call(this, ꞰL) ? ꞰL[Ꝕ].toTurtle.call(this)
					: hasꞆ.call(this, ꞰBN) ? ꞰBN[Ꝕ].toTurtle.call(this)
					: null }
			valueOf ( ) {
				return hasꞆ.call(this, ꞰL) ? ꞰL[Ꝕ].valueOf.call(this)
					: get𝒫.call(this, `nominalValue`, ꞰRDFN) } }
		, ꞰÑN = class NamedNode extends ꞰRDFN {  //  RDF/JS & RDF Interfaces NamedNode
			constructor ( value ) {
				const
					$ℹ = hasꞆ.call(value, ꞰÑN) ? get𝒫.call(value, `nominalValue`, ꞰRDFN) : S͢(value)
					, match = isIRI.rx.exec($ℹ)
				if ( match == Ꝋ ) throw ꞆƐ͢(l10n `الرشآء: NamedNode invalid IRI. `)
				else {
					const
							[ IRI
							, scheme
							, ihier·part
							, iauthority
							, iuserinfo
							, ihost
							, port
							, ipath·abempty
							, ipath·absolute
							, ipath·rootless
							, ipath·empty
							, iquery
							, ifragment ] = match
						, _ðˢ = $℘s(ꝯﬆʞ(ꞰRDFN, [ ꞰÑN ], new.target),
							{ [Ʃ͢.iterator]: { [Ꝟ]: A͢[Ꝕ][Ʃ͢.iterator].bind(
								ihier·part.substring(ihier·part.search(/[^\x2F]/u),
									ihier·part.search(/[^\x2F]\x2F*$/u) + 1).split(`/`)) }
							, absolute: { [Ꝟ]: `${ scheme }:${ ihier·part }${ iquery == Ꝋ ? ``
								: `?${ iquery }` }` }
							, authority: { [Ꝟ]: iauthority }
							, fragment: { [Ꝟ]: ifragment }
							, hierarchicalPart: { [Ꝟ]: ihier·part }
							, host: { [Ꝟ]: ihost }
							, iri: { [Ꝟ]: IRI }
							, nominalValue: { [Ꝯ]: 0, [Ꝟ]: $ℹ }
							, path: { [Ꝟ]: ipath·abempty ?? ipath·absolute ?? ipath·rootless
								?? ipath·empty }
							, parts: { get: dſ𝒫(ꞰÑN[Ꝕ], `parts`).get }
							, port: { [Ꝟ]: port }
							, query: { [Ꝟ]: iquery }
							, scheme: { [Ꝟ]: scheme }
							, userinfo: { [Ꝟ]: iuserinfo } })
					return new.target === ꞰÑN ? O͢.freeze(_ðˢ) : _ðˢ } }
			static [Ʃ͢.hasInstance] ( instance ) { return hasꞆ.call(instance, ꞰÑN) }
			get absolute ( ) { return new ꞰÑN (this).absolute }
			get authority ( ) { return new ꞰÑN (this).authority }
			get fragment ( ) { return new ꞰÑN (this).fragment }
			get hierarchicalPart ( ) { return new ꞰÑN (this).hierarchicalPart }
			get host ( ) { return new ꞰÑN (this).host }
			get iri ( ) { return new ꞰÑN (this).iri }
			get path ( ) { return new ꞰÑN (this).path }
			get parts ( ) { return A͢(nº1MethodOf.call(this, Ʃ͢.iterator, this, ꞰÑN[Ꝕ])) }
			get port ( ) { return new ꞰÑN (this).port }
			get query ( ) { return new ꞰÑN (this).query }
			get scheme ( ) { return new ꞰÑN (this).scheme }
			get userinfo ( ) { return new ꞰÑN (this).userinfo }
			*[Ʃ͢.iterator] ( ) { yield *new ꞰÑN (this)[Ʃ͢.iterator]() }
			clone ( ) {
				return this == Ꝋ ? Ꝋ : ꝯﬆʞ(ꞰÑN,
					[ get𝒫.call(this, `nominalValue`, ꞰRDFN) ],
					ꝯﬆʞr.call(this, ꞰÑN)) }
			equals ( other ) {
				return ꞰT[Ꝕ].equals.call(this, other)
					&& get𝒫.call(this, Ꝟ, ꞰRDFN)
					=== get𝒫.call(other, Ꝟ, ꞰRDFN) }
			toHTML ( document ) {
				const ñꝞ = get𝒫.call(this, `nominalValue`, ꞰRDFN)
				return htm4ÐˢDoc.bind(
					document == Ꝋ ? الرشآء.defaultDocument : document)`${
					{ localName: `a`
					, attributes: { href: ñꝞ }
					, content: ñꝞ } }` }
			toNT ( ) {
				return `<${ get𝒫.call(this, `nominalValue`, ꞰRDFN).replace(
					/[\x00-\x20\x22\x3C\x3E\x5C\x5E\x60\x7B-\x7D]/gu, $ => {
						const u = $.codePointAt(0)
						return `\\u${ u.toString(16).toUpperCase().padStart(4, `0`) }` }) }>` }
			toTurtle ( ) { return ꞰÑN[Ꝕ].toNT.call(this) } }
		, ꞰBN = class BlankNode extends ꞰRDFN {  //  RDF/JS & RDF Interfaces BlankNode
			constructor ( value ) {
				const _ðˢ = $℘(ꝯﬆʞ(ꞰRDFN, [ ꞰBN ], new.target), `nominalValue`, { [Ꝯ]: 0, [Ꝟ]:
					S͢(hasꞆ.call(value, ꞰBN) ? value.nominalValue ?? value[Ꝟ] : value) })
				return new.target === ꞰBN ? O͢.freeze(_ðˢ) : _ðˢ }
			static [Ʃ͢.hasInstance] ( instance ) { return hasꞆ.call(instance, ꞰBN) }
			clone ( ) {
				return this == Ꝋ ? Ꝋ : ꝯﬆʞ(ꞰBN,
					[ get𝒫.call(this, `nominalValue`, ꞰRDFN) ],
					ꝯﬆʞr.call(this, ꞰBN)) }
			equals ( other ) {
				return ꞰT[Ꝕ].equals.call(this, other)
					&& get𝒫.call(this, `value`, ꞰRDFN)
					=== get𝒫.call(other, `value`, ꞰRDFN) }
			toHTML ( document ) {
				const bn = `_:${ get𝒫.call(this, `nominalValue`, ꞰRDFN) }`
				return htm4ÐˢDoc.bind(
					document == Ꝋ ? الرشآء.defaultDocument : document) `${
					{ localName: `span`
					, attributes: { resource: bn }
					, content: bn } }` }
			toNT ( ) {
				const ñꝞ = get𝒫.call(this, `nominalValue`, ꞰRDFN)
				return `_:${ A͢(ñꝞ).reduce(( ꝵ, $, ndx, $s ) => {
					ꝵ.push(RX͢(ndx == 0
						? $ꝛ `${ NT·PN_CHARS_U }|[0-9]`
						: ndx == $s.length - 1
						? $ꝛ `${ NT·PN_CHARS }`
						: $ꝛ `${ NT·PN_CHARS }|\.`, `u`).test($) ? $ : `_`)
					return ꝵ }, [ ]).join(``) }` }
			toTurtle ( ) {
				const ñꝞ = get𝒫.call(this, `nominalValue`, ꞰRDFN)
				return `_:${ A͢(ñꝞ).reduce(( ꝵ, $, ndx, $s ) => {
					ꝵ.push(RX͢(ndx == 0
						? $ꝛ `${ PN_CHARS_U }|[0-9]`
						: ndx == $s.length - 1
						? $ꝛ `${ PN_CHARS }`
						: $ꝛ `${ PN_CHARS }|\.`, `u`).test($) ? $ : `_`)
					return ꝵ }, [ ]).join(``) }` } }
		, ꞰBNC = class BlankNode extends ꞰBN {  //  Anonymous collection
			constructor ( bid, iterator ) {
				const
					$iterator = hasꞆ.call(bid, ꞰBN) ? iterator ?? bid : iterator
					, ðˢ = ꝯﬆʞ(Array, $iterator == Ꝋ ? [ Ꝋ ] : A͢($iterator, nObj), new.target)
				if ( ðˢ[Ɫ] < 1 ) return __RDF·nil
				else {
					const _ðˢ = $℘s(
						Reflect.ownKeys(ðˢ).reduce(( ꝵ, $ ) => $℘(ꝵ, $, { [Ꝯ]: 0, [ꝶ]: 0 }), ðˢ),
						{ first: { get: dſ𝒫(ꞰBNC[Ꝕ], `first`).get }
						, graph: { get: dſ𝒫(ꞰBNC[Ꝕ], `graph`).get }
						, interfaceName: { [Ꝟ]: `BlankNode` }
						, nominalValue: { [Ꝟ]:
							S͢(hasꞆ.call(bid, ꞰBN) ? bid.nominalValue ?? bid[Ꝟ] : bid) }
						, rest: { get: dſ𝒫(ꞰBNC[Ꝕ], `rest`).get }
						, termType: { [Ꝟ]: `BlankNode` }
						, text: { get: dſ𝒫(ꞰRDFN[Ꝕ], `text`).get }
						, [Ꝟ]: { get: dſ𝒫(ꞰRDFN[Ꝕ], Ꝟ).get } })
					return new.target === ꞰBN ? O͢.freeze(_ðˢ) : _ðˢ } }
			static [Ʃ͢.hasInstance] ( instance ) {
				return hasꞆ.call(instance, ꞰBN) && A͢.ʔ(instance) }
			get first ( ) { return nObj(this?.[0]) }
			get graph ( ) {
				const ꝿ = new ꞰꝾ
				for ( const $3 of nº1MethodOf.call(this, `triples`, this, ꞰBNC[Ꝕ])() ) {
					ꝿ.add($3) }
				return ꝿ }
			get rest ( ) {
				const ɫ = this?.[Ɫ]
				if ( ɫ == Ꝋ || ɫ == 1/0 || A͢.ɫ(this) < 1 ) return Ꝋ
				const $ꝯﬆʞr = ꝯﬆʞr.call(this, ꞰBNC)
				return ꝯﬆʞ(ꞰBNC,
					[ cdr(get𝒫.call(this, `nominalValue`, ꞰRDFN))
					, A͢[Ꝕ].slice.call(this, 1) ],
					$ꝯﬆʞr instanceof A͢.M̃ ? ꞰBNC : $ꝯﬆʞr) }
			*[Ʃ͢.iterator] ( ) { for ( const $Ꝟ of A͢[Ꝕ][Ʃ͢.iterator].call(this) ) { yield nObj($Ꝟ) } }
			clone ( ) {
				if ( this == Ꝋ ) return Ꝋ
				else {
					const $ꝯﬆʞr = ꝯﬆʞr.call(this, ꞰBNC)
					return ꝯﬆʞ(ꞰBNC,
						[ get𝒫.call(this, `nominalValue`, ꞰRDFN), this ],
						$ꝯﬆʞr instanceof A͢.M̃ ? ꞰBNC : $ꝯﬆʞr) } }
			*entries ( ) {
				for ( const [ ndx, $Ꝟ ] of A͢[Ꝕ].values.call(this) ) { yield [ ndx, nObj($Ꝟ) ] } }
			equals ( other ) { return ꞰBN[Ꝕ].equals.call(this, other) }
			*keys ( ) { yield *A͢[Ꝕ].keys.call(this) }
			toHTML ( document ) {
				const ɫ = this?.[Ɫ]
				if ( ɫ == Ꝋ || ɫ == 1/0 || A͢.ɫ(this) < 1 )
					return (__RDF·nil).toHTML(document)
				else {
					const
						$doc = document == Ꝋ ? الرشآء.defaultDocument : document
						, $nº1 = get𝒫.call(this, `first`, ꞰBNC)
						, $rest = get𝒫.call(this, `rest`, ꞰBNC)
						, lʔ = hasꞆ.call($nº1, ꞰL)
						, _ɫᵹ = lʔ ? get𝒫.call($nº1, `language`, ꞰL) : Ꝋ
						, __ꝺꞆ = lʔ && (typeof _ɫᵹ != `string` || _ɫᵹ == ``)
							? S͢(get𝒫.call($nº1, `datatype`, ꞰL))
							: Ꝋ
					return htm4ÐˢDoc.bind($doc) `${
						{ localName: `ol`
						, attributes: { resource: `_:${ get𝒫.call(this, `nominalValue`, ꞰRDFN) }` }
						, content:
							[
								$nº1 == Ꝋ ? Ꝋ :
									{ localName: `li`
									, attributes:
										{ [lʔ ? `property` : `rel`]: S͢(__RDF·first)
										, lang: typeof _ɫᵹ == `string` ? _ɫᵹ : Ꝋ
										, datatype: __ꝺꞆ != Ꝋ ?
											[ S͢(__RDF·HTML)
											, S͢(__RDF·XMLLiteral) ].indexOf(__ꝺꞆ) >= 0
											? S͢(__RDF·XMLLiteral) : __ꝺꞆ : Ꝋ }
									, content: defaultMethodOf(`toHTML`, $nº1)($doc) }
							,
								$rest == Ꝋ ? Ꝋ :
									{ localName: `li`
									, attributes: { rel: S͢(__RDF·rest) }
									, content: defaultMethodOf(`toHTML`, $rest)($doc) } ] } }` } }
			toNT ( ) { return ꞰBN[Ꝕ].toNT.call(this) }
			toString ( ) { return ꞰBN[Ꝕ].toString.call(this) }
			toTurtle ( ) { return ꞰBN[Ꝕ].toTurtle.call(this) }
			*triples ( ) {
				const
					nº1 = get𝒫.call(this, `first`, ꞰBNC)
					, rest = get𝒫.call(this, `rest`, ꞰBNC)
					, sbj = nSbj(this)
				if ( nº1 != Ꝋ ) {
					yield new Ʞ3 (sbj, __RDF·first,
						hasꞆ.call(nº1, ꞰBN) && A͢.ʔ(nº1) ? new ꞰBN (nº1) : nº1)
					if ( hasꞆ.call(nº1, ꞰBN) && A͢.ʔ(nº1) )
						yield *ꞰBNC[Ꝕ].triples.call(nº1) }
				if ( rest != Ꝋ ) {
					yield new Ʞ3 (sbj, __RDF·rest,
						hasꞆ.call(rest, ꞰBN) && A͢.ʔ(rest) ? new ꞰBN (rest) : rest)
					if ( hasꞆ.call(rest, ꞰBN) && A͢.ʔ(rest) )
						yield *ꞰBNC[Ꝕ].triples.call(rest) } }
			valueOf ( ) {
				const $Ꝟs = A͢[Ꝕ].map.call(this, $ => {
					const $Ꝟ = nObj($)
					return defaultMethodOf(`valueOf`, $Ꝟ)($Ꝟ) })
				return $℘s($Ꝟs,
					{ interfaceName: { [Ꝟ]: get𝒫.call(this, `interfaceName`, ꞰRDFN) }
					, nominalValue: { [Ꝟ]: get𝒫.call(this, `nominalValue`, ꞰRDFN) }
					, toString: { [Ꝟ]: ꞰBN[Ꝕ].toString.bind($Ꝟs) }
					, valueOf: { [Ꝟ]: ꞰBN[Ꝕ].valueOf.bind($Ꝟs) } }) }
			*values ( ) { for ( const $Ꝟ of A͢[Ꝕ].values.call(this) ) { yield nObj($Ꝟ) } } }
		, ꞰL = class Literal extends ꞰRDFN {  //  RDF/JS & RDF Interfaces Literal
			constructor ( value, language, datatype ) {
				const
					$ñꝞ = value.nominalValue
					, $ꝺꞆ = value.datatype
					, $ɫᵹ = value.language
					, ñꝞ = $ñꝞ == Ꝋ ? value[Ꝟ] : $ñꝞ
					, ꝺꞆℹ = new ꞰÑN (datatype == Ꝋ
						? $ꝺꞆ == Ꝋ ? __XSD·string : $ꝺꞆ
						: datatype)
					, ɫᵹ = S͢(language == Ꝋ
						? $ɫᵹ == Ꝋ ? `` : $ɫᵹ
						: language).toLowerCase()
					, _ðˢ = $℘s(ꝯﬆʞ(ꞰRDFN, [ ꞰL ], new.target),
						{ datatype: { [Ꝟ]: ɫᵹ ? __RDF·langString : ꝺꞆℹ }
						, language: { [Ꝟ]: ɫᵹ }
						, nominalValue: { [Ꝯ]: 0, [Ꝟ]: S͢(ñꝞ == Ꝋ ? value : ñꝞ) } })
				return new.target === ꞰL ? O͢.freeze(_ðˢ) : _ðˢ }
			static [Ʃ͢.hasInstance] ( instance ) { return hasꞆ.call(instance, ꞰL) }
			get datatype ( ) {
				const
					$ꝺꞆ𝒫 = dſ𝒫(this, `datatype`)
					, ꝺꞆ = $ꝺꞆ𝒫 == Ꝋ ? __XSD·string : $ꝺꞆ𝒫[Ꝟ]
					, ɫᵹ = get𝒫.call(this, `language`, ꞰL)
				return typeof ɫᵹ == `string` && ɫᵹ != `` ? __RDF·langString
					: ꝺꞆ == Ꝋ ? __XSD·string : new ꞰÑN (ꝺꞆ) }
			get language ( ) {
				const $ɫᵹ𝒫 = dſ𝒫(this, `language`)
					, ɫᵹ = $ɫᵹ𝒫 == Ꝋ ? `` : $ɫᵹ𝒫[Ꝟ]
				return typeof ɫᵹ == `string` ? ɫᵹ : `` }
			get text ( ) { return ꞰL[Ꝕ][Ʃ͢.toPrimitive].call(this, `string`) }
			[Ʃ͢.toPrimitive] ( hint ) {  //  get native primitive type
				const
					ñꝞ = get𝒫.call(this, `nominalValue`, ꞰRDFN)
					, ꝺꞆ = S͢(get𝒫.call(this, `datatype`, ꞰL))
					, usedHint = hint == `number` || hint == `string` ? hint : `default`
				if ( ꝺꞆ == __RDF·HTML || ꝺꞆ == __RDF·XMLLiteral ) {
					const $Ꝟ = ꞰL[Ꝕ].valueOf.call(this)
					if ( $Ꝟ != Ꝋ ) {
						const txt = $Ꝟ.textContent
						return txt == Ꝋ ? ñꝞ : txt } }
				else if ( usedHint == `number` || usedHint == `default` )
					if ( ꝺꞆ == __XSD·dateTime
						|| ꝺꞆ == __XSD·dateTimeStamp
						|| ꝺꞆ == __XSD·date
						|| ꝺꞆ == __XSD·gYear
						|| ꝺꞆ == __XSD·gYearMonth ) {
							const
								[ $sign, $unsigned ] = ñꝞ[0] == `-` ? [ `-`, ñꝞ.substring(1) ]
									: [ `+`, ñꝞ ]
								, [ year, month, day ] = $unsigned.split(/[Z+-]/iu, 3)
								, timestamp = $unsigned.match(
									/Z|[+-](?:(?:0[0-9]|1[0-3]):[0-5][0-9]|14:00)$/giu)?.[0] ?? ``
								, _year = $sign == `-` || year.length != 4 ? `${ $sign }${ year.padStart(6, `0`) }` : year
								, _unsignedyear = year >>> 0
								, _month = month >>> 0
							return ꝺꞆ == __XSD·dateTime || ꝺꞆ == __XSD·dateTimeStamp
								? Date.parse(
									`${ _year }${ $unsigned.substring(year.length) }`)
								: ꝺꞆ == __XSD·date
								? Date.parse(
									`${ _year }-${ month }-${ day }T00:00${ timestamp }`)
								: ꝺꞆ == __XSD·gYear
								? Date.parse(`${ _year }-12-31T00:00${ timestamp }`)
								: Date.parse(`${ _year }-${ month }-${
									S͢(_month == 2
										? _unsignedyear % 400 == 0
											|| _unsignedyear % 4 == 0
											&& _unsignedyear % 100 != 0 ? 29 : 28
										: _month == 4 || _month == 6 || _month == 9
											|| _month == 11 ? 30
										: 31).padStart(2, `0`) }T00:00${ timestamp }`) }
					else if ( ꝺꞆ == __XSD·gMonth || ꝺꞆ == __XSD·gMonthDay ) {
							const
								$monthday = ñꝞ.substring(2)
								, [ month, day ] = $monthday.split(/[Z+-]/iu, 2)
								, timestamp = $monthday.match(
									/Z|[+-](?:(?:0[0-9]|1[0-3]):[0-5][0-9]|14:00)$/giu)?.[0] ?? ``
								, _month = month >>> 0
							return ꝺꞆ == __XSD·gMonth
								? Date.parse(`1972-${ month }-${
									S͢(_month == 2 ? 29
										: _month == 4 || _month == 6 || _month == 9
											|| _month == 11 ? 30
										: 31).padStart(2, `0`) }T00:00${ timestamp }`)
								: Date.parse(
									`1972-${ month }-${ day }T00:00${ timestamp }`) }
					else if ( ꝺꞆ == __XSD·gDay ) {
							const
								$day = ñꝞ.substring(3)
								, [ day ] = $day.split(/[Z+-]/iu, 1)
								, timestamp = $day.match(
									/Z|[+-](?:(?:0[0-9]|1[0-3]):[0-5][0-9]|14:00)$/giu)?.[0] ?? ``
							return Date.parse(`1972-12-${ day }T00:00${ timestamp }`) }
					else return ꝺꞆ == __XSD·time ? Date.parse(`1972-12-31T${ ñꝞ }`)
						: ꝺꞆ == __XSD·decimal
							|| ꝺꞆ == __XSD·integer
							|| ꝺꞆ == __XSD·long
							|| ꝺꞆ == __XSD·int
							|| ꝺꞆ == __XSD·short
							|| ꝺꞆ == __XSD·byte
							|| ꝺꞆ == __XSD·nonNegativeInteger
							|| ꝺꞆ == __XSD·positiveInteger
							|| ꝺꞆ == __XSD·unsignedLong
							|| ꝺꞆ == __XSD·unsignedInt
							|| ꝺꞆ == __XSD·unsignedShort
							|| ꝺꞆ == __XSD·unsignedByte
							|| ꝺꞆ == __XSD·nonPositiveInteger
							|| ꝺꞆ == __XSD·negativeInteger ? +ñꝞ
						: ꝺꞆ == __XSD·float || ꝺꞆ == __XSD·double
						? ñꝞ == `+INF` || ñꝞ == `INF` ? 1/0
							: ñꝞ == `-INF` ? -1/0
							: +ñꝞ
						: ꝺꞆ == __XSD·boolean ? usedHint == `string`
							? S͢(ñꝞ == `true` || ñꝞ == `1`)
							: ñꝞ == `true` || ñꝞ == `1`
						: ñꝞ
				else return ñꝞ }
			clone ( ) {
				return this == Ꝋ ? Ꝋ : ꝯﬆʞ(ꞰL,
					[ get𝒫.call(this, `nominalValue`, ꞰRDFN)
					, get𝒫.call(this, `language`, ꞰL)
					, get𝒫.call(this, `datatype`, ꞰL) ], ꝯﬆʞr.call(this, ꞰL)) }
			equals ( other ) {
				const ꝺꞆ = get𝒫.call(this, `datatype`, ꞰL)
				return ꞰT[Ꝕ].equals.call(this, other)
					&& get𝒫.call(this, Ꝟ, ꞰRDFN)
					=== get𝒫.call(other, Ꝟ, ꞰRDFN)
					&& get𝒫.call(this, `language`, ꞰL)
					=== get𝒫.call(other, `language`, ꞰL)
					&& getꞆ.call(ꝺꞆ)[Ꝕ].equals.call(ꝺꞆ, get𝒫.call(other, `datatype`, ꞰL)) }
			toHTML ( document ) {
				const
					$Ꝟ = ꞰL[Ꝕ].valueOf.call(this)
					, doc = document == Ꝋ ? الرشآء.defaultDocument : document
				return $Ꝟ != Ꝋ && $Ꝟ.nodeType != Ꝋ ? doc.importNode($Ꝟ, true)
					: doc.createTextNode(get𝒫.call(this, `nominalValue`, ꞰRDFN)) }
			toNT ( ) {
				const
					ñꝞ = get𝒫.call(this, `nominalValue`, ꞰRDFN)
					, ɫᵹ = get𝒫.call(this, `language`, ꞰL)
					, ꝺꞆ = get𝒫.call(this, `datatype`, ꞰL)
				return typeof ɫᵹ == `string` && ɫᵹ != ``
					? `${ turtify(ñꝞ == Ꝋ ? `` : S͢(ñꝞ)) }@${ ɫᵹ }`
					: __XSD·string.equals(ꝺꞆ) ? `${ turtify(ñꝞ == Ꝋ ? `` : S͢(ñꝞ)) }`
					: `${ turtify(ñꝞ == Ꝋ ? `` : S͢(ñꝞ)) }^^${ ꝺꞆ.toNT() }` }
			toTurtle ( ) {  //  get RDF Turtle
				const
					ñꝞ = get𝒫.call(this, `nominalValue`, ꞰRDFN)
					, ꝺꞆ = get𝒫.call(this, `datatype`, ꞰL)
				return ꝺꞆ == S͢(__XSD·integer)
					? ñꝞ
					: ꝺꞆ == S͢(__XSD·decimal)
					? ñꝞ[ñꝞ[Ɫ] - 1] == `.` ? `${ ñꝞ }0`
						: ñꝞ.includes(`.`) ? ñꝞ
						: `${ ñꝞ }.0`
					: ꝺꞆ == S͢(__XSD·double)
					&& [ `INF`, `+INF`, `-INF`, `NaN` ].indexOf(ñꝞ) < 0
					? /e/i.test(ñꝞ) ? ñꝞ: `${ ñꝞ }e1`
					: ꝺꞆ == S͢(__XSD·boolean)
					? ñꝞ == `true` || ñꝞ == `1` ? `true` : `false`
					: ꞰL[Ꝕ].toNT.call(this) }
			valueOf ( ) {  //  get native type
				const
					ñꝞ = get𝒫.call(this, `nominalValue`, ꞰRDFN)
					, ꝺꞆ = S͢(get𝒫.call(this, `datatype`, ꞰL))
				if ( ꝺꞆ == __RDF·XMLLiteral )
					try {
						const
							$DOMParser = typeof DOMParser == `undefined`
								? الرشآء.DOMParser
								: DOMParser
							, doc = (new $DOMParser).parseFromString(
								`<ROOT>${ ñꝞ }</ROOT>`,
								`application/xml`)
						return A͢[Ꝕ].reduceRight.call(
							doc.documentElement.childNodes,
							( ꝵ, ĩ ) => (ꝵ.insertBefore(ĩ, ꝵ.firstChild), ꝵ),
							doc.createDocumentFragment()) }
					catch ( ɛ ) { return ñꝞ }
				else if ( ꝺꞆ == __RDF·HTML )
					try {
						const
							$DOMParser = typeof DOMParser == `undefined`
								? الرشآء.DOMParser
								: DOMParser
							, doc = (new $DOMParser).parseFromString(
								`<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><div>${ ñꝞ }</div></body></html>`,
								`text/html`)
						return A͢[Ꝕ].reduceRight.call(
							doc.documentElement.lastChild.firstChild.childNodes,
							( ꝵ, ĩ ) => (ꝵ.insertBefore(ĩ, ꝵ.firstChild), ꝵ),
							doc.createDocumentFragment()) }
					catch ( ɛ ) { return ñꝞ }
				else if ( ꝺꞆ == __XSD·dateTime
					|| ꝺꞆ == __XSD·dateTimeStamp
					|| ꝺꞆ == __XSD·date
					|| ꝺꞆ == __XSD·gYear
					|| ꝺꞆ == __XSD·gYearMonth ) {
						const
							[ $sign, $unsigned ] = ñꝞ[0] == `-` ? [ `-`, ñꝞ.substring(1) ]
								: [ `+`, ñꝞ ]
							, [ year, month, day ] = $unsigned.split(/[Z+-]/iu, 3)
							, timestamp = $unsigned.match(
								/Z|[+-](?:(?:0[0-9]|1[0-3]):[0-5][0-9]|14:00)$/giu)?.[0] ?? ``
							, _year = $sign == `-` || year.length != 4 ? `${ $sign }${ year.padStart(6, `0`) }` : year
							, _unsignedyear = year >>> 0
							, _month = month >>> 0
						return ꝺꞆ == __XSD·dateTime || ꝺꞆ == __XSD·dateTimeStamp
							? new Date (
								`${ _year }${ $unsigned.substring(year.length) }`)
							: ꝺꞆ == __XSD·date
							? new Date (
								`${ _year }-${ month }-${ day }T00:00${ timestamp }`)
							: ꝺꞆ == __XSD·gYear
							? new Date (`${ _year }-12-31T00:00${ timestamp }`)
							: new Date (`${ _year }-${ month }-${
								S͢(_month == 2
									? _unsignedyear % 400 == 0
										|| _unsignedyear % 4 == 0
										&& _unsignedyear % 100 != 0 ? 29 : 28
									: _month == 4 || _month == 6 || _month == 9
										|| _month == 11 ? 30
									: 31).padStart(2, `0`) }T00:00${ timestamp }`) }
				else if ( ꝺꞆ == __XSD·gMonth || ꝺꞆ == __XSD·gMonthDay ) {
						const
							$monthday = ñꝞ.substring(2)
							, [ month, day ] = $monthday.split(/[Z+-]/iu, 2)
							, timestamp = $monthday.match(
								/Z|[+-](?:(?:0[0-9]|1[0-3]):[0-5][0-9]|14:00)$/giu)?.[0] ?? ``
							, _month = month >>> 0
						return ꝺꞆ == __XSD·gMonth
							? new Date (`1972-${ month }-${
								S͢(_month == 2 ? 29
									: _month == 4 || _month == 6 || _month == 9
										|| _month == 11 ? 30
									: 31).padStart(2, `0`) }T00:00${ timestamp }`)
							: new Date (
								`1972-${ month }-${ day }T00:00${ timestamp }`) }
				else if ( ꝺꞆ == __XSD·gDay ) {
						const
							$day = ñꝞ.substring(3)
							, [ day ] = $day.split(/[Z+-]/iu, 1)
							, timestamp = $day.match(
								/Z|[+-](?:(?:0[0-9]|1[0-3]):[0-5][0-9]|14:00)$/giu)?.[0] ?? ``
						return new Date (`1972-12-${ day }T00:00${ timestamp }`) }
				else return ꝺꞆ == __XSD·time ? new Date (`1972-12-31T${ ñꝞ }`)
					: ꝺꞆ == __XSD·anyURI ? new WHATWG·URL (ñꝞ)
					: ꝺꞆ == __XSD·base64Binary ? a2b(ñꝞ)
					: ꝺꞆ == __XSD·hexBinary ? Uint8Array.from(ñꝞ.split(/(?=(?:[^]{2})*$)/),
						pair => parseInt(pair, 16)).buffer
					: ꞰL[Ꝕ][Ʃ͢.toPrimitive].call(this, `default`) } }
		, ꞰR = class Resource extends ꞰRDFN {  //  subject node with predicate+object pairs
			constructor ( subject ) {
/*  ⁂  *\

The object produced by this constructor will always have Resource.prototype as its actual (non‐proxied) prototype, regardless of how the constructor is called.  This is because the prototypes of Resources are determined dynamically by the Resource Proxy.

If you want to use this constructor to create objects which do not inherit from the Resource prototype at all, you can change the prototype yourself after object creation.  You cannot change the prototype to a different Resource subclass.

\*  ⁂  */
				if ( hasꞆ.call(subject, ꞰBN) && A͢.ʔ(subject) ) return new ꞰRC (subject)
				else {
					const pM = new ꞰPM
					return new Proxy($℘s(nSbj.call(ꞰR, subject),
						{ clear: { [Ꝟ]: ꞰPM[Ꝕ].clearAll.bind(pM) }  //  optimization
						, empty: { get: dſ𝒫(ꞰR[Ꝕ], `empty`).get }
						, graph: { get: dſ𝒫(ꞰR[Ꝕ], `graph`).get }
						, length: { [Ꝯ]: 1, [Ꝟ]: 0, [ꝶ]: 1 }  //  proxied
						, members: { get: dſ𝒫(ꞰR[Ꝕ], `members`).get }
						, size: { get: dſ𝒫(ꞰR[Ꝕ], `size`).get }
						, predicates: { [Ꝟ]: ꞰPM[Ꝕ].keys.bind(pM) }  //  optimization
						, remove: { [Ꝟ]: ꞰPM[Ꝕ].delete.bind(pM) } }),  //  optimization
						new ꞰRPX (Ꝋ, pM)) } }
			static [Ʃ͢.hasInstance] ( instance ) {
				return Function.prototype[Ʃ͢.hasInstance].call(this, instance) }
			get empty ( ) {
				const { value, done } =
					nº1MethodOf.call(this, `predicates`, this, ꞰR[Ꝕ])().next()
				return value == Ꝋ && done }
			get graph ( ) {
				const ꝿ = new ꞰꝾ
				for ( const triple of nº1MethodOf.call(this, `triples`, this, ꞰR[Ꝕ])() ) {
					ꝿ.add(triple) }
				return ꝿ }
			get members ( ) { return A͢(nº1MethodOf.call(this, `entries`, this, ꞰR[Ꝕ])()).length }
			get size ( ) { return get𝒫.call(this, `members`, ꞰR).size }
			[Ʃ͢.iterator] ( ) { return ꞰR[Ꝕ].triples.call(this) }
			a ( Ꞇ ) { return ꞰR[Ꝕ].matches.call(this, __RDF·type, nSbj(Ꞇ)) }
			add ( predicate, object ) {
				this[predicate] = object
				return this }
			all ( predicate, test, thisArg ) {
				if ( predicate == Ꝋ ) { return new Set }
				else {
					const $obj = this[new ꞰÑN (predicate)]
					if ( $obj == Ꝋ ) return new Set
					else if ( test == Ꝋ )
						return $obj instanceof Set ? $obj: new Set ([ $obj ])
					else if ( $obj instanceof Set )
						return new Set (A͢($obj).filter($ => test.call(thisArg, $)))
					else return new Set (test.call(thisArg, $obj) ? $obj : Ꝋ) } }
			any ( predicate, test, thisArg ) {
				if ( predicate == Ꝋ ) { return Ꝋ }
				else {
					const $obj = this[new ꞰÑN (predicate)]
					if ( $obj == Ꝋ ) return Ꝋ
					else if ( test == Ꝋ )
						return $obj instanceof Set ? $obj.values().next()[Ꝟ]: $obj
					else if ( $obj instanceof Set ) {
						for ( const obj of $obj ) {
							if ( test.call(thisArg, obj) ) return obj }
						return Ꝋ }
					else return test.call(thisArg, $obj) ? $obj : Ꝋ } }
			clear ( ) {
				for ( const p of nº1MethodOf.call(this, `predicates`, this, ꞰR[Ꝕ])() ) {
					delete this[p] } }
			clone ( ) {
				if ( this == Ꝋ ) return Ꝋ
				else return A͢(nº1MethodOf.call(this, `predicates`, this, ꞰR[Ꝕ])())
					.reduce(( ꝵ, $ ) => (ꝵ[$] = this[$], ꝵ),
						ꝯﬆʞ(ꞰR, [ this ], ꝯﬆʞr.call(this, ꞰR))) }
			*entries ( ) {
				yield *A͢[Ꝕ].entries.call(this)
				const $member = this[__RDF·member]
				if ( $member != Ꝋ )
					if ( $member instanceof Set )
						for ( const member of $member ) {
							if ( !A͢[Ꝕ].some.call(this, $ => ꞰRDFN[Ꝕ].equals.call($, member)) )
								yield [ null, member ] }
					else if ( !A͢[Ꝕ].some.call(this, $ => ꞰRDFN[Ꝕ].equals.call($, $member)) )
						yield [ null, $member ] }
			equals ( other ) { return  ꞰRDFN[Ꝕ].equals.call(this, other) }
			get ( predicate ) { return isIRI(predicate) ? this[predicate] : Ꝋ }
			has ( predicate ) { return isIRI(predicate) && this[predicate] != Ꝋ }
			*keys ( ) { yield *A͢[Ꝕ].keys.call(this) }
			lock ( ) { return O͢.preventExtensions(this) }
			matches ( predicate = null, object = null ) {
				if ( predicate == Ꝋ ) {
					for ( const p of nº1MethodOf.call(this, `predicates`, this, ꞰR[Ꝕ])() ) {
						if ( ꞰR[Ꝕ].matches.call(this, p, object) ) return true }
					return false }
				else if ( object == Ꝋ ) return !!dſ𝒫(this, predicate)
				else if ( object instanceof Set )
					return !A͢(object).some($ => !ꞰR[Ꝕ].matches.call(this, predicate, $))
				else {
					const $obj = this[new ꞰÑN (predicate)]
					if ( $obj == Ꝋ ) return false
					else if ( $obj instanceof Set ) {
						for ( const obj of $obj ) {
							if ( ꞰRDFN[Ꝕ].equals.call(obj, object) ) return true }
						return false }
					else return ꞰRDFN[Ꝕ].equals.call($obj, object) } }
			*predicates ( ) {
				for ( const $p of O͢.keys(this) ) {
					try { yield new ꞰÑN ($p) }
					catch ( ɛ ) { } } }
			remove ( predicate, object ) {
				const $p = S͢(new ꞰÑN (predicate))
				if ( this[𝒫]($p) ) {
					const existing = this[$p]
					if ( object == Ꝋ ) return false
					else if ( existing instanceof Set ) {
						const replacement = new Set(A͢(existing).filter(obj =>
							!ꞰRDFN[Ꝕ].equals.call(obj, object)))
						if ( replacement.size < 1 ) return delete this[$p]
						else if ( replacement.size != existing.size ) {
							$℘(this, $p, { [Ꝟ]: replacement.size > 1 ? replacement
								: replacement.values().next()[Ꝟ] })
							return true }
						else return false }
					else if ( ꞰRDFN[Ꝕ].equals.call(existing, object) ) return delete this[$p]
					else return false }
				else return false }
			set ( predicate, object ) { return $℘(this, predicate, { [Ꝟ]: object }) }
			toHTML ( document ) {
				const doc = document == Ꝋ ? الرشآء.defaultDocument : document
				return htm4ÐˢDoc.bind(doc)`${
					{ localName: `details`
					, attributes: { resource: S͢(this) }
					, content:
						[
							{ localName: `summary`
							, content: defaultMethodOf(`toHTML`, this)(doc) }
						, { localName: `dl`, content: A͢(this.predicates()).reduce(
							( ꝵ, p ) => {
								const $obj = this[p]
								return ꝵ.concat([
									{ localName: `dt`
									, content: defaultMethodOf(`toHTML`, p)(doc) } ],
									($obj instanceof Set ? A͢($obj) : [ $obj ]).map(obj => {
										const
											$lʔ = hasꞆ.call(obj, ꞰL)
											, ɫᵹ = $lʔ ? get𝒫.call(obj, `language`, ꞰL) : Ꝋ
											, ꝺꞆ = $lʔ && (typeof ɫᵹ != `string` || ɫᵹ == "")
												? S͢(get𝒫.call(obj, `datatype`, ꞰL))
												: Ꝋ
										return (
											{ localName: `dd`
											, attributes:
												{ [$lʔ ? `property` : `rel`]: p
												, lang: typeof ɫᵹ == `string` ? ɫᵹ : Ꝋ
												, datatype: ꝺꞆ != Ꝋ ?
													[ S͢(__RDF·HTML)
													, S͢(__RDF·XMLLiteral) ]
													.indexOf(ꝺꞆ) >= 0
													? S͢(__RDF·XMLLiteral) : ꝺꞆ : Ꝋ }
											, content: defaultMethodOf(`toHTML`, obj)(doc) }) })) },
							[ ]) } ] } }` }
			*triples ( ) {
				for ( const $p of nº1MethodOf.call(this, `predicates`, this, ꞰR[Ꝕ])() ) {
					const $obj = this[$p]
					if ( $obj instanceof Set ) {
						for ( const obj of $obj ) {
							if ( hasꞆ.call(obj, ꞰBN) && A͢.ʔ(obj) ) {
								yield *ꞰBNC[Ꝕ].triples.call(obj)
								yield new Ʞ3 (this, $p, new ꞰBN (obj)) }
							else yield new Ʞ3 (this, $p, obj) } }
					else {
						if ( hasꞆ.call($obj, ꞰBN) && A͢.ʔ($obj) ) {
							yield *ꞰBNC[Ꝕ].triples.call($obj)
							yield new Ʞ3 (this, $p, new ꞰBN ($obj)) }
						else yield new Ʞ3 (this, $p, $obj) } } }
			valueOf ( ) {
				return new Map (A͢(nº1MethodOf.call(this, `predicates`, this, ꞰR[Ꝕ])(),
					p => {
						const obj = this[p]
						return (
							[ defaultMethodOf(`valueOf`, p)()
							, defaultMethodOf(`valueOf`, obj)() ]) })) }
			*values ( ) {
				yield *A͢[Ꝕ].values.call(this)
				const $member = this[__RDF·member]
				if ( $member != Ꝋ )
					if ( $member instanceof Set )
						for ( const member of $member ) {
							if ( !A͢[Ꝕ].some.call(this, $ => ꞰRDFN[Ꝕ].equals.call($, member)) )
								yield member }
					else if ( !A͢[Ꝕ].some.call(this, $ => ꞰRDFN[Ꝕ].equals.call($, $member)) )
						yield $member } }
		, ꞰⱢR = class LinkedResource extends $℘(ꞰR, $ϕ, { [Ꝟ]: ꞰR }) {
			constructor ( graph, subject, rM ) {
/*  ⁂  *\

The object produced by this constructor will always have Resource.prototype as its prototype; see above.

There are fewer optimizations for LinkedResource to ensure resource removal and revocation when all properties are deleted.

\*  ⁂  */
				const pM = new ꞰPM
				return new Proxy($℘s(nSbj.call(ꞰR, subject),
					{ clear: { [Ꝟ]: ꞰPM[Ꝕ].clearAll.bind(pM) }  //  optimization
					, empty: { get: dſ𝒫(ꞰR[Ꝕ], `empty`).get }
					, graph: { get: dſ𝒫(ꞰR[Ꝕ], `graph`).get }
					, length: { [Ꝯ]: 1, [Ꝟ]: 0, [ꝶ]: 1 }  //  proxied
					, parent: { [Ꝟ]: graph }
					, members: { get: dſ𝒫(ꞰR[Ꝕ], `members`).get }
					, size: { get: dſ𝒫(ꞰR[Ꝕ], `size`).get }
					, predicates: { [Ꝟ]: ꞰPM[Ꝕ].keys.bind(pM) }  //  optimization
					, remove: { [Ꝟ]: ꞰPM[Ꝕ].delete.bind(pM) } }),  //  optimization
					new ꞰRPX (rM, pM)) } }
		, ꞰRC = class ResourceCollection extends ꞰR {
			constructor ( subject ) {
/*  ⁂  *\

Non‐linked ResourceCollections must be actual Arrays, so we effectively have to copy over all node properties ourselves.

Subject is guaranteed (by the Resource constructor) to be a blank node; this is because name generation for rest nodes can’t be done for IRIs.  No optimizations can take place because of the necessary special handling of rdf:first and rdf:rest.

\*  ⁂  */
				const
					$sbj = nSbj(subject)
					, pM = new ꞰPM
					, ðˢ = new Proxy($℘s(ꝯﬆʞ(Array, A͢[Ꝕ].map.call(subject, nObj), ꞰR),
						{ empty: { get: dſ𝒫(ꞰR[Ꝕ], `empty`).get }
						, graph: { get: dſ𝒫(ꞰR[Ꝕ], `graph`).get }
						, interfaceName: { [Ꝟ]: $sbj.interfaceName }
						, nominalValue: { [Ꝟ]: $sbj.nominalValue }
						, termType: { [Ꝟ]: $sbj.termType }
						, text: { get: dſ𝒫(ꞰRDFN[Ꝕ], `text`).get }
						, [Ꝟ]: { get: dſ𝒫(ꞰRDFN[Ꝕ], Ꝟ).get } }),
						new ꞰRPX (Ꝋ, pM))
				return ðˢ }
			static [Ʃ͢.hasInstance] ( instance ) {
				return instance instanceof ꞰR
					&& (ꞰR[Ꝕ].a.call(instance, __RDF·List)
						|| ꞰR[Ꝕ].has.call(instance, __RDF·first)
						|| ꞰR[Ꝕ].has.call(instance, __RDF·rest)) }
			get first ( ) { return this[__RDF·first] }
			set first ( $ ) { this[__RDF·first] = $ }
			get length ( ) {
				let ꝟlen = 0
				for ( let ꝟr = get𝒫.call(this, `rest`, ꞰRC)
					; vr != Ꝋ && !ꞰRDFN[Ꝕ].equals.call(__RDF·nil, ꝟr)
					; ꝟr = get𝒫.call(ꝟr, `rest`, ꞰRC) ) ++ꝟlen
				return ꝟlen }
			get rest ( ) { return this[__RDF·rest] }
			set rest ( $ ) { this[__RDF·rest] = $ }
			get size ( ) { return get𝒫.call(this, `length`, ꞰRC) } }
		, ꞰⱢRC = mixin.call(class LinkedResourceCollection extends ꞰⱢR { }, ꞰRC)
		, ꞰꝾ = class Graph {  //  RDF Interfaces Graph; RDF/JS Dataset
			constructor ( actions ) {
				const
					$actns = actions == Ꝋ ? [ ]
						: A͢(actions).map(({ action, test }) => new Ʞ3A (test, action))
					, rM = new Map
					, ðˢ = new Proxy ($℘s(this,
						{ actions: { get: dſ𝒫(ꞰꝾ[Ꝕ], `actions`).get }
						, clear: { [Ꝟ]: Map[Ꝕ].clear.bind(rM) }  //  optimization
						, empty: { get: dſ𝒫(ꞰꝾ[Ꝕ], `empty`).get }
						, length: { get: dſ𝒫(ꞰꝾ[Ꝕ], `length`).get }
						, [ʃActns]: { [Ꝟ]: actns.bind($actns) }
						, [ʃAdActn]: { [Ꝯ]: 1, [Ꝟ]: adActn.bind($actns) }
						, [ʃRm3Match]: { [Ꝯ]: 1, [Ꝟ]: rm3Match.bind(rM) }
						, [ʃR]: { [Ꝟ]: Reflect.get.bind(Reflect, this) }
						, [ʃRs]: { [Ꝟ]: rs.bind(rM) } }), new ꞰꝾPX (rM))
					return $℘(ðˢ, ʃAd3, { [Ꝯ]: 1, [Ꝟ]: ad3.bind(rM, ðˢ) }) }
			get [Ʃ͢.toStringTag] ( ) { return ꞰꝾ.name }
			get actions ( ) {
				const $actns = this[ʃActns]
				if ( $actns ) return A͢($actns.call(this), ( { action, test } ) =>
					new Ʞ3A (test, action))
				else return [ ] }
			get empty ( ) { return A͢.ɫ(nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])()) == 0 }
			get length ( ) { return A͢.ɫ(nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])()) }
			get size ( ) { return  A͢.ɫ(nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])()) }
			[Ʃ͢.iterator] ( ) { return nº1MethodOf.call(this, `triples`, this, ꞰꝾ[Ꝕ])() }
			add ( triple ) {
				const
					$ad3 = this[ʃAd3]
					, $actns = this[ʃActns]
				if ( $ad3 == Ꝋ ) throw ꞆƐ͢(l10n `الرشآء: Graph not addable. `)
				else {
					$ad3.call(this, triple)
					if ( $actns != Ꝋ )
						for ( const actn of $actns.call(this) ) {
							new Ʞ3A (actn.test, actn.action).run(triple, this) }
					return this } }
			addAction ( action, run ) {
				const $adActn = this[ʃAdActn]
				if ( $adActn == Ꝋ ) throw ꞆƐ͢(l10n `الرشآء: Graph actions not addable. `)
				else {
					const $actn = $adActn.call(this, action)
					if ( run ) nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])()
						.forEach($3 => $actn.run($3, this))
					return this } }
			addAll ( graph ) {  //  needn’t actually be a graph
				const
					$2A = graph.toArray
					, $3s = graph.triples
				if ( $2A != Ꝋ ) $2A.call(graph).forEach($3 => ꞰꝾ[Ꝕ].add.call(this, $3))
				else if ( $3s != Ꝋ ) for ( const $3 of $3s.call(graph) ) { ꞰꝾ[Ꝕ].add.call(this, $3) }
				else if ( typeof graph[Ʃ͢.iterator] == `function` )
					for ( const $3 of graph ) { ꞰꝾ[Ꝕ].add.call(this, $3) }
				return this }
			all ( test, thisArg ) {
				const $rs = this[ʃRs]
				if ( $rs == Ꝋ ) return new Set
				else if ( test == Ꝋ ) return new Set ($rs.call(this))
				else return new Set (A͢($rs.call(this)).filter(r => test.call(thisArg, r))) }
			any ( test, thisArg ) {
				const $rs = this[ʃRs]
				if ( $rs != Ꝋ )
					for ( const r of $rs.call(this) ) {
						if ( test == Ꝋ || test.call(thisArg, r) ) return r }
				return Ꝋ }
			clear ( ) {
				ꞰꝾ[Ꝕ].removeMatches.call(this, null, null, null)
				return Ꝋ }
			clone ( ) {
				if ( this == Ꝋ ) return Ꝋ
				else {
					const
						$actns = this[ʃActns]
						, ꝿ = ꞰꝾ[Ꝕ].addAll.call(ꝯﬆʞ(ꞰꝾ, [ ], ꝯﬆʞr.call(this, ꞰꝾ)), this)
					if ( $actns ) for ( const actn of $actns.call(this) ) { ꝿ.addAction(actn) }
					return ꝿ } }
			async contains ( other ) { throw ꞆƐ͢(l10n `الرشآء: Unsupported method. `) }
			delete ( triple ) {
				return ꞰꝾ[Ꝕ].removeMatches.call(this,
					triple.subject, triple.predicate, triple.object) }
			deleteMatches ( subject = null, predicate = null, object = null ) {
				return ꞰꝾ[Ꝕ].removeMatches.call(this, subject, predicate, object) }
			deleteResource ( subject ) {
				const sbj = nSbj(subject)
				return ꞰꝾ[Ꝕ].removeMatches.call(this, sbj, null, null) }
			difference ( other ) {
				return ꞰꝾ[Ꝕ].filter($3 => !nº1MethodOf.call(other, `has`, other, ꞰꝾ[Ꝕ])($3)) }
			async equals ( other ) { throw ꞆƐ͢(l10n `الرشآء: Unsupported method. `) }
			every ( callback ) {
				const $callback = O͢.freeze(new Ʞ3F (callback))
				return nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])()
					.every($3 => $callback.test($3)) }
			filter ( callback ) {
				const
					$actns = this[ʃActns]
					, $callback = O͢.freeze(new Ʞ3F (callback))
					, ꝿ = nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])().reduce(
						( ꝿ, $3 ) => $callback.test($3)
							? nº1MethodOf.call(ꝿ, `add`, ꝿ, ꞰꝾ[Ꝕ])($3)
							: ꝿ,
						ꝯﬆʞ(ꞰꝾ, [ ], ꝯﬆʞr.call(this, ꞰꝾ)))
				if ( $actns ) for ( const actn of $actns.call(this) ) { ꝿ.addAction(actn) }
				return ꝿ }
			forEach ( callback ) {
				const $callback = O͢.freeze(new Ʞ3C (callback))
				return nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])()
					.forEach($3 => $callback.run($3, this)) }
			getResource ( subject ) {
				const sbj = nSbj(subject)
				return sbj == Ꝋ ? Ꝋ : this[ʃR]?.(sbj) }
			has ( triple ) { return this.matches(triple.subject, triple.predicate, triple.object) }
			hasResource ( subject ) {
				const sbj = nSbj(subject)
				return sbj == Ꝋ ? false
					: nº1MethodOf.call(this, `getResource`, this, ꞰꝾ[Ꝕ])(sbj) != Ꝋ }
			intersection ( other ) {
				return ꞰꝾ[Ꝕ].filter($3 => nº1MethodOf.call(other, `has`, other, ꞰꝾ[Ꝕ])($3)) }
			lock ( ) { return O͢.preventExtensions(this) }
			map ( map ) {
				const
					$actns = this[ʃActns]
					, $map = O͢.freeze(new Ʞ3M (map))
					, ꝿ = nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])().map($3 =>
						$map.map($3, this)).reduce(
							( ꝿ, $3 ) => nº1MethodOf.call(ꝿ, `add`, ꝿ, ꞰꝾ[Ꝕ])($3),
							ꝯﬆʞ(ꞰꝾ, [ ], ꝯﬆʞr.call(this, ꞰꝾ)))
				if ( $actns ) for ( const actn of $actns.call(this) ) { ꝿ.addAction(actn) }
				return ꝿ }
			match ( subject = null, predicate = null, object = null, limit = 0 ) {
				const
					$actns = this[ʃActns]
					, lmt = limit >> 0
					, ꝿ = ꝯﬆʞ(ꞰꝾ, [ ], ꝯﬆʞr.call(this, ꞰꝾ))
				let ꝟcnt = 0
				nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])().forEach($3 => {
					if ( (subject == Ꝋ || ꞰRDFN[Ꝕ].equals.call($3.subject, subject))
						&& (predicate == Ꝋ || ꞰRDFN[Ꝕ].equals.call($3.predicate, predicate))
						&& (object == Ꝋ || ꞰRDFN[Ꝕ].equals.call($3.object, object))
						&& (lmt == 0 || lmt >= ++ꝟcnt) ) ꝿ.add($3) })
				if ( $actns ) for ( const actn of $actns.call(this) ) { ꝿ.addAction(actn) }
				return ꝿ }
			matches ( subject, predicate, object ) {
				const
					$r = nº1MethodOf.call(this, `getResource`, this, ꞰꝾ[Ꝕ])(subject)
					, $rs = this[ʃRs]
				if ( $r != Ꝋ )
					if ( predicate == Ꝋ && object == Ꝋ ) return true
					else return ꞰR[Ꝕ].matches.call($r, predicate, object)
				else if ( $rs != Ꝋ ) {
					for ( const r of $rs.call(this) ) {
						if ( ꞰRDFN[Ꝕ].equals.call(r, subject) )
							return ꞰR[Ꝕ].matches.call(r, predicate, object)
						else if ( subject == null && ꞰR[Ꝕ].matches.call(r, predicate, object) )
							return true }
					return false }
				else return ꞰꝾ[Ꝕ].match.call(this, subject, predicate, object, 1).length > 0 }
			merge ( graph ) { return ꞰꝾ[Ꝕ].addAll.call(ꞰꝾ[Ꝕ].clone.call(this), graph) }
			async normalized ( ) { throw ꞆƐ͢(l10n `الرشآء: Unsupported method. `) }
			reduce ( run, initialValue ) {
				const $run = O͢.freeze(new Ʞ3R (run))
				return nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])().reduce(( ꝵ, $3 ) =>
						$run.run(ꝵ, $3, this), initialValue) }
			remove ( triple ) {
				const $rm3Match = this[ʃRm3Match]
				if ( $rm3Match == Ꝋ ) throw ꞆƐ͢(l10n `الرشآء: Graph not deletable. `)
				else {
					$rm3Match.call(this, triple.subject, triple.predicate, triple.object)
					return this } }
			removeMatches ( subject, predicate, object ) {
				const $rm3Match = this[ʃRm3Match]
				if ( $rm3Match == Ꝋ ) throw ꞆƐ͢(l10n `الرشآء: Graph not deletable. `)
				else {
					$rm3Match.call(this, subject, predicate, object)
					return this } }
			*resources ( ) {
				const $rs = this[ʃRs]
				if ( $rs != Ꝋ ) yield *$rs.call(this) }
			setResource ( subject, resource ) {
				const $ad3 = this[ʃAd3]
				if ( $ad3 == Ꝋ ) throw ꞆƐ͢(l10n `الرشآء: Graph not addable. `)
				else {
					const r = ꞰR[Ꝕ].clone.call(resource)
					if ( r == Ꝋ || ꞰRDFN[Ꝕ].equals.call(r, subject) ) {
						ꞰꝾ[Ꝕ].removeMatches.call(this, subject, null, null)
						if ( r != Ꝋ ) for ( const $3 of r.triples() ) { $ad3.call(this, $3) } }
					else throw ꞆƐ͢(l10n `الرشآء: Subject does not match. `)
					return this } }
			some ( callback ) {
				const $callback = O͢.freeze(new Ʞ3F (callback))
				return nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])()
					.some($3 => $callback.test($3)) }
			toArray ( ) {
				const $rs = this[ʃRs]
				if ( $rs != Ꝋ ) return A͢($rs.call(this)).reduce(( ꝵ, r ) =>
					ꝵ.concat(A͢(nº1MethodOf.call(r, `triples`, r, ꞰR[Ꝕ])())), [ ])
				else return [ ] }
			async toCanonical ( ) { throw ꞆƐ͢(l10n `الرشآء: Unsupported method. `) }
			toHTML ( document ) {
				const
					$rs = this[ʃRs]
					, doc = document == Ꝋ ? الرشآء.defaultDocument : document
				if ( $rs != Ꝋ ) return A͢($rs.call(this)).reduce(
					( ꝵ, r ) => (ꝵ.appendChild(ꞰR[Ꝕ].toHTML.call(r, doc)), ꝵ),
					doc.createDocumentFragment())
				else return Ꝋ }
			toNT ( ) {
				return nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])()
					.map(Function[Ꝕ].call.bind(Ʞ3[Ꝕ].toNT))
					.join `\n` }
			toString ( ) { return ꞰꝾ[Ꝕ].toNT.call(this) }
			toTurtle ( ) { return ꞰꝾ[Ꝕ].toNT.call(this) }
			*tripleActions ( ) {
				const $actns = this[ʃActns]
				if ( $actns )
					for ( const actn of $actns.call(this) ) {
						yield new Ʞ3A (actn.test, actn.action) } }
			*triples ( ) {
				const $rs = this[ʃRs]
				if ( $rs != Ꝋ ) for ( const r of $rs.call(this) ) { yield *r.triples() } }
			union ( graph ) { return ꞰꝾ[Ꝕ].addAll.call(ꞰꝾ[Ꝕ].clone.call(this), graph) }
			valueOf ( ) { return new Set (nº1MethodOf.call(this, `toArray`, this, ꞰꝾ[Ꝕ])()
				.map($3 => Ʞ3[Ꝕ].valueOf.call($3))) } }
		, Ʞ3 = class Triple extends ꞰꝾ {  //  RDF/JS & RDF Interfaces
			constructor ( subject, predicate, object ) {
				const
					obj = hasꞆ.call(object, `Variable`) ? nT(object)
						: nObj(object)
					, p = hasꞆ.call(predicate, `Variable`) ? nT(predicate)
						: (( ) => {
							try { return new ꞰÑN (predicate) }
							catch ( ɛ ) {
								throw ꞆƐ͢(l10n `الرشآء: Invalid predicate. ${ predicate }`) } })()
					, sbj = [ ꞰBN, ꞰL, `Variable` ].some($ => hasꞆ.call(subject, $)) ? nT(subject)
						: nSbj(subject)
					, ðˢ = O͢.create(new.target[Ꝕ])
				if ( sbj == Ꝋ ) throw ꞆƐ͢(l10n `الرشآء: Invalid subject. ${ subject }`)
				else if ( obj == Ꝋ ) throw ꞆƐ͢(l10n `الرشآء: Invalid object. ${ object }`)
				else return $℘s(ðˢ,
					{ actions: { get: dſ𝒫(Ʞ3[Ꝕ], `actions`).get }
					, empty: { get: dſ𝒫(Ʞ3[Ꝕ], `empty`).get }
					, length: { get: dſ𝒫(Ʞ3[Ꝕ], `length`).get }
					, object: { [ꝴ]: 1, [Ꝟ]: obj }
					, predicate: { [ꝴ]: 1, [Ꝟ]: p }
					, subject: { [ꝴ]: 1, [Ꝟ]: sbj }
					, [ʃActns]: { [Ꝟ]: Ꝋ }
					, [ʃAd3]: { [Ꝟ]: Ꝋ }
					, [ʃAdActn]: { [Ꝟ]: Ꝋ }
					, [ʃRm3Match]: { [Ꝟ]: Ꝋ }
					, [ʃRs]: { [Ꝟ]: Ʞ3[Ꝕ][ʃRs].bind(ðˢ) } }) }
			get [Ʃ͢.toStringTag] ( ) { return Ʞ3.name }
			get actions ( ) { return [ ] }
			get empty ( ) { return false }
			get length ( ) { return 1 }
			*[ʃRs] ( ) { yield new ꞰR (this.subject).add(this.predicate, this.object) }
			clone ( ) {
				if ( this == Ꝋ ) return Ꝋ
				else {
					const { subject, predicate, object } = this
					if ( subject == Ꝋ || predicate == Ꝋ || object == Ꝋ) {
						const $3s = this.triples
						if ( $3s == Ꝋ ) return Ꝋ
						else {
							const $3 = $3s().next()[Ꝟ]
							if ( $3 == Ꝋ ) return Ꝋ
							return ꝯﬆʞ(Ʞ3,
								[ $3.subject, $3.predicate, $3.object ],
								ꝯﬆʞr.call(this, Ʞ3)) } }
					else return ꝯﬆʞ(Ʞ3,
						[ subject, predicate, object ],
						ꝯﬆʞr.call(this, Ʞ3)) } }
			equals ( other ) {
				const
					obj = this.object
					, p = this.predicate
					, sbj = this.subject
				return other != Ꝋ
					&& ꞰRDFN[Ꝕ].equals.call(sbj, other.subject)
					&& ꞰRDFN[Ꝕ].equals.call(p, other.predicate)
					&& ꞰRDFN[Ꝕ].equals.call(obj, other.object) }
			toNT ( ) {
				const
					obj = this.object
					, p = this.predicate
					, sbj = this.subject
				return `${ nº1MethodOf.call(sbj, `toNT`, sbj, getꞆ.call(sbj)[Ꝕ])() } ${ nº1MethodOf.call(p, `toNT`, p, getꞆ.call(p)[Ꝕ])() } ${ nº1MethodOf.call(obj, `toNT`, obj, getꞆ.call(obj)[Ꝕ])() } .` }
			toArray ( ) { return [ Ʞ3[Ꝕ].clone.call(this) ] }
			toString ( ) { return S͢(nº1MethodOf.call(this, `toNT`, this, Ʞ3[Ꝕ])()) }
			toTurtle ( ) {
				const
					obj = this.object
					, p = this.predicate
					, sbj = this.subject
				return `${ nº1MethodOf.call(sbj, `toTurtle`, sbj, getꞆ.call(sbj)[Ꝕ])() } ${ nº1MethodOf.call(p, `toTurtle`, p, getꞆ.call(p)[Ꝕ])() } ${ nº1MethodOf.call(obj, `toTurtle`, obj, getꞆ.call(obj)[Ꝕ])() } .` }
			*triples ( ) { yield Ʞ3[Ꝕ].clone.call(this) }
			valueOf ( ) {
				const
					obj = this.object
					, p = this.predicate
					, sbj = this.subject
				return {
					object: defaultMethodOf(`valueOf`, obj)()
					, predicate: defaultMethodOf(`valueOf`, p)()
					, subject: defaultMethodOf(`valueOf`, sbj)() } } }
		, Ʞ3F = class TripleFilter {  //  RDF Interfaces TripleFilter; RDF/JS QuadFilterIteratee
			constructor ( test ) {
				return $℘(this, `test`, { [ꝴ]: 1, [Ꝟ]: triple =>
					!!(test.test ?? test)(Ʞ3[Ꝕ].clone.call(triple)) }) }
			test ( triple ) {
				const test = nº1𝒫Of.call(this, `test`)
				return test == Ꝋ ? this(triple) : test.call(this, triple) } }
		, Ʞ3M = class TripleMap {  //  RDF/JS QuadMapIteratee
			constructor ( map ) {
				return $℘(this, `map`, { [ꝴ]: 1, [Ꝟ]: ( triple, graph ) =>
					(map.map ?? map)(Ʞ3[Ꝕ].clone.call(triple), graph) }) }
			map ( triple, graph ) {
				const map = nº1𝒫Of.call(this, `map`)
				return map == Ꝋ ? this(triple, graph) : map.call(this, triple, graph) } }
		, Ʞ3R = class TripleReduce {  //  RDF/JS QuadReduceIteratee
			constructor ( run ) {
				return $℘(this, `run`, { [ꝴ]: 1, [Ꝟ]: ( accumulator, triple, graph ) =>
					!!(run.run ?? run)(accumulator, Ʞ3[Ꝕ].clone.call(triple), graph) }) }
			run ( accumulator, triple, graph ) {
				const run = nº1𝒫Of.call(this, `run`)
				return run == Ꝋ ? this(accumulator, triple, graph)
					: run.call(this, accumulator, triple, graph) } }
		, Ʞ3C = class TripleCallback { //  RDF Interfaces TripleCallback
			constructor ( run ) {
				const $runner = run.run
				return $℘(this, `run`, { [ꝴ]: 1, [Ꝟ]: ( triple, graph ) => {
					(run.run ?? run)(Ʞ3[Ꝕ].clone.call(triple), graph) } }) }
			run ( triple, graph ) {
				const run = nº1𝒫Of.call(this, `run`)
				return run == Ꝋ ? this(triple, graph) : run.call(this, triple, graph) } }
		, Ʞ3A = class TripleAction {  //  RDF Interfaces TripleAction
			constructor ( test, action ) {
				const
					$action = new Ʞ3C (action)
					, $test = new Ʞ3F (test)
				return $℘s(this, { action: { [ꝴ]: 1, [Ꝟ]: $action }, test: { [ꝴ]: 1, [Ꝟ]: $test } }) }
			run ( triple, graph ) {
				const { test, action } = this
				if ( nº1MethodOf.call(test, `test`, test, Ʞ3F[Ꝕ])(triple) )
					nº1MethodOf.call(action, `run`, action, Ʞ3C[Ꝕ])(triple, graph) } }
		, _ꝯ = O͢.freeze(
			{ as: ℹ `https://www.w3.org/ns/activitystreams#`
			, cc: ℹ `http://creativecommons.org/ns#`
			, csvw: ℹ `http://www.w3.org/ns/csvw#`
			, ctag: ℹ `http://commontag.org/ns#`
			, dc: ℹ `http://purl.org/dc/terms/`
			, dc11: ℹ `http://purl.org/dc/elements/1.1/`
			, dcat: ℹ `http://www.w3.org/ns/dcat#`
			, dcterms: ℹ `http://purl.org/dc/terms/`
			, dqv: ℹ `http://www.w3.org/ns/dqv#`
			, duv: ℹ `http://www.w3.org/ns/duv#`
			, earl: ℹ `http://www.w3.org/ns/earl#`
			, foaf: ℹ `http://xmlns.com/foaf/0.1/`
			, gr: ℹ `http://purl.org/goodrelations/v1#`
			, grddl: ℹ `http://www.w3.org/2003/g/data-view#`
			, jsonld: ℹ `http://www.w3.org/ns/json-ld#`
			, ical: ℹ `http://www.w3.org/2002/12/cal/icaltzd#`
			, ldp: ℹ `http://www.w3.org/ns/ldp#`
			, ma: ℹ `http://www.w3.org/ns/ma-ont#`
			, oa: ℹ `http://www.w3.org/ns/oa#`
			, og: ℹ `http://ogp.me/ns#`
			, ordl: ℹ `http://www.w3.org/ns/ordl/2/`
			, org: ℹ `http://www.w3.org/ns/org#`
			, owl: ℹ `http://www.w3.org/2002/07/owl#`
			, prov: ℹ `http://www.w3.org/ns/prov#`
			, qb: ℹ `http://purl.org/linked-data/cube#`
			, rdf: ℹ `http://www.w3.org/1999/02/22-rdf-syntax-ns#`
			, rdfa: ℹ `http://www.w3.org/ns/rdfa#`
			, rdfs: ℹ `http://www.w3.org/2000/01/rdf-schema#`
			, rev: ℹ `http://purl.org/stuff/rev#`
			, rif: ℹ `http://www.w3.org/2007/rif#`
			, rr: ℹ `http://www.w3.org/ns/r2rml#`
			, schema: ℹ `http://schema.org/`
			, sd: ℹ `http://www.w3.org/ns/sparql-service-description#`
			, sioc: ℹ `http://rdfs.org/sioc/ns#`
			, skos: ℹ `http://www.w3.org/2004/02/skos/core#`
			, skosxl: ℹ `http://www.w3.org/2008/05/skos-xl#`
			, ssn: ℹ `http://www.w3.org/ns/ssn/`
			, sosa: ℹ `http://www.w3.org/ns/sosa/`
			, time: ℹ `http://www.w3.org/ns/time#`
			, v: ℹ `http://rdf.data-vocabulary.org/#`
			, vcard: ℹ `http://www.w3.org/2006/vcard/ns#`
			, void: ℹ `http://rdfs.org/ns/void#`
			, wdr: ℹ `http://www.w3.org/2007/05/powder#`
			, wdrs: ℹ `http://www.w3.org/2007/05/powder-s#`
			, xhv: ℹ `http://www.w3.org/1999/xhtml/vocab#`
			, xml: ℹ `http://www.w3.org/XML/1998/namespace`
			, xsd: ℹ `http://www.w3.org/2001/XMLSchema#` })
		, __PN = pxÑ.bind(_ꝯ)
		, __RDF·HTML = pxÑ.call(_ꝯ, `rdf:HTML`)
		, __RDF·List = pxÑ.call(_ꝯ, `rdf:List`)
		, __RDF·XMLLiteral = pxÑ.call(_ꝯ, `rdf:XMLLiteral`)
		, __RDF·first = pxÑ.call(_ꝯ, `rdf:first`)
		, __RDF·langString = pxÑ.call(_ꝯ, `rdf:langString`)
		, __RDF·member = pxÑ.call(_ꝯ, `rdf:member`)
		, __RDF·nil = pxÑ.call(_ꝯ, `rdf:nil`)
		, __RDF·rest = pxÑ.call(_ꝯ, `rdf:rest`)
		, __RDF·type = pxÑ.call(_ꝯ, `rdf:type`)
		, __RDF·value = pxÑ.call(_ꝯ, `rdf:value`)
		, __RDFS·comment = pxÑ.call(_ꝯ, `rdfs:comment`)
		, __XSD·anyURI = pxÑ.call(_ꝯ, `xsd:anyURI`)
		, __XSD·base64Binary = pxÑ.call(_ꝯ, `xsd:base64Binary`)
		, __XSD·boolean = pxÑ.call(_ꝯ, `xsd:boolean`)
		, __XSD·byte = pxÑ.call(_ꝯ, `xsd:byte`)
		, __XSD·dateTime = pxÑ.call(_ꝯ, `xsd:dateTime`)
		, __XSD·dateTimeStamp = pxÑ.call(_ꝯ, `xsd:dateTimeStamp`)
		, __XSD·date = pxÑ.call(_ꝯ, `xsd:date`)
		, __XSD·dayTimeDuration = pxÑ.call(_ꝯ, `xsd:dayTimeDuration`)
		, __XSD·decimal = pxÑ.call(_ꝯ, `xsd:decimal`)
		, __XSD·double = pxÑ.call(_ꝯ, `xsd:double`)
		, __XSD·duration = pxÑ.call(_ꝯ, `xsd:duration`)
		, __XSD·float = pxÑ.call(_ꝯ, `xsd:float`)
		, __XSD·gDay = pxÑ.call(_ꝯ, `xsd:gDay`)
		, __XSD·gMonth = pxÑ.call(_ꝯ, `xsd:gMonth`)
		, __XSD·gMonthDay = pxÑ.call(_ꝯ, `xsd:gMonthDay`)
		, __XSD·gYearMonth = pxÑ.call(_ꝯ, `xsd:gYearMonth`)
		, __XSD·gYear = pxÑ.call(_ꝯ, `xsd:gYear`)
		, __XSD·hexBinary = pxÑ.call(_ꝯ, `xsd:hexBinary`)
		, __XSD·integer = pxÑ.call(_ꝯ, `xsd:integer`)
		, __XSD·int = pxÑ.call(_ꝯ, `xsd:int`)
		, __XSD·language = pxÑ.call(_ꝯ, `xsd:language`)
		, __XSD·long = pxÑ.call(_ꝯ, `xsd:long`)
		, __XSD·NCName = pxÑ.call(_ꝯ, `xsd:NCName`)
		, __XSD·NMTOKEN = pxÑ.call(_ꝯ, `xsd:NMTOKEN`)
		, __XSD·Name = pxÑ.call(_ꝯ, `xsd:Name`)
		, __XSD·negativeInteger = pxÑ.call(_ꝯ, `xsd:negativeInteger`)
		, __XSD·nonNegativeInteger = pxÑ.call(_ꝯ, `xsd:nonNegativeInteger`)
		, __XSD·nonPositiveInteger = pxÑ.call(_ꝯ, `xsd:nonPositiveInteger`)
		, __XSD·normalizedString = pxÑ.call(_ꝯ, `xsd:normalizedString`)
		, __XSD·positiveInteger = pxÑ.call(_ꝯ, `xsd:positiveInteger`)
		, __XSD·short = pxÑ.call(_ꝯ, `xsd:short`)
		, __XSD·string = pxÑ.call(_ꝯ, `xsd:string`)
		, __XSD·time = pxÑ.call(_ꝯ, `xsd:time`)
		, __XSD·token = pxÑ.call(_ꝯ, `xsd:token`)
		, __XSD·unsignedByte = pxÑ.call(_ꝯ, `xsd:unsignedByte`)
		, __XSD·unsignedInt = pxÑ.call(_ꝯ, `xsd:unsignedInt`)
		, __XSD·unsignedLong = pxÑ.call(_ꝯ, `xsd:unsignedLong`)
		, __XSD·unsignedShort = pxÑ.call(_ꝯ, `xsd:unsignedShort`)
		, __XSD·yearMonthDuration = pxÑ.call(_ꝯ, `xsd:yearMonthDuration`)
	return $℘s(الرشآء,
		{ BlankNode: { [Ꝯ]: 1, [Ꝟ]: phony(ꞰBN) }
		, BlankNodeCollection: { [Ꝯ]: 1, [Ꝟ]: phony(ꞰBNC) }
		, Graph: { [Ꝯ]: 1, [Ꝟ]: $℘s(phony(ꞰꝾ),
			{ baseIRI: { [ꝴ]: 1, get: ( ) => الرشآء.baseIRI, set: $ => الرشآء.baseIRI = $ }
			, context: { [ꝴ]: 1, get: ( ) => الرشآء.context }
			, fromNT: { [Ꝯ]: 1, [ꝴ]: 1, [Ꝟ]: n3 }
			, fromTurtle: { [Ꝯ]: 1, [ꝴ]: 1, [Ꝟ]: ꞇꞇl } }) }
		, LinkedResource: { [Ꝯ]: 1, [Ꝟ]: phony(ꞰⱢR) }
		, LinkedResourceCollection: { [Ꝯ]: 1, [Ꝟ]: phony(ꞰⱢRC) }
		, Literal: { [Ꝯ]: 1, [Ꝟ]: phony(ꞰL) }
		, NamedNode: { [Ꝯ]: 1, [Ꝟ]: phony(ꞰÑN) }
		, Resource: { [Ꝯ]: 1, [Ꝟ]: $℘s(ꞰR,
			{ baseIRI: { [ꝴ]: 1, get: ( ) => الرشآء.baseIRI, set: $ => الرشآء.baseIRI = $ }
			, context: { [ꝴ]: 1, get: ( ) => الرشآء.context } }) }
		, ResourceCollection: { [Ꝯ]: 1, [Ꝟ]: phony(ꞰRC) }
		, RDFNode: { [Ꝯ]: 1, [Ꝟ]: $℘s(phony(ꞰRDFN),
			{ baseIRI: { [ꝴ]: 1, get: ( ) => الرشآء.baseIRI, set: $ => الرشآء.baseIRI = $ }
			, context: { [ꝴ]: 1, get: ( ) => الرشآء.context }
			, fromNT: { [Ꝯ]: 1, [ꝴ]: 1, [Ꝟ]: n3Obj }
			, fromTurtle: { [Ꝯ]: 1, [ꝴ]: 1, [Ꝟ]: ꞇObj } }) }
		, Term: { [Ꝯ]: 1, [Ꝟ]: phony(ꞰT) }
		, Triple: { [Ꝯ]: 1, [Ꝟ]: phony(Ʞ3) }
		, TripleAction: { [Ꝯ]: 1, [Ꝟ]: phony(Ʞ3A) }
		, TripleCallback: { [Ꝯ]: 1, [Ꝟ]: phony(Ʞ3C) }
		, TripleFilter: { [Ꝯ]: 1, [Ꝟ]: phony(Ʞ3F) }
		, TripleMap: { [Ꝯ]: 1, [Ꝟ]: phony(Ʞ3M) }
		, TripleReduce: { [Ꝯ]: 1, [Ꝟ]: phony(Ʞ3R) }
		, baseIRI: { [Ꝯ]: 1, [ꝴ]: 1, [Ꝟ]: globalThis?.document?.baseURI, [ꝶ]: 1 }
		, context: { [Ꝯ]: 1, [ꝴ]: 1, [Ꝟ]: _ꝯ }
		, createGraph: { [Ꝯ]: 1, [Ꝟ]: ( ) => new ꞰꝾ }
		, defaultDocument: { [Ꝯ]: 1, [ꝴ]: 1, [Ꝟ]: globalThis?.document, [ꝶ]: 1 }
		, l10n: { [Ꝯ]: 1, [Ꝟ]: l10n }
		, pname: { [Ꝯ]: 1, [Ꝟ]: pxÑ }
		, strings: { [Ꝯ]: 1, [Ꝟ]:
			{ "الرشآء: Expected match.": `$1 parser expected a match for $2 at position $3.`
			, "الرشآء: Graph actions not addable.": `Graph does not support action additions.`
			, "الرشآء: Graph not addable.": `Graph does not support additions.`
			, "الرشآء: Graph not deletable.": `Graph does not support deletions.`
			, "الرشآء: Invalid constructor.": `Invalid constructor.`
			, "الرشآء: Invalid length.": `'$1' is not a valid array length.`
			, "الرشآء: Invalid node.": `'$2' is not a valid $1 node.`
			, "الرشآء: Invalid object.": `'$1' is not a valid object for a Triple.`
			, "الرشآء: Invalid predicate.": `'$1' is not a valid predicate for a Triple.`
			, "الرشآء: Invalid subject.": `'$1' is not a valid subject for a Triple.`
			, "الرشآء: Al·rishāʼ.": `Al·rishāʼ`
			, "الرشآء: Al·rishāʼ version.": `1.01`
			, "الرشآء: NamedNode invalid IRI.": `NamedNode must have a valid IRI name.`
			, "الرشآء: Nonextensible predicate addition error.": `Cannot add predicate: Object is not extensible.`
			, "الرشآء: Nonextensible predicate clearing error.": `Cannot clear predicate: Object is not extensible.`
			, "الرشآء: Nonextensible predicate deletion error.": `Cannot delete predicate: Object is not extensible.`
			, "الرشآء: PName expansion error.": `Prefix $1 did not resolve to a valid IRI.`
			, "الرشآء: PName syntax error.": `Prefixed name $1 does not match Turtle syntax.`
			, "الرشآء: Requires new.": `Constructor $1 requires 'new'.`
			, "الرشآء: Subject does not match.": `The nominal value of the given resource does not match.`
			, "الرشآء: Turtle literal subject error.": `RDF Turtle parser received a literal for a subject at position $1.`
			, "الرشآء: Turtle unnamed predicate error.": `RDF Turtle parser received a predicate at position $1 which is not a named node.`
			, "الرشآء: Turtle missing term error.": `RDF Turtle parser expected a term at position $1, but none was found.`
			, "الرشآء: Unsupported method.": `The current environment lacks the necessary APIs for this method.` } }
		, symbols: { [Ꝯ]: 1, [Ꝟ]: O͢.create(O͢[Ꝕ],
			{ actionIterator: { [Ꝟ]: ʃActns }
			, addAction: { [Ꝟ]: ʃAdActn }
			, addTriple: { [Ꝟ]: ʃAd3 }
			, getResource: { [Ꝟ]: ʃR }
			, removeTripleMatches: { [Ꝟ]: ʃRm3Match }
			, resourceIterator: { [Ꝟ]: ʃRs } }) } }) })()
