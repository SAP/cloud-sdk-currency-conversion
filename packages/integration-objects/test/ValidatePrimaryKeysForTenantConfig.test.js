/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const {
  validatePrimaryCompositeKeysForTenantConfig
} = require('../srv/validations/ValidatePrimaryKeysForTenantConfig');

describe('validate fields for tenant config', function () {
  it('does not return any error- tenant config', function () {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'TW',
      defaultDataSource: 'THR'
    };
    expect(validatePrimaryCompositeKeysForTenantConfig(reqObj)).toBeUndefined();
  });

  it('defaultDataProviderCode null check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: null,
      defaultDataSource: 'THR'
    };
    try {
      validatePrimaryCompositeKeysForTenantConfig(reqObj);
    } catch (err) {
      expect(err.message).toBe(
        'Provide a valid value for defaultDataProviderCode. The value must be 1 - 15 characters long.'
      );
    }
  });

  it('defaultDataProviderCode exceeds 15 characters check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'abcdefghijklmnop',
      defaultDataSource: 'THR'
    };
    try {
      validatePrimaryCompositeKeysForTenantConfig(reqObj);
    } catch (err) {
      expect(err.message).toBe(
        'Provide a valid value for defaultDataProviderCode. The value must be 1 - 15 characters long.'
      );
    }
  });

  it('defaultDataSource null check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'THR',
      defaultDataSource: null
    };
    try {
      validatePrimaryCompositeKeysForTenantConfig(reqObj);
    } catch (err) {
      expect(err.message).toBe(
        'Provide a valid value for defaultDataSource. The value must be 1 - 15 characters long.'
      );
    }
  });

  it('defaultDataSource exceeds 15 characters check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'TW',
      defaultDataSource: 'abcdefghijklmnop'
    };
    try {
      validatePrimaryCompositeKeysForTenantConfig(reqObj);
    } catch (err) {
      expect(err.message).toBe(
        'Provide a valid value for defaultDataSource. The value must be 1 - 15 characters long.'
      );
    }
  });

  it('isConfigurationActiveCheck when not set in the payload', () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'TW',
      defaultDataSource: 'abc'
    };
    validatePrimaryCompositeKeysForTenantConfig(reqObj);
    expect(reqObj.isConfigurationActive).toBeFalsy();
  });

  it('connectToSAPMarketRatesManagement wrong pattern check', () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'TW',
      defaultDataSource: 'THR',
      connectToSAPMarketRatesManagement: 'mrm',
      destinationName: '*ABc'
    };
    try {
      validatePrimaryCompositeKeysForTenantConfig(reqObj);
    } catch (err) {
      expect(err.message).toBe('Provide a valid value for destinationName. The value must be 1 - 200 characters long.');
    }
  });
});
