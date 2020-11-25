/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core/dist/scp-cf/tenant';
import {
  buildCurrency,
  Currency,
  CurrencyFactor,
  ConversionParametersForNonFixedRate,
  DataAdapter,
  ExchangeRate,
  ExchangeRateTypeDetail,
  CurrencyAmount,
  RateType,
  RatesDataProviderCode,
  RatesDataSource,
  TenantSettings,
  OverrideTenantSetting,
  SingleNonFixedRateConversionResult,
  ExchangeRateValue,
  CurrencyConversionError,
  BulkNonFixedRateConversionResult
} from '@sap-cloud-sdk/currency-conversion-models';
import { BigNumber } from 'bignumber.js';
import { ConversionError } from '../../src/constants/conversion-error';
import { CurrencyConverter } from '../../src/core/conversion-api';

const TENANT_ID: Tenant = { id: 'TenantID' };
const TENANT_ID1: Tenant = { id: 'tenantId1' };
const TENANT_ID2: Tenant = { id: 'tenantId2' };

const MRM: RatesDataProviderCode = new RatesDataProviderCode('MRM');
const ECB: RatesDataSource = new RatesDataSource('ECB');
const THR: RatesDataSource = new RatesDataSource('THR');

const B: RateType = new RateType('B');
const M: RateType = new RateType('M');
const ASK: RateType = new RateType('ASK');

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');
const BHD: Currency = buildCurrency('BHD');

const S_0_300623: ExchangeRateValue = new ExchangeRateValue(
  '0.300623',
  new BigNumber('0.300623')
);
const S_123_123: ExchangeRateValue = new ExchangeRateValue(
  '123.123',
  new BigNumber('123.123')
);
const S_100: ExchangeRateValue = new ExchangeRateValue(
  '100',
  new BigNumber('100')
);
const S_1: ExchangeRateValue = new ExchangeRateValue('1', new BigNumber('1'));

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

const overrideTenantSettings: OverrideTenantSetting = new OverrideTenantSetting(
  MRM,
  THR
);

/* Conversion Parameter starts*/

const inrEurMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_2019_09_16T02_30_00Z
);
const eurInrMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'INR',
  '10',
  M,
  S_2020_01_01T02_30_00Z
);
const eurInrAskConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'INR',
  '100',
  ASK,
  S_2020_01_01T02_30_00Z
);
const eurUsdAskConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'USD',
  '100',
  ASK,
  S_2020_01_01T02_30_00Z
);
const eurInrIndirectConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'INR',
  '100',
  B,
  S_2020_01_01T02_30_00Z
);
const eurInrDecimalValueConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'INR',
  '120.4576776757575757567',
  B,
  S_2020_01_01T02_30_00Z
);
const eurEurMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'EUR',
  '120',
  B,
  S_2020_01_01T02_30_00Z
);
const inrInrMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'INR',
  '120',
  B,
  S_2020_01_01T02_30_00Z
);
const invalidCurrenecyConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'AUD',
  'BSD',
  '120',
  B,
  S_2020_01_01T02_30_00Z
);
const inrEurMConversionParamPastDate: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_1990_03_01T02_30_00Z
);
const inrBhdMFiveParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'BHD',
  '20.1',
  M,
  S_2020_01_01T02_30_00Z
);
const inrBhdMMoreThanFiveParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'BHD',
  '8499999.99990',
  M,
  S_2020_01_01T02_30_00Z
);
const inrBhdMLessThanFiveParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(5),
  new CurrencyFactor(10)
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
  new CurrencyFactor(10),
  new CurrencyFactor(5)
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
  new CurrencyFactor(5),
  new CurrencyFactor(10)
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
  new CurrencyFactor(10),
  new CurrencyFactor(5)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurEurMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  null,
  null,
  B,
  S_1,
  EUR,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const inrInrMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  null,
  null,
  B,
  S_1,
  INR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurEurMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  null,
  null,
  B,
  S_1,
  EUR,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const inrInrMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  null,
  null,
  B,
  S_1,
  INR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(5),
  new CurrencyFactor(10)
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
  new CurrencyFactor(10),
  new CurrencyFactor(5)
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
  new CurrencyFactor(5),
  new CurrencyFactor(10)
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
  new CurrencyFactor(10),
  new CurrencyFactor(5)
);

/* Exchange Rate ends*/

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParametersForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[] => exchangeRates;

  adapter.getDefaultSettingsForTenant = (
    tenant: Tenant
  ): TenantSettings | null | undefined => null;
  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<RateType>
  ): Map<RateType, ExchangeRateTypeDetail> => new Map();
  return adapter;
}

