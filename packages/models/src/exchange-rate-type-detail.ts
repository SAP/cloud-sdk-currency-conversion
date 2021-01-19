/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Currency } from './currency';

export interface ExchangeRateTypeDetail {
  readonly referenceCurrency: Currency;
  readonly isInversionAllowed: boolean;
}

export function buildExchangeRateTypeDetail(
  referenceCurrency: Currency,
  isInversionAllowed = false
): ExchangeRateTypeDetail {
  return {
    referenceCurrency,
    isInversionAllowed
  };
}
