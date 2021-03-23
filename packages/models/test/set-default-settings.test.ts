/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import { setDefaultSettings } from '../src/exchange-rate';

describe('Set Default Settings Tests', () => {
  it('Default settings fields test', () => {
    const expectedResult = {
      tenantIdentifier: { id: 'TenantID' },
      isIndirect: false,
      fromCurrencyfactor: 1,
      toCurrencyfactor: 1
    };
    const actualResult = setDefaultSettings({ id: 'TenantID' });
    expect(actualResult).toEqual(expectedResult);
  });
});
