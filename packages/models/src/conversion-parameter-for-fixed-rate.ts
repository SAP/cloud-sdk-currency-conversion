/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { buildExchangeRateValue, ExchangeRateValue } from './exchange-rate-value';
import { ConversionParameter } from './conversion-parameter';
import { buildCurrencyAmount } from './currency-amount';
import { buildCurrency } from './helper';

export interface ConversionParameterForFixedRate extends ConversionParameter {
  readonly fixedRateValue: ExchangeRateValue;
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
    fromAmount: buildCurrencyAmount(fromAmount),
    fixedRateValue: buildExchangeRateValue(fixedRate)
  };
}
