/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Currency } from './currency';

export class ExchangeRateTypeDetail {
  constructor(readonly referenceCurrency: Currency, readonly isInversionAllowed = false) {}
}
