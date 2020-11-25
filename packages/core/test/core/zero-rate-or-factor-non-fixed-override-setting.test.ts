/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core/dist/scp-cf/tenant';
import {
  buildCurrency,
  Currency,
  CurrencyConversionError,
  CurrencyFactor,
  ConversionParametersForNonFixedRate,
  DataAdapter,
  ExchangeRate,
  ExchangeRateTypeDetail,
  ExchangeRateValue,
  RateType,
  RatesDataProviderCode,
  RatesDataSource,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  OverrideTenantSetting
} from '@sap-cloud-sdk/currency-conversion-models';
import { BigNumber } from 'bignumber.js';
import { CurrencyConverter } from '../../src/core/conversion-api';
import { ConversionError } from '../../src/constants/conversion-error';

const TENANT_ID: Tenant = { id: 'TenantID' };

const MRM: RatesDataProviderCode = new RatesDataProviderCode('MRM');
const ECB: RatesDataSource = new RatesDataSource('ECB');
const THR: RatesDataSource = new RatesDataSource('THR');

const M: RateType = new RateType('M');

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');

const S_0: ExchangeRateValue = new ExchangeRateValue('0', new BigNumber('0'));
const S_10: ExchangeRateValue = new ExchangeRateValue(
  '10',
  new BigNumber('10')
);

const S_2019_09_16T02_30_00Z: Date = new Date('2019-09-16T02:30:00Z');

const defaultTenantSettings: TenantSettings = new TenantSettings(MRM, ECB);
const overrideTenantSettings: OverrideTenantSetting = new OverrideTenantSetting(
  MRM,
  THR
);

const inrEurMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_2019_09_16T02_30_00Z
);

/* Exchange Rate starts*/

/* MRM, ECB */

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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(0)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(0),
  new CurrencyFactor(0)
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
  new CurrencyFactor(1),
  new CurrencyFactor(0)
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
  new CurrencyFactor(0),
  new CurrencyFactor(1)
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
  new CurrencyFactor(0),
  new CurrencyFactor(0)
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
  new CurrencyFactor(0),
  new CurrencyFactor(1)
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
  new CurrencyFactor(0),
  new CurrencyFactor(0)
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
  new CurrencyFactor(0),
  new CurrencyFactor(1)
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
  new CurrencyFactor(0),
  new CurrencyFactor(0)
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
  new CurrencyFactor(0),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(0)
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
  new CurrencyFactor(1),
  new CurrencyFactor(0)
);

// MRM, THR
const inrEurMrmThrIndirectZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const inrEurMrmThrDirectZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const inrEurMrmThrIndirectZeroFactorsZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  new CurrencyFactor(0),
  new CurrencyFactor(0)
);
const inrEurMrmThrIndirectZeroToFactorZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  new CurrencyFactor(1),
  new CurrencyFactor(0)
);
const inrEurMrmThrIndirectZeroFromFactZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  new CurrencyFactor(0),
  new CurrencyFactor(1)
);

const inrEurMrmThrDirectZeroFactorsZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  new CurrencyFactor(0),
  new CurrencyFactor(0)
);
const inrEurMrmThrDirectZeroToFactorZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(0)
);
const inrEurMrmThrDirectZeroFromFactZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_0,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  new CurrencyFactor(0),
  new CurrencyFactor(1)
);

const inrEurMrmThrIndirectZeroFactorsRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  new CurrencyFactor(0),
  new CurrencyFactor(0)
);
const inrEurMrmThrIndirectZeroToFactorRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  new CurrencyFactor(1),
  new CurrencyFactor(0)
);
const inrEurMrmThrIndirectZeroFromFactorRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  true,
  new CurrencyFactor(0),
  new CurrencyFactor(1)
);

const inrEurMrmThrDirectZeroFactorsRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  new CurrencyFactor(0),
  new CurrencyFactor(0)
);
const inrEurMrmThrDirectZeroToFactorRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(0)
);
const inrEurMrmThrDirectZeroFromFactorRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_10,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  new CurrencyFactor(0),
  new CurrencyFactor(1)
);

