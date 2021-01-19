/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

export interface TenantSettings {
  readonly ratesDataProviderCode: string;
  readonly ratesDataSource: string;
}

export function buildTenantSettings(ratesDataProviderCode: string, ratesDataSource: string): TenantSettings {
  return {
    ratesDataProviderCode,
    ratesDataSource
  };
}
