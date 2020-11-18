/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
export class CurrencyConversionError extends Error {
  constructor(message?: string) {
    super(message);
    // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = CurrencyConversionError.name; // stack traces display correctly now
  }
}
