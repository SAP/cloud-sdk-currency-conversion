/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';

export class CurrencyAmount {
  readonly valueString: string;
  readonly decimalValue: BigNumber;

  constructor(valueString: string) {
    this.valueString = valueString.trim();
    this.decimalValue = new BigNumber(valueString.trim());
  }
}
