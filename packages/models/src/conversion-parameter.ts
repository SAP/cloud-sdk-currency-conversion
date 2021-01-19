/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import { Currency } from './currency';
import { CurrencyAmount } from './currency-amount';

export interface ConversionParameter {
  readonly fromCurrency: Currency;
  readonly toCurrency: Currency;
  readonly fromAmount: CurrencyAmount;
}
