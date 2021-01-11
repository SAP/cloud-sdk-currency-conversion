/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import { CurrencyAmount } from './currency-amount';
import { ExchangeRate } from './exchange-rate';
import { SingleFixedRateConversionResult } from './single-fixed-rate-conversion-result';

export class SingleNonFixedRateConversionResult extends SingleFixedRateConversionResult {
  constructor(
    readonly exchangeRate: ExchangeRate,
    readonly convertedAmount: CurrencyAmount,
    readonly roundedOffConvertedAmount: CurrencyAmount
  ) {
    super(convertedAmount, roundedOffConvertedAmount);
  }
}
