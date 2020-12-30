/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

namespace com.sap.integrationmodel.currencyconversion;

using com.sap.integrationmodel.currencyconversion.IntegrationModelType as T from './currency-conversion-model-types';
using {managed} from '@sap/cds/common';

/*
  #DO NOT MODIFY
  Tenant Configuration or Default Configurations Model.
  This entity holds the holds the tenant configuration for conversion, for example, data source, data provider code, and so on.
*/
entity TenantConfigForConversions : managed {

  key ID                      : T.TCurrencyConversionIntegrationModelGUID not null;
      tenantID                : T.TCurrencyConversionIntegrationModelGUID not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      defaultDataProviderCode : T.TDataProviderCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      defaultDataSource       : T.TDataSource not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      isConfigurationActive   : T.TBoolean default false;
      connectToSAPMarketRatesManagement : T.TBoolean default false; // @Beta: Added for MRM connectivity. If value is 'Yes', destinationName must be provided.
      destinationName         : T.TDestinationName; // @Beta: Added for MRM connectivity : Destination Name.
};

entity I_TenantConfigForConversions as select from TenantConfigForConversions;
entity C_TenantConfigForConversions as select from I_TenantConfigForConversions;
