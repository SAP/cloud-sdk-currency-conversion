/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { RatesDataProviderCode } from './rates-data-provider-code';
import { RatesDataSource } from './rates-data-source';

export class TenantSettings {
  private _ratesDataProviderCode: RatesDataProviderCode;
  private _ratesDataSource: RatesDataSource;

  constructor(
    ratesDataProviderCode: RatesDataProviderCode,
    ratesDataSource: RatesDataSource
  ) {
    this._ratesDataProviderCode = ratesDataProviderCode;
    this._ratesDataSource = ratesDataSource;
  }

  get ratesDataProviderCode(): RatesDataProviderCode {
    return this._ratesDataProviderCode;
  }

  get ratesDataSource(): RatesDataSource {
    return this._ratesDataSource;
  }
}
