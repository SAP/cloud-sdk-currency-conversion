/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { ValidationError } = require('../exceptions/validation-error');
const { logger } = require('../logging/Logger');
const ErrorStatuses = require('../utils/ErrorStatuses');

function validatePattern(patternType, fieldName, fieldValue, maxLength) {
  if (!patternType.test(fieldValue)) {
    logger.error(`Provide a valid value for ${fieldName}. The value must be 1 - ${maxLength} characters long.`);
    throw new ValidationError(
      `Provide a valid value for ${fieldName}. The value must be 1 - ${maxLength} characters long.`,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

module.exports = { validatePattern };
