/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { validateFieldsForExchangeRateTypeDescription } = require('../srv/validations/ValidateFieldsForRateTypeDesc');

describe('validate fields of rate type description', function () {
  it('does not throw any error', function () {
    const reqObj = {
      locale: 'en',
      exchangeRateTypeDescription: 'sample'
    };
    const params = {
      ID: 'id'
    };
    expect(validateFieldsForExchangeRateTypeDescription(reqObj, params)).toBeUndefined();
  });

  it('locale empty check', () => {
    const reqObj = {
      locale: null,
      exchangeRateTypeDescription: 'sample'
    };
    const params = {
      ID: 'id'
    };
    expect(() => validateFieldsForExchangeRateTypeDescription(reqObj, params)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for locale. The value must be 1 - 14 characters long."'
    );
  });

  it('locale undefined check', () => {
    const reqObj = {
      locale: undefined,
      exchangeRateTypeDescription: 'sample'
    };
    const params = {
      ID: 'id'
    };
    expect(() => validateFieldsForExchangeRateTypeDescription(reqObj, params)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for locale. The value must be 1 - 14 characters long."'
    );
  });

  it('locale greater than 14 check', () => {
    const reqObj = {
      locale: 'abcdefghijklmno',
      exchangeRateTypeDescription: 'sample'
    };
    const params = {
      ID: 'id'
    };
    expect(() => validateFieldsForExchangeRateTypeDescription(reqObj, params)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for locale. The value must be 1 - 14 characters long."'
    );
  });

  it('id empty check', () => {
    const data = {
      locale: 'en',
      exchangeRateTypeDescription: 'sample'
    };
    const params = null;
    expect(() => validateFieldsForExchangeRateTypeDescription(data, params)).toThrowErrorMatchingInlineSnapshot(
      '"Please provide a valid value for \'ID\'. It must be associated with exchange rate type of your tenant."'
    );
  });

  it('exchangeRateTypeDescription value null', () => {
    const reqObj = {
      locale: 'en',
      exchangeRateTypeDescription: null
    };
    const params = {
      ID: 'id'
    };
    expect(() => validateFieldsForExchangeRateTypeDescription(reqObj, params)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for exchangeRateTypeDescription. The value must be 1 - 30 characters long."'
    );
  });

  it('exchangeRateTypeDescription value greater than 30', () => {
    const reqObj = {
      locale: 'en',
      exchangeRateTypeDescription: 'This is a description greater than thirty characters'
    };
    const params = {
      ID: 'id'
    };
    expect(() => validateFieldsForExchangeRateTypeDescription(reqObj, params)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for exchangeRateTypeDescription. The value must be 1 - 30 characters long."'
    );
  });
});
