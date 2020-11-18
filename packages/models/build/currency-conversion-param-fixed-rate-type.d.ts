import { CurrencyAmount } from './currency-amount-type';
import { ExchangeRateValue } from './exchange-rate-value-type';
import { Currency } from './currency-type';
export declare class ConversionParametersForFixedRate {
    private _fromCurrency;
    private _toCurrency;
    private _fromAmount;
    private _fixedRateValue;
    constructor(fromCurrency: string, toCurrency: string, fromAmount: string, fixedRate: string);
    get fromCurrency(): Currency;
    get toCurrency(): Currency;
    get fromAmount(): CurrencyAmount;
    get fixedRateValue(): ExchangeRateValue;
}
