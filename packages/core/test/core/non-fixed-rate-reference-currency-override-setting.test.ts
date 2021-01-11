/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  buildCurrency,
  Currency,
  CurrencyConversionError,
  ConversionParameterForNonFixedRate,
  DataAdapter,
  ExchangeRate,
  ExchangeRateTypeDetail,
  ExchangeRateValue,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  buildExchangeRateValue,
  buildConversionParameterForNonFixedRate,
  buildExchangeRate,
  buildExchangeRateTypeDetail,
  buildTenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { CurrencyConverter } from '../../src/core/currency-converter';

const TENANT_ID: Tenant = { id: 'TenantID' };

const MRM = 'MRM';
const ECB = 'ECB';
const THR = 'THR';

const A = 'A';
const LAST = 'LAST';
const ASK = 'ASK';

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');

const S_2: ExchangeRateValue = buildExchangeRateValue('2');
const S_5: ExchangeRateValue = buildExchangeRateValue('5');
const S_10: ExchangeRateValue = buildExchangeRateValue('10');

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_02_01T02_30_00Z: Date = new Date('2020-02-01T02:30:00Z');
const S_2020_03_01T02_30_00Z: Date = new Date('2020-03-01T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

const defaultTenantSettings: TenantSettings = buildTenantSettings(MRM, ECB);
const overrideTenantSettings: TenantSettings = buildTenantSettings(MRM, THR);

const eurUsdAConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  A,
  S_2020_03_01T02_30_00Z
);

const eurUsdAskConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  ASK,
  S_1990_03_01T02_30_00Z
);

const eurUsdAConversionParamPastDate: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  A,
  S_1990_03_01T02_30_00Z
);

const eurUsdLastConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  LAST,
  S_1990_03_01T02_30_00Z
);

const eurUsdNewConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  'New',
  S_1990_03_01T02_30_00Z
);

/* Exchange Rate starts*/

/* MRM ECB */
const eurInrMrmEcbARate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmEcbARate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmEcbLastRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  LAST,
  S_10,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmEcbIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_2,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbADuplicateRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  true,
  1,
  1
);

const usdInrMrmEcbIndirectFalseRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmEcbIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

const eurInrMrmEcbIndirectFalseRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbIndirectTrueFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  true,
  5,
  10
);

const usdInrMrmEcbIndirectFalseFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  10,
  5
);

const usdInrMrmEcbIndirectTrueFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  10,
  5
);

const eurInrMrmEcbIndirectFalseFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  5,
  10
);

const usdInrMrmEcbADuplicateRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmEcbIndirectFalseRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_2,
  EUR,
  USD,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmEcbDuplicateDateRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbAskRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  ASK,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbLastRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  LAST,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmEcbAskRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  ASK,
  S_10,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

/* MRM THR */

const usdInrMrmThrAskRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  ASK,
  S_10,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmThrAskRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  ASK,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmThrLastRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  LAST,
  S_10,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmThrLastRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  LAST,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmThrIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_2,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const eurUsdMrmThrIndirectFalseRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_2,
  EUR,
  USD,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrARate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrARate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrADuplicateRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrADuplicateRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrDuplicateDateRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  true,
  1,
  1
);
const eurInrMrmThrIndirectFalseRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrIndirectTrueFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  true,
  5,
  10
);
const eurInrMrmThrIndirectFalseFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  5,
  10
);

const usdInrMrmThrIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const usdInrMrmThrIndirectFalseRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmThrIndirectTrueFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  10,
  5
);
const usdInrMrmThrIndirectFalseFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
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
    rateTypeSet: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> => {
    const exchangeRate: Map<string, ExchangeRateTypeDetail> = new Map();
    exchangeRate.set(A, buildExchangeRateTypeDetail(buildCurrency('INR'), true));
    exchangeRate.set(LAST, buildExchangeRateTypeDetail(buildCurrency('AFN'), true));
    exchangeRate.set(ASK, buildExchangeRateTypeDetail(null as any, false));
    return Promise.resolve(exchangeRate);
  };
  return adapter;
}

