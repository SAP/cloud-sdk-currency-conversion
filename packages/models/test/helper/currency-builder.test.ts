/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import { ConversionModelError } from '../../src/constants/conversion-model-error';
import { buildCurrency } from '../../src/helper/currency-builder';

describe('Build currency objects tests', () => {
  it('Build Currency Object Positive', () => {
    expect(buildCurrency('INR')).toBeTruthy();
    expect(buildCurrency('INR').defaultFractionDigits).toBe(2);
    expect(buildCurrency('INR').numericCode).toBe('356');
  });
  it('Build Currency Object Invalid Currency Code', () => {
    expect(() => buildCurrency('123')).toThrowError(ConversionModelError.INVALID_CURRENCY_CODES);
  });
  it('Build Currency Object null Currency Code', () => {
    expect(() => buildCurrency('')).toThrowError(ConversionModelError.NULL_CURRENCY_CODES);
  });
});
