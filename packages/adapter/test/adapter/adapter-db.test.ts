/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
import { Tenant } from '@sap-cloud-sdk/core';
import { ExchangeRateTypeDetail, ExchangeRate, TenantSettings } from '@sap-cloud-sdk/currency-conversion-models';
import { SimpleIntegrationObjectsAdapter } from '../../src/adapter-cds';
import { insertExchangeRateTypesData, insertExchangeRatesData, insertTenantSettingsData } from './insert-data';
import * as constants from './test-data';

const cds = require('@sap/cds');
const { expect } = require('../adapter');
const simpleIntegrationObjectsAdapter = new SimpleIntegrationObjectsAdapter();

describe('Adapter Test', () => {
  beforeAll(async () => {
    await cds.deploy(constants.model).to('sqlite::memory:');
    insertExchangeRateTypesData();
    insertExchangeRatesData();
    insertTenantSettingsData();
    expect(cds.db).to.exist;
    expect(cds.db.model).to.exist;
  });

  it('Test connection success', () => {
    expect(simpleIntegrationObjectsAdapter).to.instanceof(SimpleIntegrationObjectsAdapter);
  });

  it('Get exchange rates with tenant settings reference currency inverted false', async () => {
    const expectedExchangeRateList: ExchangeRate[] = [
      constants.eurInrMrmEcbBidParam,
      constants.eurUsdMrmEcbBidParam,
      constants.usdInrMrmEcbBidParam
    ];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [constants.eurUsdBidConversionParam],
      constants.tenant,
      constants.tenantSettings
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates with tenant settings inverted rate no reference currency', async () => {
    const expectedExchangeRateList: ExchangeRate[] = [constants.usdEurMrmEcbAskParam, constants.eurUsdMrmEcbAskParam];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [constants.eurUsdAskConversionParam],
      constants.tenant,
      constants.tenantSettings
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates with tenant settings reference currency inverted true', async () => {
    const expectedExchangeRateList: ExchangeRate[] = [
      constants.usdInrMrmEcbLastParam,
      constants.eurInrMrmEcbLastParam,
      constants.eurUsdMrmEcbLastParam
    ];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [constants.eurUsdLastConversionParam],
      constants.tenant,
      constants.tenantSettings
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates with tenant settings empty exchange rate type detail', async () => {
    const expectedExchangeRateList: ExchangeRate[] = [constants.eurUsdMrmEcbNewParam];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [constants.eurUsdNewConversionParam],
      constants.tenant,
      constants.tenantSettings
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates without tenant settings reference currency inverted false', async () => {
    const expectedExchangeRateList: ExchangeRate[] = [
      constants.eurInrMrmEcbBidParam,
      constants.eurUsdMrmEcbBidParam,
      constants.usdInrMrmEcbBidParam
    ];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [constants.eurUsdBidConversionParam],
      constants.tenant,
      null as any
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates without tenant settings inverted rate no reference currency', async () => {
    const expectedExchangeRateList: ExchangeRate[] = [constants.usdEurMrmEcbAskParam, constants.eurUsdMrmEcbAskParam];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [constants.eurUsdAskConversionParam],
      constants.tenant,
      null as any
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates without tenant settings reference currency inverted true', async () => {
    const expectedExchangeRateList: ExchangeRate[] = [
      constants.usdInrMrmEcbLastParam,
      constants.eurInrMrmEcbLastParam,
      constants.eurUsdMrmEcbLastParam
    ];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [constants.eurUsdLastConversionParam],
      constants.tenant,
      null as any
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates with tenant settings success', async () => {
    const expectedExchangeRateList: ExchangeRate[] = [constants.eurInrMrmEcbMParam, constants.eurJpyMrmEcbMParam];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [constants.eurInrMidConversionParam, constants.eurJpyMidConversionParam],
      constants.tenant,
      constants.tenantSettings
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates without tenant settings success', async () => {
    const expectedExchangeRateList: ExchangeRate[] = [
      constants.eurUsdNullMidParam,
      constants.usdJpyNullMidParam,
      constants.eurUsdMrmThrMidParam,
      constants.usdJpyMrmThrMidParam,
      constants.eurUsdMrmEcbMidParam,
      constants.usdJpyMrmEcbMidParam
    ];
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [constants.usdJpyMidConversionParam, constants.eurUsdMidConversionParam],
      constants.tenant,
      null as any
    );
    expect(actualExchangeRateList).to.eql(expectedExchangeRateList);
  });

  it('Get exchange rates empty result', async () => {
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [constants.inrJpyBidConversionParam],
      constants.tenant,
      constants.tenantSettings
    );
    expect(actualExchangeRateList.length).to.eql(0);
  });

  it('Get exchange rates empty tenant', async () => {
    const emptyTenant: Tenant = { id: '' };
    const actualExchangeRateList: ExchangeRate[] = await simpleIntegrationObjectsAdapter.getExchangeRatesForTenant(
      [constants.eurUsdMidConversionParam, constants.usdJpyMidConversionParam],
      emptyTenant,
      constants.tenantSettings
    );
    expect(actualExchangeRateList.length).to.eql(0);
  });

  it('Get default settings for tenant success', async () => {
    const expectedTenantSettings: TenantSettings = {
      ratesDataProviderCode: constants.DATA_SOURCE_PROVIDER_CODE,
      ratesDataSource: constants.DATA_SOURCE
    };
    const actualTenantSettings: TenantSettings = await simpleIntegrationObjectsAdapter.getDefaultSettingsForTenant(
      constants.tenant
    );
    expect(actualTenantSettings).to.eql(expectedTenantSettings);
  });

  it('Get exchange rate type details for tenant success', async () => {
    const rateTypes = [constants.RATES_MID, constants.RATES_BID, constants.RATES_ASK, constants.RATES_LAST];
    const actualExchangeRateTypeDetailMap: Map<
      string,
      ExchangeRateTypeDetail
    > = await simpleIntegrationObjectsAdapter.getExchangeRateTypeDetailsForTenant(constants.tenant, rateTypes);
    const expectedExchangeRateTypeDetailMap = getExchangeRateTypeDetails();
    expect(actualExchangeRateTypeDetailMap).to.eql(expectedExchangeRateTypeDetailMap);
  });

  it('Get exchange rate type details for tenant failure', async () => {
    const rateTypes = [constants.RATES_MID, constants.RATES_BID];
    const rateTypeSet: Set<string> = new Set();
    const actualExchangeRateTypeDetail: Map<
      string,
      ExchangeRateTypeDetail
    > = await simpleIntegrationObjectsAdapter.getExchangeRateTypeDetailsForTenant(constants.tenant_id2, rateTypes);
    expect(actualExchangeRateTypeDetail.size).to.eql(0);
  });

  function getExchangeRateTypeDetails(): Map<string, ExchangeRateTypeDetail> {
    const expectedExchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail> = new Map();
    expectedExchangeRateTypeDetailMap.set(constants.RATES_MID, constants.noReferenceFalseParam);
    expectedExchangeRateTypeDetailMap.set(constants.RATES_BID, constants.inrFalseParam);
    expectedExchangeRateTypeDetailMap.set(constants.RATES_ASK, constants.noReferenceTrueParam);
    expectedExchangeRateTypeDetailMap.set(constants.RATES_LAST, constants.inrTrueParam);
    return expectedExchangeRateTypeDetailMap;
  }
});
