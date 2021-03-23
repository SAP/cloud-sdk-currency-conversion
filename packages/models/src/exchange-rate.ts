/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import { Currency } from './currency';
import { Data } from './data';
import { Settings } from './settings';
import { Value } from './value';

export interface ExchangeRate {
  readonly settings: Settings;
  readonly data: Data;
  readonly value: Value;
  readonly fromCurrency: Currency;
  readonly toCurrency: Currency;
  readonly validFromDateTime: Date;
}

export function setDefaultSettings(tenantIdentifier: Tenant): Settings {
  return {
    tenantIdentifier,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  };
}
