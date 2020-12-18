/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { buildCurrency } from '@sap-cloud-sdk/currency-conversion-models/src/helper/currency-builder';
import { CurrencyAmount } from '@sap-cloud-sdk/currency-conversion-models/src/currency-amount';
import { Currency } from '@sap-cloud-sdk/currency-conversion-models/src/currency';

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
