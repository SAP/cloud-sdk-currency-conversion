/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const { ValidationError } = require('../exceptions/validation-error');
const { logger } = require('../logging/Logger');
const Constants = require('../utils/Constants');
const ErrorStatuses = require('../utils/ErrorStatuses');
const RateTypeExtensionConstants = require('../utils/RateTypeExtensionConstants');

async function validateFieldsForExchangeRateTypeDescription(data, params) {
  validateLocale(data);
  validateTextID(params);
  validateTextDescription(data);
}

function validateTextDescription(data) {
  if (
    util.isNullish(data.exchangeRateTypeDescription) ||
    data.exchangeRateTypeDescription.trim().length < Constants.MIN_VALUE_EXCHANGE_RATE_TYPE_DESCRIPTION ||
    data.exchangeRateTypeDescription.trim().length > Constants.MAX_VALUE_EXCHANGE_RATE_TYPE_DESCRIPTION
  ) {
    logger.error('ExchangeRateTypeDescription value is null or the value provided is invalid.');
    throw new ValidationError(
      RateTypeExtensionConstants.INVALID_EXCHANGE_RATE_TYPE_DESCRIPTION_VALUE_FIELD,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

function validateTextID(ID) {
  if (util.isNullish(ID)) {
    throw new ValidationError(
      RateTypeExtensionConstants.INVALID_ID_PROVIDED_FOR_EXCHANGE_RATE_TYPE_DESCRIPTION,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

function validateLocale(data) {
  if (
    util.isNullish(data.locale) ||
    data.locale.trim().length < Constants.MIN_VALUE_LOCALE ||
    data.locale.trim().length > Constants.MAX_VALUE_LOCALE
  ) {
    logger.error('Locale field value provided is invalid');
    throw new ValidationError(RateTypeExtensionConstants.INVALID_LOCALE_FIELD, ErrorStatuses.BAD_REQUEST);
  }
}

module.exports = {
  validateFieldsForExchangeRateTypeDescription
};
