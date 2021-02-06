/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
'use strict';
const xsenv = require('@sap/xsenv');
const auditLogging = require('@sap/audit-logging');
const { logger } = require('../logging/Logger');

const credentials = xsenv.getServices({ auditlog: { tag: 'auditlog' } }).auditlog;
const xsuaa = xsenv.getServices({ xsuaa: { tag: 'xsuaa' } }).xsuaa;

class AuditLog {
  constructor() {
    this.tenantId = xsuaa ? xsuaa.tenantid : null;
    console.log(this);

    auditLogging.v2(credentials, (err, auditLog) => {
      if (err) {
        logger.error('Failed to instantiate audit log', err);
      } else {
        this.auditLog = auditLog;
      }
    });
  }

  getAuditLog() {
    return this.auditLog;
  }

  dataModificationMessage() {
    if (this.auditLog) {
      return this.auditLog
        .update(...arguments)
        .dataSubject({ type: 'system', id: { key: this.getSelfTenantId() } })
        .by('system')
        .tenant(this.getSelfTenantId());
    }
    return null;
  }

  configurationChange() {
    if (this.auditLog) {
      return this.auditLog
        .configurationChange(...arguments)
        .by('system')
        .tenant(this.getSelfTenantId());
    }
    return null;
  }

  securityMessage() {
    if (this.auditLog) {
      return this.auditLog
        .securityMessage(...arguments)
        .by('system')
        .tenant(this.getSelfTenantId());
    }
    return {};
  }

  log(msg) {
    return this._log(msg, msg.log.bind(msg));
  }

  logPrepare(msg) {
    return this._log(msg, msg.logPrepare.bind(msg));
  }

  logSuccess(msg) {
    return this._log(msg, msg.logSuccess.bind(msg));
  }

  logFailure(msg) {
    return this._log(msg, msg.logFailure.bind(msg));
  }

  getSelfTenantId() {
    return this.tenantId;
  }

  _log(msg, fun) {
    return new Promise((resolve, reject) => {
      if (msg && this._isFunction(fun)) {
        fun(err => {
          if (err) {
            reject(err);
          } else {
            resolve(msg);
          }
        });
      } else {
        reject();
      }
    });
  }

  _isFunction(fun) {
    return fun && {}.toString.call(fun) === '[object Function]';
  }
}

module.exports = new AuditLog();
