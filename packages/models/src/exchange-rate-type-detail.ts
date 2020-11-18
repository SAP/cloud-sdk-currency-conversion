/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Currency } from './currency-type';

export class ExchangeRateTypeDetail {
  private _isInversionAllowed: boolean;
  // @Beta
  private _referenceCurrency: Currency | null | undefined;

  constructor(
    referenceCurrency: Currency | null | undefined,
    isInversionAllowed = false
  ) {
    this._referenceCurrency = referenceCurrency;
    this._isInversionAllowed = isInversionAllowed;
  }

  get isInversionAllowed(): boolean {
    return this._isInversionAllowed;
  }

  get referenceCurrency(): Currency | null | undefined {
    return this._referenceCurrency;
  }
}
