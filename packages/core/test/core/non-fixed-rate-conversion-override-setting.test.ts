/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  buildCurrency,
  Currency,
  ConversionParameterForNonFixedRate,
  DataAdapter,
  ExchangeRate,
  ExchangeRateTypeDetail,
  CurrencyAmount,
  TenantSettings,
  SingleNonFixedRateConversionResult,
  ExchangeRateValue,
  CurrencyConversionError,
  BulkConversionResult
} from '@sap-cloud-sdk/currency-conversion-models';
import { BigNumber } from 'bignumber.js';
import { ConversionError } from '../../src/constants/conversion-error';
import { CurrencyConverter } from '../../src/core/currency-converter';

const TENANT_ID: Tenant = { id: 'TenantID' };
const TENANT_ID1: Tenant = { id: 'tenantId1' };
const TENANT_ID2: Tenant = { id: 'tenantId2' };

const MRM = 'MRM';
const ECB = 'ECB';
const THR = 'THR';

const B = 'B';
const M = 'M';
const ASK = 'ASK';

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');
const BHD: Currency = buildCurrency('BHD');

const S_0_300623: ExchangeRateValue = new ExchangeRateValue('0.300623');
const S_123_123: ExchangeRateValue = new ExchangeRateValue('123.123');
const S_100: ExchangeRateValue = new ExchangeRateValue('100');
const S_1: ExchangeRateValue = new ExchangeRateValue('1');

const S_0_5: CurrencyAmount = new CurrencyAmount('0.5');
const S_2: CurrencyAmount = new CurrencyAmount('2');
const S_120: CurrencyAmount = new CurrencyAmount('120');
const S_5000: CurrencyAmount = new CurrencyAmount('5000');
const S_10000: CurrencyAmount = new CurrencyAmount('10000');
const S_20000: CurrencyAmount = new CurrencyAmount('20000');

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_01_16T02_30_00Z: Date = new Date('2020-01-16T02:30:00Z');
const S_2019_09_16T02_30_00Z: Date = new Date('2019-09-16T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

const defaultTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: ECB
};
const overrideTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: THR
};

/* Conversion Parameter starts*/

const inrEurMConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_2019_09_16T02_30_00Z
);
const eurInrMConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'EUR',
  'INR',
  '10',
  M,
  S_2020_01_01T02_30_00Z
);
const eurInrAskConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'EUR',
  'INR',
  '100',
  ASK,
  S_2020_01_01T02_30_00Z
);
const eurUsdAskConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  ASK,
  S_2020_01_01T02_30_00Z
);
const eurInrIndirectConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'EUR',
  'INR',
  '100',
  B,
  S_2020_01_01T02_30_00Z
);
const eurInrDecimalValueConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'EUR',
  'INR',
  '120.4576776757575757567',
  B,
  S_2020_01_01T02_30_00Z
);
const eurEurMConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'EUR',
  'EUR',
  '120',
  B,
  S_2020_01_01T02_30_00Z
);
const inrInrMConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'INR',
  'INR',
  '120',
  B,
  S_2020_01_01T02_30_00Z
);
const invalidCurrenecyConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'AUD',
  'BSD',
  '120',
  B,
  S_2020_01_01T02_30_00Z
);
const inrEurMConversionParamPastDate: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_1990_03_01T02_30_00Z
);
const inrBhdMFiveParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'INR',
  'BHD',
  '20.1',
  M,
  S_2020_01_01T02_30_00Z
);
const inrBhdMMoreThanFiveParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'INR',
  'BHD',
  '8499999.99990',
  M,
  S_2020_01_01T02_30_00Z
);
const inrBhdMLessThanFiveParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'INR',
  'BHD',
  '200.102',
  M,
  S_2020_01_01T02_30_00Z
);

/* Conversion Parameter ends*/

/* Exchange Rate starts*/

const inrEurMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);
const inrEurMrmThrMDuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  EUR,
  INR,
  S_2020_01_16T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmThrMDuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  EUR,
  INR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrAskIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  ASK,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmThrAskRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  ASK,
  S_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const inrEurMrmThrMDiffrentTenantRate: ExchangeRate = new ExchangeRate(
  TENANT_ID1,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);
const inrBhdMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0_300623,
  INR,
  BHD,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrIndirectConversionRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  B,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

const eurInrMrmThrIndirectConversionDecimalRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  B,
  S_123_123,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const eurInrMrmThrDirectConversionDecimal: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  B,
  S_123_123,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const inrEurMrmThrMIndirectFactorFiveTenRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  5,
  10
);
const inrEurMrmThrMIndirectFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  10,
  5
);
const inrEurMrmThrMDirectFactorFiveTenRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  5,
  10
);
const inrEurMrmThrMDirectFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  10,
  5
);

const usdEurMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  USD,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  1,
  1
);

const eurEurMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  null as any,
  null as any,
  B,
  S_1,
  EUR,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);
const inrInrMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  null as any,
  null as any,
  B,
  S_1,
  INR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const inrEurMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);
const inrEurMrmEcbMDuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  INR,
  S_2020_01_16T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmEcbMDuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  INR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbAskIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  ASK,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmEcbAskRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  ASK,
  S_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const inrEurMrmEcbMDiffrentTenantRate: ExchangeRate = new ExchangeRate(
  TENANT_ID1,
  MRM,
  ECB,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const inrBhdMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_0_300623,
  INR,
  BHD,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbIndirectConversionRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  B,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

const eurInrMrmEcbIndirectConversionDecimalRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  B,
  S_123_123,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const eurInrMrmEcbDirectConversionDecimal: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  B,
  S_123_123,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdEurMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  USD,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  1,
  1
);

const eurEurMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  null as any,
  null as any,
  B,
  S_1,
  EUR,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);
const inrInrMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  null as any,
  null as any,
  B,
  S_1,
  INR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const inrEurMrmEcbMIndirectFactorFiveTenRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  5,
  10
);
const inrEurMrmEcbMIndirectFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  10,
  5
);
const inrEurMrmEcbMDirectFactorFiveTenRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  5,
  10
);
const inrEurMrmEcbMDirectFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  10,
  5
);

