/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Value } from './value';
import { ConversionParameter } from './conversion-parameter';
import { CurrencyAmount } from './currency-amount';
import { buildCurrency } from './helper';

export interface ConversionParameterForFixedRate extends ConversionParameter {
  readonly fixedRateValue: Value;
}

export function buildConversionParameterForFixedRate(
  fromCurrency: string,
  toCurrency: string,
  fromAmount: string,
  fixedRate: string
): ConversionParameterForFixedRate {
  return {
    fromCurrency: buildCurrency(fromCurrency),
    toCurrency: buildCurrency(toCurrency),
    fromAmount: new CurrencyAmount(fromAmount),
    fixedRateValue: new Value(fixedRate)
  };
}
