/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
export class Currency {
  private _currencyCode: string;
  private _defaultFractionDigits: number;
  private _numericCode: string;

  constructor(
    currencyCode: string,
    defaultFractionDigits: number,
    numericCode: string
  ) {
    this._currencyCode = currencyCode;
    this._numericCode = numericCode;
    this._defaultFractionDigits = defaultFractionDigits;
  }

  get currencyCode(): string {
    return this._currencyCode;
  }
  get defaultFractionDigits(): number {
    return this._defaultFractionDigits;
  }
  get numericCode(): string {
    return this._numericCode;
  }
}
