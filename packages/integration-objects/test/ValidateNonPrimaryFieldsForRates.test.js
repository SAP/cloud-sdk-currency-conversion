/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { ValidationError } = require('../srv/exceptions/validation-error');
const {
  validateNonPrimaryKeyFieldsForCurrencyExchangeRate
} = require('../srv/validations/ValidateNonPrimaryFieldsForRates');
const ErrorStatuses = require('../srv/utils/ErrorStatuses');
const RateExtensionConstants = require('../srv/utils/RateExtensionConstants');

describe('validate valid fields among non-primary keys', function () {
  it('does not return any error', function () {
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
    expect(() => validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj));
  });

  it('toCurrencyFactor negative check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00',
      toCurrencyFactor: '-2'
    };
    await expect(
      validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_TO_CURRENCY_FACTOR_VALUE_FIELD,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('fromCurrencyFactor negative check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00',
      fromCurrencyFactor: '-2'
    };
    await expect(
      validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_FROM_CURRENCY_FACTOR_VALUE_FIELD,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('fromCurrencyFactor null check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00',
      fromCurrencyFactor: null
    };
    await validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    expect(reqObj.fromCurrencyFactor).toBe(1);
  });

  it('toCurrencyFactor null check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00',
      toCurrencyFactor: null
    };
    await validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    expect(reqObj.toCurrencyFactor).toBe(1);
  });

  it('negative exchange rate value check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '-80.00'
    };
    await expect(
      validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_EXCHANGE_RATE_VALUE_FIELD,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('exchange rate value null check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: null
    };
    await expect(
      validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        RateExtensionConstants.INVALID_EXCHANGE_RATE_VALUE_FIELD,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('rateValueIndirect null check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00',
      rateValueIndirect: null
    };
    await validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    expect(reqObj.rateValueIndirect).toBeFalsy();
  });
});
