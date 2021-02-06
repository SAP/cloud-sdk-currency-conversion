/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
const util = require('@sap-cloud-sdk/util');
const xsenv = require('@sap/xsenv');
const auditLog = require('../utils/AuditLog');
const Constants = require('../utils/Constants');
const { logger } = require('./Logger');
const uaaData = xsenv.getServices({ xsuaa: { tag: 'xsuaa' } }).xsuaa;

async function writeAuditLog(req, auditParams, currentValues, objectType) {
  try {
    const entityType = req.event + ' ' + objectType;
    const clientId = uaaData['clientid'];
    const logonUser = req.user ? req.user.id : clientId;
    const accessedObject = {
      type: entityType,
      id: { key: req.data.ID }
    };

    const configChangeMessage = auditLog.configurationChange(accessedObject);
    setConfigMessage(req, auditParams, configChangeMessage, currentValues);
    configChangeMessage.by(logonUser);
    await auditLog.logPrepare(configChangeMessage);
  } catch (e) {
    logger.error('Error ' + e.message);
    return Promise.reject(e);
  }
  return Promise.resolve();
}

const creationAuditAttributes = auditParams =>
  Object.keys(auditParams).map(auditKey => ({
    name: auditKey,
    old: '',
    new: replaceNullValues(auditParams, auditKey)
  }));

const updationAuditAttributes = (auditParams, currentValues) =>
  Object.keys(auditParams).map(auditKey => ({
    name: auditKey,
    old: replaceNullValues(currentValues, auditKey),
    new: replaceNullValues(auditParams, auditKey)
  }));

const deletionAuditAttributes = (auditParams, currentValues) =>
  Object.keys(auditParams).map(auditKey => ({
    name: auditKey,
    old: replaceNullValues(currentValues, auditKey),
    new: ''
  }));

function setConfigMessage(
  req,
  auditParams,
  configChangeMessage,
  currentValues
) {
  switch (req.event) {
    case Constants.CREATE_EVENT: {
      creationAuditAttributes(auditParams).forEach(attribute => {
        configChangeMessage.attribute(attribute);
      });
      break;
    }
    case Constants.UPDATE_EVENT: {
      updationAuditAttributes(auditParams, currentValues).forEach(attribute => {
        configChangeMessage.attribute(attribute);
      });
      break;
    }
    case Constants.DELETE_EVENT: {
      deletionAuditAttributes(auditParams, currentValues).forEach(attribute => {
        configChangeMessage.attribute(attribute);
      });
      break;
    }
  }
  return configChangeMessage;
}

function replaceNullValues(currentValues, auditKey) {
  return util.isNullish(currentValues[auditKey])
    ? 'null'
    : currentValues[auditKey].toString();
}

module.exports = {
  writeAuditLog
};
