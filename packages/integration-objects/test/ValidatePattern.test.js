/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
const { validatePattern } = require('../srv/validations/ValidatePattern');
const Constants = require('../srv/utils/Constants');

describe('validate pattern', function () {
  it('validatePattern method does not return any error', async function () {
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

  it('validate fromCurrency value null- returns error', async function () {
    const reqObj = {
      fromCurrencyThreeLetterISOCode: null
    };
    await expect(
      validatePattern(
        Constants.CURRENCY_CODE_PATTERN,
        'fromCurrencyThreeLetterISOCode',
        reqObj.fromCurrencyThreeLetterISOCode,
        3
      )
    ).rejects.toThrow(
      'Provide a valid value for fromCurrencyThreeLetterISOCode. The value must be 1 - 3 characters long.'
    );
  });

  it('validate fromCurrency value invalid- returns error', async function () {
    const reqObj = {
      fromCurrencyThreeLetterISOCode: '@12'
    };
    await expect(
      validatePattern(
        Constants.CURRENCY_CODE_PATTERN,
        'fromCurrencyThreeLetterISOCode',
        reqObj.fromCurrencyThreeLetterISOCode,
        3
      )
    ).rejects.toThrow(
      'Provide a valid value for fromCurrencyThreeLetterISOCode. The value must be 1 - 3 characters long.'
    );
  });
});
