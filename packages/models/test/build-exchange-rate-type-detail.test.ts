/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import { buildExchangeRateTypeDetail } from '../src/exchange-rate-type-detail';
import { buildCurrency } from '../src/helper/currency-builder';

describe('Build Exchange Rate Type Detail Tests', () => {
  it('Default inversion not allowed test', () => {
    const referenceCurrency = buildCurrency('INR');
    const expectedResult = {
      referenceCurrency,
      isInversionAllowed: false
    };
    const actualResult = buildExchangeRateTypeDetail(referenceCurrency);
    expect(actualResult).toEqual(expectedResult);
  });

  it('Inversion allowed true test', () => {
    const referenceCurrency = buildCurrency('INR');
    const expectedResult = {
      referenceCurrency,
      isInversionAllowed: true
    };
    const actualResult = buildExchangeRateTypeDetail(referenceCurrency, true);
    expect(actualResult).toEqual(expectedResult);
  });

  it('Inversion allowed false test', () => {
    const referenceCurrency = buildCurrency('INR');
    const expectedResult = {
      referenceCurrency,
      isInversionAllowed: false
    };
    const actualResult = buildExchangeRateTypeDetail(referenceCurrency, false);
    expect(actualResult).toEqual(expectedResult);
  });
});
