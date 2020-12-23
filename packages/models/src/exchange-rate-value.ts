/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelError } from './constants/conversion-model-error';
import { StringDecimalValue } from './string-decimal-value';

export type ExchangeRateValue = StringDecimalValue;

export function buildExchangeRateValue(valueString: string): ExchangeRateValue {
  const decimalValue = new BigNumber(valueString.trim());
  if (decimalValue < new BigNumber(0)) {
    throw new CurrencyConversionError(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
  }
  return {
    valueString: valueString.trim(),
    decimalValue
  };
}
