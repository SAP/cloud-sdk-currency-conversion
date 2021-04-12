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
  setDefaultSettings
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

const defaultTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: ECB
};
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

const inrEurMrmEcbDirectZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbDirectZeroToFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbIndirectZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbIndirectZeroFactorsZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbIndirectZeroToFactorZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbIndirectZeroFromFactZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbDirectZeroFactorsZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbDirectZeroFromFactZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbIndirectZeroFactorsRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbIndirectZeroFromFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbDirectZeroFactorsRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbDirectZeroFromFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbIndirectZeroToFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmEcbDirectZeroToFactorZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};
/* MRM ECB */

// MRM, THR
const inrEurMrmThrIndirectZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrDirectZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrIndirectZeroFactorsZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrIndirectZeroToFactorZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrIndirectZeroFromFactZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrDirectZeroFactorsZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrDirectZeroToFactorZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrDirectZeroFromFactZeroRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_0,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrIndirectZeroFactorsRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrIndirectZeroToFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrIndirectZeroFromFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrDirectZeroFactorsRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrDirectZeroToFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrDirectZeroFromFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_10,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

/* Exchange Rate ends*/

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

describe('Non Fixed Rate -- zero rate or zero factor tests override tenant settings.', async () => {
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
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
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
