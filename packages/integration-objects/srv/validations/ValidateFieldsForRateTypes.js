/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const { ValidationError } = require('../exceptions/validation-error');
const { logger } = require('../logging/Logger');
const Constants = require('../utils/Constants');
const ErrorStatuses = require('../utils/ErrorStatuses');
const RateTypeExtensionConstants = require('../utils/RateTypeExtensionConstants');
const { validatePattern } = require('./ValidatePattern');
const MAX_RATE_TYPE_LENGTH = 15;
const MAX_REF_CURRENCY_LENGTH = 3;
const referenceCurrencyField = 'referenceCurrencyThreeLetterISOCode';
const exchangeRateTypeField = 'exchangeRateType';

async function validateFieldsForExchangeRateTypes(data) {
  validateRateTypePattern(data.exchangeRateType);
  validateReferencCurrencyInversionAllowed(data.isInversionAllowed, data.referenceCurrencyThreeLetterISOCode);
  setInversionAllowedWhenNull(data);
}

function validateReferencCurrencyInversionAllowed(isInversionAllowed, referenceCurrency) {
  if (!util.isNullish(referenceCurrency)) {
    validateReferenceCurrencyCode(referenceCurrency);
    validateInversionAllowed(isInversionAllowed);
  }
}

function setInversionAllowedWhenNull(data) {
  if (util.isNullish(data.isInversionAllowed)) {
    data.isInversionAllowed = Constants.DEFAULT_VALUE_FOR_IS_INVERSION_ALLOWED_VALUE;
  }
}

function validateReferenceCurrencyCode(referenceCurrencyThreeLetterISOCode) {
  validatePattern(
    Constants.CURRENCY_CODE_PATTERN,
    referenceCurrencyField,
    referenceCurrencyThreeLetterISOCode,
    MAX_REF_CURRENCY_LENGTH
  );
}

function validateInversionAllowed(isInversionAllowed) {
  if (isInversionAllowed) {
    logger.error(RateTypeExtensionConstants.INVALID_COMBINATION_OF_INVERSION_REF_CURRENCY);
    throw new ValidationError(
      RateTypeExtensionConstants.INVALID_COMBINATION_OF_INVERSION_REF_CURRENCY,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

function validateRateTypePattern(exchangeRateType) {
  validatePattern(Constants.EXCHANGE_RATE_TYPE_PATTERN, exchangeRateTypeField, exchangeRateType, MAX_RATE_TYPE_LENGTH);
}

module.exports = {
  validateFieldsForExchangeRateTypes
};
