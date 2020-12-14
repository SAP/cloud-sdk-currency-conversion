/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { buildCurrency } from './helper/currency-builder';
import { CurrencyAmount } from './currency-amount';
import { Currency } from './currency';

export class ConversionParameters {
  readonly fromCurrency: Currency;
  readonly toCurrency: Currency;
  readonly fromAmount: CurrencyAmount;

  constructor(fromCurrency: string, toCurrency: string, fromAmount: string) {
    this.fromCurrency = buildCurrency(fromCurrency);
    this.toCurrency = buildCurrency(toCurrency);
    this.fromAmount = new CurrencyAmount(fromAmount);
  }
}
