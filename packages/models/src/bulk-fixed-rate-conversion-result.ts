/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ConversionParametersForFixedRate } from './conversion-parameters-for-fixed-rate';
import { SingleFixedRateConversionResult } from './single-fixed-rate-conversion-result';
import { CurrencyConversionError } from './currency-conversion-error';

export class BulkFixedRateConversionResult {
  constructor(
    readonly resultMap: Map<
      ConversionParametersForFixedRate,
      SingleFixedRateConversionResult | CurrencyConversionError
    >
  ) {}

  public get(
    conversionParametersForFixedRate: ConversionParametersForFixedRate
  ): SingleFixedRateConversionResult | CurrencyConversionError {
    return this.resultMap.get(conversionParametersForFixedRate)!;
  }

  public values() {
    return this.resultMap.values();
  }

  public entrySet() {
    return new Set(this.resultMap.entries());
  }
}
