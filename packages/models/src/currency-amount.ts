/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { StringDecimalValue } from './string-decimal-value';

export type CurrencyAmount = StringDecimalValue;

export function buildCurrencyAmount(valueString: string): CurrencyAmount {
  return {
    valueString: valueString.trim(),
    decimalValue: new BigNumber(valueString.trim())
  };
}
