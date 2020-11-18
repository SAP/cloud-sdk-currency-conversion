import { CurrencyAmount } from './currency-amount-type';
import { Currency } from './currency-type';
import { RateType } from './rate-type';
export declare class ConversionParametersForNonFixedRate {
    private _fromCurrency;
    private _toCurrency;
    private _fromAmount;
    private _exchangeRateType;
    private _conversionAsOfDateTime;
    constructor(fromCurrency: string, toCurrency: string, fromAmount: string, exchangeRateType: RateType, conversionAsOfDateTime?: Date);
    get fromCurrency(): Currency;
    get toCurrency(): Currency;
    get fromAmount(): CurrencyAmount;
    get exchangeRateType(): RateType;
    get conversionAsOfDateTime(): Date;
}
