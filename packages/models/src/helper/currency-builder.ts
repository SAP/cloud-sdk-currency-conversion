/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { isNullish } from '@sap-cloud-sdk/util';
import { Currency } from '../currency';
import { CurrencyConversionError } from '../currency-conversion-error';
import { ConversionModelError } from '../constants/conversion-model-error';
import codes from './currency-codes.json';
/**
 * Currency builder from given currency code string,
 * and throws an error if the given string is not a valid currency code.
 * @param currencyCode Currency code string
 * @param error Error object to capture any error in building the currency object.
 * @returns Currency object build from given currency code.
 */
export function buildCurrency(currencyCode: string): Currency {
  const defaultFractionDigits = 'CcyMnrUnts';
  const numericCode = 'CcyNbr';
  if (!currencyCode?.length) {
    throw new CurrencyConversionError(ConversionModelError.NULL_CURRENCY_CODES);
  }
  const currency = (codes as any)[currencyCode];
  if (isNullish(currency)) {
    throw new CurrencyConversionError(
      ConversionModelError.INVALID_CURRENCY_CODES
    );
  }
  return new Currency(
    currencyCode,
    Number.parseInt(currency[defaultFractionDigits], 10),
    currency[numericCode]
  );
}
