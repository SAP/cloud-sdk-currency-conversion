/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

export interface Data {
  readonly ratesDataProviderCode: string | null;
  readonly ratesDataSource: string | null;
  readonly exchangeRateType: string;
}
