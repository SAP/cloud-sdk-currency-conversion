/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { buildCurrency } from './helper/currency-builder';
import { CurrencyAmount } from './currency-amount-type';
import { Currency } from './currency-type';
import { RateType } from './rate-type';

export class ConversionParametersForNonFixedRate {
  private _fromCurrency: Currency;
  private _toCurrency: Currency;
  private _fromAmount: CurrencyAmount;
  private _exchangeRateType: RateType;
  private _conversionAsOfDateTime: Date;

  constructor(
    fromCurrency: string,
    toCurrency: string,
    fromAmount: string,
    exchangeRateType: RateType,
    conversionAsOfDateTime: Date = new Date()
  ) {
    this._fromCurrency = buildCurrency(fromCurrency);
    this._toCurrency = buildCurrency(toCurrency);
    this._fromAmount = new CurrencyAmount(fromAmount);
    this._exchangeRateType = exchangeRateType;
    this._conversionAsOfDateTime = conversionAsOfDateTime;
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

  get exchangeRateType(): RateType {
    return this._exchangeRateType;
  }

  get conversionAsOfDateTime(): Date {
    return this._conversionAsOfDateTime;
  }
}