/* Exchange Rate ends*/

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> =>
    Promise.resolve(defaultTenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<string>
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

function buildAdapterWithNullExchangeRateTypeDetails(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> =>
    Promise.resolve(defaultTenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<string>
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(null as any);
  return adapter;
}

function buildAdapterWithNullExchangeRates(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve(null as any);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> =>
    Promise.resolve(defaultTenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<string>
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

function buildAdapterWithEmptyExchangeRates(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve([]);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> =>
    Promise.resolve(defaultTenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<string>
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

function buildAdapterWithNullExchangeRatesAndDefaultTenantSettings(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve(null as any);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> => Promise.resolve(null as any);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<string>
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}
describe('Non Fixed Rate Conversion override tenant settings', () => {
  it('Single Conversion With Empty Exchange Rate Type Details', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMRate,
      S_10000,
      S_10000
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      inrEurMConversionParam,
      buildAdapter([
        inrEurMrmEcbMRate,
        eurInrMrmEcbMRate,
        inrEurMrmThrMRate,
        eurInrMrmThrMRate,
        eurInrMrmThrIndirectConversionRate,
        eurUsdMrmThrAskRate,
        inrEurMrmThrMDiffrentTenantRate,
        usdEurMrmThrMRate,
        eurInrMrmThrMRate,
        eurInrMrmThrAskIndirectFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Single Conversion With Exchange Rate Record Having Future Date', async () => {
    let errorInput = new Error();
    try {
      const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
        inrEurMConversionParamPastDate,
        buildAdapter([inrEurMrmThrMRate, eurInrMrmThrMRate, inrEurMrmEcbMRate, eurInrMrmEcbMRate]),
        TENANT_ID,
        overrideTenantSettings
      );
    } catch (error) {
      errorInput = error;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Single Conversion With Null Conversion Parameter', async () => {
    let errorInput = new Error();
    try {
      const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
        null as any,
        buildAdapter([
          inrEurMrmEcbMRate,
          eurInrMrmEcbMRate,
          inrEurMrmThrMRate,
          eurInrMrmThrMRate,
          eurInrMrmThrIndirectConversionRate,
          eurUsdMrmThrAskRate,
          inrEurMrmThrMDiffrentTenantRate,
          usdEurMrmThrMRate,
          eurInrMrmThrMRate,
          eurInrMrmThrAskIndirectFalseRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      );
    } catch (error) {
      errorInput = error;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.INVALID_PARAMS);
  });

  it('Bulk Conversion With Empty Exchange Rate Type Details', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([
        inrEurMrmEcbMRate,
        eurInrMrmEcbMRate,
        inrEurMrmThrMRate,
        eurInrMrmThrMRate,
        eurInrMrmThrIndirectConversionRate,
        eurUsdMrmThrAskRate,
        inrEurMrmThrMDiffrentTenantRate,
        usdEurMrmThrMRate,
        eurInrMrmThrMRate,
        eurInrMrmThrAskIndirectFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With null Exchange Rate Type Details', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapterWithNullExchangeRateTypeDetails([
        inrEurMrmEcbMRate,
        eurInrMrmEcbMRate,
        inrEurMrmThrMRate,
        eurInrMrmThrMRate,
        eurInrMrmThrIndirectConversionRate,
        eurUsdMrmThrAskRate,
        inrEurMrmThrMDiffrentTenantRate,
        usdEurMrmThrMRate,
        eurInrMrmThrMRate,
        eurInrMrmThrAskIndirectFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Exchange Rate Record Having Future Date', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParamPastDate],
      buildAdapter([inrEurMrmThrMRate, eurInrMrmThrMRate, inrEurMrmEcbMRate, eurInrMrmEcbMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParamPastDate)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(inrEurMConversionParamPastDate) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Bulk Conversion With Null Conversion Parameter', async () => {
    let errorInput = new Error();
    try {
      const result: BulkConversionResult<
        ConversionParameterForNonFixedRate,
        SingleNonFixedRateConversionResult
      > = await currencyConverter.convertCurrenciesWithNonFixedRate(
        null as any,
        buildAdapter([
          inrEurMrmEcbMRate,
          eurInrMrmEcbMRate,
          inrEurMrmThrMRate,
          eurInrMrmThrMRate,
          eurInrMrmThrIndirectConversionRate,
          eurUsdMrmThrAskRate,
          inrEurMrmThrMDiffrentTenantRate,
          usdEurMrmThrMRate,
          eurInrMrmThrMRate,
          eurInrMrmThrAskIndirectFalseRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      );
    } catch (error) {
      errorInput = error;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.INVALID_PARAMS);
  });

  it('Bulk Conversion With empty Conversion Parameter list', async () => {
    let errorInput = new Error();
    try {
      const result: BulkConversionResult<
        ConversionParameterForNonFixedRate,
        SingleNonFixedRateConversionResult
      > = await currencyConverter.convertCurrenciesWithNonFixedRate(
        [],
        buildAdapter([
          inrEurMrmEcbMRate,
          eurInrMrmEcbMRate,
          inrEurMrmThrMRate,
          eurInrMrmThrMRate,
          eurInrMrmThrIndirectConversionRate,
          eurUsdMrmThrAskRate,
          inrEurMrmThrMDiffrentTenantRate,
          usdEurMrmThrMRate,
          eurInrMrmThrMRate,
          eurInrMrmThrAskIndirectFalseRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      );
    } catch (error) {
      errorInput = error;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.INVALID_PARAMS);
  });

  it('Bulk Conversion With Direct Factor Five Ten Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMDirectFactorFiveTenRate,
      S_20000,
      S_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([inrEurMrmThrMDirectFactorFiveTenRate, inrEurMrmEcbMDirectFactorFiveTenRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Direct Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMDirectFactorMoreThanOneRate,
      S_5000,
      S_5000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([inrEurMrmThrMDirectFactorMoreThanOneRate, inrEurMrmEcbMDirectFactorMoreThanOneRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With indirect Factor Five Ten Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMIndirectFactorFiveTenRate,
      S_2,
      S_2
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([inrEurMrmThrMIndirectFactorFiveTenRate, inrEurMrmEcbMIndirectFactorFiveTenRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Inirect Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMIndirectFactorMoreThanOneRate,
      S_0_5,
      S_0_5
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([inrEurMrmThrMIndirectFactorMoreThanOneRate, inrEurMrmEcbMIndirectFactorMoreThanOneRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Convert bulk non fixed rate currency with maximum conversion parameters', async () => {
    const maximumConversionParameterList: ConversionParameterForNonFixedRate[] = [];
    for (let i = 1; i <= 1000; i++) {
      maximumConversionParameterList.push(inrEurMConversionParam);
    }
    const actualConversionResult = await currencyConverter.convertCurrenciesWithNonFixedRate(
      maximumConversionParameterList,
      buildAdapter([inrEurMrmThrMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    for (const param of maximumConversionParameterList) {
      expect(
        (actualConversionResult.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult).convertedAmount
          .valueString
      ).toEqual('10000');
      expect(
        (actualConversionResult.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult).convertedAmount
          .decimalValue
      ).toEqual(new BigNumber('10000'));
      expect(
        (actualConversionResult.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult)
          .roundedOffConvertedAmount.valueString
      ).toEqual('10000');
      expect(
        (actualConversionResult.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult)
          .roundedOffConvertedAmount.decimalValue
      ).toEqual(new BigNumber('10000'));
    }
  });

  it('Convert bulk non fixed rate currency with more than 1000 conversion parameters', () => {
    const maximumConversionParameterList: ConversionParameterForNonFixedRate[] = [];
    let errInput = new Error();
    for (let i = 0; i <= 1000; i++) {
      maximumConversionParameterList.push(inrEurMConversionParam);
    }
    try {
      expect(async () => {
        await await currencyConverter.convertCurrenciesWithNonFixedRate(
          maximumConversionParameterList,
          buildAdapter([inrEurMrmThrMRate]),
          TENANT_ID,
          overrideTenantSettings
        );
      }).toThrowError(ConversionError.INVALID_PARAMS);
    } catch (error) {
      errInput = error;
    }
  });

  it('Multiple Conversion Success Failure', async () => {
    const expectedConversionResult1: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMRate,
      S_10000,
      S_10000
    );
    const expectedConversionResult2: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrAskRate,
      S_10000,
      S_10000
    );
    const expectedConversionResult3: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurInrMrmThrAskIndirectFalseRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam, eurUsdAskConversionParam, eurInrAskConversionParam, eurInrMConversionParam],
      buildAdapter([
        inrEurMrmThrMRate,
        eurUsdMrmThrAskRate,
        eurInrMrmThrAskIndirectFalseRate,
        eurInrMrmThrMRate,
        inrEurMrmEcbMRate,
        eurUsdMrmEcbAskRate,
        eurInrMrmEcbAskIndirectFalseRate,
        eurInrMrmEcbMRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(expectedConversionResult1);
    expect(result.get(eurUsdAskConversionParam)).toBeTruthy();
    expect(result.get(eurUsdAskConversionParam)).toEqual(expectedConversionResult2);
    expect(result.get(eurInrAskConversionParam)).toBeTruthy();
    expect(result.get(eurInrAskConversionParam)).toEqual(expectedConversionResult3);
    expect(result.get(eurInrMConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(eurInrMConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Bulk Indirect Conversion', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurInrMrmThrIndirectConversionRate,
      new CurrencyAmount('1'),
      new CurrencyAmount('1')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [eurInrIndirectConversionParam],
      buildAdapter([
        eurInrMrmThrIndirectConversionRate,
        inrEurMrmThrMRate,
        eurInrMrmThrMRate,
        eurInrMrmEcbIndirectConversionRate,
        inrEurMrmEcbMRate,
        eurInrMrmEcbMRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(eurInrIndirectConversionParam)).toBeTruthy();
    expect(result.get(eurInrIndirectConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Indirect Conversion Decimal Value', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurInrMrmThrIndirectConversionDecimalRate,
      new CurrencyAmount('0.97835236045058661466079243313883250280145'),
      new CurrencyAmount('0.98')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [eurInrDecimalValueConversionParam],
      buildAdapter([
        eurInrMrmThrIndirectConversionDecimalRate,
        inrEurMrmThrMRate,
        eurInrMrmThrMRate,
        eurInrMrmEcbIndirectConversionDecimalRate,
        inrEurMrmEcbMRate,
        eurInrMrmEcbMRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(eurInrDecimalValueConversionParam)).toBeTruthy();
    expect(result.get(eurInrDecimalValueConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk direct Conversion Decimal Value', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurInrMrmThrDirectConversionDecimal,
      new CurrencyAmount('14831.1106484722999998921741'),
      new CurrencyAmount('14831.11')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [eurInrDecimalValueConversionParam],
      buildAdapter([
        eurInrMrmThrDirectConversionDecimal,
        inrEurMrmThrMRate,
        eurInrMrmThrMRate,
        eurInrMrmEcbDirectConversionDecimal,
        inrEurMrmEcbMRate,
        eurInrMrmEcbMRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(eurInrDecimalValueConversionParam)).toBeTruthy();
    expect(result.get(eurInrDecimalValueConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Different Tenant Record Found', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMDiffrentTenantRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([
        inrEurMrmThrMRate,
        inrEurMrmThrMDiffrentTenantRate,
        inrEurMrmEcbMRate,
        inrEurMrmEcbMDiffrentTenantRate
      ]),
      TENANT_ID1,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Old Conversion Time', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([inrEurMrmThrMRate, eurInrMrmThrMRate, inrEurMrmEcbMRate, eurInrMrmEcbMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Same Currency Pair List', async () => {
    const expectedConversionResult1: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrInrMrmThrMRate,
      S_120,
      S_120
    );
    const expectedConversionResult2: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurEurMrmThrMRate,
      S_120,
      S_120
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrInrMConversionParam, eurEurMConversionParam],
      buildAdapter([inrInrMrmThrMRate, eurEurMrmThrMRate, inrInrMrmEcbMRate, eurEurMrmEcbMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrInrMConversionParam)).toBeTruthy();
    expect(result.get(inrInrMConversionParam)).toEqual(expectedConversionResult1);
    expect(result.get(eurEurMConversionParam)).toBeTruthy();
    expect(result.get(eurEurMConversionParam)).toEqual(expectedConversionResult2);
  });

  it('Non Fixed Rate Conversion Rounded Half Up Last Digit Five', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrBhdMrmThrMRate,
      new CurrencyAmount('6.0425223'),
      new CurrencyAmount('6.043')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrBhdMFiveParam],
      buildAdapter([inrBhdMrmEcbMRate, inrBhdMrmThrMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrBhdMFiveParam)).toBeTruthy();
    expect(result.get(inrBhdMFiveParam)).toEqual(expectedConversionResult);
  });

  it('Non Fixed Rate Conversion Rounded Half Up Last Digit More Than Five', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrBhdMrmThrMRate,
      new CurrencyAmount('2555295.4999699377'),
      new CurrencyAmount('2555295.5')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrBhdMMoreThanFiveParam],
      buildAdapter([inrBhdMrmEcbMRate, inrBhdMrmThrMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrBhdMMoreThanFiveParam)).toBeTruthy();
    expect(result.get(inrBhdMMoreThanFiveParam)).toEqual(expectedConversionResult);
  });

  it('Non Fixed Rate Conversion Rounded Half Up Last Digit Less Than Five', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrBhdMrmThrMRate,
      new CurrencyAmount('60.155263546'),
      new CurrencyAmount('60.155')
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrBhdMLessThanFiveParam],
      buildAdapter([inrBhdMrmEcbMRate, inrBhdMrmThrMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrBhdMLessThanFiveParam)).toBeTruthy();
    expect(result.get(inrBhdMLessThanFiveParam)).toEqual(expectedConversionResult);
  });

  it('Bulk Conversion With Exchange Rate Record Having Future Date', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [invalidCurrenecyConversionParam],
      buildAdapter([
        inrEurMrmThrMRate,
        eurUsdMrmThrAskRate,
        usdEurMrmThrMRate,
        eurInrMrmThrMRate,
        inrEurMrmEcbMRate,
        eurUsdMrmEcbAskRate,
        usdEurMrmEcbMRate,
        eurInrMrmEcbMRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(invalidCurrenecyConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(invalidCurrenecyConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Bulk Conversion With Different Tenant No Record', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([
        inrEurMrmThrMRate,
        inrEurMrmThrMDiffrentTenantRate,
        inrEurMrmEcbMRate,
        inrEurMrmEcbMDiffrentTenantRate
      ]),
      TENANT_ID2,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(inrEurMConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Bulk Conversion With Duplicate Exchange Rate Same TimeStamp', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([inrEurMrmThrMDuplicateRate, inrEurMrmThrMRate, inrEurMrmEcbMDuplicateRate, inrEurMrmEcbMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(inrEurMConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
    );
  });

  it('Bulk Conversion With Duplicate Exchange Rate Record', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([inrEurMrmThrMDuplicateRate, inrEurMrmThrMRate, inrEurMrmEcbMDuplicateRate, inrEurMrmEcbMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(inrEurMConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
    );
  });

  it('Bulk Conversion With No Record Found', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([eurInrMrmThrMRate, eurInrMrmThrMDuplicateRate, eurInrMrmEcbMRate, eurInrMrmEcbMDuplicateRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(inrEurMConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Bulk Conversion With data Adapter Null', async () => {
    let errorInput: Error = new Error();
    let result: BulkConversionResult<ConversionParameterForNonFixedRate, SingleNonFixedRateConversionResult>;
    try {
      result = await await currencyConverter.convertCurrenciesWithNonFixedRate(
        [inrEurMConversionParam],
        null as any,
        TENANT_ID,
        overrideTenantSettings
      );
    } catch (err) {
      errorInput = err;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.NULL_ADAPTER_TENANT);
  });

  it('Bulk Conversion With Exchange Rates Null', async () => {
    let errorInput: Error = new Error();
    let result: BulkConversionResult<ConversionParameterForNonFixedRate, SingleNonFixedRateConversionResult>;
    try {
      result = await await currencyConverter.convertCurrenciesWithNonFixedRate(
        [inrEurMConversionParam],
        buildAdapterWithNullExchangeRates(),
        TENANT_ID,
        overrideTenantSettings
      );
    } catch (err) {
      errorInput = err;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });

  it('Bulk Conversion With both Exchange Rates and default tenant settings Null', async () => {
    let errorInput: Error = new Error();
    let result: BulkConversionResult<ConversionParameterForNonFixedRate, SingleNonFixedRateConversionResult>;
    try {
      result = await await currencyConverter.convertCurrenciesWithNonFixedRate(
        [inrEurMConversionParam],
        buildAdapterWithNullExchangeRatesAndDefaultTenantSettings(),
        TENANT_ID,
        overrideTenantSettings
      );
    } catch (err) {
      errorInput = err;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });

  it('Bulk Conversion With Exchange Rates Empty', async () => {
    let errorInput: Error = new Error();
    let result: BulkConversionResult<ConversionParameterForNonFixedRate, SingleNonFixedRateConversionResult>;
    try {
      result = await await currencyConverter.convertCurrenciesWithNonFixedRate(
        [inrEurMConversionParam],
        buildAdapterWithEmptyExchangeRates(),
        TENANT_ID,
        overrideTenantSettings
      );
    } catch (err) {
      errorInput = err;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });
});
