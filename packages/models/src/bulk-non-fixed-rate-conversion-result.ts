/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ConversionParametersForNonFixedRate } from './conversion-parameters-for-non-fixed-rate';
import { SingleNonFixedRateConversionResult } from './single-non-fixed-rate-conversion-result';
import { CurrencyConversionError } from './currency-conversion-error';

export class BulkNonFixedRateConversionResult {
  constructor(
    readonly resultMap: Map<
      ConversionParametersForNonFixedRate,
      SingleNonFixedRateConversionResult | CurrencyConversionError
    >
  ) {}

  public get(
    conversionParametersForFixedRate: ConversionParametersForNonFixedRate
  ): SingleNonFixedRateConversionResult | CurrencyConversionError {
    return this.resultMap.get(conversionParametersForFixedRate)!;
  }

  public values() {
    return this.resultMap.values();
  }

  public entrySet() {
    return new Set(this.resultMap.entries());
  }
}
