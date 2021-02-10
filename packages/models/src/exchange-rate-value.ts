/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelError } from './constants/conversion-model-error';
import { StringDecimalValue } from './string-decimal-value';

export class ExchangeRateValue extends StringDecimalValue {
  constructor(valueString: string) {
    super(valueString);
    if (this.decimalValue < new BigNumber(0)) {
      throw new CurrencyConversionError(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
    }
  }
}