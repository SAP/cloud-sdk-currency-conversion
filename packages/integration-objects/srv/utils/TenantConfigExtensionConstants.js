/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-len */
const TenantConfigExtensionConstants = {
  UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_TENANT_CONFIG:
    "The unique constraint for the primary keys has been violated. Provide a unique combination of values for the following fields: 'Default Data source' and 'Default Data Provider Code'. You cannot have more than one entry with the same two values.",
  UNAUTHORIZED_TO_CREATE_NEW_RECORD:
    "You have already activated another configuration. Deactivate it by setting the Active Configuration check to 'No' to activate another configuration.",
  INVALID_DESTINATION_NAME_FIELD_VALUE:
    "Provide a valid value for 'Destination Name'. The value must be 1-200 characters long.",
  INVALID_DEFAULT_DATA_SOURCE_FIELD_VALUE:
    "Provide a valid value for 'Default Data Source Code'. The length of the field must be 1-15 characters.",
  INVALID_DEFAULT_DATA_PROVIDER_FIELD_VALUE:
    "Provide a valid value for 'Default Data Provider Code'. The length of the field must be 1-15 characters."
};

module.exports = TenantConfigExtensionConstants;
