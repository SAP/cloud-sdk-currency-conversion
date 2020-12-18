/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ExchangeRateValue } from '@sap-cloud-sdk/currency-conversion-models/src/exchange-rate-value';
import { ConversionParameter } from '@sap-cloud-sdk/currency-conversion-models/src/conversion-parameter';

export class ConversionParameterForFixedRate extends ConversionParameter {
  readonly fixedRateValue: ExchangeRateValue;

  constructor(fromCurrency: string, toCurrency: string, fromAmount: string, fixedRate: string) {
    super(fromCurrency, toCurrency, fromAmount);
    this.fixedRateValue = new ExchangeRateValue(fixedRate);
  }
}
