import { BigNumber } from 'bignumber.js';
export declare class CurrencyAmount {
    private _valueString;
    private _decimalValue;
    constructor(valueString: string);
    get valueString(): string;
    get decimalValue(): BigNumber;
}
