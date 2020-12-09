/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ExchangeRateValue } from './exchange-rate-value';
import { ConversionParameters } from './conversion-parameters';

export class ConversionParametersForFixedRate extends ConversionParameters {
  readonly fixedRateValue: ExchangeRateValue;

  constructor(fromCurrency: string, toCurrency: string, fromAmount: string, fixedRate: string) {
    super(fromCurrency, toCurrency, fromAmount);
    this.fixedRateValue = new ExchangeRateValue(fixedRate);
  }
}
