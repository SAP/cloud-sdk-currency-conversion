/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import { ConversionParameter } from './conversion-parameter';

export class ConversionParameterForNonFixedRate extends ConversionParameter {
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
