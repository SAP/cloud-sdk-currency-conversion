export declare class Currency {
    private _currencyCode;
    private _defaultFractionDigits;
    private _numericCode;
    constructor(currencyCode: string, defaultFractionDigits: number, numericCode: string);
    get currencyCode(): string;
    get defaultFractionDigits(): number;
    get numericCode(): string;
}
