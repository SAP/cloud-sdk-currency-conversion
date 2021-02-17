/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const Constants = require('../utils/Constants');
const { ValidationError } = require('../exceptions/validation-error');
const { logger } = require('../logging/Logger');
const ErrorStatuses = require('../utils/ErrorStatuses');
const TenantConfigExtensionConstants = require('../utils/TenantConfigExtensionConstants');

async function validatePrimaryCompositeKeysForTenantConfig(data) {
  // validate the length of the dataProviderCode in the payload
  validateDefaultDataProviderCode(data.defaultDataProviderCode);
  // validate the length of the dataSource in the payload
  validateDefaultDataSource(data.defaultDataSource);
  setIsConfigurationActiveIfNull(data);
  validateConnectionToMRM(data);
}

function validateConnectionToMRM(data) {
  if (!util.isNullish(data.connectToSAPMarketRatesManagement)) {
    if (!Constants.DESTINATION_NAME_PATTERN.test(data.destinationName)) {
      logger.error('The value for destinationName in the payload is invalid.');
      throw new ValidationError(
        TenantConfigExtensionConstants.INVALID_DESTINATION_NAME_FIELD_VALUE,
        ErrorStatuses.BAD_REQUEST
      );
    }
  }
}

function setIsConfigurationActiveIfNull(data) {
  if (data.isConfigurationActive == null) {
    data.isConfigurationActive = false;
  }
}

function validateDefaultDataSource(defaultDataSource) {
  if (
    util.isNullish(defaultDataSource) ||
    defaultDataSource.trim().length < Constants.MIN_VALUE_DATA_SOURCE_DATA_PROVIDER ||
    defaultDataSource.trim().length > Constants.MAX_VALUE_DATA_SOURCE_DATA_PROVIDER
  ) {
    logger.error('DefaultDataSource value is null : {} provided is invalid.');
    throw new ValidationError(
      TenantConfigExtensionConstants.INVALID_DEFAULT_DATA_SOURCE_FIELD_VALUE,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

function validateDefaultDataProviderCode(defaultDataProviderCode) {
  if (
    util.isNullish(defaultDataProviderCode) ||
    defaultDataProviderCode.trim().length < Constants.MIN_VALUE_DATA_SOURCE_DATA_PROVIDER ||
    defaultDataProviderCode.trim().length > Constants.MAX_VALUE_DATA_SOURCE_DATA_PROVIDER
  ) {
    logger.error('DefaultDataProviderCode value provided is invalid.');
    throw new ValidationError(
      TenantConfigExtensionConstants.INVALID_DEFAULT_DATA_PROVIDER_FIELD_VALUE,
      ErrorStatuses.BAD_REQUEST
    );
  }
}

module.exports = {
  validatePrimaryCompositeKeysForTenantConfig
};
