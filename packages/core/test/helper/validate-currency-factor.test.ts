/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

import { ConversionModelError } from '@sap-cloud-sdk/currency-conversion-models';
import { validateCurrencyFactor } from '../../src/helper/validate-currency-factor';

describe('Validate Currency Factor Tests', () => {
  it('Check negative currency factor', () => {
    expect(() => validateCurrencyFactor(-1)).toThrow(ConversionModelError.NEGATIVE_CURRENCY_FACTOR);
  });
});
