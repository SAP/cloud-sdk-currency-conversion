/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { CurrencyAmount } from './currency-amount';

export interface SingleFixedRateConversionResult {
  readonly convertedAmount: CurrencyAmount;
  readonly roundedOffConvertedAmount: CurrencyAmount;
}

export function buildSingleFixedRateConversionResult(
  convertedAmount: CurrencyAmount,
  roundedOffConvertedAmount: CurrencyAmount
): SingleFixedRateConversionResult {
  return {
    convertedAmount,
    roundedOffConvertedAmount
  };
}
