/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
const { validatePattern } = require('../srv/validations/ValidatePattern');
const Constants = require('../srv/utils/Constants');

describe('validate pattern', function () {
  it('validatePattern method does not return any error', function () {
    const reqObj = {
      fromCurrencyThreeLetterISOCode: 'INR'
    };
    expect(() =>
      validatePattern(
        Constants.CURRENCY_CODE_PATTERN,
        'fromCurrencyThreeLetterISOCode',
        reqObj.fromCurrencyThreeLetterISOCode,
        3
      )
    );
  });

  it('validate fromCurrency value null- returns error', function () {
    const reqObj = {
      fromCurrencyThreeLetterISOCode: null
    };
    try {
      validatePattern(
        Constants.CURRENCY_CODE_PATTERN,
        'fromCurrencyThreeLetterISOCode',
        reqObj.fromCurrencyThreeLetterISOCode,
        3
      );
    } catch (err) {
      expect(err.message).toBe(
        'Provide a valid value for fromCurrencyThreeLetterISOCode. The value must be 1 - 3 characters long.'
      );
    }
  });

  it('validate fromCurrency value invalid- returns error', function () {
    const reqObj = {
      fromCurrencyThreeLetterISOCode: '@12'
    };
    try {
      validatePattern(
        Constants.CURRENCY_CODE_PATTERN,
        'fromCurrencyThreeLetterISOCode',
        reqObj.fromCurrencyThreeLetterISOCode,
        3
      );
    } catch (err) {
      expect(err.message).toBe(
        'Provide a valid value for fromCurrencyThreeLetterISOCode. The value must be 1 - 3 characters long.'
      );
    }
  });
});
