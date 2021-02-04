/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import { buildCurrency } from '../build';
import { buildExchangeRate } from '../src/exchange-rate';
import { buildExchangeRateValue } from '../src/exchange-rate-value';

describe('Build Exchange Rate Tests', () => {
  it('Default exchange rate fields test', () => {
    const expectedResult = {
      tenantIdentifier: { id: 'TenantID' },
      ratesDataProviderCode: 'MRM',
      ratesDataSource: 'ECB',
      exchangeRateType: 'ASK',
      exchangeRateValue: buildExchangeRateValue('12'),
      fromCurrency: buildCurrency('INR'),
      toCurrency: buildCurrency('EUR'),
      validFromDateTime: new Date('2019-09-16T02:30:00Z'),
      isIndirect: false,
      fromCurrencyfactor: 1,
      toCurrencyfactor: 1
    };
    const actualResult = buildExchangeRate(
      { id: 'TenantID' },
      'MRM',
      'ECB',
      'ASK',
      buildExchangeRateValue('12'),
      buildCurrency('INR'),
      buildCurrency('EUR'),
      new Date('2019-09-16T02:30:00Z')
    );
    expect(actualResult).toEqual(expectedResult);
  });
});
