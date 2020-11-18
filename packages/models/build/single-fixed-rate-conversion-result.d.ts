import { CurrencyAmount } from './currency-amount-type';
export declare class SingleFixedRateConversionResult {
    private _convertedAmount;
    private _roundedOffConvertedAmount;
    constructor(convertedAmt: CurrencyAmount, roundedOffConvertedAmt: CurrencyAmount);
    get convertedAmount(): CurrencyAmount;
    get roundedOffConvertedAmount(): CurrencyAmount;
}
