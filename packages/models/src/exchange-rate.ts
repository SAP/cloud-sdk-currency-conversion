/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import { Currency } from './currency';
import { ExchangeRateValue } from './exchange-rate-value';

export class ExchangeRate {
  constructor(
    readonly tenantIdentifier: Tenant,
    readonly ratesDataProviderCode: string,
    readonly ratesDataSource: string,
    readonly exchangeRateType: string,
    readonly exchangeRateValue: ExchangeRateValue,
    readonly fromCurrency: Currency,
    readonly toCurrency: Currency,
    readonly validFromDateTime: Date,
    readonly isIndirect = false,
    readonly fromCurrencyfactor: number = 1,
    readonly toCurrencyfactor: number = 1
  ) {}
}
