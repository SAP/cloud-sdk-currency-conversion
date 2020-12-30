/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const xsenv = require('@sap/xsenv');
const { getAuditLogger } = require('../logging/auditLog');
const Constants = require('../utils/Constants');
const { ValidationError } = require('../exceptions/service-exception');
const util = require('@sap-cloud-sdk/util');
const { logger } = require('../logging/Logger');
const {
  validateTenantIdInPayload,
  validateDelete,
  checkAndAppendTenantIdFilterForReadEvent
} = require('../validations');
const cds = require('@sap/cds');
const ErrorStatuses = require('../utils/ErrorStatuses');
const ExtensionConstants = require('../utils/ExtensionConstants');
const auditLogging = require('@sap/audit-logging');

const credentials = xsenv.getServices({ auditlog: { tag: 'auditlog' } })
  .auditlog;

const uaaData = xsenv.getServices({ xsuaa: { tag: 'xsuaa' } }).xsuaa;

if (util.isNullish(credentials)) {
  console.log('creds', credentials);
}

let auditLog;
let clientId;
let identityZoneId;

if (typeof uaaData === 'object') {
  clientId = uaaData['clientid'];
  identityZoneId = uaaData['identityzoneid'];
}

auditLogging.v2(credentials, function (err, auditLogClient) {
  if (err) {
    logger.error('error', 'error occurred instantiating audit log');
    return console.log('error occurred instantiating audit log:' + err);
  }
  console.log('client', auditLogClient);
  auditLog = auditLogClient;
});

