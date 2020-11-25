/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelError } from './constants/conversion-model-error';

export class RatesDataSource {
  private _dataSource: string;

  constructor(dataSource: string) {
    if (!dataSource || !dataSource.trim()) {
      throw new CurrencyConversionError(
        ConversionModelError.NULL_RATES_DATA_SOURCE
      );
    }
    this._dataSource = dataSource.trim();
  }

  get dataSource(): string {
    return this._dataSource;
  }
}
