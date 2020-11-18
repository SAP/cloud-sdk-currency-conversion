/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelErrors } from './constants/conversion-model-errors';

export class ExchangeRateValue {
  private _valueString: string;
  private _decimalValue: BigNumber;

  constructor(valueString: string, decimalValue: BigNumber) {
    this._valueString = valueString.trim();
    if (decimalValue < new BigNumber(0)) {
      throw new CurrencyConversionError(
        ConversionModelErrors.ILLEGAL_EXCHANGE_RATE
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
