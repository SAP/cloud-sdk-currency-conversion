import { BigNumber } from 'bignumber.js';
export declare class ExchangeRateValue {
    private _valueString;
    private _decimalValue;
    constructor(valueString: string, decimalValue: BigNumber);
    get valueString(): string;
    get decimalValue(): BigNumber;
}
