/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  buildCurrency,
  BulkConversionResult,
  Currency,
  CurrencyConversionError,
  CurrencyAmount,
  DataAdapter,
  ExchangeRate,
  ExchangeRateValue,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  ExchangeRateTypeDetail,
  ConversionParameterForNonFixedRate
} from '@sap-cloud-sdk/currency-conversion-models';
import { ConversionError } from '../../src/constants/conversion-error';
import { CurrencyConverter } from '../../src/core/currency-converter';

const TENANT_ID: Tenant = { id: 'TenantID' };

const MRM = 'MRM';
const ECB = 'ECB';

const B = 'B';
const M = 'M';
const ABC = 'ABC';

const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');

const S_20: ExchangeRateValue = new ExchangeRateValue('20');
const S_30: ExchangeRateValue = new ExchangeRateValue('30');
const S_100: ExchangeRateValue = new ExchangeRateValue('100');

const S_1: CurrencyAmount = new CurrencyAmount('1');
const S_10000: CurrencyAmount = new CurrencyAmount('10000');
const S_20000: CurrencyAmount = new CurrencyAmount('20000');
const S_300: CurrencyAmount = new CurrencyAmount('300');
const S_50: CurrencyAmount = new CurrencyAmount('50');
const S_0_333333333333: CurrencyAmount = new CurrencyAmount('0.333333333333');
const S_0_33: CurrencyAmount = new CurrencyAmount('0.33');

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

const defaultTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: ECB
};

/* Conversion Parameter starts*/

const usdEurMConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  M,
  S_2020_01_01T02_30_00Z
);
const usdEurBConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  B,
  S_2020_01_01T02_30_00Z
);
const eurUsdMrmEcbABCConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  ABC,
  S_2020_01_01T02_30_00Z
);
const usdEurBConversionParamPastDate: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  B,
  S_1990_03_01T02_30_00Z
);

/* Conversion Parameter ends*/

/* Exchange Rate starts*/

// Direct Currency Pair
const usdEurMrmEcbIndirectTrueInvertedTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const usdEurMrmEcbIndirectTrueInvertedFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  B,
  S_100,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const usdEurMrmEcbIndirectFalseInvertedTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);
const usdEurMrmEcbIndirectFalseInvertedFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  B,
  S_100,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_20,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  10
);
const usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  B,
  S_20,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  10
);
const usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_20,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  10
);
const usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  B,
  S_20,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  10
);

// Inverted Currency Pair
const eurUsdMrmEcbIndirectTrueInvertedTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const eurUsdMrmEcbIndirectTrueInvertedFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  B,
  S_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const eurUsdMrmEcbIndirectFalseInvertedTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);
const eurUsdMrmEcbIndirectFalseInvertedFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  B,
  S_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_30,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  10,
  100
);
const eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  B,
  S_30,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  10,
  100
);
const eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_30,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  10,
  100
);
const eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  B,
  S_30,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  10,
  100
);

const eurUsdMrmEcbNewRateType = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  ABC,
  S_100,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
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
  ): Promise<Map<string, ExchangeRateTypeDetail>> => {
    const exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail> = new Map();
    exchangeRateTypeDetailMap.set(B, new ExchangeRateTypeDetail(null as any, false));
    exchangeRateTypeDetailMap.set(M, new ExchangeRateTypeDetail(null as any, true));
    return Promise.resolve(exchangeRateTypeDetailMap);
  };
  return adapter;
}

describe('Non Fixed Rate -- Inverted Rate conversion default tenant settings', () => {
  it('Inverted Single Conversion With Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      S_1,
      S_1
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      usdEurMConversionParam,
      buildAdapter([eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Single Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectFalseInvertedTrueRate,
      S_10000,
      S_10000
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      usdEurMConversionParam,
      buildAdapter([eurUsdMrmEcbIndirectFalseInvertedTrueRate, usdEurMrmEcbIndirectFalseInvertedTrueRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      S_1,
      S_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      TENANT_ID
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectFalseInvertedTrueRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([eurUsdMrmEcbIndirectFalseInvertedTrueRate, usdEurMrmEcbIndirectFalseInvertedTrueRate]),
      TENANT_ID
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion With Exchange Rate Record Having Future Date', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParamPastDate],
      buildAdapter([eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      TENANT_ID
    );
    expect(result.get(usdEurBConversionParamPastDate)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(usdEurBConversionParamPastDate) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Inverted Conversion With New Exchange Rate Type', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmEcbNewRateType,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [eurUsdMrmEcbABCConversionParam],
      buildAdapter([eurUsdMrmEcbNewRateType]),
      TENANT_ID
    );
    expect(result.get(eurUsdMrmEcbABCConversionParam)).toBeTruthy();
    expect(result.get(eurUsdMrmEcbABCConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmEcbIndirectTrueInvertedTrueRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([eurUsdMrmEcbIndirectTrueInvertedTrueRate]),
      TENANT_ID
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Inverted Currency Pair', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([eurUsdMrmEcbIndirectTrueInvertedFalseRate]),
      TENANT_ID
    );
    expect(result.get(usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect False Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      S_1,
      S_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      TENANT_ID
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Inverted Currency Pair', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([eurUsdMrmEcbIndirectFalseInvertedFalseRate]),
      TENANT_ID
    );
    expect(result.get(usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect True Inverted True Inverted Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate,
      S_300,
      S_300
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate]),
      TENANT_ID
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Inverted Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate,
      S_0_333333333333,
      S_0_33
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate]),
      TENANT_ID
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Inverted Currency Pair Factor More Than One Rate', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate]),
      TENANT_ID
    );
    expect(result.get(usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect True Inverted True Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectTrueInvertedTrueRate,
      S_1,
      S_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([usdEurMrmEcbIndirectTrueInvertedTrueRate, eurUsdMrmEcbIndirectTrueInvertedTrueRate]),
      TENANT_ID
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectTrueInvertedFalseRate,
      S_1,
      S_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([usdEurMrmEcbIndirectTrueInvertedFalseRate, eurUsdMrmEcbIndirectTrueInvertedFalseRate]),
      TENANT_ID
    );
    expect(result.get(usdEurBConversionParam)).toBeTruthy();
    expect(result.get(usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectFalseInvertedTrueRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([usdEurMrmEcbIndirectFalseInvertedTrueRate, eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      TENANT_ID
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectFalseInvertedFalseRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([usdEurMrmEcbIndirectFalseInvertedFalseRate, eurUsdMrmEcbIndirectFalseInvertedFalseRate]),
      TENANT_ID
    );
    expect(result.get(usdEurBConversionParam)).toBeTruthy();
    expect(result.get(usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate,
      S_50,
      S_50
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([
        usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate
      ]),
      TENANT_ID
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate,
      S_50,
      S_50
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([
        usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate
      ]),
      TENANT_ID
    );
    expect(result.get(usdEurBConversionParam)).toBeTruthy();
    expect(result.get(usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate,
      S_20000,
      S_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([
        usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate
      ]),
      TENANT_ID
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate,
      S_20000,
      S_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([
        usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate
      ]),
      TENANT_ID
    );
    expect(result.get(usdEurBConversionParam)).toBeTruthy();
    expect(result.get(usdEurBConversionParam)).toEqual(expectedConversionResult);
  });
});
