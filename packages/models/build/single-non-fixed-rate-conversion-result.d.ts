import { CurrencyAmount } from './currency-amount-type';
import { ExchangeRate } from './exchange-rate';
export declare class SingleNonFixedRateConversionResult {
    private _exchangeRate;
    private _convertedAmount;
    private _roundedOffConvertedAmount;
    constructor(exchangeRate: ExchangeRate, convertedAmt: CurrencyAmount, roundedOffConvertedAmt: CurrencyAmount);
    get exchangeRate(): ExchangeRate;
    get convertedAmount(): CurrencyAmount;
    get roundedOffConvertedAmount(): CurrencyAmount;
}
