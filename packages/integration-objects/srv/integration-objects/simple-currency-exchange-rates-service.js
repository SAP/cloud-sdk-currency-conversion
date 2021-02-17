/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
const cds = require('@sap/cds');
const util = require('@sap-cloud-sdk/util');
const Constants = require('../utils/Constants');
const { ValidationError } = require('../exceptions/validation-error');
const { validatePrimaryKeyFieldsForCurrencyExchangeRate } = require('../validations/ValidatePrimaryFieldsForRates');
const {
  validateNonPrimaryKeyFieldsForCurrencyExchangeRate
} = require('../validations/ValidateNonPrimaryFieldsForRates');
const { logger } = require('../logging/Logger');
const {
  validateTenantIdInPayload,
  validateDelete,
  checkAndAppendTenantIdFilterForReadEvent
} = require('../validations/Validations');
const { writeAuditLog } = require('../logging/AuditLogWriter');
const ErrorStatuses = require('../utils/ErrorStatuses');
const RateExtensionConstants = require('../utils/RateExtensionConstants');
const { fetchCurrentAttributeValues } = require('../utils/FetchCurrentStateForAuditLog');

module.exports = srv => {
  srv.before('READ', 'CurrencyExchangeRates', beforeRead);
  srv.before('CREATE', 'CurrencyExchangeRates', beforeCreate);
  srv.before('UPDATE', 'CurrencyExchangeRates', beforeUpdate);
  srv.before('DELETE', 'CurrencyExchangeRates', beforeDelete);

  srv.on('CREATE', 'CurrencyExchangeRates', writeAuditLogForRates);
  srv.on('DELETE', 'CurrencyExchangeRates', writeAuditLogForRates);
  srv.on('UPDATE', 'CurrencyExchangeRates', writeAuditLogForRates);

  const { CurrencyExchangeRates } = srv.entities;

  function beforeRead(req) {
    try {
      checkAndAppendTenantIdFilterForReadEvent(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeCreate(req) {
    try {
      await validatePayload(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeUpdate(req) {
    try {
      await validatePayload(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function validatePayload(req) {
    validateTenantIdInPayload(req);
    validatePrimaryKeyFieldsForCurrencyExchangeRate(req.data);
    validateNonPrimaryKeyFieldsForCurrencyExchangeRate(req.data);
    await checkUniquenessForPrimaryKeys(req);
  }

  function beforeDelete(req) {
    try {
      validateDelete(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  // check the uniqueness of Primary Keys
  async function checkUniquenessForPrimaryKeys(req) {
    const record = req.data;
    const affectedRows = await fetchExistingRates(CurrencyExchangeRates, record, req);
    checkForDuplicateRates(affectedRows, req.data, req.event);
  }

  async function writeAuditLogForRates(req, next) {
    let currentValues;
    const data = req.data;
    const type = 'currency-exchange-rates';
    const auditParams = {
      dataProviderCode: data.dataProviderCode,
      exchangeRateType: data.exchangeRateType,
      fromCurrencyThreeLetterISOCode: data.fromCurrencyThreeLetterISOCode,
      toCurrencyThreeLetterISOCode: data.toCurrencyThreeLetterISOCode,
      validFromDateTime: data.validFromDateTime,
      exchangeRateValue: data.exchangeRateValue
    };

    let currentValuesIsNotEmpty = true;
    if (Constants.CREATE_EVENT !== req.event) {
      currentValues = await fetchCurrentAttributeValues(req, req.user.tenant, CurrencyExchangeRates);
      currentValuesIsNotEmpty = !util.isNullish(currentValues);
    }
    if (currentValuesIsNotEmpty) {
      await writeAuditLog(req, auditParams, currentValues, type);
    }
    await next();
  }
};

function checkForDuplicateRates(affectedRows, data, event) {
  const uniqueConstraintViolationError = new ValidationError(
    RateExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE,
    ErrorStatuses.BAD_REQUEST
  );

  if (affectedRows.length) {
    if (Constants.CREATE_EVENT === event) {
      logger.error('Record found in an Active entity for CREATE event.' + 'The primary keys are not unique.');
      throw uniqueConstraintViolationError;
    } else {
      const payloadId = data.ID;
      const recordId = affectedRows[0].ID;
      if (payloadId !== recordId) {
        logger.error('Record found in an Active entity for UPDATE event.' + 'The primary keys are not unique.');
        throw uniqueConstraintViolationError;
      }
    }
  }
}

async function fetchExistingRates(CurrencyExchangeRates, record, req) {
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
  return affectedRows;
}
