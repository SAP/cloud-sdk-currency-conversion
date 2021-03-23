/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  buildCurrency,
  Currency,
  CurrencyConversionError,
  ConversionParameterForNonFixedRate,
  DataAdapter,
  ExchangeRate,
  ExchangeRateTypeDetail,
  Value,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  buildConversionParameterForNonFixedRate,
  buildExchangeRate
} from '@sap-cloud-sdk/currency-conversion-models';
import { CurrencyConverter } from '../../src/core/currency-converter';
import { ConversionError } from '../../src/constants/conversion-error';

const TENANT_ID: Tenant = { id: 'TenantID' };

const MRM = 'MRM';
const ECB = 'ECB';
const THR = 'THR';

const M = 'M';

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');

const S_0: Value = new Value('0');
const S_10: Value = new Value('10');

const S_2019_09_16T02_30_00Z: Date = new Date('2019-09-16T02:30:00Z');

const overrideTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: THR
};

const inrEurMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_2019_09_16T02_30_00Z
);

/* Exchange Rate starts*/

/* MRM, ECB */

const inrEurMrmEcbDirectZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const inrEurMrmEcbDirectZeroToFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  0
);

const inrEurMrmEcbIndirectZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  1,
  1
);

const inrEurMrmEcbIndirectZeroFactorsZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  0,
  0
);

const inrEurMrmEcbIndirectZeroToFactorZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  1,
  0
);

const inrEurMrmEcbIndirectZeroFromFactZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  0,
  1
);

const inrEurMrmEcbDirectZeroFactorsZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  0,
  0
);

const inrEurMrmEcbDirectZeroFromFactZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  0,
  1
);

const inrEurMrmEcbIndirectZeroFactorsRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  0,
  0
);

const inrEurMrmEcbIndirectZeroFromFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  0,
  1
);

const inrEurMrmEcbDirectZeroFactorsRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  0,
  0
);

const inrEurMrmEcbDirectZeroFromFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  0,
  1
);
/* MRM ECB */

const inrEurMrmEcbIndirectZeroToFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  1,
  0
);

const inrEurMrmEcbDirectZeroToFactorZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  0
);

// MRM, THR
const inrEurMrmThrIndirectZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  1,
  1
);
const inrEurMrmThrDirectZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const inrEurMrmThrIndirectZeroFactorsZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  0,
  0
);
const inrEurMrmThrIndirectZeroToFactorZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  1,
  0
);
const inrEurMrmThrIndirectZeroFromFactZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  0,
  1
);

const inrEurMrmThrDirectZeroFactorsZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  0,
  0
);
const inrEurMrmThrDirectZeroToFactorZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  0
);
const inrEurMrmThrDirectZeroFromFactZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  0,
  1
);

const inrEurMrmThrIndirectZeroFactorsRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  0,
  0
);
const inrEurMrmThrIndirectZeroToFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  1,
  0
);
const inrEurMrmThrIndirectZeroFromFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  0,
  1
);

const inrEurMrmThrDirectZeroFactorsRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  0,
  0
);
const inrEurMrmThrDirectZeroToFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  0
);
const inrEurMrmThrDirectZeroFromFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  0,
  1
);

/* Exchange Rate ends*/

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  adapter.getDefaultSettingsForTenant = (): Promise<TenantSettings> => Promise.resolve(null as any);

  adapter.getExchangeRateTypeDetailsForTenant = (): Promise<Map<string, ExchangeRateTypeDetail>> =>
    Promise.resolve(new Map());
  return adapter;
}
function buildAdapterWithDataSource(exchangeRates: ExchangeRate[], dataSource: string): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  adapter.getDefaultSettingsForTenant = (): Promise<TenantSettings> => Promise.resolve(null as any);

  adapter.getExchangeRateTypeDetailsForTenant = (): Promise<Map<string, ExchangeRateTypeDetail>> =>
    Promise.resolve(new Map());
  return adapter;
}

describe('Non Fixed Rate -- zero rate or zero factor tests default null and override tenant settings.', () => {
  it('Test Direct Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapter([inrEurMrmThrDirectZeroRate, inrEurMrmEcbDirectZeroRate]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(inrEurMrmThrDirectZeroRate);
  });

  it('Test Direct Zero to Factor Zero.', async () => {
    const result: SingleNonFixedRateConversionResult = await await currencyConverter.convertCurrencyWithNonFixedRate(
      inrEurMConversionParam,
      buildAdapterWithDataSource([inrEurMrmThrDirectZeroToFactorZeroRate, inrEurMrmEcbDirectZeroToFactorZeroRate], ECB),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(inrEurMrmThrDirectZeroToFactorZeroRate);
  });

  it('Test Indirect Zero To Factor Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmThrIndirectZeroToFactorRate, inrEurMrmEcbIndirectZeroToFactorRate], ECB),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(inrEurMrmThrIndirectZeroToFactorRate);
  });

  it('Test Direct Zero To Factor Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmThrDirectZeroToFactorRate, inrEurMrmEcbDirectZeroToFactorRate], ECB),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(inrEurMrmThrDirectZeroToFactorRate);
  });

  it('Test Indirect Zero Rate', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmThrIndirectZeroRate, inrEurMrmEcbIndirectZeroRate], ECB),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
  });

  it('Test Indirect Zero Factors Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [inrEurMrmThrIndirectZeroFactorsZeroRate, inrEurMrmEcbIndirectZeroFactorsZeroRate],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Indirect Zero To Factor Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [inrEurMrmThrIndirectZeroToFactorZeroRate, inrEurMrmEcbIndirectZeroToFactorZeroRate],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
  });

  it('Test Indirect Zero From Fact Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [inrEurMrmThrIndirectZeroFromFactZeroRate, inrEurMrmEcbIndirectZeroFromFactZeroRate],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero Factors Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmThrDirectZeroFactorsZeroRate, inrEurMrmEcbDirectZeroFactorsZeroRate], ECB),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero From Fact Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [inrEurMrmThrDirectZeroFromFactZeroRate, inrEurMrmEcbDirectZeroFromFactZeroRate],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Indirect Zero Factors Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmThrIndirectZeroFactorsRate, inrEurMrmEcbIndirectZeroFactorsRate], ECB),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Indirect Zero From Factor Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [inrEurMrmThrIndirectZeroFromFactorRate, inrEurMrmEcbIndirectZeroFromFactorRate],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero Factors Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmThrDirectZeroFactorsRate, inrEurMrmEcbDirectZeroFactorsRate], ECB),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero From Factor Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmThrDirectZeroFromFactorRate, inrEurMrmEcbDirectZeroFromFactorRate], ECB),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });
});