module.exports = srv => {
  srv.before('READ', 'TenantConfigForConversions', beforeRead);
  srv.before('CREATE', 'TenantConfigForConversions', beforeCreate);
  srv.before('UPDATE', 'TenantConfigForConversions', beforeUpdate);
  srv.before('DELETE', 'TenantConfigForConversions', beforeDelete);

  srv.on('CREATE', 'TenantConfigForConversions', writeAuditLogForCreation);
  srv.on('DELETE', 'TenantConfigForConversions', writeAuditLogForDeletion);
  srv.on('UPDATE', 'TenantConfigForConversions', writeAuditLogForUpdate);

  const { TenantConfigForConversions } = srv.entities;

  async function beforeRead(req) {
    try {
      await checkAndAppendTenantIdFilterForReadEvent(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeCreate(req) {
    try {
      await validateTenantIdInPayload(req);
      await validatePrimaryCompositeKeysForTenantConfig(req);
      await checkUniquenessForPrimaryKeys(req);
      await restrictMultipleCreationWithActiveConfiguration(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeUpdate(req) {
    try {
      await validateTenantIdInPayload(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
    await checkUniquenessForPrimaryKeys(req);
  }

  async function beforeDelete(req) {
    try {
      await validateDelete(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function validatePrimaryCompositeKeysForTenantConfig(req) {
    // validate the length of the dataProviderCode in the payload
    if (
      util.isNullish(req.data.defaultDataProviderCode) ||
      req.data.defaultDataProviderCode.trim().length <
        Constants.MIN_VALUE_DATA_SOURCE_DATA_PROVIDER ||
      req.data.defaultDataProviderCode.trim().length >
        Constants.MAX_VALUE_DATA_SOURCE_DATA_PROVIDER
    ) {
      logger.error('DefaultDataProviderCode value provided is invalid.');
      throw new ValidationError(
        ExtensionConstants.INVALID_DEFAULT_DATA_PROVIDER_FIELD_VALUE,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    // validate the length of the dataSource in the payload
    if (
      util.isNullish(req.data.defaultDataSource) ||
      req.data.defaultDataSource.trim().length <
        Constants.MIN_VALUE_DATA_SOURCE_DATA_PROVIDER ||
      req.data.defaultDataSource.trim().length >
        Constants.MAX_VALUE_DATA_SOURCE_DATA_PROVIDER
    ) {
      logger.error('DefaultDataSource value is null : {} provided is invalid.');
      throw new ValidationError(
        ExtensionConstants.INVALID_DEFAULT_DATA_SOURCE_FIELD_VALUE,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    if (req.data.isConfigurationActive == null) {
      req.data.isConfigurationActive = false;
    }

    if (!util.isNullish(req.data.connectToSAPMarketRatesManagement)) {
      if (!Constants.DESTINATION_NAME_PATTERN.test(req.data.destinationName)) {
        logger.error(
          'The value for destinationName in the payload is invalid.'
        );
        throw new ValidationError(
          ExtensionConstants.INVALID_DESTINATION_NAME_FIELD_VALUE,
          ErrorStatuses['BAD_REQUEST']
        );
      }
    }
  }

  async function checkUniquenessForPrimaryKeys(req) {
    console.log(req.data);
    const record = req.data;

    const query = SELECT.from(TenantConfigForConversions)
      .where({ tenantID: record.tenantID })
      .and({ defaultDataProviderCode: record.defaultDataProviderCode })
      .and({ defaultDataSource: record.defaultDataSource })
      .limit(1, 0);

    const tx = cds.transaction(req);
    const affectedRows = await tx.run(query);

    console.log(affectedRows.length);
    if (affectedRows.length > 0) {
      if (req.event === Constants.CREATE_EVENT) {
        logger.error(
          'Record found in an Active entity for CREATE event. The primary keys are not unique.'
        );
        throw new ValidationError(
          ExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_TENANT_CONFIG,
          ErrorStatuses['BAD_REQUEST']
        );
      } else {
        const payloadId = req.data.ID;
        const recordId = affectedRows[0].ID;
        console.log(payloadId);
        console.log(affectedRows[0].ID);
        if (payloadId !== recordId) {
          logger.error(
            'Record found in Active Entity for UPDATE. The primary keys are not unique.'
          );
          throw new ValidationError(
            ExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_TENANT_CONFIG,
            ErrorStatuses['BAD_REQUEST']
          );
        }
      }
    }
  }

  async function restrictMultipleCreationWithActiveConfiguration(req) {
    const record = req.data;

    const query = SELECT.from(TenantConfigForConversions)
      .where({ tenantID: record.tenantID })
      .and({ isConfigurationActive: true });

    const tx = cds.transaction(req);
    const affectedRows = await tx.run(query);

    if (affectedRows.length > 0) {
      logger.error('Record found in Active Entity: ', affectedRows);
      const tenantConfigID = req.ID;

      if (tenantConfigID == null || !affectedRows[0].ID === tenantConfigID) {
        logger.error('More than one configuration was activated.');
        throw new ValidationError(
          ExtensionConstants.UNAUTHORIZED_TO_CREATE_NEW_RECORD,
          ErrorStatuses['BAD_REQUEST']
        );
      }
    }
  }

  function writeAuditLogForCreation(req, next) {
    console.log(req.data);
    const tenantConfig = req.data;
    console.log(tenantConfig.ID);
    console.log(auditLog);
    const logonUser = req.user ? req.user.id : clientId;
    const message = auditLog
      .configurationChange({
        type: 'create tenant-config-for-conversions',
        id: { key: tenantConfig.ID }
      })
      .attribute({
        name: 'defaultDataProviderCode',
        old: '',
        new: tenantConfig.defaultDataProviderCode
      })
      .attribute({
        name: 'defaultDataSource',
        old: '',
        new: tenantConfig.defaultDataSource
      })
      .attribute({
        name: 'isConfigurationActive',
        old: '',
        new: tenantConfig.isConfigurationActive.toString()
      })
      .by(logonUser)
      .tenant(identityZoneId);

    message.logPrepare(function (err, id) {
      if (err) {
        logger.error('error occurred store audit log: ', err);
      }
    });

    return next();
  }

  async function writeAuditLogForDeletion(req, next) {
    const keyID = req.params[0];
    const logonUser = req.user ? req.user.id : clientId;
    const tenantID = req.user.tenant;
    const existingRecord = await prepareContextForUpdateAndDelete(
      keyID,
      tenantID
    );
    if (existingRecord == null) {
      logger.error('Error in Deletion');
    } else {
      const message = auditLog
        .configurationChange({
          type: 'delete tenant-config-for-conversions',
          id: { key: keyID }
        })
        .attribute({
          name: 'defaultDataProviderCode',
          old: existingRecord.defaultDataProviderCode,
          new: ''
        })
        .attribute({
          name: 'defaultDataSource',
          old: existingRecord.defaultDataSource,
          new: ''
        })
        .attribute({
          name: 'isConfigurationActive',
          old: '',
          new: existingRecord.isConfigurationActive.toString()
        })
        .by(logonUser)
        .tenant(identityZoneId);

      message.logPrepare(function (err, id) {
        if (err) {
          logger.error('error occurred store audit log: ', err);
        }
      });
    }
    console.log('end writing audit log for deletion', existingRecord);
    return next();
  }

  async function writeAuditLogForUpdate(req, next) {
    const tenantConfig = req.data;
    let keyID = req.params[0];
    if (keyID == null || keyID === undefined) {
      keyID = req.data.ID;
    }
    const logonUser = req.user ? req.user.id : clientId;
    const tenantID = req.user.tenant;

    const existingRecord = await prepareContextForUpdateAndDelete(
      keyID,
      tenantID
    );
    if (existingRecord == null) {
      logger.error('Error in Update');
    } else {
      const message = auditLog
        .configurationChange({
          type: 'update tenant-config-for-conversions',
          id: { key: keyID }
        })
        .attribute({
          name: 'defaultDataProviderCode',
          old: existingRecord.defaultDataProviderCode,
          new: tenantConfig.defaultDataProviderCode
        })
        .attribute({
          name: 'defaultDataSource',
          old: existingRecord.defaultDataSource,
          new: tenantConfig.defaultDataSource
        })
        .attribute({
          name: 'isConfigurationActive',
          old: existingRecord.isConfigurationActive.toString(),
          new: tenantConfig.isConfigurationActive.toString()
        })
        .by(logonUser)
        .tenant(identityZoneId);

      message.logPrepare(function (err, id) {
        if (err) {
          logger.error('error occurred store audit log: ', err);
        }
      });
    }
    return next();
  }

  async function prepareContextForUpdateAndDelete(keyID, tenantID) {
    const query = SELECT.from(TenantConfigForConversions)
      .where({ tenantID: tenantID })
      .and({ ID: keyID });
    const tx = cds.transaction();
    const affectedRows = await tx.run(query);
    console.log(affectedRows);
    if (affectedRows.length > 0) {
      return affectedRows[0];
    }
  }
};
