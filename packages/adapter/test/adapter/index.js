/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const test = require('@sap/cds/lib/utils/tests').in(__dirname, '..');
module.exports = Object.assign(test, { run: test });

// REVISIT: With upcoming release of @sap/cds this should become:
// module.exports = require('@sap/cds/tests').in(__dirname,'..')
