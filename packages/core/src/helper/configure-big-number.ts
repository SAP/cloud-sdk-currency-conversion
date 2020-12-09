/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';

export function configureBigNumber(scaleForDivision: number): typeof BigNumber {
  return BigNumber.clone({
    DECIMAL_PLACES: scaleForDivision,
    ROUNDING_MODE: 4
  });
}
