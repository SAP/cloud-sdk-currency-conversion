/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import { CurrencyAmount } from './currency-amount';

export class SingleFixedRateConversionResult {
  constructor(readonly convertedAmount: CurrencyAmount, readonly roundedOffConvertedAmount: CurrencyAmount) {}
}
