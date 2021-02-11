/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-len */
const TenantConfigExtensionConstants = {
  UNIQUE_CONSTRAINT_FOR_SEMANTIC_KEYS_TENANT_CONFIG:
    "The unique constraint for the primary keys has been violated. Provide a unique combination of values for the following fields: 'Default Data source' and 'Default Data Provider Code'. You cannot have more than one entry with the same two values.",
  UNAUTHORIZED_TO_CREATE_NEW_RECORD:
    "You have already activated another configuration. Deactivate it by setting the Active Configuration check to 'No' to activate another configuration."
};

module.exports = TenantConfigExtensionConstants;
