/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  ConversionParameterForNonFixedRate,
  ExchangeRateTypeDetail,
  ExchangeRate,
  TenantSettings,
  ExchangeRateValue,
  Currency
} from '@sap-cloud-sdk/currency-conversion-models';
import { SimpleIntegrationObjectsAdapter } from '../../src/adapter-cds';
import { insertExchangeRateTypesData, insertExchangeRatesData, insertTenantSettingsData } from './insert-data';

const cds = require('@sap/cds');
const { expect } = require('../adapter');

const NULL_TENANT = 'NullTenant';
const EMPTY_PARAMETER_LIST = 'EmptyParameterList';
const CURRENCY_EUR: Currency = new Currency('EUR', 2, '978');
const CURRENCY_USD: Currency = new Currency('USD', 2, '840');
const CURRENCY_INR: Currency = new Currency('INR', 2, '356');
const CURRENCY_JPY: Currency = new Currency('JPY', 0, '392');
const CURRENCY_VALUE_0_8: ExchangeRateValue = new ExchangeRateValue('0.8');
const CURRENCY_VALUE_80: ExchangeRateValue = new ExchangeRateValue('80');
const CURRENCY_VALUE_180: ExchangeRateValue = new ExchangeRateValue('180');
const CURRENCY_VALUE_100: ExchangeRateValue = new ExchangeRateValue('100');
const RATES_MID = 'MID';
const RATES_BID = 'BID';
const RATES_ASK = 'ASK';
const RATES_LAST = 'LAST';
const RATES_NEW = 'NEW';
const DATA_SOURCE = 'ECB';
const DATA_SOURCE_PROVIDER_CODE = 'MRM';
const S_2020_02_01T02_30_00Z: Date = new Date('2020-02-01T02:30:00Z');
const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');

const simpleIntegrationObjectsAdapter = new SimpleIntegrationObjectsAdapter();

const noReferenceFalseParam: ExchangeRateTypeDetail = new ExchangeRateTypeDetail(null as any, false);
const noReferenceTrueParam: ExchangeRateTypeDetail = new ExchangeRateTypeDetail(null as any, true);
const inrFalseParam: ExchangeRateTypeDetail = new ExchangeRateTypeDetail(CURRENCY_INR, false);
const inrTrueParam: ExchangeRateTypeDetail = new ExchangeRateTypeDetail(CURRENCY_INR, true);

const tenant: Tenant = { id: '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb' };
const tenant_id2: Tenant = { id: '6e4abe96-aecb-4b47-b7ed-ae4be76f9dfb' };

const tenantSettings: TenantSettings = {
  ratesDataProviderCode: DATA_SOURCE_PROVIDER_CODE,
  ratesDataSource: DATA_SOURCE
};

/* Conversion Parameter Starts */
const eurInrMidConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  CURRENCY_EUR.currencyCode,
  CURRENCY_INR.currencyCode,
  CURRENCY_VALUE_80.valueString,
  RATES_MID,
  S_2020_02_01T02_30_00Z
);

const eurJpyMidConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  CURRENCY_EUR.currencyCode,
  CURRENCY_JPY.currencyCode,
  CURRENCY_VALUE_180.valueString,
  RATES_MID,
  S_2020_02_01T02_30_00Z
);

const eurUsdMidConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  CURRENCY_EUR.currencyCode,
  CURRENCY_USD.currencyCode,
  CURRENCY_VALUE_80.valueString,
  RATES_MID,
  S_2020_02_01T02_30_00Z
);

const eurUsdBidConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  CURRENCY_EUR.currencyCode,
  CURRENCY_USD.currencyCode,
  CURRENCY_VALUE_80.valueString,
  RATES_BID,
  S_2020_02_01T02_30_00Z
);

const eurUsdAskConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  CURRENCY_EUR.currencyCode,
  CURRENCY_USD.currencyCode,
  CURRENCY_VALUE_80.valueString,
  RATES_ASK,
  S_2020_02_01T02_30_00Z
);

const usdJpyMidConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  CURRENCY_USD.currencyCode,
  CURRENCY_JPY.currencyCode,
  CURRENCY_VALUE_180.valueString,
  RATES_MID,
  S_2020_02_01T02_30_00Z
);

const eurUsdLastConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  CURRENCY_EUR.currencyCode,
  CURRENCY_USD.currencyCode,
  CURRENCY_VALUE_180.valueString,
  RATES_LAST,
  S_2020_02_01T02_30_00Z
);

const inrJpyBidConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  CURRENCY_INR.currencyCode,
  CURRENCY_JPY.currencyCode,
  CURRENCY_VALUE_180.valueString,
  RATES_BID,
  S_2020_02_01T02_30_00Z
);

const eurUsdNewConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  CURRENCY_EUR.currencyCode,
  CURRENCY_USD.currencyCode,
  CURRENCY_VALUE_180.valueString,
  RATES_NEW,
  S_2020_02_01T02_30_00Z
);

/* Conversion Parameter Ends */

/* Exchange Rate Starts */

const eurInrMrmEcbMParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_MID,
  CURRENCY_VALUE_80,
  CURRENCY_EUR,
  CURRENCY_INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurJpyMrmEcbMParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_MID,
  CURRENCY_VALUE_180,
  CURRENCY_EUR,
  CURRENCY_JPY,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdJpyMrmEcbMidParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_MID,
  CURRENCY_VALUE_0_8,
  CURRENCY_USD,
  CURRENCY_JPY,
  S_2020_01_01T02_30_00Z,
  true,
  10,
  1
);

const eurUsdMrmEcbMidParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_MID,
  CURRENCY_VALUE_0_8,
  CURRENCY_EUR,
  CURRENCY_USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  10
);

const eurInrMrmEcbBidParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_BID,
  CURRENCY_VALUE_80,
  CURRENCY_EUR,
  CURRENCY_INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmEcbBidParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_BID,
  CURRENCY_VALUE_180,
  CURRENCY_USD,
  CURRENCY_INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmEcbBidParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_BID,
  CURRENCY_VALUE_0_8,
  CURRENCY_EUR,
  CURRENCY_USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  10
);

const usdEurMrmEcbAskParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_ASK,
  CURRENCY_VALUE_0_8,
  CURRENCY_USD,
  CURRENCY_EUR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  10
);

const eurUsdMrmEcbAskParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_ASK,
  CURRENCY_VALUE_0_8,
  CURRENCY_EUR,
  CURRENCY_USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  10
);

const eurInrMrmEcbLastParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_LAST,
  CURRENCY_VALUE_80,
  CURRENCY_EUR,
  CURRENCY_INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmEcbLastParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_LAST,
  CURRENCY_VALUE_80,
  CURRENCY_EUR,
  CURRENCY_USD,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmEcbLastParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_LAST,
  CURRENCY_VALUE_180,
  CURRENCY_USD,
  CURRENCY_INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdJpyMrmThrMidParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  'THR',
  RATES_MID,
  CURRENCY_VALUE_180,
  CURRENCY_USD,
  CURRENCY_JPY,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

const eurUsdMrmThrMidParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  'THR',
  RATES_MID,
  CURRENCY_VALUE_180,
  CURRENCY_EUR,
  CURRENCY_USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

