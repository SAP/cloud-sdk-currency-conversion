/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const INVALID_COMBINATION_OF_INVERSION_REF_CURRENCY =
  'Valid values must be provided to either of Inversion Allowed or Reference Currency fields and not both of it.';
const INVALID_DATA_PROVIDER_FIELD_VALUE =
  "Provide a valid value for 'Data Provider Code'. The length of the field must be 1-15 characters.";
const INVALID_DATA_SOURCE_FIELD_VALUE =
  "Provide a valid value for 'Data Source Code'. The length of the field must be 1-15 characters.";
const INVALID_EXCHANGE_RATE_TYPE_FIELD_VALUE =
  "Provide a valid value for 'Exchange Rate Type'. The value must be 1-15 characters long. Only alphanumeric characters may be used.";
const INVALID_FROM_CURRENCY_FIELD_VALUE =
  "Provide a valid value for 'From Currency'. The currency code must be three characters long.";
const INVALID_TO_CURRENCY_FIELD_VALUE =
  "Provide a valid value for 'To Currency'. The currency code must be three characters long.";
const FROM_AND_TO_CURRENCY_ARE_SAME =
  "The 'From Currency' and 'To Currency' must be different from each other.";
const INVALID_DATE_TIME_VALUE_FIELD =
  "Provide a valid value for 'Valid From Date Time'. It cannot be NULL or empty";
const INVALID_EXCHANGE_RATE_VALUE_FIELD =
  "Provide a valid value for 'Exchange Rate Value'. The value must be greater than equal to zero.";
const INVALID_FROM_CURRENCY_FACTOR_VALUE_FIELD =
  "Provide a valid value for 'From Currency Factor'. The value must be greater than zero.";
const INVALID_TO_CURRENCY_FACTOR_VALUE_FIELD =
  "Provide a valid value for 'From Currency Factor'. The value must be greater than zero.";
const UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE =
  "The unique constraint for the primary keys has been violated. Provide a unique combination of values for the following fields: 'Data Provider Code', 'Data Source', 'Exchange Rate Type', 'From Currency' , 'To Currency', and 'Valid From Date Time'. You cannot have more than one entry with the same six values";
const INVALID_REFERENCE_CURRENCY_VALUE_FIELD =
  "Provide a valid value for 'Reference Currency'. The currency code must be three characters long.";
const UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE_TYPE =
  "The unique constraint for the primary keys has been violated. Provide a unique value for 'Exchange Rate Type'.";
const INVALID_DEFAULT_DATA_PROVIDER_FIELD_VALUE =
  "Provide a valid value for 'Default Data Provider Code'. The length of the field must be 1-15 characters.";
const INVALID_DEFAULT_DATA_SOURCE_FIELD_VALUE =
  "Provide a valid value for 'Default Data Source Code'. The length of the field must be 1-15 characters.";
const INVALID_DESTINATION_NAME_FIELD_VALUE =
  "Provide a valid value for 'Destination Name'. The value must be 1-200 characters long.";
const UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_TENANT_CONFIG =
  "The unique constraint for the primary keys has been violated. Provide a unique combination of values for the following fields: 'Default Data source' and 'Default Data Provider Code'. You cannot have more than one entry with the same two values.";
const UNAUTHORIZED_TO_CREATE_NEW_RECORD =
  "You have already activated another configuration. Deactivate it by setting the Active Configuration check to 'No' to activate another configuration.";
const INVALID_LOCALE_FIELD =
  "Provide a valid value for 'Locale'. The length of the field must be 1-14 characters.";
const INVALID_ID_PROVIDED_FOR_EXCHANGE_RATE_TYPE_DESCRIPTION =
  "Please provide a valid value for 'ID'. It must be associated with exchange rate type of your tenant.";
const INVALID_EXCHANGE_RATE_TYPE_DESCRIPTION_VALUE_FIELD =
  "Provide a valid value for 'Exchange Rate Type Description'. The length of the field must be 1-30 characters.";
const GUID_NOT_FOUND_FOR_READ =
  "The 'ID' key you have tried to access does not exist.";
const INVALID_TENANTID =
  "Provide a valid value for 'Tenant ID'. The tenant information in the tenant ID you provided does not match your credentials. Provide a valid value for TenantId that matches, or leave the field in the payload blank to opt for automatic tenant detection.";

module.exports = {
  INVALID_DATA_SOURCE_FIELD_VALUE,
  INVALID_COMBINATION_OF_INVERSION_REF_CURRENCY,
  INVALID_DATA_PROVIDER_FIELD_VALUE,
  INVALID_EXCHANGE_RATE_TYPE_FIELD_VALUE,
  INVALID_FROM_CURRENCY_FIELD_VALUE,
  INVALID_TO_CURRENCY_FIELD_VALUE,
  FROM_AND_TO_CURRENCY_ARE_SAME,
  INVALID_DATE_TIME_VALUE_FIELD,
  INVALID_EXCHANGE_RATE_VALUE_FIELD,
  INVALID_FROM_CURRENCY_FACTOR_VALUE_FIELD,
  INVALID_TO_CURRENCY_FACTOR_VALUE_FIELD,
  UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE,
  INVALID_REFERENCE_CURRENCY_VALUE_FIELD,
  UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE_TYPE,
  INVALID_DEFAULT_DATA_PROVIDER_FIELD_VALUE,
  INVALID_DEFAULT_DATA_SOURCE_FIELD_VALUE,
  INVALID_DESTINATION_NAME_FIELD_VALUE,
  UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_TENANT_CONFIG,
  UNAUTHORIZED_TO_CREATE_NEW_RECORD,
  INVALID_LOCALE_FIELD,
  INVALID_ID_PROVIDED_FOR_EXCHANGE_RATE_TYPE_DESCRIPTION,
  INVALID_EXCHANGE_RATE_TYPE_DESCRIPTION_VALUE_FIELD,
  GUID_NOT_FOUND_FOR_READ,
  INVALID_TENANTID
};
