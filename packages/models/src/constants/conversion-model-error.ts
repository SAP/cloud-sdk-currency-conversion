/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-len */
export enum ConversionModelError {
  INVALID_CURRENCY_CODES = 'Provided currency code does not exist.',
  NULL_CURRENCY_CODES = 'Invalid currency code.',
  ILLEGAL_EXCHANGE_RATE = 'Exchange rate value must be a positive numeral value.',
  NULL_RATE_TYPE = 'Fields in rateType cannot be null/empty. Check that your conversion parameters and exchange rates have correct values for rateType.',
  NEGATIVE_CURRENCY_FACTOR = 'The CurrencyFactor must be a positive value. Check that your exchange rates have correct values for from/to CurrencyFactor.',
  NULL_RATES_DATA_PROVIDER_CODE = 'Fields in RatesDataProviderCode cannot be null/empty. Check that your tenant settings and exchange rates have correct values for RatesDataProviderCode.',
  NULL_RATES_DATA_SOURCE = 'Fields in RatesDataSource cannot be null/empty. Check that your tenant settings and exchange rates have correct values for RatesDataSource.'
}
