/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { CurrencyAmount } from './currency-amount-type';
import { ExchangeRate } from './exchange-rate';

export class SingleNonFixedRateConversionResult {
  private _exchangeRate: ExchangeRate;
  private _convertedAmount: CurrencyAmount;
  private _roundedOffConvertedAmount: CurrencyAmount;

  constructor(
    exchangeRate: ExchangeRate,
    convertedAmt: CurrencyAmount,
    roundedOffConvertedAmt: CurrencyAmount
  ) {
    this._exchangeRate = exchangeRate;
    this._convertedAmount = convertedAmt;
    this._roundedOffConvertedAmount = roundedOffConvertedAmt;
  }

  get exchangeRate(): ExchangeRate {
    return this._exchangeRate;
  }

  get convertedAmount(): CurrencyAmount {
    return this._convertedAmount;
  }
  get roundedOffConvertedAmount(): CurrencyAmount {
    return this._roundedOffConvertedAmount;
  }
}
