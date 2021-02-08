/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { ValidationError } = require('../srv/exceptions/validation-error');
const { validateFieldsForExchangeRateTypes } = require('../srv/validations/ValidateFieldsForRateTypes');
const ErrorStatuses = require('../srv/utils/ErrorStatuses');
const RateTypeExtensionConstants = require('../srv/utils/RateTypeExtensionConstants');

describe('validate fields of rate type', function () {
  it('does not return any error', function () {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: 'A',
      exchangeRateTypeDescription: 'sample',
      isInversionAllowed: false,
      referenceCurrencyThreeLetterISOCode: 'EUR'
    };
    expect(() => validateFieldsForExchangeRateTypes(reqObj));
  });

  it('exchangeRate type negative check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: '@A12',
      exchangeRateTypeDescription: 'sample',
      isInversionAllowed: false,
      referenceCurrencyThreeLetterISOCode: 'EUR'
    };
    await expect(validateFieldsForExchangeRateTypes(reqObj)).rejects.toThrow(
      new ValidationError(RateTypeExtensionConstants.INVALID_EXCHANGE_RATE_TYPE_FIELD_VALUE, ErrorStatuses.BAD_REQUEST)
    );
  });

  it('isInversionAllowed negative check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: 'A',
      exchangeRateTypeDescription: 'sample',
      isInversionAllowed: true,
      referenceCurrencyThreeLetterISOCode: 'EUR'
    };
    await expect(validateFieldsForExchangeRateTypes(reqObj)).rejects.toThrow(
      new ValidationError(
        RateTypeExtensionConstants.INVALID_COMBINATION_OF_INVERSION_REF_CURRENCY,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('referenceCurrency negative check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: 'A',
      exchangeRateTypeDescription: 'sample',
      isInversionAllowed: false,
      referenceCurrencyThreeLetterISOCode: 'ESUR'
    };
    await expect(validateFieldsForExchangeRateTypes(reqObj)).rejects.toThrow(
      new ValidationError(RateTypeExtensionConstants.INVALID_REFERENCE_CURRENCY_VALUE_FIELD, ErrorStatuses.BAD_REQUEST)
    );
  });

  it('isInversionAllowed value check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      exchangeRateType: 'A',
      exchangeRateTypeDescription: 'sample',
      referenceCurrencyThreeLetterISOCode: 'EUR'
    };
    await validateFieldsForExchangeRateTypes(reqObj);
    expect(reqObj.isInversionAllowed).toBeFalsy();
  });
});
