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
  TenantSettings,
  buildConversionParameterForNonFixedRate,
  buildExchangeRate,
  buildExchangeRateTypeDetail
} from '@sap-cloud-sdk/currency-conversion-models';
import { CurrencyConverter } from '../../src/core/currency-converter';

const TENANT_ID: Tenant = { id: 'TenantID' };

const MRM = 'MRM';
const ECB = 'ECB';

const A = 'A';
const LAST = 'LAST';
const ASK = 'ASK';

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');

const S_2: ExchangeRateValue = new ExchangeRateValue('2');
const S_5: ExchangeRateValue = new ExchangeRateValue('5');
const S_10: ExchangeRateValue = new ExchangeRateValue('10');

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_02_01T02_30_00Z: Date = new Date('2020-02-01T02:30:00Z');
const S_2020_03_01T02_30_00Z: Date = new Date('2020-03-01T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

const defaultTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: ECB
};

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
      buildAdapter([eurInrMrmEcbARate, usdInrMrmEcbARate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Bulk Conversion With Reference Currency.', async () => {
    const result: SingleNonFixedRateConversionResult = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(eurUsdAConversionParam),
        buildAdapter([eurInrMrmEcbARate, usdInrMrmEcbARate]),
        TENANT_ID
      )
    ).get(eurUsdAConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Conversion Reference Currency And Inversion Null', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAskConversionParam,
        buildAdapter([eurInrMrmEcbAskRate, usdInrMrmEcbAskRate]),
        TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Exchange Rate Record Having Future Date', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParamPastDate,
        buildAdapter([usdInrMrmEcbARate, eurInrMrmEcbARate]),
        TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Conversion With Non-Existing Reference Currency', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdLastConversionParam,
        buildAdapter([usdInrMrmEcbLastRate, eurInrMrmEcbLastRate]),
        TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Non-Existing RateType', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdNewConversionParam,
        buildAdapter([usdInrMrmEcbLastRate, eurInrMrmEcbLastRate]),
        TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Direct Rate No From Reference Pair', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([usdInrMrmEcbARate, eurUsdMrmEcbIndirectTrueRate, eurUsdMrmEcbIndirectFalseRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmEcbIndirectFalseRate);
  });

  it('Test Reference Currency With Direct RateNo To Reference Pair', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(eurUsdAConversionParam),
        buildAdapter([eurInrMrmEcbARate, eurUsdMrmEcbIndirectTrueRate, eurUsdMrmEcbIndirectFalseRate]),
        TENANT_ID
      )
    ).get(eurUsdAConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmEcbIndirectFalseRate);
  });

  it('Test Reference Currency With Direct Rate No From And To Reference Pair', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([eurUsdMrmEcbIndirectTrueRate, eurUsdMrmEcbIndirectFalseRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmEcbIndirectFalseRate);
  });

  it('Test Reference Currency Duplicate From Reference Pair', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParam,
        buildAdapter([
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate,
          eurInrMrmEcbARate,
          usdInrMrmEcbARate,
          eurInrMrmEcbADuplicateRate
        ]),
        TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency Duplicate To Reference Pair', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParam,
        buildAdapter([
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate,
          eurInrMrmEcbARate,
          usdInrMrmEcbARate,
          usdInrMrmEcbDuplicateDateRate
        ]),
        TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency Duplicate From And To Reference Pair.', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParam,
        buildAdapter([
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate,
          eurInrMrmEcbARate,
          usdInrMrmEcbARate,
          eurInrMrmEcbADuplicateRate,
          usdInrMrmEcbADuplicateRate
        ]),
        TENANT_ID
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency From Indirect To Indirect', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([eurInrMrmEcbIndirectTrueRate, usdInrMrmEcbIndirectTrueRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Direct', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([eurInrMrmEcbIndirectTrueRate, usdInrMrmEcbIndirectFalseRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('2');
    expect(result.roundedOffConvertedAmount.valueString).toBe('2');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Indirect', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([eurInrMrmEcbIndirectFalseRate, usdInrMrmEcbIndirectTrueRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('5000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('5000');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Direct', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([eurInrMrmEcbIndirectFalseRate, usdInrMrmEcbIndirectFalseRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.roundedOffConvertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Indirect Factor More Than One', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([eurInrMrmEcbIndirectTrueFactorMoreThanOneRate, usdInrMrmEcbIndirectTrueFactorMoreThanOneRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('800');
    expect(result.roundedOffConvertedAmount.valueString).toBe('800');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Direct Factor More Than One', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([eurInrMrmEcbIndirectTrueFactorMoreThanOneRate, usdInrMrmEcbIndirectFalseFactorMoreThanOneRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('8');
    expect(result.roundedOffConvertedAmount.valueString).toBe('8');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Indirect Factor More Than One.', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([eurInrMrmEcbIndirectFalseFactorMoreThanOneRate, usdInrMrmEcbIndirectTrueFactorMoreThanOneRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('20000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('20000');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Direct Factor More Than One.', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([eurInrMrmEcbIndirectFalseFactorMoreThanOneRate, usdInrMrmEcbIndirectFalseFactorMoreThanOneRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
    expect(result.exchangeRate.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });
});
