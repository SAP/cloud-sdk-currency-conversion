/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const { ValidationError } = require('../exceptions/validation-error');
const ExtensionConstants = require('../utils/ExtensionConstants');
const ErrorStatuses = require('../utils/ErrorStatuses');

// validate the tenantid in the request payload
function validateTenantIdInPayload(req) {
  const tId = req.user.tenant;
  if (!util.isNullish(req.data.tenantID) && tId !== req.data.tenantID) {
    throw new ValidationError(ExtensionConstants.INVALID_TENANTID, ErrorStatuses.BAD_REQUEST);
  } else {
    setTenantId(req, tId);
  }
}

function setTenantId(req, tId) {
  req.data.tenantID = tId;
}

function checkAndAppendTenantIdFilterForReadEvent(req) {
  setTenantIdPredicate(req);
}

function setTenantIdForDelete(req) {
  setTenantIdPredicate(req);
}

function setTenantIdPredicate(req) {
  const tId = req.user.tenant;

  if (util.isNullish(tId)) {
    throw new ValidationError(ExtensionConstants.INVALID_TENANTID, ErrorStatuses.BAD_REQUEST);
  }
  req.query.where({ tenantID: tId });
}

module.exports = {
  checkAndAppendTenantIdFilterForReadEvent,
  validateTenantIdInPayload,
  setTenantIdForDelete
};
