/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
const { validateLength } = require('../srv/validations/ValidateLength');

describe('validate length', function () {
  it('method does not throw any error', function () {
    const reqObj = {
      locale: 'en'
    };
    expect(validateLength('locale', reqObj.locale, 14)).toBeUndefined();
  });

  it('validate locale value null- returns error', function () {
    const reqObj = {
      locale: null
    };
    expect(() => validateLength('locale', reqObj.locale, 14)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for locale. The value must be 1 - 14 characters long."'
    );
  });

  it('validate locale value greater than maxLength- returns error', function () {
    const reqObj = {
      locale: 'abcdefghijklmno'
    };
    expect(() => validateLength('locale', reqObj.locale, 14)).toThrowErrorMatchingInlineSnapshot(
      '"Provide a valid value for locale. The value must be 1 - 14 characters long."'
    );
  });
});
