import { Currency } from './currency-type';
export declare class ExchangeRateTypeDetail {
    private _isInversionAllowed;
    private _referenceCurrency;
    constructor(referenceCurrency: Currency | null | undefined, isInversionAllowed?: boolean);
    get isInversionAllowed(): boolean;
    get referenceCurrency(): Currency | null | undefined;
}
