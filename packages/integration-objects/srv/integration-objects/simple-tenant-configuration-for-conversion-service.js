/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
const cds = require('@sap/cds');
const util = require('@sap-cloud-sdk/util');
const Constants = require('../utils/Constants');
const { ValidationError } = require('../exceptions/validation-error');
const { logger } = require('../logging/Logger');
const {
  validateTenantIdInPayload,
  validateDelete,
  checkAndAppendTenantIdFilterForReadEvent
} = require('../validations/Validations');
const { validatePrimaryCompositeKeysForTenantConfig } = require('../validations/ValidatePrimaryKeysForTenantConfig');
const ErrorStatuses = require('../utils/ErrorStatuses');
const TenantConfigExtensionConstants = require('../utils/TenantConfigExtensionConstants');
const { fetchCurrentAttributeValues } = require('../utils/FetchCurrentStateForAuditLog');
const { writeAuditLog } = require('../logging/AuditLogWriter');

module.exports = srv => {
  srv.before('READ', 'TenantConfigForConversions', beforeRead);
  srv.before('CREATE', 'TenantConfigForConversions', beforeCreate);
  srv.before('UPDATE', 'TenantConfigForConversions', beforeUpdate);
  srv.before('DELETE', 'TenantConfigForConversions', beforeDelete);

  srv.on('CREATE', 'TenantConfigForConversions', writeAuditLogForTenantConfig);
  srv.on('DELETE', 'TenantConfigForConversions', writeAuditLogForTenantConfig);
  srv.on('UPDATE', 'TenantConfigForConversions', writeAuditLogForTenantConfig);

  const { TenantConfigForConversions } = srv.entities;

  function beforeRead(req) {
    try {
      checkAndAppendTenantIdFilterForReadEvent(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeCreate(req) {
    try {
      validateTenantIdInPayload(req);
      validatePrimaryCompositeKeysForTenantConfig(req.data);
      await checkUniquenessForPrimaryKeys(req);
      await restrictMultipleCreationWithActiveConfiguration(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeUpdate(req) {
    try {
      validateTenantIdInPayload(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
    await checkUniquenessForPrimaryKeys(req);
  }

  function beforeDelete(req) {
    try {
      validateDelete(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function checkUniquenessForPrimaryKeys(req) {
    const record = req.data;
    const affectedRows = await fetchExistingTenantConfigurations(TenantConfigForConversions, record, req);
    checkForUniqueConstraintViolation(affectedRows, req);
  }

  async function restrictMultipleCreationWithActiveConfiguration(req) {
    const record = req.data;
    const affectedRows = await getActiveConfigurations(TenantConfigForConversions, record, req);
    checkForDuplicateConfigurations(affectedRows, req);
  }

  async function writeAuditLogForTenantConfig(req, next) {
    let currentValues;
    const data = req.data;
    const type = 'tenant-config-for-conversions';
    const auditParams = {
      defaultDataProviderCode: data.defaultDataProviderCode,
      defaultDataSource: data.defaultDataSource,
      isConfigurationActive: data.isConfigurationActive
    };

    let currentValuesIsNotEmpty = true;
    if (Constants.CREATE_EVENT !== req.event) {
      currentValues = await fetchCurrentAttributeValues(req, req.user.tenant, TenantConfigForConversions);
      currentValuesIsNotEmpty = !util.isNullish(currentValues);
    }

    if (currentValuesIsNotEmpty) {
      await writeAuditLog(req, auditParams, currentValues, type);
    }
    await next();
  }
};

function checkForUniqueConstraintViolation(affectedRows, req) {
  if (affectedRows.length) {
    if (req.event === Constants.CREATE_EVENT) {
      logger.error('Record found in an Active entity for CREATE event. The primary keys are not unique.');
      throw new ValidationError(
        TenantConfigExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_TENANT_CONFIG,
        ErrorStatuses.BAD_REQUEST
      );
    } else {
      const payloadId = req.data.ID;
      const recordId = affectedRows[0].ID;
      if (payloadId !== recordId) {
        logger.error('Record found in Active Entity for UPDATE. The primary keys are not unique.');
        throw new ValidationError(
          TenantConfigExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_TENANT_CONFIG,
          ErrorStatuses.BAD_REQUEST
        );
      }
    }
  }
}

async function fetchExistingTenantConfigurations(TenantConfigForConversions, record, req) {
  const query = SELECT.from(TenantConfigForConversions)
    .where({ tenantID: record.tenantID })
    .and({ defaultDataProviderCode: record.defaultDataProviderCode })
    .and({ defaultDataSource: record.defaultDataSource })
    .limit(1, 0);

  const tx = cds.transaction(req);
  const affectedRows = await tx.run(query);
  return affectedRows;
}

function checkForDuplicateConfigurations(affectedRows, req) {
  if (affectedRows.length) {
    logger.error('Record found in Active Entity: ', affectedRows);
    const tenantConfigID = req.ID;

    if (util.isNullish(tenantConfigID) || !affectedRows[0].ID === tenantConfigID) {
      logger.error('More than one configuration was activated.');
      throw new ValidationError(
        TenantConfigExtensionConstants.UNAUTHORIZED_TO_CREATE_NEW_RECORD,
        ErrorStatuses.BAD_REQUEST
      );
    }
  }
}

async function getActiveConfigurations(TenantConfigForConversions, record, req) {
  const query = SELECT.from(TenantConfigForConversions)
    .where({ tenantID: record.tenantID })
    .and({ isConfigurationActive: true });

  const tx = cds.transaction(req);
  const affectedRows = await tx.run(query);
  return affectedRows;
}
