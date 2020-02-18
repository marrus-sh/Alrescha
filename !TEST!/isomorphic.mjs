import Kico from "../Kico.mjs"
const ꞰBN = Kico.BlankNode
export default function isomorphic ( other ) {
	const
		$3s = other.toArray().map($ =>
			Object.defineProperty($.clone(), "matched",
				{ value: false, writable: 1 }))
		, bidM = { }
		, ðˢ3s = this.toArray().map($ =>
			Object.defineProperty($.clone(), "matched",
				{ value: false, writable: 1 }))
	for ( const $3 of $3s ) {
		const { subject: $sbj, object: $obj } = $3
		if ( !($sbj instanceof ꞰBN) && !($obj instanceof ꞰBN) ) {
			const match = ðˢ3s.find(ðˢ3 => ðˢ3.equals(
				{ object: $obj
				, predicate: $3.predicate
				, subject: $sbj }))
			if ( match == null ) return false
			else match.matched = $3.matched = true } }
	const
		$b3s = $3s.filter($ => !$.matched)
		, $bids = Array.from($b3s.reduce((ꝵ, { subject: $sbj, object: $obj }) => {
			if ( $sbj instanceof ꞰBN ) ꝵ.add($sbj.value)
			if ( $obj instanceof ꞰBN ) ꝵ.add($obj.value)
			return ꝵ }, new Set))
		, ðˢb3s = ðˢ3s.filter($ => !$.matched)
		, ðˢbids = Array.from(ðˢb3s.reduce((ꝵ, { subject: $sbj, object: $obj }) => {
			if ( $sbj instanceof ꞰBN ) ꝵ.add($sbj.value)
			if ( $obj instanceof ꞰBN ) ꝵ.add($obj.value)
			return ꝵ }, new Set))
		, ɫ = ðˢbids.length
	if ( ɫ == 0 ) return true
	if ( $bids.length != ɫ ) return false
	function *allMEntries ( prefix, abids, bbids ) {
		if ( abids.length <= 0 ) yield prefix
		else {
			const abid = abids[0]
			for ( let ꝟndx = 0 ; ꝟndx < bbids.length ; ꝟndx++ )
				yield *allMEntries(prefix.concat([ [ abid, bbids[ꝟndx] ] ]),
					abids.slice(1),
					bbids.slice(0, ꝟndx).concat(bbids.slice(ꝟndx + 1))) } }
	tryM: for ( const mEntries of allMEntries([ ], $bids, ðˢbids) ) {
		const m = new Map (mEntries)
		for ( const $b3 of $b3s ) {
			const
				{ subject: $sbj, object: $obj } = $b3
				, sbj = $sbj instanceof ꞰBN
					? ꞰBN.prototype.clone.call(
						{ termType: "BlankNode"
						, value: m.get($sbj.value) })
					: $sbj
				, obj = $obj instanceof ꞰBN
					? ꞰBN.prototype.clone.call(
						{ termType: "BlankNode"
						, value: m.get($obj.value) })
					: $obj
				, _match = ðˢb3s.find(ðˢb3 =>
					ðˢb3.equals(
						{ object: obj
						, predicate: $b3.predicate
						, subject: sbj }))
				if ( _match == null ) continue tryM
				else _match.matched = true }
		const ðˢxb3s = ðˢb3s.filter($ => !$.matched) // possible duplicates in this
		for ( const ðˢxb3 of ðˢxb3s ) {
			if ( !ðˢxb3s.some($ => $.matched && $.equals(ðˢxb3)) )
				return false }
		return true }
	return false }