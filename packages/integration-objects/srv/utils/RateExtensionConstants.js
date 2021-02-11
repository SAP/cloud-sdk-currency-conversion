/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-len */
const RateExtensionConstants = {
  FROM_AND_TO_CURRENCY_ARE_SAME: "The 'From Currency' and 'To Currency' must be different from each other.",
  INVALID_DATE_TIME_VALUE_FIELD: "Provide a valid value for 'Valid From Date Time'. It cannot be NULL or empty",
  UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE:
    "The unique constraint for the primary keys has been violated. Provide a unique combination of values for the following fields: 'Data Provider Code', 'Data Source', 'Exchange Rate Type', 'From Currency' , 'To Currency', and 'Valid From Date Time'. You cannot have more than one entry with the same six values",
  INVALID_EXCHANGE_RATE_VALUE_FIELD:
    "Provide a valid value for 'Exchange Rate Value'. The value must be greater than equal to zero.",
  INVALID_FROM_CURRENCY_FACTOR_VALUE_FIELD:
    "Provide a valid value for 'From Currency Factor'. The value must be greater than zero.",
  INVALID_TO_CURRENCY_FACTOR_VALUE_FIELD:
    "Provide a valid value for 'To Currency Factor'. The value must be greater than zero."
};

module.exports = RateExtensionConstants;
