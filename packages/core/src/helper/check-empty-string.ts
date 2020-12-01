/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export function checkEmptyString(input: string): boolean {
  return input?.trim() ? false : true;
}
