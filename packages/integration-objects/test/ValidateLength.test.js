/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
const { validateLength } = require('../srv/validations/ValidateLength');

describe('validate length', function () {
  it('method does not return any error', function () {
    const reqObj = {
      locale: 'en'
    };
    expect(() => validateLength('locale', reqObj.locale, 14));
  });

  it('validate locale value null- returns error', function () {
    const reqObj = {
      locale: null
    };
    try {
      validateLength('locale', reqObj.locale, 14);
    } catch (err) {
      expect(err.message).toBe('Provide a valid value for locale. The value must be 1 - 14 characters long.');
    }
  });

  it('validate locale value greater than maxLength- returns error', function () {
    const reqObj = {
      locale: 'abcdefghijklmno'
    };
    try {
      validateLength('locale', reqObj.locale, 14);
    } catch (err) {
      expect(err.message).toBe('Provide a valid value for locale. The value must be 1 - 14 characters long.');
    }
  });
});
