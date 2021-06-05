//  @ Al·rishāʼ :: context.ts
//
//  Copyright © 2020–2021 Margaret KIBI.
//
//  This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
//  If a copy of the MPL was not distributed with this file, You can obtain one at <https://mozilla.org/MPL/2.0/>.

import { 名 } from "./Terms/RDFNodes/NamedNode.js"

export const defaultContext = Object.freeze(
	{ as: 名 `https://www.w3.org/ns/activitystreams#`
	, cc: 名 `http://creativecommons.org/ns#`
	, csvw: 名 `http://www.w3.org/ns/csvw#`
	, ctag: 名 `http://commontag.org/ns#`
	, dc: 名 `http://purl.org/dc/terms/`
	, dc11: 名 `http://purl.org/dc/elements/1.1/`
	, dcat: 名 `http://www.w3.org/ns/dcat#`
	, dcterms: 名 `http://purl.org/dc/terms/`
	, dqv: 名 `http://www.w3.org/ns/dqv#`
	, duv: 名 `http://www.w3.org/ns/duv#`
	, earl: 名 `http://www.w3.org/ns/earl#`
	, foaf: 名 `http://xmlns.com/foaf/0.1/`
	, gr: 名 `http://purl.org/goodrelations/v1#`
	, grddl: 名 `http://www.w3.org/2003/g/data-view#`
	, jsonld: 名 `http://www.w3.org/ns/json-ld#`
	, ical: 名 `http://www.w3.org/2002/12/cal/icaltzd#`
	, ldp: 名 `http://www.w3.org/ns/ldp#`
	, ma: 名 `http://www.w3.org/ns/ma-ont#`
	, oa: 名 `http://www.w3.org/ns/oa#`
	, og: 名 `http://ogp.me/ns#`
	, ordl: 名 `http://www.w3.org/ns/ordl/2/`
	, org: 名 `http://www.w3.org/ns/org#`
	, owl: 名 `http://www.w3.org/2002/07/owl#`
	, prov: 名 `http://www.w3.org/ns/prov#`
	, qb: 名 `http://purl.org/linked-data/cube#`
	, rdf: 名 `http://www.w3.org/1999/02/22-rdf-syntax-ns#`
	, rdfa: 名 `http://www.w3.org/ns/rdfa#`
	, rdfs: 名 `http://www.w3.org/2000/01/rdf-schema#`
	, rev: 名 `http://purl.org/stuff/rev#`
	, rif: 名 `http://www.w3.org/2007/rif#`
	, rr: 名 `http://www.w3.org/ns/r2rml#`
	, schema: 名 `http://schema.org/`
	, sd: 名 `http://www.w3.org/ns/sparql-service-description#`
	, sioc: 名 `http://rdfs.org/sioc/ns#`
	, skos: 名 `http://www.w3.org/2004/02/skos/core#`
	, skosxl: 名 `http://www.w3.org/2008/05/skos-xl#`
	, ssn: 名 `http://www.w3.org/ns/ssn/`
	, sosa: 名 `http://www.w3.org/ns/sosa/`
	, time: 名 `http://www.w3.org/ns/time#`
	, v: 名 `http://rdf.data-vocabulary.org/#`
	, vcard: 名 `http://www.w3.org/2006/vcard/ns#`
	, void: 名 `http://rdfs.org/ns/void#`
	, wdr: 名 `http://www.w3.org/2007/05/powder#`
	, wdrs: 名 `http://www.w3.org/2007/05/powder-s#`
	, xhv: 名 `http://www.w3.org/1999/xhtml/vocab#`
	, xml: 名 `http://www.w3.org/XML/1998/namespace`
	, xsd: 名 `http://www.w3.org/2001/XMLSchema#` })
