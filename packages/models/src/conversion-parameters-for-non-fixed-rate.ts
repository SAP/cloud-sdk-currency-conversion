/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ConversionParameters } from './conversion-parameters';

export class ConversionParametersForNonFixedRate extends ConversionParameters {
  constructor(
    fromCurrency: string,
    toCurrency: string,
    fromAmount: string,
    readonly exchangeRateType: string,
    readonly conversionAsOfDateTime: Date = new Date()
  ) {
    super(fromCurrency, toCurrency, fromAmount);
  }
}
