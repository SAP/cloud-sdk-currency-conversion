/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-len */
export enum ConversionError {
  INVALID_PARAMS = 'Conversion failed due to invalid parameters',
  CONVERSION_FAILED = 'Fixed Rate conversion failed',
  NO_MATCHING_EXCHANGE_RATE_RECORD = 'No matching exchange rate record found for conversion. Check your conversion parameters against your exchange rate list and retry.',
  MULTIPLE_CONVERSION_RECORD_FOUND = 'Multiple matching exchange rate records (with different Data Provider Code or Data Source, but with the same time stamp) found for conversion.',
  DUPLICATE_CONVERSION_RECORD_FOUND = 'Duplicate exchange rate records (with the same time stamp, data provider code, and data source) found.',
  ZERO_CURRENCY_FACTOR = "The to/from currency factor ratio is NAN or infinite. Check that the 'from' and 'to' currency factors are not zero.",
  NULL_ADAPTER_TENANT = 'Adapter or tenant cannot be null.',
  ERROR_FETCHING_DEFAULT_SETTINGS = 'Error occured while fetching the default settings.',
  ERROR_FETCHING_EXCHANGE_RATES = 'Error occured while fetching the exchange rates.',
  NON_FIXED_CONVERSION_FAILED = 'Non fixed conversion has failed',
  ZERO_RATE_REFERENCE_CURRENCY = "The exchange rate derivation failed for the conversion based on reference currency. Check that the exchange rate values in 'from' to 'Reference Currency' or 'to' to 'Reference Currency' are not zero.",
  EMPTY_OVERRIDE_TENANT_SETTING = 'Please provide a non-null value for the Override Tenant Setting.',
  EMPTY_EXCHANGE_RATE_LIST = 'The data adapter returned an empty list for exchange rates. Check the implementation of the method getExchangeRates in the data adapter and retry.'
}
