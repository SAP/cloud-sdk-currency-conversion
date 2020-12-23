/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export interface Currency {
  readonly currencyCode: string;
  readonly defaultFractionDigits: number;
  readonly numericCode: string;
}
