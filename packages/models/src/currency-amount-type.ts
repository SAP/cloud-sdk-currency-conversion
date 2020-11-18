/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';

export class CurrencyAmount {
  private _valueString: string;
  private _decimalValue: BigNumber;

  constructor(valueString: string) {
    this._valueString = valueString.trim();
    this._decimalValue = new BigNumber(valueString.trim());
  }
  get valueString(): string {
    return this._valueString;
  }

  get decimalValue(): BigNumber {
    return this._decimalValue;
  }
}
