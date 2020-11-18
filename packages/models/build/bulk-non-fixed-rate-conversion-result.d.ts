import { ConversionParametersForNonFixedRate } from './conversion-parameters-for-non-fixed-rate';
import { SingleNonFixedRateConversionResult } from './single-non-fixed-rate-conversion-result';
import { CurrencyConversionError } from './currency-conversion-error';
export declare class BulkNonFixedRateConversionResult {
    private readonly resultMap;
    constructor(resultMap: Map<ConversionParametersForNonFixedRate, SingleNonFixedRateConversionResult | CurrencyConversionError>);
    get(conversionParametersForFixedRate: ConversionParametersForNonFixedRate): SingleNonFixedRateConversionResult | CurrencyConversionError;
    values(): IterableIterator<CurrencyConversionError | SingleNonFixedRateConversionResult>;
    entrySet(): Set<[ConversionParametersForNonFixedRate, CurrencyConversionError | SingleNonFixedRateConversionResult]>;
}
