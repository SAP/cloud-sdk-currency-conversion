/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-len */
const RateExtensionConstants = {
  INVALID_DATA_PROVIDER_FIELD_VALUE:
    "Provide a valid value for 'Data Provider Code'. The length of the field must be 1-15 characters.",
  INVALID_DATA_SOURCE_FIELD_VALUE:
    "Provide a valid value for 'Data Source Code'. The length of the field must be 1-15 characters.",
  INVALID_EXCHANGE_RATE_TYPE_FIELD_VALUE:
    "Provide a valid value for 'Exchange Rate Type'. The value must be 1-15 characters long. Only alphanumeric characters may be used.",
  INVALID_FROM_CURRENCY_FIELD_VALUE:
    "Provide a valid value for 'From Currency'. The currency code must be three characters long.",
  INVALID_TO_CURRENCY_FIELD_VALUE:
    "Provide a valid value for 'To Currency'. The currency code must be three characters long.",
  FROM_AND_TO_CURRENCY_ARE_SAME: "The 'From Currency' and 'To Currency' must be different from each other.",
  INVALID_DATE_TIME_VALUE_FIELD: "Provide a valid value for 'Valid From Date Time'. It cannot be NULL or empty",
  INVALID_EXCHANGE_RATE_VALUE_FIELD:
    "Provide a valid value for 'Exchange Rate Value'. The value must be greater than equal to zero.",
  INVALID_FROM_CURRENCY_FACTOR_VALUE_FIELD:
    "Provide a valid value for 'From Currency Factor'. The value must be greater than zero.",
  INVALID_TO_CURRENCY_FACTOR_VALUE_FIELD:
    "Provide a valid value for 'To Currency Factor'. The value must be greater than zero.",
  UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE:
    "The unique constraint for the primary keys has been violated. Provide a unique combination of values for the following fields: 'Data Provider Code', 'Data Source', 'Exchange Rate Type', 'From Currency' , 'To Currency', and 'Valid From Date Time'. You cannot have more than one entry with the same six values"
};

module.exports = RateExtensionConstants;
