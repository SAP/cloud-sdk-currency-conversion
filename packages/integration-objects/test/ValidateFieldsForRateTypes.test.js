/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { validateFieldsForExchangeRateTypes } = require('../srv/validations/ValidateFieldsForRateTypes');
const RateTypeExtensionConstants = require('../srv/utils/RateTypeExtensionConstants');

describe('validate fields of rate type', function () {
  it('does not throw any error', function () {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: 'A',
      exchangeRateTypeDescription: 'sample',
      isInversionAllowed: false,
      referenceCurrencyThreeLetterISOCode: 'EUR'
    };
    expect(validateFieldsForExchangeRateTypes(reqObj)).toBeUndefined();
  });

  it('exchangeRate type negative check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: '@A12',
      exchangeRateTypeDescription: 'sample',
      isInversionAllowed: false,
      referenceCurrencyThreeLetterISOCode: 'EUR'
    };
    try {
      validateFieldsForExchangeRateTypes(reqObj);
    } catch (err) {
      expect(err.message).toBe('Provide a valid value for exchangeRateType. The value must be 1 - 15 characters long.');
    }
  });

  it('isInversionAllowed negative check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: 'A',
      exchangeRateTypeDescription: 'sample',
      isInversionAllowed: true,
      referenceCurrencyThreeLetterISOCode: 'EUR'
    };
    try {
      validateFieldsForExchangeRateTypes(reqObj);
    } catch (err) {
      expect(err.message).toBe(RateTypeExtensionConstants.INVALID_COMBINATION_OF_INVERSION_REF_CURRENCY);
    }
  });

  it('referenceCurrency negative check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: 'A',
      exchangeRateTypeDescription: 'sample',
      isInversionAllowed: false,
      referenceCurrencyThreeLetterISOCode: 'ESUR'
    };
    try {
      validateFieldsForExchangeRateTypes(reqObj);
    } catch (err) {
      expect(err.message).toBe(
        'Provide a valid value for referenceCurrencyThreeLetterISOCode. The value must be 1 - 3 characters long.'
      );
    }
  });

  it('isInversionAllowed value check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: 'A',
      exchangeRateTypeDescription: 'sample',
      referenceCurrencyThreeLetterISOCode: 'EUR'
    };
    validateFieldsForExchangeRateTypes(reqObj);
    expect(reqObj.isInversionAllowed).toBeFalsy();
  });
});
