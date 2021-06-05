//  @ Al·rishāʼ :: الرشآء.js
//
//  Copyright © 2020–2021 Margaret KIBI.
//
//  This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
//  If a copy of the MPL was not distributed with this file, You can obtain one at <https://mozilla.org/MPL/2.0/>.

import { defaultContext } from "./context.js"

export default Object.defineProperties(
	Object.create(null),
	{ baseIRI:
		{ configurable: true
		, enumerable: true
		, value: globalThis?.document?.baseURI
		, writable: true }
	, context:
		{ configurable: true
		, enumerable: true
		, value: defaultContext
		, writable: false }
	, defaultDocument:
		{ configurable: true
		, enumerable: true
		, value: globalThis?.document
		, writable: true } })
