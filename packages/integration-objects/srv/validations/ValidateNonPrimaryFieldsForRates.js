/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const { ValidationError } = require('../exceptions/validation-error');
const { logger } = require('../logging/Logger');
const Constants = require('../utils/Constants');
const ErrorStatuses = require('../utils/ErrorStatuses');
const RateExtensionConstants = require('../utils/RateExtensionConstants');

async function validateNonPrimaryKeyFieldsForCurrencyExchangeRate(data) {
  validateExchangeRateValue(data);
  setRateValueIndirect(data);
  validateFromCurrencyFactor(data);
  validateToCurrencyFactor(data);
}

module.exports = {
  validateNonPrimaryKeyFieldsForCurrencyExchangeRate
};

function validateToCurrencyFactor(data) {
  if (util.isNullish(data.toCurrencyFactor)) {
    data.toCurrencyFactor = Constants.DEFAULT_VALUE_FOR_CURRENCY_FACTORS;
  } else if (data.toCurrencyFactor < 1) {
    logger.error(`To currency factor ${data.toCurrencyFactor} value provided is invalid`);
    throw new ValidationError(RateExtensionConstants.INVALID_TO_CURRENCY_FACTOR_VALUE_FIELD, ErrorStatuses.BAD_REQUEST);
  }
}

function validateFromCurrencyFactor(data) {
  if (util.isNullish(data.fromCurrencyFactor)) {
    data.fromCurrencyFactor = Constants.DEFAULT_VALUE_FOR_CURRENCY_FACTORS;
  } else if (data.fromCurrencyFactor < 1) {
    logger.error(`From currency factor ${data.toCurrencyFactor} value provided is invalid`);
    throw new ValidationError(
      RateExtensionConstants.INVALID_FROM_CURRENCY_FACTOR_VALUE_FIELD,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

function setRateValueIndirect(data) {
  if (util.isNullish(data.isRateValueIndirect)) {
    data.isRateValueIndirect = Constants.DEFAULT_VALUE_FOR_IS_DIRECT_VALUE;
  }
}

function validateExchangeRateValue(data) {
  if (util.isNullish(data.exchangeRateValue) || data.exchangeRateValue < 0) {
    logger.error(`Exchange Rate field value ${data.exchangeRateValue} provided is invalid`);
    throw new ValidationError(RateExtensionConstants.INVALID_EXCHANGE_RATE_VALUE_FIELD, ErrorStatuses.BAD_REQUEST);
  }
}
