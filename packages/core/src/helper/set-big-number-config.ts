/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';

export function setBigNumberConfig(scaleForDivision: number): typeof BigNumber {
  const bigNum = BigNumber.clone({
    DECIMAL_PLACES: scaleForDivision,
    ROUNDING_MODE: 4
  });
  return bigNum;
}
