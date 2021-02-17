/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { validatePrimaryKeyFieldsForCurrencyExchangeRate } = require('../srv/validations/ValidatePrimaryFieldsForRates');
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
    expect(validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj)).toBeUndefined();
  });

  it('dataProviderCode null check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: null,
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'AED',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    try {
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    } catch (err) {
      expect(err.message).toBe('Provide a valid value for dataProviderCode. The value must be 1 - 15 characters long.');
    }
  });

  it('dataProviderCode exceeds 15 characters check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'abcdefghijklmnop',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'AED',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    try {
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    } catch (err) {
      expect(err.message).toBe('Provide a valid value for dataProviderCode. The value must be 1 - 15 characters long.');
    }
  });

  it('dataSource null check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: null,
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'AED',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    try {
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    } catch (err) {
      expect(err.message).toBe('Provide a valid value for dataSource. The value must be 1 - 15 characters long.');
    }
  });

  it('dataSource exceeds 15 characters check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'abcdefghijklmnop',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'AED',
      toCurrencyThreeLetterISOCode: 'INR',
      validFromDateTime: '2020-02-28T06:38:29Z',
      exchangeRateValue: '80.00'
    };
    try {
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    } catch (err) {
      expect(err.message).toBe('Provide a valid value for dataSource. The value must be 1 - 15 characters long.');
    }
  });

  it('exchangeRateType negative pattern check', () => {
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
    try {
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    } catch (err) {
      expect(err.message).toBe('Provide a valid value for exchangeRateType. The value must be 1 - 15 characters long.');
    }
  });

  it('fromCurrencyThreeLetterISOCode wrong pattern check', () => {
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
    try {
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    } catch (err) {
      expect(err.message).toBe(
        'Provide a valid value for fromCurrencyThreeLetterISOCode. The value must be 1 - 3 characters long.'
      );
    }
  });

  it('toCurrencyThreeLetterISOCode wrong pattern check', () => {
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
    try {
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    } catch (err) {
      expect(err.message).toBe(
        'Provide a valid value for toCurrencyThreeLetterISOCode. The value must be 1 - 3 characters long.'
      );
    }
  });

  it('from and to equality pattern check', () => {
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
    try {
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    } catch (err) {
      expect(err.message).toBe("The 'From Currency' and 'To Currency' must be different from each other.");
    }
  });

  it('validateFromDateTime null check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      dataProviderCode: 'TW',
      dataSource: 'THR',
      exchangeRateType: 'aA',
      fromCurrencyThreeLetterISOCode: 'INR',
      toCurrencyThreeLetterISOCode: 'AED',
      validFromDateTime: null,
      exchangeRateValue: '80.00'
    };
    try {
      validatePrimaryKeyFieldsForCurrencyExchangeRate(reqObj);
    } catch (err) {
      expect(err.message).toBe(RateExtensionConstants.INVALID_DATE_TIME_VALUE_FIELD);
      expect(err.code).toBe(ErrorStatuses.BAD_REQUEST);
    }
  });
});
