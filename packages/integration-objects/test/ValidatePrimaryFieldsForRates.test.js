/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { ValidationError } = require('../srv/exceptions/validation-error');
const {
  validatePrimaryKeyFieldsForCurrencyExchangeRate
} = require('../srv/validations/ValidatePrimaryFieldsForRates');
const ErrorStatuses = require('../srv/utils/ErrorStatuses');
const RateExtensionConstants = require('../srv/utils/RateExtensionConstants');

describe('validate valid fields among primary keys', function () {
  it('does not return any error- primary keys validation', function () {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'CND',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    expect(() => validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj));
  });

  it('dataProviderCode null check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: null,
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    await expect(
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_DATA_PROVIDER_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('dataProviderCode exceeds 15 characters check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'abcdefghijklmnop',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    await expect(
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_DATA_PROVIDER_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('dataSource null check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: null,
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    await expect(
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_DATA_SOURCE_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('dataSource exceeds 15 characters check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'abcdefghijklmnop',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    await expect(
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_DATA_SOURCE_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('exchangeRateType negative pattern check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: '!aA',
      fromCurrencyThreeLetterISOCode: 'CND',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    await expect(
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_EXCHANGE_RATE_TYPE_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('fromCurrencyThreeLetterISOCode wrong pattern check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: '123',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    await expect(
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_FROM_CURRENCY_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('toCurrencyThreeLetterISOCode wrong pattern check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INRSS',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    await expect(
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_TO_CURRENCY_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('toCurrencyThreeLetterISOCode wrong pattern check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    await expect(
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.FROM_AND_TO_CURRENCY_ARE_SAME,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('validateFromDateTime null check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INRSS',
      validFromDateTime: null,
      exchangeRateValue: '80.00'
    };
    await expect(
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_TO_CURRENCY_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });
});
