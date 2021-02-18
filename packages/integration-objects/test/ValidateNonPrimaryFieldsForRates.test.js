/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const {
  validateNonPrimaryKeyFieldsForCurrencyExchangeRate
} = require('../srv/validations/ValidateNonPrimaryFieldsForRates');

describe('validate valid fields among non-primary keys', function () {
  it('does not throw any error', function () {
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
    expect(validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj)).toBeUndefined();
  });

  it('toCurrencyFactor negative check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'CND',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00',
      toCurrencyFactor: '-2'
    };
    expect(() => validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for \'To Currency Factor\'. The value must be greater than zero."'
    );
  });

  it('fromCurrencyFactor negative check', () => {
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
    expect(() => validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for \'From Currency Factor\'. The value must be greater than zero."'
    );
  });

  it('fromCurrencyFactor null check', () => {
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
    validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    expect(reqObj.fromCurrencyFactor).toBe(1);
  });

  it('toCurrencyFactor null check', () => {
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
    validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    expect(reqObj.toCurrencyFactor).toBe(1);
  });

  it('negative exchange rate value check', () => {
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
    expect(() => validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for \'Exchange Rate Value\'. The value must be greater than equal to zero."'
    );
  });

  it('exchange rate value null check', () => {
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
    expect(() => validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for \'Exchange Rate Value\'. The value must be greater than equal to zero."'
    );
  });

  it('rateValueIndirect null check', () => {
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
    validateNonPrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    expect(reqObj.rateValueIndirect).toBeFalsy();
  });
});