function buildAdapterWithNullExchangeRateTypeDetails(
  exchangeRates: ExchangeRate[]
): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParametersForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[] => exchangeRates;

  adapter.getDefaultSettingsForTenant = (
    tenant: Tenant
  ): TenantSettings | null | undefined => null;
  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<RateType>
  ): Map<RateType, ExchangeRateTypeDetail> => null as any;
  return adapter;
}

function buildAdapterWithNullExchangeRates(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParametersForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[] => null as any;

  adapter.getDefaultSettingsForTenant = (
    tenant: Tenant
  ): TenantSettings | null | undefined => null;
  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<RateType>
  ): Map<RateType, ExchangeRateTypeDetail> => new Map();
  return adapter;
}

function buildAdapterWithEmptyExchangeRates(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParametersForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[] => [];

  adapter.getDefaultSettingsForTenant = (
    tenant: Tenant
  ): TenantSettings | null | undefined => null;
  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<RateType>
  ): Map<RateType, ExchangeRateTypeDetail> => new Map();
  return adapter;
}

function buildAdapterWithNullExchangeRatesAndDefaultTenantSettings(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParametersForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[] => null as any;

  adapter.getDefaultSettingsForTenant = (
    tenant: Tenant
  ): TenantSettings | null | undefined => null;
  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<RateType>
  ): Map<RateType, ExchangeRateTypeDetail> => new Map();
  return adapter;
}
describe('Non Fixed Rate Conversion with default settings null and override tenant settings', () => {
  it('Single Conversion With Empty Exchange Rate Type Details', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMRate,
      S_10000,
      S_10000
    );
    const result: SingleNonFixedRateConversionResult = currencyConverter.convertCurrencyWithNonFixedRate(
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

  it('Single Conversion With Exchange Rate Record Having Future Date', () => {
    let errorInput = new Error();
    try {
      const result: SingleNonFixedRateConversionResult = currencyConverter.convertCurrencyWithNonFixedRate(
        inrEurMConversionParamPastDate,
        buildAdapter([
          inrEurMrmThrMRate,
          eurInrMrmThrMRate,
          inrEurMrmEcbMRate,
          eurInrMrmEcbMRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      );
    } catch (error) {
      errorInput = error;
    }
    expect(errorInput).toBeInstanceOf(CurrencyConversionError);
    expect(errorInput.message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Single Conversion With Null Conversion Parameter', () => {
    let errorInput = new Error();
    try {
      const result: SingleNonFixedRateConversionResult = currencyConverter.convertCurrencyWithNonFixedRate(
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

  it('Bulk Conversion With Empty Exchange Rate Type Details', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMRate,
      S_10000,
      S_10000
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
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
    expect(result.get(inrEurMConversionParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Bulk Conversion With null Exchange Rate Type Details', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMRate,
      S_10000,
      S_10000
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
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
    expect(result.get(inrEurMConversionParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Bulk Conversion With Exchange Rate Record Having Future Date', () => {
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParamPastDate],
      buildAdapter([
        inrEurMrmThrMRate,
        eurInrMrmThrMRate,
        inrEurMrmEcbMRate,
        eurInrMrmEcbMRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParamPastDate)).toBeInstanceOf(
      CurrencyConversionError
    );
    expect(
      (result.get(inrEurMConversionParamPastDate) as CurrencyConversionError)
        .message
    ).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Bulk Conversion With Null Conversion Parameter', () => {
    let errorInput = new Error();
    try {
      const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
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

  it('Bulk Conversion With empty Conversion Parameter list', () => {
    let errorInput = new Error();
    try {
      const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
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

  it('Bulk Conversion With Direct Factor Five Ten Rate', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMDirectFactorFiveTenRate,
      S_20000,
      S_20000
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([
        inrEurMrmThrMDirectFactorFiveTenRate,
        inrEurMrmEcbMDirectFactorFiveTenRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Bulk Conversion With Direct Factor More Than One Rate', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMDirectFactorMoreThanOneRate,
      S_5000,
      S_5000
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([
        inrEurMrmThrMDirectFactorMoreThanOneRate,
        inrEurMrmEcbMDirectFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Bulk Conversion With indirect Factor Five Ten Rate', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMIndirectFactorFiveTenRate,
      S_2,
      S_2
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([
        inrEurMrmThrMIndirectFactorFiveTenRate,
        inrEurMrmEcbMIndirectFactorFiveTenRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Bulk Conversion With Inirect Factor More Than One Rate', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMIndirectFactorMoreThanOneRate,
      S_0_5,
      S_0_5
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([
        inrEurMrmThrMIndirectFactorMoreThanOneRate,
        inrEurMrmEcbMIndirectFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Convert bulk non fixed rate currency with maximum conversion parameters', () => {
    const maximumConversionParameterList: ConversionParametersForNonFixedRate[] = [];
    for (let i = 1; i <= 1000; i++) {
      maximumConversionParameterList.push(inrEurMConversionParam);
    }
    const actualConversionResult: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      maximumConversionParameterList,
      buildAdapter([inrEurMrmThrMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    for (const param of maximumConversionParameterList) {
      expect(
        (actualConversionResult.get(
          inrEurMConversionParam
        ) as SingleNonFixedRateConversionResult).convertedAmount.valueString
      ).toEqual('10000');
      expect(
        (actualConversionResult.get(
          inrEurMConversionParam
        ) as SingleNonFixedRateConversionResult).convertedAmount.decimalValue
      ).toEqual(new BigNumber('10000'));
      expect(
        (actualConversionResult.get(
          inrEurMConversionParam
        ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount
          .valueString
      ).toEqual('10000');
      expect(
        (actualConversionResult.get(
          inrEurMConversionParam
        ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount
          .decimalValue
      ).toEqual(new BigNumber('10000'));
    }
  });

  it('Convert bulk non fixed rate currency with more than 1000 conversion parameters', () => {
    const maximumConversionParameterList: ConversionParametersForNonFixedRate[] = [];
    let errInput = new Error();
    for (let i = 0; i <= 1000; i++) {
      maximumConversionParameterList.push(inrEurMConversionParam);
    }
    try {
      expect(() => {
        currencyConverter.convertCurrenciesWithNonFixedRate(
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

  it('Multiple Conversion Success Failure', () => {
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
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [
        inrEurMConversionParam,
        eurUsdAskConversionParam,
        eurInrAskConversionParam,
        eurInrMConversionParam
      ],
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
    expect(result.get(inrEurMConversionParam)).toEqual(
      expectedConversionResult1
    );
    expect(result.get(eurUsdAskConversionParam)).toBeTruthy();
    expect(result.get(eurUsdAskConversionParam)).toEqual(
      expectedConversionResult2
    );
    expect(result.get(eurInrAskConversionParam)).toBeTruthy();
    expect(result.get(eurInrAskConversionParam)).toEqual(
      expectedConversionResult3
    );
    expect(result.get(eurInrMConversionParam)).toBeInstanceOf(
      CurrencyConversionError
    );
    expect(
      (result.get(eurInrMConversionParam) as CurrencyConversionError).message
    ).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Bulk Indirect Conversion', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurInrMrmThrIndirectConversionRate,
      new CurrencyAmount('1'),
      new CurrencyAmount('1')
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
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
    expect(result.get(eurInrIndirectConversionParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Bulk Indirect Conversion Decimal Value', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurInrMrmThrIndirectConversionDecimalRate,
      new CurrencyAmount('0.97835236045058661466079243313883250280145'),
      new CurrencyAmount('0.98')
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
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
    expect(result.get(eurInrDecimalValueConversionParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Bulk direct Conversion Decimal Value', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurInrMrmThrDirectConversionDecimal,
      new CurrencyAmount('14831.1106484722999998921741'),
      new CurrencyAmount('14831.11')
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
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
    expect(result.get(eurInrDecimalValueConversionParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Bulk Conversion With Different Tenant Record Found', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMDiffrentTenantRate,
      S_10000,
      S_10000
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
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
    expect(result.get(inrEurMConversionParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Bulk Conversion With Old Conversion Time', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrEurMrmThrMRate,
      S_10000,
      S_10000
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([
        inrEurMrmThrMRate,
        eurInrMrmThrMRate,
        inrEurMrmEcbMRate,
        eurInrMrmEcbMRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeTruthy();
    expect(result.get(inrEurMConversionParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Bulk Conversion With Same Currency Pair List', () => {
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
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrInrMConversionParam, eurEurMConversionParam],
      buildAdapter([
        inrInrMrmThrMRate,
        eurEurMrmThrMRate,
        inrInrMrmEcbMRate,
        eurEurMrmEcbMRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrInrMConversionParam)).toBeTruthy();
    expect(result.get(inrInrMConversionParam)).toEqual(
      expectedConversionResult1
    );
    expect(result.get(eurEurMConversionParam)).toBeTruthy();
    expect(result.get(eurEurMConversionParam)).toEqual(
      expectedConversionResult2
    );
  });

  it('Non Fixed Rate Conversion Rounded Half Up Last Digit Five', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrBhdMrmThrMRate,
      new CurrencyAmount('6.0425223'),
      new CurrencyAmount('6.043')
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrBhdMFiveParam],
      buildAdapter([inrBhdMrmEcbMRate, inrBhdMrmThrMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrBhdMFiveParam)).toBeTruthy();
    expect(result.get(inrBhdMFiveParam)).toEqual(expectedConversionResult);
  });

  it('Non Fixed Rate Conversion Rounded Half Up Last Digit More Than Five', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrBhdMrmThrMRate,
      new CurrencyAmount('2555295.4999699377'),
      new CurrencyAmount('2555295.5')
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrBhdMMoreThanFiveParam],
      buildAdapter([inrBhdMrmEcbMRate, inrBhdMrmThrMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrBhdMMoreThanFiveParam)).toBeTruthy();
    expect(result.get(inrBhdMMoreThanFiveParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Non Fixed Rate Conversion Rounded Half Up Last Digit Less Than Five', () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      inrBhdMrmThrMRate,
      new CurrencyAmount('60.155263546'),
      new CurrencyAmount('60.155')
    );
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrBhdMLessThanFiveParam],
      buildAdapter([inrBhdMrmEcbMRate, inrBhdMrmThrMRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrBhdMLessThanFiveParam)).toBeTruthy();
    expect(result.get(inrBhdMLessThanFiveParam)).toEqual(
      expectedConversionResult
    );
  });

  it('Bulk Conversion With Exchange Rate Record Having Future Date', () => {
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
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
    expect(result.get(invalidCurrenecyConversionParam)).toBeInstanceOf(
      CurrencyConversionError
    );
    expect(
      (result.get(invalidCurrenecyConversionParam) as CurrencyConversionError)
        .message
    ).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Bulk Conversion With Different Tenant No Record', () => {
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
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
    expect(result.get(inrEurMConversionParam)).toBeInstanceOf(
      CurrencyConversionError
    );
    expect(
      (result.get(inrEurMConversionParam) as CurrencyConversionError).message
    ).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Bulk Conversion With Duplicate Exchange Rate Same TimeStamp', () => {
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([
        inrEurMrmThrMDuplicateRate,
        inrEurMrmThrMRate,
        inrEurMrmEcbMDuplicateRate,
        inrEurMrmEcbMRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeInstanceOf(
      CurrencyConversionError
    );
    expect(
      (result.get(inrEurMConversionParam) as CurrencyConversionError).message
    ).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('Bulk Conversion With Duplicate Exchange Rate Record', () => {
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([
        inrEurMrmThrMDuplicateRate,
        inrEurMrmThrMRate,
        inrEurMrmEcbMDuplicateRate,
        inrEurMrmEcbMRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeInstanceOf(
      CurrencyConversionError
    );
    expect(
      (result.get(inrEurMConversionParam) as CurrencyConversionError).message
    ).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('Bulk Conversion With No Record Found', () => {
    const result: BulkNonFixedRateConversionResult = currencyConverter.convertCurrenciesWithNonFixedRate(
      [inrEurMConversionParam],
      buildAdapter([
        eurInrMrmThrMRate,
        eurInrMrmThrMDuplicateRate,
        eurInrMrmEcbMRate,
        eurInrMrmEcbMDuplicateRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(inrEurMConversionParam)).toBeInstanceOf(
      CurrencyConversionError
    );
    expect(
      (result.get(inrEurMConversionParam) as CurrencyConversionError).message
    ).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Bulk Conversion With data Adapter Null', () => {
    let errorInput: Error = new Error();
    let result: BulkNonFixedRateConversionResult;
    try {
      result = currencyConverter.convertCurrenciesWithNonFixedRate(
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

  it('Bulk Conversion With Exchange Rates Null', () => {
    let errorInput: Error = new Error();
    let result: BulkNonFixedRateConversionResult;
    try {
      result = currencyConverter.convertCurrenciesWithNonFixedRate(
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

  it('Bulk Conversion With both Exchange Rates and default tenant settings Null', () => {
    let errorInput: Error = new Error();
    let result: BulkNonFixedRateConversionResult;
    try {
      result = currencyConverter.convertCurrenciesWithNonFixedRate(
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

  it('Bulk Conversion With Exchange Rates Empty', () => {
    let errorInput: Error = new Error();
    let result: BulkNonFixedRateConversionResult;
    try {
      result = currencyConverter.convertCurrenciesWithNonFixedRate(
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
