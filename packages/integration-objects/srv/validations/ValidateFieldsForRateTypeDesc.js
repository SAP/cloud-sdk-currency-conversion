/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const { ValidationError } = require('../exceptions/validation-error');
const ErrorStatuses = require('../utils/ErrorStatuses');
const RateTypeExtensionConstants = require('../utils/RateTypeExtensionConstants');
const { validateLength } = require('./ValidateLength');
const exchangeRateTypeDescField = 'exchangeRateTypeDescription';
const localeField = 'locale';
const MAX_VALUE_LOCALE = 14;
const MAX_VALUE_EXCHANGE_RATE_TYPE_DESCRIPTION = 30;

async function validateFieldsForExchangeRateTypeDescription(data, params) {
  await validateLocale(data);
  validateTextID(params);
  await validateTextDescription(data);
}

async function validateTextDescription(data) {
  await validateLength(exchangeRateTypeDescField, data.exchangeRateTypeDescription, MAX_VALUE_EXCHANGE_RATE_TYPE_DESCRIPTION);
}

function validateTextID(ID) {
  if (util.isNullish(ID)) {
    throw new ValidationError(
      RateTypeExtensionConstants.INVALID_ID_PROVIDED_FOR_EXCHANGE_RATE_TYPE_DESCRIPTION,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

async function validateLocale(data) {
  await validateLength(localeField, data.locale, MAX_VALUE_LOCALE);
}

module.exports = {
  validateFieldsForExchangeRateTypeDescription
};