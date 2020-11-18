/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { CurrencyConversionError } from './currency-conversion-error';
import { ConversionModelErrors } from './constants/conversion-model-errors';

export class RateType {
  private _rateType: string;

  constructor(rateType: string) {
    if (!rateType || !rateType.trim()) {
      throw new CurrencyConversionError(ConversionModelErrors.NULL_RATE_TYPE);
    }
    this._rateType = rateType.trim();
  }

  get rateType(): string {
    return this._rateType;
  }
}
