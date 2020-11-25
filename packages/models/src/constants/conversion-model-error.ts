/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
export enum ConversionModelError {
  INVALID_CURRENCY_CODES = 'Provided currency code does not exist.',
  NULL_CURRENCY_CODES = 'Invalid currency code.',
  ILLEGAL_EXCHANGE_RATE = 'Exchange rate value must be a positive numeral value.',
  NULL_RATE_TYPE = 'Fields in rateType cannot be null.',
  NEGATIVE_CURRENCY_FACTOR = 'The CurrencyFactor must be a positive value.',
  NULL_RATES_DATA_PROVIDER_CODE = 'Fields in RatesDataProviderCode cannot be null.',
  NULL_RATES_DATA_SOURCE = 'Fields in RatesDataSource cannot be null.'
}
