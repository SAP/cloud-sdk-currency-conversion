/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
namespace com.sap.integrationmodel.currencyconversion;

using com.sap.integrationmodel.currencyconversion.IntegrationModelType as T from './currency-conversion-model-types';
using {managed} from '@sap/cds/common';

/*
  #DO NOT MODIFY
  Currency Exchange Rate Model.
  This entity holds the currency exchange rates for a day with the factors for an exchange rate combination.
*/
entity CurrencyExchangeRates : managed {

  key ID                             : T.TCurrencyConversionIntegrationModelGUID not null;
      tenantID                       : T.TCurrencyConversionIntegrationModelGUID not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      dataProviderCode               : T.TDataProviderCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      dataSource                     : T.TDataSource not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      exchangeRateType               : T.TExchangeRateType not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      fromCurrencyThreeLetterISOCode : T.TCurrencyCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      toCurrencyThreeLetterISOCode   : T.TCurrencyCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      validFromDateTime              : T.TDateTime not null; // This field is implicitly considered as one of the composite keys in OData extensions.
      exchangeRateValue              : T.TExchangeRateValue not null;
      isRateValueIndirect            : T.TBoolean default false;
      fromCurrencyFactor             : T.TFromCurrencyFactor default 1;
      toCurrencyFactor               : T.TToCurrencyFactor default 1;
};

entity I_CurrencyExchangeRates as select from CurrencyExchangeRates;
entity C_CurrencyExchangeRates  as select from I_CurrencyExchangeRates;

