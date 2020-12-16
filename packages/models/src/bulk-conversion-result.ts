/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ConversionParameterForFixedRate } from './conversion-parameter-for-fixed-rate';
import { ConversionParameterForNonFixedRate } from './conversion-parameter-for-non-fixed-rate';
import { CurrencyConversionError } from './currency-conversion-error';
import { SingleFixedRateConversionResult } from './single-fixed-rate-conversion-result';
import { SingleNonFixedRateConversionResult } from './single-non-fixed-rate-conversion-result';

export class BulkConversionResult<
  ParameterT extends ConversionParameterForNonFixedRate | ConversionParameterForFixedRate,
  ConversionResultT extends SingleNonFixedRateConversionResult | SingleFixedRateConversionResult
> {
  constructor(readonly resultMap: Map<ParameterT, ConversionResultT | CurrencyConversionError>) {}
  public get(conversionParameter: ParameterT): ConversionResultT | CurrencyConversionError {
    return this.resultMap.get(conversionParameter)!;
  }
  public values(): IterableIterator<ConversionResultT | CurrencyConversionError> {
    return this.resultMap.values();
  }
  public entrySet(): Set<[ParameterT, ConversionResultT | CurrencyConversionError]> {
    return new Set(this.resultMap.entries());
  }
}
