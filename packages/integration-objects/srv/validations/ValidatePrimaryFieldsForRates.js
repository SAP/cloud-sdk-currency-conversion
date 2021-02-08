/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const Constants = require('../utils/Constants');
const { ValidationError } = require('../exceptions/validation-error');
const { logger } = require('../logging/Logger');
const ErrorStatuses = require('../utils/ErrorStatuses');
const RateExtensionConstants = require('../utils/RateExtensionConstants');

async function validatePrimaryKeyFieldsForCurrencyExchangeRate(data) {
  validateDataProviderCode(data.dataProviderCode);
  validateDataSource(data.dataSource);
  validateRateTypePattern(data.exchangeRateType);
  validateFromCurrencyPattern(data.fromCurrencyThreeLetterISOCode);
  validateToCurrencyPattern(data.toCurrencyThreeLetterISOCode);
  validateFromAndToCurrencyEquality(data.fromCurrencyThreeLetterISOCode, data.toCurrencyThreeLetterISOCode);
  validateFromDateTime(data.validFromDateTime);
}

function validateFromDateTime(validFromDateTime) {
  if (util.isNullish(validFromDateTime)) {
    logger.error('Valid date time field value provided is invalid.');
    throw new ValidationError(RateExtensionConstants.INVALID_DATE_TIME_VALUE_FIELD, ErrorStatuses.BAD_REQUEST);
  }
}

function validateFromAndToCurrencyEquality(fromCurrencyThreeLetterISOCode, toCurrencyThreeLetterISOCode) {
  if (fromCurrencyThreeLetterISOCode === toCurrencyThreeLetterISOCode) {
    logger.error('From currency and to currency field values' + 'provided are same field value.');
    throw new ValidationError(RateExtensionConstants.FROM_AND_TO_CURRENCY_ARE_SAME, ErrorStatuses.BAD_REQUEST);
  }
}

function validateToCurrencyPattern(toCurrencyThreeLetterISOCode) {
  if (!Constants.CURRENCY_CODE_PATTERN.test(toCurrencyThreeLetterISOCode)) {
    logger.error('The value to field fromCurrencyThreeLetterISOCode' + 'in the payload is invalid');
    throw new ValidationError(RateExtensionConstants.INVALID_TO_CURRENCY_FIELD_VALUE, ErrorStatuses.BAD_REQUEST);
  }
}

function validateFromCurrencyPattern(fromCurrencyThreeLetterISOCode) {
  if (!Constants.CURRENCY_CODE_PATTERN.test(fromCurrencyThreeLetterISOCode)) {
    logger.error('The value for field fromCurrencyThreeLetterISOCode' + 'in the payload is invalid');
    throw new ValidationError(RateExtensionConstants.INVALID_FROM_CURRENCY_FIELD_VALUE, ErrorStatuses.BAD_REQUEST);
  }
}

function validateRateTypePattern(exchangeRateType) {
  if (!Constants.EXCHANGE_RATE_TYPE_PATTERN.test(exchangeRateType)) {
    logger.error('Exchange Rate Type field value provided is invalid.');
    throw new ValidationError(RateExtensionConstants.INVALID_EXCHANGE_RATE_TYPE_FIELD_VALUE, ErrorStatuses.BAD_REQUEST);
  }
}

function validateDataSource(dataSource) {
  if (
    util.isNullish(dataSource) ||
    dataSource.trim().length < Constants.MIN_VALUE_DATA_SOURCE_DATA_PROVIDER ||
    dataSource.trim().length > Constants.MAX_VALUE_DATA_SOURCE_DATA_PROVIDER
  ) {
    logger.error('Data source code field value provided is invalid.');
    throw new ValidationError(RateExtensionConstants.INVALID_DATA_SOURCE_FIELD_VALUE, ErrorStatuses.BAD_REQUEST);
  }
}

function validateDataProviderCode(dataProviderCode) {
  if (
    util.isNullish(dataProviderCode) ||
    dataProviderCode.trim().length < Constants.MIN_VALUE_DATA_SOURCE_DATA_PROVIDER ||
    dataProviderCode.trim().length > Constants.MAX_VALUE_DATA_SOURCE_DATA_PROVIDER
  ) {
    logger.error('Data provider field value provided is invalid');
    throw new ValidationError(RateExtensionConstants.INVALID_DATA_PROVIDER_FIELD_VALUE, ErrorStatuses.BAD_REQUEST);
  }
}

module.exports = {
  validatePrimaryKeyFieldsForCurrencyExchangeRate
};
