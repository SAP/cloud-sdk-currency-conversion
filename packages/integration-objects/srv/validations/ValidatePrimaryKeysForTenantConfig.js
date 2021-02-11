/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const Constants = require('../utils/Constants');
const { validateLength } = require('./ValidateLength');
const { validatePattern } = require('./ValidatePattern');
const destinationNameField = 'destinationName';
const defaultDataSourceField = 'defaultDataSource';
const defaultDataProviderCodeField = 'defaultDataProviderCode';
const MAX_DESTINATION_NAME_LENGTH = 200;
const MAX_VALUE_DATA_SOURCE_DATA_PROVIDER = 15;

async function validatePrimaryCompositeKeysForTenantConfig(data) {
  validateDefaultDataProviderCode(data.defaultDataProviderCode);
  validateDefaultDataSource(data.defaultDataSource);
  setIsConfigurationActiveIfNull(data);
  validateConnectionToMRM(data);
}

function validateConnectionToMRM(data) {
  if (!util.isNullish(data.connectToSAPMarketRatesManagement)) {
    validatePattern(
      Constants.DESTINATION_NAME_PATTERN,
      destinationNameField,
      data.destinationName,
      MAX_DESTINATION_NAME_LENGTH
    );
  }
}

function setIsConfigurationActiveIfNull(data) {
  if (data.isConfigurationActive == null) {
    data.isConfigurationActive = false;
  }
}

function validateDefaultDataSource(defaultDataSource) {
  validateLength(defaultDataSourceField, defaultDataSource, MAX_VALUE_DATA_SOURCE_DATA_PROVIDER);
}

function validateDefaultDataProviderCode(defaultDataProviderCode) {
  validateLength(defaultDataProviderCodeField, defaultDataProviderCode, MAX_VALUE_DATA_SOURCE_DATA_PROVIDER);
}

module.exports = {
  validatePrimaryCompositeKeysForTenantConfig
};
