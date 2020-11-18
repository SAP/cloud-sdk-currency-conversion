/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { buildCurrency } from './helper/currency-builder';
import { CurrencyAmount } from './currency-amount-type';
import { ExchangeRateValue } from './exchange-rate-value-type';
import { Currency } from './currency-type';

export class ConversionParametersForFixedRate {
  private _fromCurrency: Currency;
  private _toCurrency: Currency;
  private _fromAmount: CurrencyAmount;
  private _fixedRateValue: ExchangeRateValue;

  constructor(
    fromCurrency: string,
    toCurrency: string,
    fromAmount: string,
    fixedRate: string
  ) {
    this._fromCurrency = buildCurrency(fromCurrency);
    this._toCurrency = buildCurrency(toCurrency);
    this._fromAmount = new CurrencyAmount(fromAmount);
    this._fixedRateValue = new ExchangeRateValue(
      fixedRate,
      new BigNumber(fixedRate)
    );
  }

  get fromCurrency(): Currency {
    return this._fromCurrency;
  }
  get toCurrency(): Currency {
    return this._toCurrency;
  }
  get fromAmount(): CurrencyAmount {
    return this._fromAmount;
  }
  get fixedRateValue(): ExchangeRateValue {
    return this._fixedRateValue;
  }
}