/* Exchange Rate ends*/

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (): ExchangeRate[] => exchangeRates;

  adapter.getDefaultSettingsForTenant = (): TenantSettings =>
    defaultTenantSettings;
  adapter.getExchangeRateTypeDetailsForTenant = (): Map<
    RateType,
    ExchangeRateTypeDetail
  > => new Map();
  return adapter;
}
function buildAdapterWithDataSource(
  exchangeRates: ExchangeRate[],
  dataSource: RatesDataSource
): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (): ExchangeRate[] => exchangeRates;

  adapter.getDefaultSettingsForTenant = (): TenantSettings =>
    new TenantSettings(MRM, dataSource);
  adapter.getExchangeRateTypeDetailsForTenant = (): Map<
    RateType,
    ExchangeRateTypeDetail
  > => new Map();
  return adapter;
}

describe('Non Fixed Rate -- zero rate or zero factor tests override tenant settings.', () => {
  it('Test Direct Zero Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapter([inrEurMrmThrDirectZeroRate, inrEurMrmEcbDirectZeroRate]),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(inrEurMrmThrDirectZeroRate);
  });

  it('Test Direct Zero to Factor Zero.', () => {
    const result: SingleNonFixedRateConversionResult = currencyConverter.convertCurrencyWithNonFixedRate(
      inrEurMConversionParam,
      buildAdapterWithDataSource(
        [
          inrEurMrmThrDirectZeroToFactorZeroRate,
          inrEurMrmEcbDirectZeroToFactorZeroRate
        ],
        ECB
      ),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(
      inrEurMrmThrDirectZeroToFactorZeroRate
    );
  });

  it('Test Indirect Zero To Factor Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [
            inrEurMrmThrIndirectZeroToFactorRate,
            inrEurMrmEcbIndirectZeroToFactorRate
          ],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(
      inrEurMrmThrIndirectZeroToFactorRate
    );
  });

  it('Test Direct Zero To Factor Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [
            inrEurMrmThrDirectZeroToFactorRate,
            inrEurMrmEcbDirectZeroToFactorRate
          ],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.decimalValue.toNumber()).toBe(0);
    expect(result.roundedOffConvertedAmount.decimalValue.toString()).toBe('0');
    expect(result.exchangeRate).toMatchObject(
      inrEurMrmThrDirectZeroToFactorRate
    );
  });

  it('Test Indirect Zero Rate', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [inrEurMrmThrIndirectZeroRate, inrEurMrmEcbIndirectZeroRate],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
  });

  it('Test Indirect Zero Factors Zero Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [
            inrEurMrmThrIndirectZeroFactorsZeroRate,
            inrEurMrmEcbIndirectZeroFactorsZeroRate
          ],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Indirect Zero To Factor Zero Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [
            inrEurMrmThrIndirectZeroToFactorZeroRate,
            inrEurMrmEcbIndirectZeroToFactorZeroRate
          ],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
  });

  it('Test Indirect Zero From Fact Zero Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [
            inrEurMrmThrIndirectZeroFromFactZeroRate,
            inrEurMrmEcbIndirectZeroFromFactZeroRate
          ],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero Factors Zero Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [
            inrEurMrmThrDirectZeroFactorsZeroRate,
            inrEurMrmEcbDirectZeroFactorsZeroRate
          ],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero From Fact Zero Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [
            inrEurMrmThrDirectZeroFromFactZeroRate,
            inrEurMrmEcbDirectZeroFromFactZeroRate
          ],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Indirect Zero Factors Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [
            inrEurMrmThrIndirectZeroFactorsRate,
            inrEurMrmEcbIndirectZeroFactorsRate
          ],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Indirect Zero From Factor Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [
            inrEurMrmThrIndirectZeroFromFactorRate,
            inrEurMrmEcbIndirectZeroFromFactorRate
          ],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero Factors Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [
            inrEurMrmThrDirectZeroFactorsRate,
            inrEurMrmEcbDirectZeroFactorsRate
          ],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Test Direct Zero From Factor Rate.', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithDataSource(
          [
            inrEurMrmThrDirectZeroFromFactorRate,
            inrEurMrmEcbDirectZeroFromFactorRate
          ],
          ECB
        ),
        TENANT_ID,
        overrideTenantSettings
      )
      .get(inrEurMConversionParam) as CurrencyConversionError;
    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });
});
