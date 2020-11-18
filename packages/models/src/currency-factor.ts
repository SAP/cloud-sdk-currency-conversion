/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelErrors } from './constants/conversion-model-errors';

export class CurrencyFactor {
  private _currencyFactor: number;

  constructor(currencyFactor = 1) {
    if (currencyFactor < 0) {
      throw new CurrencyConversionError(
        ConversionModelErrors.NEGATIVE_CURRENCY_FACTOR
      );
    }
    this._currencyFactor = currencyFactor;
  }

  get currencyFactor(): number {
    return this._currencyFactor;
  }
}
