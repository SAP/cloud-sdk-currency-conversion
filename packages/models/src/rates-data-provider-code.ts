/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelErrors } from './constants/conversion-model-errors';

export class RatesDataProviderCode {
  private _dataProviderCode: string;

  constructor(dataProviderCode: string) {
    if (!dataProviderCode || !dataProviderCode.trim()) {
      throw new CurrencyConversionError(
        ConversionModelErrors.NULL_RATES_DATA_PROVIDER_CODE
      );
    }
    this._dataProviderCode = dataProviderCode.trim();
  }

  get dataProviderCode(): string {
    return this._dataProviderCode;
  }
}
