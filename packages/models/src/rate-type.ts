/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelError } from './constants/conversion-model-error';

export class RateType {
  private _rateType: string;

  constructor(rateType: string) {
    if (!rateType || !rateType.trim()) {
      throw new CurrencyConversionError(ConversionModelError.NULL_RATE_TYPE);
    }
    this._rateType = rateType.trim();
  }

  get rateType(): string {
    return this._rateType;
  }
}
