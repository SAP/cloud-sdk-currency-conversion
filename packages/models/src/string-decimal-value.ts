/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';

export interface StringDecimalValue {
  readonly valueString: string;
  readonly decimalValue: BigNumber;
}
