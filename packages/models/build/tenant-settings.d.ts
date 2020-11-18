import { RatesDataProviderCode } from './rates-data-provider-code';
import { RatesDataSource } from './rates-data-source';
export declare class TenantSettings {
    private _ratesDataProviderCode;
    private _ratesDataSource;
    constructor(ratesDataProviderCode: RatesDataProviderCode, ratesDataSource: RatesDataSource);
    get ratesDataProviderCode(): RatesDataProviderCode;
    get ratesDataSource(): RatesDataSource;
}
