/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { ExchangeRateValue } from './exchange-rate-value';
import { ConversionParameter } from './conversion-parameter';

export class ConversionParameterForFixedRate extends ConversionParameter {
  readonly fixedRateValue: ExchangeRateValue;

  constructor(fromCurrency: string, toCurrency: string, fromAmount: string, fixedRate: string) {
    super(fromCurrency, toCurrency, fromAmount);
    this.fixedRateValue = new ExchangeRateValue(fixedRate);
  }
}
