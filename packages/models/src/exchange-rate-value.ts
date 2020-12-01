/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelError } from './constants/conversion-model-error';

export class ExchangeRateValue {
  readonly valueString: string;
  readonly decimalValue: BigNumber;

  constructor(valueString: string) {
    this.valueString = valueString.trim();
    const convertedDecimalValue = new BigNumber(valueString.trim());
    if (convertedDecimalValue < new BigNumber(0)) {
      throw new CurrencyConversionError(
        ConversionModelError.ILLEGAL_EXCHANGE_RATE
      );
    }
    this.decimalValue = convertedDecimalValue;
  }
}
