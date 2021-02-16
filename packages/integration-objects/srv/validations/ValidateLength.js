/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const { ValidationError } = require('../exceptions/validation-error');
const Constants = require('../utils/Constants');
const { logger } = require('../logging/Logger');
const ErrorStatuses = require('../utils/ErrorStatuses');

function validateLength(fieldName, fieldValue, maxLength) {
  if (
    util.isNullish(fieldValue) ||
    fieldValue.trim().length < Constants.MIN_LENGTH ||
    fieldValue.trim().length > maxLength
  ) {
    logger.error(`Provide a valid value for ${fieldName}. The value must be 1 - ${maxLength} characters long.`);
    throw new ValidationError(
      `Provide a valid value for ${fieldName}. The value must be 1 - ${maxLength} characters long.`,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

module.exports = { validateLength };
