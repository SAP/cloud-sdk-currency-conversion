/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const { ValidationError } = require('../exceptions/validation-error');
const { logger } = require('../logging/Logger');
const Constants = require('../utils/Constants');
const ErrorStatuses = require('../utils/ErrorStatuses');
const RateTypeExtensionConstants = require('../utils/RateTypeExtensionConstants');

async function validateFieldsForExchangeRateTypes(data) {
  validateRateTypePattern(data.exchangeRateType);
  if (!util.isNullish(data.referenceCurrencyThreeLetterISOCode)) {
    validateInversionAllowed(data.isInversionAllowed);
    validateReferenceCurrencyCode(data.referenceCurrencyThreeLetterISOCode);
  }
  setInversionAllowedWhenNull(data);
}

function setInversionAllowedWhenNull(data) {
  if (util.isNullish(data.isInversionAllowed)) {
    data.isInversionAllowed = Constants.DEFAULT_VALUE_FOR_IS_INVERSION_ALLOWED_VALUE;
  }
}

function validateReferenceCurrencyCode(referenceCurrencyThreeLetterISOCode) {
  if (!Constants.CURRENCY_CODE_PATTERN.test(referenceCurrencyThreeLetterISOCode)) {
    logger.error('The value for referenceCurrencyThreeLetterISOCode in the payload is invalid.');
    throw new ValidationError(
      RateTypeExtensionConstants.INVALID_REFERENCE_CURRENCY_VALUE_FIELD,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

function validateInversionAllowed(isInversionAllowed) {
  if (isInversionAllowed !== false && !util.isNullish(isInversionAllowed)) {
    logger.error(
      'Valid values must be provided to either of Inversion Allowed or Reference Currency fields and not both of it.'
    );
    throw new ValidationError(
      RateTypeExtensionConstants.INVALID_COMBINATION_OF_INVERSION_REF_CURRENCY,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

function validateRateTypePattern(exchangeRateType) {
  if (!Constants.EXCHANGE_RATE_TYPE_PATTERN.test(exchangeRateType)) {
    logger.error('Exchange Rate Type field value provided is invalid.');
    throw new ValidationError(
      RateTypeExtensionConstants.INVALID_EXCHANGE_RATE_TYPE_FIELD_VALUE,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

module.exports = {
  validateFieldsForExchangeRateTypes
};
