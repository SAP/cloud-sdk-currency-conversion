/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { ValidationError } = require('../srv/exceptions/validation-error');
const { validateFieldsForExchangeRateTypeDescription } = require('../srv/validations/ValidateFieldsForRateTypeDesc');
const ErrorStatuses = require('../srv/utils/ErrorStatuses');
const RateTypeExtensionConstants = require('../srv/utils/RateTypeExtensionConstants');

describe('validate fields of rate type description', function () {
  it('does not return any error', function () {
    const reqObj = {
      locale: 'en',
      exchangeRateTypeDescription: 'sample'
    };
    const params = {
      ID: 'id'
    };
    expect(() => validateFieldsForExchangeRateTypeDescription(reqObj, params));
  });

  it('locale empty check', async () => {
    const reqObj = {
      locale: null,
      exchangeRateTypeDescription: 'sample'
    };
    const params = {
      ID: 'id'
    };
    await expect(validateFieldsForExchangeRateTypeDescription(reqObj, params)).rejects.toThrow(
      "Provide a valid value for locale. The value must be 1 - 14 characters long.");
  });

  it('locale undefined check', async () => {
    const reqObj = {
      locale: undefined,
      exchangeRateTypeDescription: 'sample'
    };
    const params = {
      ID: 'id'
    };
    await expect(validateFieldsForExchangeRateTypeDescription(reqObj, params)).rejects.toThrow(
      "Provide a valid value for locale. The value must be 1 - 14 characters long.");
  });

  it('locale greater than 14 check', async () => {
    const reqObj = {
      locale: 'abcdefghijklmno',
      exchangeRateTypeDescription: 'sample'
    };
    const params = {
      ID: 'id'
    };
    await expect(validateFieldsForExchangeRateTypeDescription(reqObj, params)).rejects.toThrow(
      "Provide a valid value for locale. The value must be 1 - 14 characters long."
    );
  });

  it('id empty check', async () => {
    const data = {
      locale: 'en',
      exchangeRateTypeDescription: 'sample'
    };
    const params = null;
    await expect(validateFieldsForExchangeRateTypeDescription(data, params)).rejects.toThrow(
      new ValidationError(
        RateTypeExtensionConstants.INVALID_ID_PROVIDED_FOR_EXCHANGE_RATE_TYPE_DESCRIPTION,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('exchangeRateTypeDescription value null', async () => {
    const reqObj = {
      locale: 'en',
      exchangeRateTypeDescription: null
    };
    const params = {
      ID: 'id'
    };
    await expect(validateFieldsForExchangeRateTypeDescription(reqObj, params)).rejects.toThrow(
      "Provide a valid value for exchangeRateTypeDescritpion. The value must be 1 - 30 characters long."
    );
  });

  it('exchangeRateTypeDescription value greater than 30', async () => {
    const reqObj = {
      locale: 'en',
      exchangeRateTypeDescription: 'This is a description greater than thirty characters'
    };
    const params = {
      ID: 'id'
    };
    await expect(validateFieldsForExchangeRateTypeDescription(reqObj, params)).rejects.toThrow(
      "Provide a valid value for exchangeRateTypeDescritpion. The value must be 1 - 30 characters long."
    );
  });
});
