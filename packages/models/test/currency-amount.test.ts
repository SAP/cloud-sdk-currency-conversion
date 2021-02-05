/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { CurrencyAmount } from '../src/currency-amount';

describe('Currency Amount Tests', () => {
  it('Whitespace trim test', () => {
    const expectedResult = {
      valueString: '1234',
      decimalValue: new BigNumber(1234)
    };
    const actualResult = new CurrencyAmount('  1234   ');
    expect(actualResult).toEqual(expectedResult);
  });
});
