import { Currency } from '../currency-type';
/**
 * Currency builder from given currency code string,
 * and throws an error if the given string is not a valid currency code.
 * @param currencyCode Currency code string
 * @param error Error object to capture any error in building the currency object.
 * @returns Currency object build from given currency code.
 */
export declare function buildCurrency(currencyCode: string): Currency;
