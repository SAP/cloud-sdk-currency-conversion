/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Currency } from '../currency-type';
import { CurrencyConversionError } from '../currency-conversion-error';
import { ConversionModelErrors } from '../constants/conversion-model-errors';
import codes from './currency-codes.json';
/**
 * Currency builder from given currency code string,
 * and throws an error if the given string is not a valid currency code.
 * @param currencyCode Currency code string
 * @param error Error object to capture any error in building the currency object.
 * @returns Currency object build from given currency code.
 */
export function buildCurrency(currencyCode: string): Currency {
  const curMnrUnits = 'CcyMnrUnts';
  const curNumCode = 'CcyNbr';
  if (
    currencyCode === null ||
    typeof currencyCode === 'undefined' ||
    currencyCode.length === 0
  ) {
    throw new CurrencyConversionError(
      ConversionModelErrors.NULL_CURRENCY_CODES
    );
  }
  const currency = (codes as any)[currencyCode];
  if (currency === null || typeof currency === 'undefined') {
    throw new CurrencyConversionError(
      ConversionModelErrors.INVALID_CURRENCY_CODES
    );
  }
  return new Currency(
    currencyCode,
    Number.parseInt(currency[curMnrUnits], 10),
    currency[curNumCode]
  );
}
