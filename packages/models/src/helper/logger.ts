/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';
import { CurrencyConversionError } from '../currency-conversion-error';

export const logger = createLogger();

export function logAndGetError(errorMessage: string): CurrencyConversionError {
  logger.error(errorMessage);
  return new CurrencyConversionError(errorMessage);
}
