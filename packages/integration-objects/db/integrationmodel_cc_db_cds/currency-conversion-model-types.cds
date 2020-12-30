/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

namespace com.sap.integrationmodel.currencyconversion;

/*
  #DO NOT MODIFY
  Holds the data types for each fields for all integration models.
*/
context IntegrationModelType {
        type TCurrencyConversionIntegrationModelGUID: UUID;
        type TCurrencyCode :                String(3);
        type TDataProviderCode :            String(15);
        type TExchangeRateType :            String(15);
        type TExchangeRateTypeDescription : String(30);
        type TDataSource :                  String(15);
        type TDateTime :                    DateTime;
        type TExchangeRateValue :           Decimal(24,14);  // Decimal(Precision, Scale)
        type TFromCurrencyFactor :          Integer64;
        type TToCurrencyFactor :            Integer64;
        type TBoolean :                     Boolean;
        type TDestinationName  :            String(200);
};