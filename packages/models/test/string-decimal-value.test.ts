/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { StringDecimalValue } from '../src/string-decimal-value';

describe('String Decimal Value Tests', () => {
  it('Whitespace trim test', () => {
    const expectedResult = {
      valueString: '1234',
      decimalValue: new BigNumber(1234)
    };
    const actualResult = new StringDecimalValue('  1234   ');
    expect(actualResult.decimalValue).toEqual(expectedResult.decimalValue);
  });
});
