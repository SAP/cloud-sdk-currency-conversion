/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelError } from './constants/conversion-model-error';

export class RatesDataProviderCode {
  private _dataProviderCode: string;

  constructor(dataProviderCode: string) {
    if (!dataProviderCode || !dataProviderCode.trim()) {
      throw new CurrencyConversionError(
        ConversionModelError.NULL_RATES_DATA_PROVIDER_CODE
      );
    }
    this._dataProviderCode = dataProviderCode.trim();
  }

  get dataProviderCode(): string {
    return this._dataProviderCode;
  }
}
