/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const xsenv = require('@sap/xsenv');
const { getAuditLogger } = require('../logging/auditLog');
const Constants = require('../utils/Constants');
const { ValidationError } = require('../exceptions/service-exception');
const util = require('@sap-cloud-sdk/util');
const { logger } = require('../logging/Logger');
const auditLogging = require('@sap/audit-logging');
const {
  validateTenantIdInPayload,
  validateDelete,
  checkAndAppendTenantIdFilterForReadEvent
} = require('../validations');
const cds = require('@sap/cds');
const ErrorStatuses = require('../utils/ErrorStatuses');
const ExtensionConstants = require('../utils/ExtensionConstants');

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
  srv.before('READ', 'ExchangeRateTypes', beforeRead);
  srv.before('CREATE', 'ExchangeRateTypes', beforeCreate);
  srv.before('UPDATE', 'ExchangeRateTypes', beforeUpdate);
  srv.before('DELETE', 'ExchangeRateTypes', beforeDelete);

  srv.before(
    'CREATE',
    'ExchangeRateTypeDescriptions',
    beforeCreateForRateTypeDescriptions
  );
  srv.before(
    'UPDATE',
    'ExchangeRateTypeDescriptions',
    beforeUpdateForRateTypeDescriptions
  );
  srv.before(
    'DELETE',
    'ExchangeRateTypeDescriptions',
    beforeActiveDeleteForExchangeRateTypeDescription
  );

  srv.on('CREATE', 'ExchangeRateTypes', writeAuditLogForCreation);
  srv.on('DELETE', 'ExchangeRateTypes', writeAuditLogForDeletion);
  srv.on('UPDATE', 'ExchangeRateTypes', writeAuditLogForUpdate);

  const { ExchangeRateTypes, ExchangeRateTypeDescriptions } = srv.entities;

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
      await validateFieldsForExchangeRateType(req);
      await checkUniquenessForPrimaryKeys(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeUpdate(req) {
    try {
      await validateTenantIdInPayload(req);
      await validateFieldsForExchangeRateType(req);
      await checkUniquenessForPrimaryKeys(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeDelete(req) {
    try {
      await validateDelete(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeCreateForRateTypeDescriptions(req) {
    try {
      await validateFieldsForExchangeRateTypeDescription(req);
      await checkForValidityOfKey(req);
      await checkUniquenessForPrimaryKeysForExchangeRateTypeDescForUpdate(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeUpdateForRateTypeDescriptions(req) {
    try {
      await validateFieldsForExchangeRateTypeDescription(req);
      await checkForValidityOfKey(req);
      await checkUniquenessForPrimaryKeysForExchangeRateTypeDescForUpdate(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function validateFieldsForExchangeRateType(req) {
    if (!Constants.EXCHANGE_RATE_TYPE_PATTERN.test(req.data.exchangeRateType)) {
      logger.error('Exchange Rate Type field value provided is invalid.');
      throw new ValidationError(
        ExtensionConstants.INVALID_EXCHANGE_RATE_TYPE_FIELD_VALUE,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    if (!util.isNullish(req.data.referenceCurrencyThreeLetterISOCode)) {
      if (
        req.data.isInversionAllowed !== false &&
        req.data.isInversionAllowed != null
      ) {
        console.log(
          'Valid values must be provided to either of Inversion Allowed or Reference Currency fields and not both of it.'
        );
        throw new ValidationError(
          ExtensionConstants.INVALID_COMBINATION_OF_INVERSION_REF_CURRENCY,
          ErrorStatuses['BAD_REQUEST']
        );
      }
      if (
        !Constants.CURRENCY_CODE_PATTERN.test(
          req.data.referenceCurrencyThreeLetterISOCode
        )
      ) {
        console.log(
          'The value for referenceCurrencyThreeLetterISOCode in the payload is invalid.'
        );
        throw new ValidationError(
          ExtensionConstants.INVALID_REFERENCE_CURRENCY_VALUE_FIELD,
          ErrorStatuses['BAD_REQUEST']
        );
      }
    }

    // console.log(req.data.isRateValueIndirect);
    if (util.isNullish(req.data.isInversionAllowed)) {
      console.log(req.data.isInversionAllowed);
      req.data.isInversionAllowed =
        Constants.DEFAULT_VALUE_FOR_IS_INVERSION_ALLOWED_VALUE;
    }
  }

  async function checkUniquenessForPrimaryKeys(req) {
    const record = req.data;

    const query = SELECT.from(ExchangeRateTypes)
      .where({ tenantID: record.tenantID })
      .and({ exchangeRateType: record.exchangeRateType })
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
          ExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE_TYPE,
          ErrorStatuses['BAD_REQUEST']
        );
      } else {
        const payloadId = req.data.ID;
        const recordId = affectedRows[0].ID;
        if (payloadId !== recordId) {
          logger.error(
            'Record found in Active Entity for UPDATE. The primary keys are not unique.'
          );
          throw new ValidationError(
            ExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE_TYPE,
            ErrorStatuses['BAD_REQUEST']
          );
        }
      }
    }
  }

  async function validateFieldsForExchangeRateTypeDescription(req) {
    if (
      req.data.locale == null ||
      req.data.locale === undefined ||
      req.data.locale.trim().length < Constants.MIN_VALUE_LOCALE ||
      req.data.locale.trim().length > Constants.MAX_VALUE_LOCALE
    ) {
      console.log('Locale field value provided is invalid');
      throw new ValidationError(
        ExtensionConstants.INVALID_LOCALE_FIELD,
        ErrorStatuses['BAD_REQUEST']
      );
    }
    if (req.data.ID == null || req.data.ID === undefined) {
      console.log('ID value provided is invalid.');
      throw new ValidationError(
        ExtensionConstants.INVALID_ID_PROVIDED_FOR_EXCHANGE_RATE_TYPE_DESCRIPTION,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    if (
      req.data.exchangeRateTypeDescription == null ||
      req.data.exchangeRateTypeDescription === undefined ||
      req.data.exchangeRateTypeDescription.trim().length <
        Constants.MIN_VALUE_EXCHANGE_RATE_TYPE_DESCRIPTION ||
      req.data.exchangeRateTypeDescription.trim().length >
        Constants.MAX_VALUE_EXCHANGE_RATE_TYPE_DESCRIPTION
    ) {
      logger.error(
        'ExchangeRateTypeDescription value is null or the value provided is invalid.'
      );
      throw new ValidationError(
        ExtensionConstants.INVALID_EXCHANGE_RATE_TYPE_DESCRIPTION_VALUE_FIELD,
        ErrorStatuses['BAD_REQUEST']
      );
    }
  }

  async function checkForValidityOfKey(req) {
    const query = SELECT.from(ExchangeRateTypes)
      .where({ ID: req.ID })
      .limit(1, 0);

    const tx = cds.transaction(req);
    const affectedRows = await tx.run(query);

    console.log(affectedRows.length);
    if (affectedRows.length > 0) {
      const record = affectedRows[0];
      if (req.user.tenant !== record.tenantID) {
        logger.error(
          'Invalid ID was accessed. It is not related to the current tenant.'
        );
        throw new ValidationError(
          ExtensionConstants.GUID_NOT_FOUND_FOR_READ,
          ErrorStatuses['BAD_REQUEST']
        );
      }
    }
  }

  async function checkUniquenessForPrimaryKeysForExchangeRateTypeDescForUpdate(
    req
  ) {
    const record = req.data;

    const query = SELECT.from(ExchangeRateTypeDescriptions)
      .where({ locale: record.locale })
      .and({ ID: record.ID })
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
          ExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE_TYPE,
          ErrorStatuses['BAD_REQUEST']
        );
      } else {
        const payloadId = req.data.ID;
        const recordId = affectedRows[0].ID;
        if (payloadId !== recordId) {
          logger.error(
            'Record found in Active Entity for UPDATE. The primary keys are not unique.'
          );
          throw new ValidationError(
            ExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE_TYPE,
            ErrorStatuses['BAD_REQUEST']
          );
        }
      }
    }
  }

  async function beforeActiveDeleteForExchangeRateTypeDescription(req) {
    const record = req.data;
    let id;

    const query = SELECT.from(ExchangeRateTypeDescriptions)
      .where({ locale: record.locale })
      .and({ ID_texts: record.ID_texts })
      .limit(1, 0);

    const tx = cds.transaction(req);
    const affectedRows = await tx.run(query);

    console.log(affectedRows.length);
    if (affectedRows.length > 0) {
      id = affectedRows[0].ID_texts;
    }
    if (id != null) {
      const query2 = SELECT.from(ExchangeRateTypes)
        .where({ ID: id })
        .limit(1, 0);

      const tx2 = cds.transaction(req);
      const affectedRows2 = await tx2.run(query2);

      console.log(affectedRows2.length);
      if (affectedRows2.length > 0) {
        const record2 = affectedRows[0];
        if (req.user.tenant !== record2.tenantID) {
          logger.error(
            'Invalid ID was accessed. It is not related to the current tenant.'
          );
          throw new ValidationError(
            ExtensionConstants.GUID_NOT_FOUND_FOR_READ,
            ErrorStatuses['BAD_REQUEST']
          );
        }
      }
    }
  }

  function writeAuditLogForCreation(req, next) {
    console.log(req.data);
    const rateType = req.data;
    console.log(rateType.ID);
    console.log(auditLog);
    const logonUser = req.user ? req.user.id : clientId;
    const message = auditLog
      .configurationChange({
        type: 'create exchange-rate-type',
        id: { key: rateType.ID }
      })
      .attribute({
        name: 'exchangeRateType',
        old: '',
        new: rateType.exchangeRateType
      })
      .attribute({
        name: 'exchangeRateTypeDescription',
        old: '',
        new: util.isNullish(rateType.exchangeRateTypeDescription)
          ? 'null'
          : rateType.exchangeRateTypeDescription
      })
      .attribute({
        name: 'referenceCurrencyThreeLetterISOCode',
        old: '',
        new: rateType.referenceCurrencyThreeLetterISOCode
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
    console.log('keyID', keyID);
    console.log(keyID);
    const existingRecord = await prepareContextForUpdateAndDelete(
      keyID,
      tenantID
    );
    if (existingRecord == null) {
      logger.error('Error in Deletion');
    } else {
      const message = auditLog
        .configurationChange({
          type: 'delete exchange-rate-type',
          id: { key: keyID }
        })
        .attribute({
          name: 'exchangeRateType',
          old: existingRecord.exchangeRateType,
          new: ''
        })
        .attribute({
          name: 'exchangeRateTypeDescription',
          old: util.isNullish(existingRecord.exchangeRateTypeDescription)
            ? 'null'
            : existingRecord.exchangeRateTypeDescription,
          new: ''
        })
        .attribute({
          name: 'referenceCurrencyThreeLetterISOCode',
          old: existingRecord.referenceCurrencyThreeLetterISOCode,
          new: ''
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

  async function writeAuditLogForUpdate(req, next) {
    const rateType = req.data;
    let keyID = req.params[0];
    if (util.isNullish(keyID)) {
      keyID = req.data.ID;
    }
    const logonUser = req.user ? req.user.id : clientId;
    const tenantID = req.user.tenant;
    console.log('keyID', keyID);

    const existingRecord = await prepareContextForUpdateAndDelete(
      keyID,
      tenantID
    );
    if (existingRecord == null) {
      console.log('Error in Update');
    } else {
      const message = auditLog
        .configurationChange({
          type: 'update exchange-rate-type',
          id: { key: rateType.ID }
        })
        .attribute({
          name: 'exchangeRateType',
          old: existingRecord.exchangeRateType,
          new: rateType.exchangeRateType
        })
        .attribute({
          name: 'exchangeRateTypeDescription',
          old: util.isNullish(existingRecord.exchangeRateTypeDescription)
            ? 'null'
            : existingRecord.exchangeRateTypeDescription,
          new: util.isNullish(rateType.exchangeRateTypeDescription)
            ? 'null'
            : rateType.exchangeRateTypeDescription
        })
        .attribute({
          name: 'referenceCurrencyThreeLetterISOCode',
          old: existingRecord.referenceCurrencyThreeLetterISOCode,
          new: rateType.referenceCurrencyThreeLetterISOCode
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
    const query = SELECT.from(ExchangeRateTypes)
      .where({ tenantID })
      .and({ ID: keyID });
    const tx = cds.transaction();
    const affectedRows = await tx.run(query);
    console.log(affectedRows);
    if (affectedRows.length > 0) {
      return affectedRows[0];
    }
  }
};
