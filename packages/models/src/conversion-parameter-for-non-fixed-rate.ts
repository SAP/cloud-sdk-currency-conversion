/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import { ConversionParameter } from './conversion-parameter';
import { buildCurrencyAmount } from './currency-amount';
import { buildCurrency } from './helper';

export interface ConversionParameterForNonFixedRate extends ConversionParameter {
  readonly exchangeRateType: string;
  readonly conversionAsOfDateTime: Date;
}

export function buildConversionParameterForNonFixedRate(
  fromCurrency: string,
  toCurrency: string,
  fromAmount: string,
  exchangeRateType: string,
  conversionAsOfDateTime: Date = new Date()
): ConversionParameterForNonFixedRate {
  return {
    fromCurrency: buildCurrency(fromCurrency),
    toCurrency: buildCurrency(toCurrency),
    fromAmount: buildCurrencyAmount(fromAmount),
    exchangeRateType,
    conversionAsOfDateTime
  };
}
