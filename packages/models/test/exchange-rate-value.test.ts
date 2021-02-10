/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { ConversionModelError } from '../src/constants/conversion-model-error';
import { ExchangeRateValue } from '../src/exchange-rate-value';

describe('Exchange Rate Value Tests', () => {
  it('Negative exchange rate test', () => {
    expect(() => new ExchangeRateValue('-199')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
    expect(() => new ExchangeRateValue('  -199')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
    expect(() => new ExchangeRateValue('-199  ')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
    expect(() => new ExchangeRateValue('  -199  ')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
  });
});
