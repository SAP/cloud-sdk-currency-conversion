/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { ValidationError } = require('../srv/exceptions/validation-error');
const {
  validatePrimaryCompositeKeysForTenantConfig
} = require('../srv/validations/ValidatePrimaryKeysForTenantConfig');
const ErrorStatuses = require('../srv/utils/ErrorStatuses');
const TenantConfigExtensionConstants = require('../srv/utils/TenantConfigExtensionConstants');

describe('validate fields for tenant config', function () {
  it('does not return any error- tenant config', function () {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'TW',
      defaultDataSource: 'THR'
    };
    expect(() => validatePrimaryCompositeKeysForTenantConfig(reqObj));
  });

  it('defaultDataProviderCode null check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: null,
      defaultDataSource: 'THR'
    };
    await expect(
      validatePrimaryCompositeKeysForTenantConfig(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        TenantConfigExtensionConstants.INVALID_DEFAULT_DATA_PROVIDER_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('defaultDataProviderCode exceeds 15 characters check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'abcdefghijklmnop',
      defaultDataSource: 'THR'
    };
    await expect(
      validatePrimaryCompositeKeysForTenantConfig(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        TenantConfigExtensionConstants.INVALID_DEFAULT_DATA_PROVIDER_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('defaultDataSource null check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'THR',
      defaultDataSource: null
    };
    await expect(
      validatePrimaryCompositeKeysForTenantConfig(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        TenantConfigExtensionConstants.INVALID_DEFAULT_DATA_SOURCE_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('defaultDataSource exceeds 15 characters check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'TW',
      defaultDataSource: 'abcdefghijklmnop'
    };
    await expect(
      validatePrimaryCompositeKeysForTenantConfig(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        TenantConfigExtensionConstants.INVALID_DEFAULT_DATA_SOURCE_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });

  it('isConfigurationActiveCheck when not set in the payload', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'TW',
      defaultDataSource: 'abc'
    };
    await validatePrimaryCompositeKeysForTenantConfig(reqObj);
    expect(reqObj.isConfigurationActive).toBeFalsy();
  });

  it('connectToSAPMarketRatesManagement wrong pattern check', async () => {
    const reqObj = {
      tenantID: 'tenant1',
      defaultDataProviderCode: 'TW',
      defaultDataSource: 'THR',
      connectToSAPMarketRatesManagement: 'mrm',
      destinationName: '*ABc'
    };
    await expect(
      validatePrimaryCompositeKeysForTenantConfig(reqObj)
    ).rejects.toThrow(
      new ValidationError(
        TenantConfigExtensionConstants.INVALID_DESTINATION_NAME_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      )
    );
  });
});
