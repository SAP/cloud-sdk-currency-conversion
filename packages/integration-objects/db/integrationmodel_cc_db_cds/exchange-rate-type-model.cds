/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
namespace com.sap.integrationmodel.currencyconversion;

using com.sap.integrationmodel.currencyconversion.IntegrationModelType as T from './currency-conversion-model-types';
using com.sap.integrationmodel.currencyconversion.ExchangeRateTypes_texts;
using {managed} from '@sap/cds/common';

/*
  #DO NOT MODIFY
  Exchange Rate Type Details Model.
  This entity holds the conversion configuration for a rate type, for example, conversion by using a reference rate.
*/
entity ExchangeRateTypes : managed {

  key ID                                  : T.TCurrencyConversionIntegrationModelGUID not null;
      tenantID                            : T.TCurrencyConversionIntegrationModelGUID not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      exchangeRateType                    : T.TExchangeRateType not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      exchangeRateTypeDescription         : localized T.TExchangeRateTypeDescription;
      isInversionAllowed                  : T.TBoolean default false;
      referenceCurrencyThreeLetterISOCode : T.TCurrencyCode;
}

entity I_ExchangeRateTypes            as select from ExchangeRateTypes;
entity C_ExchangeRateTypes            as select from I_ExchangeRateTypes;
entity I_ExchangeRateTypeDescription  as select from ExchangeRateTypes_texts;
entity C_ExchangeRateTypesDescription as select from I_ExchangeRateTypeDescription;