const usdJpyNullMidParam: ExchangeRate = new ExchangeRate(
  tenant,
  'NULL',
  'NULL',
  RATES_MID,
  CURRENCY_VALUE_180,
  CURRENCY_USD,
  CURRENCY_JPY,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

const eurUsdNullMidParam: ExchangeRate = new ExchangeRate(
  tenant,
  'NULL',
  'NULL',
  RATES_MID,
  CURRENCY_VALUE_180,
  CURRENCY_EUR,
  CURRENCY_USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

const eurUsdMrmEcbNewParam: ExchangeRate = new ExchangeRate(
  tenant,
  DATA_SOURCE_PROVIDER_CODE,
  DATA_SOURCE,
  RATES_NEW,
  CURRENCY_VALUE_100,
  CURRENCY_EUR,
  CURRENCY_USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

/* Exchange Rate Ends */

const model = cds.compile.cdl(`
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

describe('Adapter Test', () => {
  it('Bootstrap sqlite in-memory db...', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    expect(cds.db).to.exist;
    expect(cds.db.model).to.exist;
  });
  it('Test connection success', () => {
    expect(simpleIntegrationObjectsAdapter).to.instanceof(SimpleIntegrationObjectsAdapter);
  });

  it('Get exchange rates with tenant settings reference currency inverted false', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    const expectedExchangeRateList: ExchangeRate[] = [eurInrMrmEcbBidParam, eurUsdMrmEcbBidParam, usdInrMrmEcbBidParam];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [eurUsdBidConversionParam],
      tenant,
      tenantSettings
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates with tenant settings inverted rate no reference currency', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    const expectedExchangeRateList: ExchangeRate[] = [usdEurMrmEcbAskParam, eurUsdMrmEcbAskParam];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [eurUsdAskConversionParam],
      tenant,
      tenantSettings
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates with tenant settings reference currency inverted true', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    const expectedExchangeRateList: ExchangeRate[] = [
      usdInrMrmEcbLastParam,
      eurInrMrmEcbLastParam,
      eurUsdMrmEcbLastParam
    ];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [eurUsdLastConversionParam],
      tenant,
      tenantSettings
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates with tenant settings empty exchange rate type detail', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    const expectedExchangeRateList: ExchangeRate[] = [eurUsdMrmEcbNewParam];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [eurUsdNewConversionParam],
      tenant,
      tenantSettings
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates without tenant settings reference currency inverted false', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    const expectedExchangeRateList: ExchangeRate[] = [eurInrMrmEcbBidParam, eurUsdMrmEcbBidParam, usdInrMrmEcbBidParam];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [eurUsdBidConversionParam],
      tenant,
      null as any
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates without tenant settings inverted rate no reference currency', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    const expectedExchangeRateList: ExchangeRate[] = [usdEurMrmEcbAskParam, eurUsdMrmEcbAskParam];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [eurUsdAskConversionParam],
      tenant,
      null as any
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates without tenant settings reference currency inverted true', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    const expectedExchangeRateList: ExchangeRate[] = [
      usdInrMrmEcbLastParam,
      eurInrMrmEcbLastParam,
      eurUsdMrmEcbLastParam
    ];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [eurUsdLastConversionParam],
      tenant,
      null as any
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates with tenant settings success', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    const expectedExchangeRateList: ExchangeRate[] = [eurInrMrmEcbMParam, eurJpyMrmEcbMParam];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [eurInrMidConversionParam, eurJpyMidConversionParam],
      tenant,
      tenantSettings
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates without tenant settings success', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    const expectedExchangeRateList: ExchangeRate[] = [
      eurUsdNullMidParam,
      usdJpyNullMidParam,
      eurUsdMrmThrMidParam,
      usdJpyMrmThrMidParam,
      eurUsdMrmEcbMidParam,
      usdJpyMrmEcbMidParam
    ];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [usdJpyMidConversionParam, eurUsdMidConversionParam],
      tenant,
      null as any
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates empty result', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [inrJpyBidConversionParam],
      tenant,
      tenantSettings
    );
    expect(actualExchangeRateList.length).to.eql(0);
  });

  it('Get exchange rates empty tenant', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    const emptyTenant: Tenant = { id: '' };
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [eurUsdMidConversionParam, usdJpyMidConversionParam],
      emptyTenant,
      tenantSettings
    );
    expect(actualExchangeRateList.length).to.eql(0);
  });

  it('Get default settings for tenant success', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertTenantSettingsData();
    const expectedTenantSettings: TenantSettings = {
      ratesDataProviderCode: DATA_SOURCE_PROVIDER_CODE,
      ratesDataSource: DATA_SOURCE
    };
    const actualTenantSettings: TenantSettings = await simpleIntegrationObjectsAdapter.getDefaultSettingsForTenant(
      tenant
    );
    expect(actualTenantSettings).to.eql(expectedTenantSettings);
  });

  it('Get exchange rate type details for tenant success', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    const rateTypeSet: Set<string> = new Set();
    rateTypeSet.add(RATES_MID).add(RATES_BID).add(RATES_ASK).add(RATES_LAST);
    const actualExchangeRateTypeDetailMap: Map<
      string,
      ExchangeRateTypeDetail
    > = await simpleIntegrationObjectsAdapter.getExchangeRateTypeDetailsForTenant(tenant, rateTypeSet);
    const expectedExchangeRateTypeDetailMap = getExchangeRateTypeDetails();
    expect(actualExchangeRateTypeDetailMap).to.eql(expectedExchangeRateTypeDetailMap);
  });

  it('Get exchange rate type details for tenant failure', async () => {
    await cds.deploy(model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    const rateTypeSet: Set<string> = new Set();
    const actualExchangeRateTypeDetail: Map<
      string,
      ExchangeRateTypeDetail
    > = await simpleIntegrationObjectsAdapter.getExchangeRateTypeDetailsForTenant(
      tenant_id2,
      rateTypeSet.add(RATES_MID).add(RATES_BID)
    );
    expect(actualExchangeRateTypeDetail.size).to.eql(0);
  });

  function getExchangeRateTypeDetails(): Map<string, ExchangeRateTypeDetail> {
    const expectedExchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail> = new Map();
    expectedExchangeRateTypeDetailMap.set(RATES_MID, noReferenceFalseParam);
    expectedExchangeRateTypeDetailMap.set(RATES_BID, inrFalseParam);
    expectedExchangeRateTypeDetailMap.set(RATES_ASK, noReferenceTrueParam);
    expectedExchangeRateTypeDetailMap.set(RATES_LAST, inrTrueParam);
    return expectedExchangeRateTypeDetailMap;
  }
});
