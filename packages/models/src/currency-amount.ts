/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { StringDecimalValue } from './string-decimal-value';

export class CurrencyAmount extends StringDecimalValue {
  constructor(valueString: string) {
    const trimmedString: string = valueString.trim();
    super(trimmedString, new BigNumber(trimmedString));
  }
}
