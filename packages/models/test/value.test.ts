/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { ConversionModelError } from '../src/constants/conversion-model-error';
import { Value } from '../src/value';

describe('Exchange Rate Value Tests', () => {
  it('Negative exchange rate test', () => {
    expect(() => new Value('-199')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
    expect(() => new Value('  -199')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
    expect(() => new Value('-199  ')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
    expect(() => new Value('  -199  ')).toThrow(ConversionModelError.ILLEGAL_EXCHANGE_RATE);
  });
});
