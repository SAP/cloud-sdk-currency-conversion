/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelError } from './constants/conversion-model-error';

export class ExchangeRateValue {
  private _valueString: string;
  private _decimalValue: BigNumber;

  constructor(valueString: string, decimalValue: BigNumber) {
    this._valueString = valueString.trim();
    if (decimalValue < new BigNumber(0)) {
      throw new CurrencyConversionError(
        ConversionModelError.ILLEGAL_EXCHANGE_RATE
      );
    }
    this._decimalValue = decimalValue;
  }

  get valueString(): string {
    return this._valueString;
  }
  get decimalValue(): BigNumber {
    return this._decimalValue;
  }
}
