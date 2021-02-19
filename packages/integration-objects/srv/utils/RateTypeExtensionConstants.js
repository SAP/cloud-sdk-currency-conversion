/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-len */
const RateTypeExtensionConstants = {
  UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_EX_RATE_TYPE:
    "The unique constraint for the primary keys has been violated. Provide a unique value for 'Exchange Rate Type'.",
  INVALID_ID_PROVIDED_FOR_EXCHANGE_RATE_TYPE_DESCRIPTION:
    "Please provide a valid value for 'ID'. It must be associated with exchange rate type of your tenant.",
  GUID_NOT_FOUND_FOR_READ: "The 'ID' key you have tried to access does not exist.",
  INVALID_COMBINATION_OF_INVERSION_REF_CURRENCY:
    'Valid values must be provided to either of Inversion Allowed or Reference Currency fields and not both of it.'
};

module.exports = RateTypeExtensionConstants;
