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
  ExchangeRateValue,
  SingleNonFixedRateConversionResult,
  TenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { CurrencyConverter } from '../../src/core/currency-converter';
import { ConversionError } from '../../src/constants/conversion-error';

const TENANT_ID: Tenant = { id: 'TenantID' };

const MRM = 'MRM';
const ECB = 'ECB';

const M = 'M';

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');

const S_0: ExchangeRateValue = new ExchangeRateValue('0');
const S_10: ExchangeRateValue = new ExchangeRateValue('10');

const S_2019_09_16T02_30_00Z: Date = new Date('2019-09-16T02:30:00Z');

const defaultTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: ECB
};

const inrEurMConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_2019_09_16T02_30_00Z
);

/* Exchange Rate starts*/

/* MRM, THR */

const inrEurMrmEcbDirectZeroRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbDirectZeroToFactorRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbIndirectZeroRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbIndirectZeroFactorsZeroRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbIndirectZeroToFactorZeroRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbIndirectZeroFromFactZeroRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbDirectZeroFactorsZeroRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbDirectZeroFromFactZeroRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbIndirectZeroFactorsRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbIndirectZeroFromFactorRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbDirectZeroFactorsRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbDirectZeroFromFactorRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbIndirectZeroToFactorRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmEcbDirectZeroToFactorZeroRate: ExchangeRate = new ExchangeRate(
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

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  adapter.getDefaultSettingsForTenant = (): Promise<TenantSettings> => Promise.resolve(defaultTenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (): Promise<Map<string, ExchangeRateTypeDetail>> =>
    Promise.resolve(new Map());
  return adapter;
}
function buildAdapterWithDataSource(exchangeRates: ExchangeRate[], dataSource: string): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (): Promise<ExchangeRate[]> => Promise.resolve(exchangeRates);

  const tenantSettings = {
    ratesDataProviderCode: MRM,
    ratesDataSource: dataSource
  };
  adapter.getDefaultSettingsForTenant = (): Promise<TenantSettings> => Promise.resolve(tenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (): Promise<Map<string, ExchangeRateTypeDetail>> =>
    Promise.resolve(new Map());
  return adapter;
}

describe('Non Fixed Rate -- zero rate or zero factor tests default tenant settings.', () => {
  it('Test Direct Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapter([inrEurMrmEcbDirectZeroRate]),
        TENANT_ID
      )
    ).get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(inrEurMrmEcbDirectZeroRate);
  });

  it('Test Direct Zero to Factor Zero.', async () => {
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      inrEurMConversionParam,
      buildAdapterWithDataSource([inrEurMrmEcbDirectZeroToFactorZeroRate], ECB),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(inrEurMrmEcbDirectZeroToFactorZeroRate);
  });

  it('Test Indirect Zero To Factor Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmEcbIndirectZeroToFactorRate], ECB),
        TENANT_ID
      )
    ).get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(inrEurMrmEcbIndirectZeroToFactorRate);
  });

  it('Test Direct Zero To Factor Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmEcbDirectZeroToFactorRate], ECB),
        TENANT_ID
      )
    ).get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(inrEurMrmEcbDirectZeroToFactorRate);
  });

  it('Test Indirect Zero Rate', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmEcbIndirectZeroRate], ECB),
        TENANT_ID
      )
    ).get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
  });

  it('Test Indirect Zero Factors Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmEcbIndirectZeroFactorsZeroRate], ECB),
        TENANT_ID
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
        buildAdapterWithDataSource([inrEurMrmEcbIndirectZeroToFactorZeroRate], ECB),
        TENANT_ID
      )
    ).get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    // expect(result.message).toBe(ConversionErrors.ZERO_CURRENCY_FACTOR);
  });

  it('Test Indirect Zero From Fact Zero Rate.', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource([inrEurMrmEcbIndirectZeroFromFactZeroRate], ECB),
        TENANT_ID
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
        buildAdapterWithDataSource([inrEurMrmEcbDirectZeroFactorsZeroRate], ECB),
        TENANT_ID
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
        buildAdapterWithDataSource([inrEurMrmEcbDirectZeroFromFactZeroRate], ECB),
        TENANT_ID
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
        buildAdapterWithDataSource([inrEurMrmEcbIndirectZeroFactorsRate], ECB),
        TENANT_ID
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
        buildAdapterWithDataSource([inrEurMrmEcbIndirectZeroFromFactorRate], ECB),
        TENANT_ID
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
        buildAdapterWithDataSource([inrEurMrmEcbDirectZeroFactorsRate], ECB),
        TENANT_ID
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
        buildAdapterWithDataSource([inrEurMrmEcbDirectZeroFromFactorRate], ECB),
        TENANT_ID
      )
    ).get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });
});
