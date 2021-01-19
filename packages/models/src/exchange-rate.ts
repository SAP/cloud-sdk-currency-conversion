/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import { Currency } from './currency';
import { ExchangeRateValue } from './exchange-rate-value';

export interface ExchangeRate {
  readonly tenantIdentifier: Tenant;
  readonly ratesDataProviderCode: string | null;
  readonly ratesDataSource: string | null;
  readonly exchangeRateType: string;
  readonly exchangeRateValue: ExchangeRateValue;
  readonly fromCurrency: Currency;
  readonly toCurrency: Currency;
  readonly validFromDateTime: Date;
  readonly isIndirect: boolean;
  readonly fromCurrencyfactor: number;
  readonly toCurrencyfactor: number;
}

export function buildExchangeRate(
  tenantIdentifier: Tenant,
  ratesDataProviderCode: string | null,
  ratesDataSource: string | null,
  exchangeRateType: string,
  exchangeRateValue: ExchangeRateValue,
  fromCurrency: Currency,
  toCurrency: Currency,
  validFromDateTime: Date,
  isIndirect = false,
  fromCurrencyfactor = 1,
  toCurrencyfactor = 1
): ExchangeRate {
  return {
    tenantIdentifier,
    ratesDataProviderCode,
    ratesDataSource,
    exchangeRateType,
    exchangeRateValue,
    fromCurrency,
    toCurrency,
    validFromDateTime,
    isIndirect,
    fromCurrencyfactor,
    toCurrencyfactor
  };
}
