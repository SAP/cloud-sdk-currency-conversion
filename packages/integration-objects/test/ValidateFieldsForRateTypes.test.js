/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { validateFieldsForExchangeRateTypes } = require('../srv/validations/ValidateFieldsForRateTypes');

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
    expect(() => validateFieldsForExchangeRateTypes(reqObj)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for exchangeRateType. The value must be 1 - 15 characters long."'
    );
  });

  it('isInversionAllowed negative check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: 'A',
      exchangeRateTypeDescription: 'sample',
      isInversionAllowed: true,
      referenceCurrencyThreeLetterISOCode: 'EUR'
    };
    expect(() => validateFieldsForExchangeRateTypes(reqObj)).toThrowErrorMatchingInlineSnapshot(
      '"Valid values must be provided to either of Inversion Allowed or Reference Currency fields and not both of it."'
    );
  });

  it('referenceCurrency negative check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: 'A',
      exchangeRateTypeDescription: 'sample',
      isInversionAllowed: false,
      referenceCurrencyThreeLetterISOCode: 'ESUR'
    };
    expect(() => validateFieldsForExchangeRateTypes(reqObj)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for referenceCurrencyThreeLetterISOCode. The value must be 1 - 3 characters long."'
    );
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
