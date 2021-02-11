/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const Constants = require('../utils/Constants');
const { ValidationError } = require('../exceptions/validation-error');
const { logger } = require('../logging/Logger');
const ErrorStatuses = require('../utils/ErrorStatuses');
const RateExtensionConstants = require('../utils/RateExtensionConstants');
const { validatePattern } = require('../validations/ValidatePattern');
const { validateLength } = require('./ValidateLength');
const MAX_CURRENCY_CODE_LENGTH = 3;
const MAX_EXCHANGE_RATE_TYPE_LENGTH = 15;
const MAX_VALUE_DATA_SOURCE_DATA_PROVIDER = 15;
const toCurrencyField = 'toCurrencyThreeLetterISOCode';
const fromCurrencyField = 'fromCurrencyThreeLetterISOCode';
const exchangeRateTypeField = 'exchangeRateType';
const dataSourceField = 'dataSource';
const dataProviderCodeField = 'dataProviderCode';

async function validatePrimaryKeyFieldsForCurrencyExchangeRate(data) {
  await validateDataProviderCode(data.dataProviderCode);
  await validateDataSource(data.dataSource);
  await validateRateTypePattern(data.exchangeRateType);
  await validateFromCurrencyPattern(data.fromCurrencyThreeLetterISOCode);
  await validateToCurrencyPattern(data.toCurrencyThreeLetterISOCode);
  validateFromAndToCurrencyEquality(data.fromCurrencyThreeLetterISOCode, data.toCurrencyThreeLetterISOCode);
  validateFromDateTime(data.validFromDateTime);
}

function validateFromDateTime(validFromDateTime) {
  if (util.isNullish(validFromDateTime)) {
    logger.error(`Valid date time field value ${validFromDateTime} provided is invalid.`);
    throw new ValidationError(RateExtensionConstants.INVALID_DATE_TIME_VALUE_FIELD, ErrorStatuses.BAD_REQUEST);
  }
}

function validateFromAndToCurrencyEquality(fromCurrencyThreeLetterISOCode, toCurrencyThreeLetterISOCode) {
  if (fromCurrencyThreeLetterISOCode === toCurrencyThreeLetterISOCode) {
    logger.error(
      `From currency value ${fromCurrencyThreeLetterISOCode} and 
      to currency field value ${fromCurrencyThreeLetterISOCode} provided are same.`
    );
    throw new ValidationError(RateExtensionConstants.FROM_AND_TO_CURRENCY_ARE_SAME, ErrorStatuses.BAD_REQUEST);
  }
}

async function validateToCurrencyPattern(toCurrencyThreeLetterISOCode) {
  await validatePattern(
    Constants.CURRENCY_CODE_PATTERN,
    toCurrencyField,
    toCurrencyThreeLetterISOCode,
    MAX_CURRENCY_CODE_LENGTH
  );
}

async function validateFromCurrencyPattern(fromCurrencyThreeLetterISOCode) {
  await validatePattern(
    Constants.CURRENCY_CODE_PATTERN,
    fromCurrencyField,
    fromCurrencyThreeLetterISOCode,
    MAX_CURRENCY_CODE_LENGTH
  );
}

async function validateRateTypePattern(exchangeRateType) {
  await validatePattern(
    Constants.EXCHANGE_RATE_TYPE_PATTERN,
    exchangeRateTypeField,
    exchangeRateType,
    MAX_EXCHANGE_RATE_TYPE_LENGTH
  );
}

async function validateDataSource(dataSource) {
  await validateLength(dataSourceField, dataSource, MAX_VALUE_DATA_SOURCE_DATA_PROVIDER);
}

async function validateDataProviderCode(dataProviderCode) {
  await validateLength(dataProviderCodeField, dataProviderCode, MAX_VALUE_DATA_SOURCE_DATA_PROVIDER);
}

module.exports = {
  validatePrimaryKeyFieldsForCurrencyExchangeRate
};
