/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { CurrencyConversionError } from '@sap-cloud-sdk/currency-conversion-models';
import { createLogger } from '@sap-cloud-sdk/util';

export const logger = createLogger();

export function logAndGetError(errorMessage: string): CurrencyConversionError {
  logger.error(errorMessage);
  return new CurrencyConversionError(errorMessage);
}
