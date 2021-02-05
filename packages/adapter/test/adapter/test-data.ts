/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  ConversionParameterForNonFixedRate,
  ExchangeRateTypeDetail,
  ExchangeRate,
  TenantSettings,
  ExchangeRateValue,
  Currency,
  buildCurrency,
  buildExchangeRateValue,
  buildExchangeRateTypeDetail,
  buildExchangeRate,
  buildConversionParameterForNonFixedRate
} from '@sap-cloud-sdk/currency-conversion-models';
const cds = require('@sap/cds');

export const NULL_TENANT = 'NullTenant';
export const EMPTY_PARAMETER_LIST = 'EmptyParameterList';
export const EUR: Currency = buildCurrency('EUR');
export const USD: Currency = buildCurrency('USD');
export const INR: Currency = buildCurrency('INR');
export const JPY: Currency = buildCurrency('JPY');
export const EXCHANGERATE_VALUE_0_8: ExchangeRateValue = buildExchangeRateValue('0.8');
export const EXCHANGERATE_VALUE_80: ExchangeRateValue = buildExchangeRateValue('80');
export const EXCHANGERATE_VALUE_180: ExchangeRateValue = buildExchangeRateValue('180');
export const EXCHANGERATE_VALUE_100: ExchangeRateValue = buildExchangeRateValue('100');
export const RATES_MID = 'MID';
export const RATES_BID = 'BID';
export const RATES_ASK = 'ASK';
export const RATES_LAST = 'LAST';
export const RATES_NEW = 'NEW';
export const DATA_SOURCE = 'ECB';
export const DATA_SOURCE_PROVIDER_CODE = 'MRM';
export const S_2020_02_01T02_30_00Z: Date = new Date('2020-02-01T02:30:00Z');
export const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');

export const noReferenceFalseParam: ExchangeRateTypeDetail = buildExchangeRateTypeDetail(null as any, false);
export const noReferenceTrueParam: ExchangeRateTypeDetail = buildExchangeRateTypeDetail(null as any, true);
export const inrFalseParam: ExchangeRateTypeDetail = buildExchangeRateTypeDetail(INR, false);
export const inrTrueParam: ExchangeRateTypeDetail = buildExchangeRateTypeDetail(INR, true);

export const tenant: Tenant = { id: '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb' };
export const tenant_id2: Tenant = { id: '6e4abe96-aecb-4b47-b7ed-ae4be76f9dfb' };

export const tenantSettings: TenantSettings = {
  ratesDataProviderCode: DATA_SOURCE_PROVIDER_CODE,
  ratesDataSource: DATA_SOURCE
};

/* Conversion Parameter Starts */
export const eurInrMidConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  EUR.currencyCode,
  INR.currencyCode,
  EXCHANGERATE_VALUE_80.valueString,
  RATES_MID,
  S_2020_02_01T02_30_00Z
);

export const eurJpyMidConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  EUR.currencyCode,
  JPY.currencyCode,
  EXCHANGERATE_VALUE_180.valueString,
  RATES_MID,
  S_2020_02_01T02_30_00Z
);

export const eurUsdMidConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  EUR.currencyCode,
  USD.currencyCode,
  EXCHANGERATE_VALUE_80.valueString,
  RATES_MID,
  S_2020_02_01T02_30_00Z
);

export const eurUsdBidConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  EUR.currencyCode,
  USD.currencyCode,
  EXCHANGERATE_VALUE_80.valueString,
  RATES_BID,
  S_2020_02_01T02_30_00Z
);

export const eurUsdAskConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  EUR.currencyCode,
  USD.currencyCode,
  EXCHANGERATE_VALUE_80.valueString,
  RATES_ASK,
  S_2020_02_01T02_30_00Z
);

export const usdJpyMidConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  USD.currencyCode,
  JPY.currencyCode,
  EXCHANGERATE_VALUE_180.valueString,
  RATES_MID,
  S_2020_02_01T02_30_00Z
);

export const eurUsdLastConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  EUR.currencyCode,
  USD.currencyCode,
  EXCHANGERATE_VALUE_180.valueString,
  RATES_LAST,
  S_2020_02_01T02_30_00Z
);

export const inrJpyBidConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  INR.currencyCode,
  JPY.currencyCode,
  EXCHANGERATE_VALUE_180.valueString,
  RATES_BID,
  S_2020_02_01T02_30_00Z
);

export const eurUsdNewConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  EUR.currencyCode,
  USD.currencyCode,
  EXCHANGERATE_VALUE_180.valueString,
  RATES_NEW,
  S_2020_02_01T02_30_00Z
);

/* Conversion Parameter Ends */

/* Exchange Rate Starts */

export const eurInrMrmEcbMParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_MID,
  EXCHANGERATE_VALUE_80,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

export const eurJpyMrmEcbMParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_MID,
  EXCHANGERATE_VALUE_180,
  EUR,
  JPY,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

export const usdJpyMrmEcbMidParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_MID,
  EXCHANGERATE_VALUE_0_8,
  USD,
  JPY,
  S_2020_01_01T02_30_00Z,
  true,
  10,
  1
);

export const eurUsdMrmEcbMidParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_MID,
  EXCHANGERATE_VALUE_0_8,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  10
);

export const eurInrMrmEcbBidParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_BID,
  EXCHANGERATE_VALUE_80,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

export const usdInrMrmEcbBidParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_BID,
  EXCHANGERATE_VALUE_180,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

export const eurUsdMrmEcbBidParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_BID,
  EXCHANGERATE_VALUE_0_8,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  10
);

export const usdEurMrmEcbAskParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_ASK,
  EXCHANGERATE_VALUE_0_8,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  10
);

export const eurUsdMrmEcbAskParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_ASK,
  EXCHANGERATE_VALUE_0_8,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  10
);

export const eurInrMrmEcbLastParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_LAST,
  EXCHANGERATE_VALUE_80,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

export const eurUsdMrmEcbLastParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_LAST,
  EXCHANGERATE_VALUE_80,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

export const usdInrMrmEcbLastParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_LAST,
  EXCHANGERATE_VALUE_180,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

export const usdJpyMrmThrMidParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  'THR',
  RATES_MID,
  EXCHANGERATE_VALUE_180,
  USD,
  JPY,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

export const eurUsdMrmThrMidParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  'THR',
  RATES_MID,
  EXCHANGERATE_VALUE_180,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

export const usdJpyNullMidParam: ExchangeRate = buildExchangeRate(
  tenant,
  'NULL',
  'NULL',
  RATES_MID,
  EXCHANGERATE_VALUE_180,
  USD,
  JPY,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

export const eurUsdNullMidParam: ExchangeRate = buildExchangeRate(
  tenant,
  'NULL',
  'NULL',
  RATES_MID,
  EXCHANGERATE_VALUE_180,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

export const eurUsdMrmEcbNewParam: ExchangeRate = buildExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_NEW,
  EXCHANGERATE_VALUE_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

/* Exchange Rate Ends */

export const model = cds.compile.cdl(`
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
  type User : String(255);
  aspect managed {
    createdAt  : Timestamp @cds.on.insert : $now;
    createdBy  : User      @cds.on.insert : $user;
    modifiedAt : Timestamp @cds.on.insert : $now  @cds.on.update : $now;
    modifiedBy : User      @cds.on.insert : $user @cds.on.update : $user;
  }

  entity com.sap.integrationmodel.currencyconversion.CurrencyExchangeRates : managed {

    key ID                             : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null;
        tenantID                       : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        dataProviderCode               : IntegrationModelType.TDataProviderCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        dataSource                     : IntegrationModelType.TDataSource not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        exchangeRateType               : IntegrationModelType.TExchangeRateType not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        fromCurrencyThreeLetterISOCode : IntegrationModelType.TCurrencyCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        toCurrencyThreeLetterISOCode   : IntegrationModelType.TCurrencyCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        validFromDateTime              : IntegrationModelType.TDateTime not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        exchangeRateValue              : IntegrationModelType.TExchangeRateValue not null;
        isRateValueIndirect            : IntegrationModelType.TBoolean default false;
        fromCurrencyFactor             : IntegrationModelType.TFromCurrencyFactor default 1;
        toCurrencyFactor               : IntegrationModelType.TToCurrencyFactor default 1;
  }

  entity com.sap.integrationmodel.currencyconversion.ExchangeRateTypes : managed {

    key ID                                  : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null;
        tenantID                            : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        exchangeRateType                    : IntegrationModelType.TExchangeRateType not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        exchangeRateTypeDescription         : localized IntegrationModelType.TExchangeRateTypeDescription;
        isInversionAllowed                  : IntegrationModelType.TBoolean default false;
        referenceCurrencyThreeLetterISOCode : IntegrationModelType.TCurrencyCode;
  }

  entity com.sap.integrationmodel.currencyconversion.TenantConfigForConversions : managed {

    key ID                      : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null;
        tenantID                : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        defaultDataProviderCode : IntegrationModelType.TDataProviderCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        defaultDataSource       : IntegrationModelType.TDataSource not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        isConfigurationActive   : IntegrationModelType.TBoolean default false;
        connectToSAPMarketRatesManagement : IntegrationModelType.TBoolean default false; // @Beta: Added for MRM connectivity. If value is 'Yes', destinationName must be provided.
        destinationName         : IntegrationModelType.TDestinationName; // @Beta: Added for MRM connectivity : Destination Name.
  };
`);