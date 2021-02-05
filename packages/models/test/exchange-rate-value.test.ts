/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { BigNumber } from 'bignumber.js';
import { ConversionModelError } from '../src/constants/conversion-model-error';
import { ExchangeRateValue } from '../src/exchange-rate-value';

describe('Exchange Rate Value Tests', () => {
  it('Whitespace trim test', () => {
    const expectedResult = {
      valueString: '121234',
      decimalValue: new BigNumber(121234)
    };
    const actualResult = new ExchangeRateValue('121234   ');
    expect(actualResult).toEqual(expectedResult);
  });

  it('Negative exchange rate test', () => {
    expect(() => new ExchangeRateValue('-199')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
    expect(() => new ExchangeRateValue('  -199')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
    expect(() => new ExchangeRateValue('-199  ')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
    expect(() => new ExchangeRateValue('  -199  ')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
  });
});
