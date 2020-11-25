/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelError } from './constants/conversion-model-error';

export class CurrencyFactor {
  private _currencyFactor: number;

  constructor(currencyFactor = 1) {
    if (currencyFactor < 0) {
      throw new CurrencyConversionError(
        ConversionModelError.NEGATIVE_CURRENCY_FACTOR
      );
    }
    this._currencyFactor = currencyFactor;
  }

  get currencyFactor(): number {
    return this._currencyFactor;
  }
}
