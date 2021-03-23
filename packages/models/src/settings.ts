/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';

export interface Settings {
  readonly tenantIdentifier: Tenant;
  readonly isIndirect: boolean;
  readonly fromCurrencyfactor: number;
  readonly toCurrencyfactor: number;
}
