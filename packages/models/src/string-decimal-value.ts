/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';

export class StringDecimalValue {
  readonly valueString: string;
  constructor(valueString: string) {
    this.valueString = valueString.trim();
  }

  get decimalValue() {
    return new BigNumber(this.valueString);
  }
}
