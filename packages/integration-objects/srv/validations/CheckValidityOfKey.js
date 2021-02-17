/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { logger } = require('../logging/Logger');
const ErrorStatuses = require('../utils/ErrorStatuses');
const RateTypeExtensionConstants = require('../utils/RateTypeExtensionConstants');
const { ValidationError } = require('../exceptions/validation-error');

async function checkForValidityOfKey(req, ExchangeRateTypes) {
  const query = SELECT.from(ExchangeRateTypes).where({ ID: req.params }).limit(1, 0);

  const tx = cds.transaction(req);
  const affectedRows = await tx.run(query);

  if (affectedRows.length) {
    const record = affectedRows[0];
    if (req.user.tenant !== record.tenantID) {
      logger.error('Invalid ID was accessed. It is not related to the current tenant.');
      throw new ValidationError(RateTypeExtensionConstants.GUID_NOT_FOUND_FOR_READ, ErrorStatuses.BAD_REQUEST);
    }
  }
}

module.exports = {
  checkForValidityOfKey
};
