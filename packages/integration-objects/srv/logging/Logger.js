/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { ValidationError } = require('../exceptions/service-exception');
const { createLogger } = require('@sap-cloud-sdk/util');

const logger = createLogger();

function logAndGetError(errorMessage) {
  logger.error(errorMessage);
  return new ValidationError(errorMessage);
}

module.exports = { logger };
