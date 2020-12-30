/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const xsenv = require('@sap/xsenv');
const util = require('@sap-cloud-sdk/util');
const getAuditLogger = require('../logging/auditLog');
const auditLogging = require('@sap/audit-logging');
const Constants = require('../utils/Constants');
const { ValidationError } = require('../exceptions/service-exception');
const { logger } = require('../logging/Logger');
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
  srv.before('READ', 'CurrencyExchangeRates', beforeRead);
  srv.before('CREATE', 'CurrencyExchangeRates', beforeCreate);
  srv.before('UPDATE', 'CurrencyExchangeRates', beforeUpdate);
  srv.before('DELETE', 'CurrencyExchangeRates', beforeDelete);

  srv.on('CREATE', 'CurrencyExchangeRates', writeAuditLogForCreation);
  srv.on('DELETE', 'CurrencyExchangeRates', writeAuditLogForDeletion);
  srv.on('UPDATE', 'CurrencyExchangeRates', writeAuditLogForUpdate);

  const { CurrencyExchangeRates } = srv.entities;

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
      await validatePrimaryKeyFieldsForCurrencyExchangeRate(req);
      await validateNonPrimaryKeyFieldsForCurrencyExchangeRate(req);
      await checkUniquenessForPrimaryKeys(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeUpdate(req) {
    try {
      await validateTenantIdInPayload(req);
      await validatePrimaryKeyFieldsForCurrencyExchangeRate(req);
      await validateNonPrimaryKeyFieldsForCurrencyExchangeRate(req);
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
  // validate the primary key fields
  async function validatePrimaryKeyFieldsForCurrencyExchangeRate(req) {
    // validate the length of the dataProviderCode in the payload
    if (
      util.isNullish(req.data.dataProviderCode) ||
      req.data.dataProviderCode.trim().length <
        Constants.MIN_VALUE_DATA_SOURCE_DATA_PROVIDER ||
      req.data.dataProviderCode.trim().length >
        Constants.MAX_VALUE_DATA_SOURCE_DATA_PROVIDER
    ) {
      logger.error('Data provider field value provided is invalid');
      throw new ValidationError(
        ExtensionConstants.INVALID_DATA_PROVIDER_FIELD_VALUE,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    // validate the length of the dataSource in the payload
    if (
      util.isNullish(req.data.dataSource) ||
      req.data.dataSource.trim().length <
        Constants.MIN_VALUE_DATA_SOURCE_DATA_PROVIDER ||
      req.data.dataSource.trim().length >
        Constants.MAX_VALUE_DATA_SOURCE_DATA_PROVIDER
    ) {
      logger.error('Data source code field value provided is invalid.');
      throw new ValidationError(
        ExtensionConstants.INVALID_DATA_SOURCE_FIELD_VALUE,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    // validate if the pattern of exchangeRateType matches /^[A-Za-z0-9]{1,15}$/
    if (!Constants.EXCHANGE_RATE_TYPE_PATTERN.test(req.data.exchangeRateType)) {
      logger.error('Exchange Rate Type field value provided is invalid.');
      throw new ValidationError(
        ExtensionConstants.INVALID_EXCHANGE_RATE_TYPE_FIELD_VALUE,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    /*
    * validate if the pattern of the fromCurrencyThreeLetterISOCode
    does not exceed three capital letters */
    if (
      !Constants.CURRENCY_CODE_PATTERN.test(
        req.data.fromCurrencyThreeLetterISOCode
      )
    ) {
      logger.error(
        'The value for field fromCurrencyThreeLetterISOCode' +
          'in the payload is invalid'
      );
      throw new ValidationError(
        ExtensionConstants.INVALID_FROM_CURRENCY_FIELD_VALUE,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    /* validate if the pattern of the toCurrencyThreeLetterISOCode
     *does not exceed three capital letters */
    if (
      !Constants.CURRENCY_CODE_PATTERN.test(
        req.data.toCurrencyThreeLetterISOCode
      )
    ) {
      logger.error(
        'The value to field fromCurrencyThreeLetterISOCode' +
          'in the payload is invalid'
      );
      throw new ValidationError(
        ExtensionConstants.INVALID_TO_CURRENCY_FIELD_VALUE,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    /* validate if the fromCurrencyThreeLetterISOCode
     *and the toCurrencyThreeLetterISOCode are the same */
    if (
      req.data.fromCurrencyThreeLetterISOCode ===
      req.data.toCurrencyThreeLetterISOCode
    ) {
      logger.error(
        'From currency and to currency field values' +
          'provided are same field value.'
      );
      throw new ValidationError(
        ExtensionConstants.FROM_AND_TO_CURRENCY_ARE_SAME,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    // validate if the validFromDateTime is null
    console.log(req.data.validFromDateTime);
    if (util.isNullish(req.data.validFromDateTime)) {
      logger.error('Valid date time field value provided is invalid.');
      throw new ValidationError(
        ExtensionConstants.INVALID_DATE_TIME_VALUE_FIELD,
        ErrorStatuses['BAD_REQUEST']
      );
    }
  }

  // validate the non primary key fields
  async function validateNonPrimaryKeyFieldsForCurrencyExchangeRate(req) {
    console.log(req.data.exchangeRateValue);
    if (
      util.isNullish(req.data.exchangeRateValue) ||
      req.data.exchangeRateValue < 0
    ) {
      logger.error('Exchange Rate field value provided is invalid');
      throw new ValidationError(
        ExtensionConstants.INVALID_EXCHANGE_RATE_VALUE_FIELD,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    if (req.data.isRateValueIndirect == null) {
      console.log(req.data.isRateValueIndirect);
      req.data.isRateValueIndirect =
        Constants.DEFAULT_VALUE_FOR_IS_DIRECT_VALUE;
    }

    if (util.isNullish(req.data.fromCurrencyFactor)) {
      req.data.fromCurrencyFactor =
        Constants.DEFAULT_VALUE_FOR_CURRENCY_FACTORS;
    } else if (req.data.fromCurrencyFactor < 1) {
      logger.error('From currency factor value provided is invalid');
      throw new ValidationError(
        ExtensionConstants.INVALID_FROM_CURRENCY_FACTOR_VALUE_FIELD,
        ErrorStatuses['BAD_REQUEST']
      );
    }

    if (util.isNullish(req.data.toCurrencyFactor)) {
      req.data.toCurrencyFactor = Constants.DEFAULT_VALUE_FOR_CURRENCY_FACTORS;
    } else if (req.data.fromCurrencyFactor < 1) {
      logger.error('To currency factor value provided is invalid');
      throw new ValidationError(
        ExtensionConstants.INVALID_TO_CURRENCY_FACTOR_VALUE_FIELD,
        ErrorStatuses['BAD_REQUEST']
      );
    }
  }

  // check the uniqueness of Primary Keys
  async function checkUniquenessForPrimaryKeys(req) {
    const record = req.data;
    console.log(req.query);
    const query = SELECT.from(CurrencyExchangeRates)
      .where({ tenantID: record.tenantID })
      .and({ exchangeRateType: record.exchangeRateType })
      .and({ dataSource: record.dataSource })
      .and({ dataProviderCode: record.dataProviderCode })
      .and({
        fromCurrencyThreeLetterISOCode: record.fromCurrencyThreeLetterISOCode
      })
      .and({
        toCurrencyThreeLetterISOCode: record.toCurrencyThreeLetterISOCode
      })
      .and({ validFromDateTime: record.validFromDateTime })
      .limit(1, 0);
    const tx = cds.transaction(req);
    const affectedRows = await tx.run(query);
    console.log(affectedRows.length);
    if (affectedRows.length > 0) {
      if (req.event === Constants.CREATE_EVENT) {
        logger.error(
          'Record found in an Active entity for CREATE event.' +
            'The primary keys are not unique.'
        );
        throw new ValidationError(
          ExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE,
          ErrorStatuses['BAD_REQUEST']
        );
      } else {
        const payloadId = req.data.ID;
        const recordId = affectedRows[0].ID;
        if (payloadId !== recordId) {
          logger.error(
            'Record found in an Active entity for UPDATE event.' +
              'The primary keys are not unique.'
          );
          throw new ValidationError(
            ExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE,
            ErrorStatuses['BAD_REQUEST']
          );
        }
      }
    }
  }

  function writeAuditLogForCreation(req, next) {
    const rate = req.data;
    const logonUser = req.user ? req.user.id : clientId;
    const message = auditLog
      .configurationChange({
        type: 'create currency-exchange-rate',
        id: { key: rate.ID }
      })
      .attribute({
        name: 'dataProviderCode',
        old: '',
        new: rate.dataProviderCode
      })
      .attribute({
        name: 'exchangeRateType',
        old: '',
        new: rate.exchangeRateType
      })
      .attribute({
        name: 'fromCurrencyThreeLetterISOCode',
        old: '',
        new: rate.fromCurrencyThreeLetterISOCode
      })
      .attribute({
        name: 'toCurrencyThreeLetterISOCode',
        old: '',
        new: rate.toCurrencyThreeLetterISOCode
      })
      .attribute({
        name: 'validFromDateTime',
        old: '',
        new: rate.validFromDateTime
      })
      .attribute({
        name: 'exchangeRateValue',
        old: '',
        new: rate.exchangeRateValue
      })
      .by(logonUser)
      .tenant(identityZoneId);

    message.logPrepare(function (err) {
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
          type: 'delete currency-exchange-rate',
          id: { key: keyID }
        })
        .attribute({
          name: 'dataProviderCode',
          old: existingRecord.dataProviderCode,
          new: ''
        })
        .attribute({
          name: 'exchangeRateType',
          old: existingRecord.exchangeRateType,
          new: ''
        })
        .attribute({
          name: 'fromCurrencyThreeLetterISOCode',
          old: existingRecord.fromCurrencyThreeLetterISOCode,
          new: ''
        })
        .attribute({
          name: 'toCurrencyThreeLetterISOCode',
          old: existingRecord.toCurrencyThreeLetterISOCode,
          new: ''
        })
        .attribute({
          name: 'validFromDateTime',
          old: existingRecord.validFromDateTime,
          new: ''
        })
        .attribute({
          name: 'exchangeRateValue',
          old: existingRecord.exchangeRateValue.toString(),
          new: ''
        })
        .by(logonUser)
        .tenant(identityZoneId);

      message.logPrepare(function (err) {
        if (err) {
          logger.error('error occurred store audit log: ', err);
        }
      });
    }
    return next();
  }

  async function writeAuditLogForUpdate(req, next) {
    const rate = req.data;
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
      logger.log('Error in Update');
    } else {
      const message = auditLog
        .configurationChange({
          type: 'update currency-exchange-rate',
          id: { key: keyID }
        })
        .attribute({
          name: 'dataProviderCode',
          old: existingRecord.dataProviderCode,
          new: rate.dataProviderCode
        })
        .attribute({
          name: 'exchangeRateType',
          old: existingRecord.exchangeRateType,
          new: rate.exchangeRateType
        })
        .attribute({
          name: 'fromCurrencyThreeLetterISOCode',
          old: existingRecord.fromCurrencyThreeLetterISOCode,
          new: rate.fromCurrencyThreeLetterISOCode
        })
        .attribute({
          name: 'toCurrencyThreeLetterISOCode',
          old: existingRecord.toCurrencyThreeLetterISOCode,
          new: rate.toCurrencyThreeLetterISOCode
        })
        .attribute({
          name: 'validFromDateTime',
          old: existingRecord.validFromDateTime,
          new: rate.validFromDateTime
        })
        .attribute({
          name: 'exchangeRateValue',
          old: existingRecord.exchangeRateValue.toString(),
          new: rate.exchangeRateValue.toString()
        })
        .by(logonUser)
        .tenant(identityZoneId);

      message.logPrepare(function (err) {
        if (err) {
          logger.error('error occurred store audit log: ', err);
        }
      });
    }
    return next();
  }

  async function prepareContextForUpdateAndDelete(keyID, tenantID) {
    const query = SELECT.from(CurrencyExchangeRates)
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
