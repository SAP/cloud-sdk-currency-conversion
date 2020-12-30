/*Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { logger } = require('./logging/Logger');
const { ValidationError } = require("./exceptions/service-exception");
const ErrorStatuses = require("./utils/ErrorStatuses");
const ExtensionConstants = require("./utils/ExtensionConstants");
const util = require('@sap-cloud-sdk/util');

console.log(logger);
// validate the tenantid in the request payload
async function validateTenantIdInPayload(req) {
  const tId = req.user.tenant;
  logger.error(
    'Currency Exchange Rate Validation: Inside _validateTenantIdInPayload'
  );

  console.log(tId);
  if (tId != null && tId !== req.data.tenantID) {
    throw new ValidationError(
      ExtensionConstants.INVALID_TENANTID,
      ErrorStatuses['BAD_REQUEST']
    );
  } else if (tId === '') {
    req.data.tenantID = tId;
  } else if (util.isNullish(tId)) {
    throw new ValidationError(
      "Setting 'TenantId' in the payload to a valid value from JWT",
      ErrorStatuses['BAD_REQUEST']
    );
  }
}

async function checkAndAppendTenantIdFilterForReadEvent(req) {
  const tId = req.user.tenant;

  if (util.isNullish(tId)) {
    throw new ValidationError('Invalid Tenant', ErrorStatuses['BAD_REQUEST']);
  }
  req.query.where({ tenantID: tId });
  console.log(req.query);
}

async function validateDelete(req) {
  const tId = req.user.tenant;

  if (util.isNullish(tId)) {
    throw new ValidationError('Invalid Tenant', ErrorStatuses['BAD_REQUEST']);
  }

  req.query.where({ tenantID: tId });
  console.log(req.query);
}

module.exports = {
  checkAndAppendTenantIdFilterForReadEvent,
  validateTenantIdInPayload,
  validateDelete
};
