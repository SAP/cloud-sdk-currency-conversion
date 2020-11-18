/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ConversionParametersForFixedRate } from './currency-conversion-param-fixed-rate-type';
import { SingleFixedRateConversionResult } from './single-fixed-rate-conversion-result';
import { CurrencyConversionError } from './currency-conversion-error';

export class BulkFixedRateConversionResult {
  private readonly resultMap: Map<
    ConversionParametersForFixedRate,
    SingleFixedRateConversionResult | CurrencyConversionError
  >;

  constructor(
    resultMap: Map<
      ConversionParametersForFixedRate,
      SingleFixedRateConversionResult | CurrencyConversionError
    >
  ) {
    this.resultMap = resultMap;
  }

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
