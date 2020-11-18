/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { buildCurrency } from '../../src/helper/currency-builder';

describe('Build currency objects tests', () => {
  it('Build Currency Object Positive', () => {
    expect(buildCurrency('INR')).toBeTruthy();
    expect(buildCurrency('INR').defaultFractionDigits).toBe(2);
    expect(buildCurrency('INR').numericCode).toBe('356');
  });
  it('Build Currency Object Invalid Currency Code', () => {
    let errorInput = new Error();
    try {
      expect(buildCurrency('123')).toThrow();
    } catch (error) {
      errorInput = error;
    }
  });
});
