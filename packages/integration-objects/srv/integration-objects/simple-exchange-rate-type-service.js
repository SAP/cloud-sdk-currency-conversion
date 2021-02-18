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
const ErrorStatuses = require('../utils/ErrorStatuses');
const RateTypeExtensionConstants = require('../utils/RateTypeExtensionConstants');
const { validateFieldsForExchangeRateTypes } = require('../validations/ValidateFieldsForRateTypes');
const { validateFieldsForExchangeRateTypeDescription } = require('../validations/ValidateFieldsForRateTypeDesc');
const { checkForValidityOfKey } = require('../validations/CheckValidityOfKey');
const { writeAuditLog } = require('../logging/AuditLogWriter');
const { fetchCurrentAttributeValues } = require('../utils/FetchCurrentStateForAuditLog');

module.exports = srv => {
  srv.before('READ', 'ExchangeRateTypes', beforeRead);
  srv.before('CREATE', 'ExchangeRateTypes', beforeCreate);
  srv.before('UPDATE', 'ExchangeRateTypes', beforeUpdate);
  srv.before('DELETE', 'ExchangeRateTypes', beforeDelete);

  srv.before('CREATE', 'ExchangeRateTypeDescriptions', beforeCreateForRateTypeDescriptions);
  srv.before('UPDATE', 'ExchangeRateTypeDescriptions', beforeUpdateForRateTypeDescriptions);
  srv.before('DELETE', 'ExchangeRateTypeDescriptions', beforeActiveDeleteForExchangeRateTypeDescription);

  srv.on('CREATE', 'ExchangeRateTypes', writeAuditLogForRateTypes);
  srv.on('DELETE', 'ExchangeRateTypes', writeAuditLogForRateTypes);
  srv.on('UPDATE', 'ExchangeRateTypes', writeAuditLogForRateTypes);

  const { ExchangeRateTypes, ExchangeRateTypeDescriptions } = srv.entities;

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
    validateFieldsForExchangeRateTypes(req.data);
    await checkUniquenessForPrimaryKeys(req);
  }

  function beforeDelete(req) {
    try {
      validateDelete(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeCreateForRateTypeDescriptions(req) {
    try {
      await validateDescPayload(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function beforeUpdateForRateTypeDescriptions(req) {
    try {
      await validateDescPayload(req);
    } catch (err) {
      throw new ValidationError(err.message, err.code);
    }
  }

  async function validateDescPayload(req) {
    validateFieldsForExchangeRateTypeDescription(req.data, req.params);
    await checkForValidityOfKey(req, ExchangeRateTypes);
    await checkUniquenessForPrimaryKeysForExchangeRateTypeDescForUpdate(req);
  }

  async function checkUniquenessForPrimaryKeys(req) {
    const record = req.data;
    const affectedRows = await fetchExistingRateTypes(ExchangeRateTypes, record, req);
    checkForDuplicateRateTypeObjects(affectedRows, req);
  }

  async function checkUniquenessForPrimaryKeysForExchangeRateTypeDescForUpdate(req) {
    const affectedRows = await fetchExistingRateTypeDesc(ExchangeRateTypeDescriptions, req);
    checkForDuplicateRateTypeObjects(affectedRows, req);
  }

  async function beforeActiveDeleteForExchangeRateTypeDescription(req) {
    const record = req.data;
    const affectedRows = await fetchExistingTexts(ExchangeRateTypeDescriptions, record, req);
    if (affectedRows.length) {
      await validateIdInTenant(affectedRows[0].ID_texts, ExchangeRateTypes, req, affectedRows);
    }
    
  }

  async function writeAuditLogForRateTypes(req, next) {
    const data = req.data;
    const type = 'exchange-rate-type';
    const auditParams = {
      exchangeRateType: data.exchangeRateType,
      exchangeRateTypeDescription: data.exchangeRateTypeDescription,
      referenceCurrencyThreeLetterISOCode: data.referenceCurrencyThreeLetterISOCode
    };

    if (Constants.CREATE_EVENT !== req.event) {
      const currentValues = await fetchCurrentAttributeValues(req, req.user.tenant, ExchangeRateTypes);
      if (!util.isNullish(currentValues)) {
        await writeAuditLog(req, auditParams, currentValues, type);
      }
    }

    await next();
  }
};

async function validateIdInTenant(id, ExchangeRateTypes, req, affectedRows) {
  if (id != null) {
    const query = SELECT.from(ExchangeRateTypes).where({ ID: id }).limit(1, 0);
    const tx = cds.transaction(req);
    const firstRowForId = await tx.run(query);

    if (firstRowForId.length) {
      const [record] = affectedRows;
      if (req.user.tenant !== record.tenantID) {
        logger.error('Invalid ID was accessed. It is not related to the current tenant.');
        throw new ValidationError(RateTypeExtensionConstants.GUID_NOT_FOUND_FOR_READ, ErrorStatuses.BAD_REQUEST);
      }
    }
  }
}

async function fetchExistingTexts(ExchangeRateTypeDescriptions, record, req) {
  const query = SELECT.from(ExchangeRateTypeDescriptions)
    .where({ locale: record.locale })
    .and({ ID_texts: record.ID_texts })
    .limit(1, 0);

  const tx = cds.transaction(req);
  return tx.run(query);
}

async function fetchExistingRateTypeDesc(ExchangeRateTypeDescriptions, record, req) {
  const query = SELECT.from(ExchangeRateTypeDescriptions)
    .where({ locale: record.locale })
    .and({ ID: record.ID })
    .limit(1, 0);

  const tx = cds.transaction(req);
  return tx.run(query);
}

function checkForDuplicateRateTypeObjects(affectedRows, req) {
  if (affectedRows.length) {
    if (req.event === Constants.CREATE_EVENT) {
      logger.error('Record found in an Active entity for CREATE event. The primary keys are not unique.');
      throw new ValidationError(
        RateTypeExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE_TYPE,
        ErrorStatuses.BAD_REQUEST
      );
    }
    const payloadId = req.data.ID;
    const recordId = affectedRows[0].ID;
    if (payloadId !== recordId) {
      logger.error('Record found in Active Entity for UPDATE. The primary keys are not unique.');
      throw new ValidationError(
        RateTypeExtensionConstants.UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE_TYPE,
        ErrorStatuses.BAD_REQUEST
      );
    }
  }
}

async function fetchExistingRateTypes(ExchangeRateTypes, record, req) {
  const query = SELECT.from(ExchangeRateTypes)
    .where({ tenantID: record.tenantID })
    .and({ exchangeRateType: record.exchangeRateType })
    .limit(1, 0);

  const tx = cds.transaction(req);
  return tx.run(query);
}
