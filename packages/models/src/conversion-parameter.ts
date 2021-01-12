/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import { Currency } from './currency';
import { CurrencyAmount } from './currency-amount';
import { buildCurrency } from './helper';

export class ConversionParameter {
  readonly fromCurrency: Currency;
  readonly toCurrency: Currency;
  readonly fromAmount: CurrencyAmount;

  constructor(fromCurrency: string, toCurrency: string, fromAmount: string) {
    this.fromCurrency = buildCurrency(fromCurrency);
    this.toCurrency = buildCurrency(toCurrency);
    this.fromAmount = new CurrencyAmount(fromAmount);
  }
}
