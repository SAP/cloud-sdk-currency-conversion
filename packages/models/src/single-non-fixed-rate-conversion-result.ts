/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { CurrencyAmount } from './currency-amount';
import { ExchangeRate } from './exchange-rate';
import { SingleFixedRateConversionResult } from './single-fixed-rate-conversion-result';

export interface SingleNonFixedRateConversionResult extends SingleFixedRateConversionResult {
  readonly exchangeRate: ExchangeRate;
}

export function buildSingleNonFixedRateConversionResult(
  exchangeRate: ExchangeRate,
  convertedAmount: CurrencyAmount,
  roundedOffConvertedAmount: CurrencyAmount
): SingleNonFixedRateConversionResult {
  return {
    exchangeRate,
    convertedAmount,
    roundedOffConvertedAmount
  };
}
