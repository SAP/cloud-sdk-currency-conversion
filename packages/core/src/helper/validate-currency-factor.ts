/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { CurrencyConversionError } from '@sap-cloud-sdk/currency-conversion-models/src/currency-conversion-error';
import { ConversionModelError } from '@sap-cloud-sdk/currency-conversion-models/src/constants/conversion-model-error';

export function validateCurrencyFactor(factor: number) {
  if (factor < 0) {
    throw new CurrencyConversionError(
      ConversionModelError.NEGATIVE_CURRENCY_FACTOR
    );
  }
}