describe('Non Fixed Rate Currency Conversion -- Reference currency Tests default tenant settings.', () => {
  it('Test Single Conversion With Reference Currency.', async () => {
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([eurInrMrmThrARate, usdInrMrmThrARate, eurInrMrmEcbARate, usdInrMrmEcbARate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Bulk Conversion With Reference Currency.', async () => {
    const result: SingleNonFixedRateConversionResult = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(eurUsdAConversionParam),
        buildAdapter([eurInrMrmThrARate, usdInrMrmThrARate, eurInrMrmEcbARate, usdInrMrmEcbARate]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(eurUsdAConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Conversion Reference Currency And Inversion Null', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAskConversionParam,
        buildAdapter([eurInrMrmThrAskRate, usdInrMrmThrAskRate, eurInrMrmEcbAskRate, usdInrMrmEcbAskRate]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Exchange Rate Record Having Future Date', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParamPastDate,
        buildAdapter([usdInrMrmThrARate, eurInrMrmThrARate, usdInrMrmEcbARate, eurInrMrmEcbARate]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Conversion With Non-Existing Reference Currency', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdLastConversionParam,
        buildAdapter([usdInrMrmThrLastRate, eurInrMrmThrLastRate, usdInrMrmEcbLastRate, eurInrMrmEcbLastRate]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Non-Existing RateType', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdNewConversionParam,
        buildAdapter([usdInrMrmEcbLastRate, eurInrMrmEcbLastRate, usdInrMrmThrLastRate, eurInrMrmThrLastRate]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Direct Rate No From Reference Pair', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        usdInrMrmThrARate,
        eurUsdMrmThrIndirectTrueRate,
        eurUsdMrmThrIndirectFalseRate,
        usdInrMrmEcbARate,
        eurUsdMrmEcbIndirectTrueRate,
        eurUsdMrmEcbIndirectFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmThrIndirectFalseRate);
  });

  it('Test Reference Currency With Direct Rate No To Reference Pair', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(eurUsdAConversionParam),
        buildAdapter([
          eurInrMrmThrARate,
          eurUsdMrmThrIndirectTrueRate,
          eurUsdMrmThrIndirectFalseRate,
          eurInrMrmEcbARate,
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(eurUsdAConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmThrIndirectFalseRate);
  });

  it('Test Reference Currency With Direct Rate No From And To Reference Pair', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurUsdMrmThrIndirectTrueRate,
        eurUsdMrmThrIndirectFalseRate,
        eurUsdMrmEcbIndirectTrueRate,
        eurUsdMrmEcbIndirectFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmThrIndirectFalseRate);
  });

  it('Test Reference Currency Duplicate From Reference Pair', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParam,
        buildAdapter([
          eurUsdMrmThrIndirectTrueRate,
          eurUsdMrmThrIndirectFalseRate,
          eurInrMrmThrARate,
          usdInrMrmThrARate,
          eurInrMrmThrADuplicateRate,
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate,
          eurInrMrmEcbARate,
          usdInrMrmEcbARate,
          eurInrMrmEcbADuplicateRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency Duplicate To Reference Pair', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParam,
        buildAdapter([
          eurUsdMrmThrIndirectTrueRate,
          eurUsdMrmThrIndirectFalseRate,
          eurInrMrmThrARate,
          usdInrMrmThrARate,
          usdInrMrmThrDuplicateDateRate,
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate,
          eurInrMrmEcbARate,
          usdInrMrmEcbARate,
          usdInrMrmEcbDuplicateDateRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency Duplicate From And To Reference Pair.', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParam,
        buildAdapter([
          eurUsdMrmThrIndirectTrueRate,
          eurUsdMrmThrIndirectFalseRate,
          eurInrMrmThrARate,
          usdInrMrmThrARate,
          eurInrMrmThrADuplicateRate,
          usdInrMrmThrADuplicateRate,
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate,
          eurInrMrmEcbARate,
          usdInrMrmEcbARate,
          eurInrMrmEcbADuplicateRate,
          usdInrMrmEcbADuplicateRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency From Indirect To Indirect', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectTrueRate,
        usdInrMrmThrIndirectTrueRate,
        eurInrMrmEcbIndirectTrueRate,
        usdInrMrmEcbIndirectTrueRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Direct', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectTrueRate,
        usdInrMrmThrIndirectFalseRate,
        eurInrMrmEcbIndirectTrueRate,
        usdInrMrmEcbIndirectFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('2');
    expect(result.roundedOffConvertedAmount.valueString).toBe('2');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Indirect', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectFalseRate,
        usdInrMrmThrIndirectTrueRate,
        eurInrMrmEcbIndirectFalseRate,
        usdInrMrmEcbIndirectTrueRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('5000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('5000');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Direct', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectFalseRate,
        usdInrMrmThrIndirectFalseRate,
        eurInrMrmEcbIndirectFalseRate,
        usdInrMrmEcbIndirectFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.roundedOffConvertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Indirect Factor More Than One', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectTrueFactorMoreThanOneRate,
        usdInrMrmThrIndirectTrueFactorMoreThanOneRate,
        eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
        usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('800');
    expect(result.roundedOffConvertedAmount.valueString).toBe('800');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Direct Factor More Than One', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectTrueFactorMoreThanOneRate,
        usdInrMrmThrIndirectFalseFactorMoreThanOneRate,
        eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
        usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('8');
    expect(result.roundedOffConvertedAmount.valueString).toBe('8');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Indirect Factor More Than One.', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectFalseFactorMoreThanOneRate,
        usdInrMrmThrIndirectTrueFactorMoreThanOneRate,
        eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
        usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('20000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('20000');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Direct Factor More Than One.', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectFalseFactorMoreThanOneRate,
        usdInrMrmThrIndirectFalseFactorMoreThanOneRate,
        eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
        usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });
});
