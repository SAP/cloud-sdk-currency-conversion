/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const xsenv = require('@sap/xsenv');
const auditLogging = require('@sap/audit-logging');
const { logger } = require('../logging/Logger');

const credentials = xsenv.getServices({ auditlog: { tag: 'auditlog' } })
  .auditlog;

module.exports = function getAuditLogger() {
  if (credentials == null || credentials === undefined) {
    console.log('creds', credentials);
  }

  let auditLog;

  auditLogging.v2(credentials, function (err, auditLogClient) {
    if (err) {
      logger.error('error', 'error occurred instantiating audit log');
      return console.log('error occurred instantiating audit log:' + err);
    }
    console.log('client', auditLogClient);
    auditLog = auditLogClient;
    return auditLog;
  });

  return auditLog;
};
