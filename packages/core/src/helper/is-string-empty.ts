/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */

export function isStringEmpty(input: string): boolean {
  return !input?.trim();
}
