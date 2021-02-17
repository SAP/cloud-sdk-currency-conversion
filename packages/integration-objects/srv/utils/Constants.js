/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
const Constants = {
  EXCHANGE_RATE_TYPE_PATTERN: /^[A-Za-z0-9]{1,15}$/,
  CURRENCY_CODE_PATTERN: /^[A-Z]{3}$/,
  DEFAULT_VALUE_FOR_IS_DIRECT_VALUE: false,
  DEFAULT_VALUE_FOR_CURRENCY_FACTORS: 1,
  DEFAULT_VALUE_FOR_IS_INVERSION_ALLOWED_VALUE: false,
  CREATE_EVENT: 'CREATE',
  UPDATE_EVENT: 'UPDATE',
  DELETE_EVENT: 'DELETE',
  DESTINATION_NAME_PATTERN: /^[A-Za-z0-9]{1,200}$/,
  AUDITLOG: 'auditlog',
  PRODUCTION: 'production',
  TEST: 'test',
  MIN_LENGTH: 1
};

module.exports = Constants;
