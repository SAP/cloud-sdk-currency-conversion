/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-len */
const RateTypeExtensionConstants = {
  UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE_TYPE:
    "The unique constraint for the primary keys has been violated. Provide a unique value for 'Exchange Rate Type'.",
  INVALID_DEFAULT_DATA_PROVIDER_FIELD_VALUE:
    "Provide a valid value for 'Default Data Provider Code'. The length of the field must be 1-15 characters.",
  INVALID_LOCALE_FIELD: "Provide a valid value for 'Locale'. The length of the field must be 1-14 characters.",
  INVALID_ID_PROVIDED_FOR_EXCHANGE_RATE_TYPE_DESCRIPTION:
    "Please provide a valid value for 'ID'. It must be associated with exchange rate type of your tenant.",
  INVALID_EXCHANGE_RATE_TYPE_DESCRIPTION_VALUE_FIELD:
    "Provide a valid value for 'Exchange Rate Type Description'. The length of the field must be 1-30 characters.",
  GUID_NOT_FOUND_FOR_READ: "The 'ID' key you have tried to access does not exist.",
  INVALID_COMBINATION_OF_INVERSION_REF_CURRENCY:
    'Valid values must be provided to either of Inversion Allowed or Reference Currency fields and not both of it.',
  INVALID_EXCHANGE_RATE_TYPE_FIELD_VALUE:
    "Provide a valid value for 'Exchange Rate Type'. The value must be 1-15 characters long. Only alphanumeric characters may be used.",
  INVALID_REFERENCE_CURRENCY_VALUE_FIELD:
    "Provide a valid value for 'Reference Currency'. The currency code must be three characters long."
};

module.exports = RateTypeExtensionConstants;
