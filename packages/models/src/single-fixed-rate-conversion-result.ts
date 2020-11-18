/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { CurrencyAmount } from './currency-amount-type';

export class SingleFixedRateConversionResult {
  private _convertedAmount: CurrencyAmount;
  private _roundedOffConvertedAmount: CurrencyAmount;

  constructor(
    convertedAmt: CurrencyAmount,
    roundedOffConvertedAmt: CurrencyAmount
  ) {
    this._convertedAmount = convertedAmt;
    this._roundedOffConvertedAmount = roundedOffConvertedAmt;
  }

  get convertedAmount(): CurrencyAmount {
    return this._convertedAmount;
  }
  get roundedOffConvertedAmount(): CurrencyAmount {
    return this._roundedOffConvertedAmount;
  }
}
