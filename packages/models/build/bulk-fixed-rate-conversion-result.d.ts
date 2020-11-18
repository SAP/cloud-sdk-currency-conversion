import { ConversionParametersForFixedRate } from './currency-conversion-param-fixed-rate-type';
import { SingleFixedRateConversionResult } from './single-fixed-rate-conversion-result';
import { CurrencyConversionError } from './currency-conversion-error';
export declare class BulkFixedRateConversionResult {
    private readonly resultMap;
    constructor(resultMap: Map<ConversionParametersForFixedRate, SingleFixedRateConversionResult | CurrencyConversionError>);
    get(conversionParametersForFixedRate: ConversionParametersForFixedRate): SingleFixedRateConversionResult | CurrencyConversionError;
    values(): IterableIterator<CurrencyConversionError | SingleFixedRateConversionResult>;
    entrySet(): Set<[ConversionParametersForFixedRate, CurrencyConversionError | SingleFixedRateConversionResult]>;
}
