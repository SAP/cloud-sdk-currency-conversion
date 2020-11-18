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
  TenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { BigNumber } from 'bignumber.js';
import { CurrencyConverter } from '../../src/core/conversion-api';

const TENANT_ID: Tenant = { id: 'TenantID' };

const MRM: RatesDataProviderCode = new RatesDataProviderCode('MRM');
const ECB: RatesDataSource = new RatesDataSource('ECB');

const A: RateType = new RateType('A');
const ASK: RateType = new RateType('ASK');
const LAST: RateType = new RateType('LAST');

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');

const S_2: ExchangeRateValue = new ExchangeRateValue('2', new BigNumber('2'));
const S_5: ExchangeRateValue = new ExchangeRateValue('5', new BigNumber('5'));
const S_10: ExchangeRateValue = new ExchangeRateValue(
  '10',
  new BigNumber('10')
);

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_02_01T02_30_00Z: Date = new Date('2020-02-01T02:30:00Z');
const S_2020_03_01T02_30_00Z: Date = new Date('2020-03-01T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

const eurUsdAConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'USD',
  '100',
  A,
  S_2020_03_01T02_30_00Z
);

const eurUsdAskConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'USD',
  '100',
  ASK,
  S_1990_03_01T02_30_00Z
);

const eurUsdAConversionParamPastDate: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'USD',
  '100',
  A,
  S_1990_03_01T02_30_00Z
);

const eurUsdLastConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'USD',
  '100',
  LAST,
  S_1990_03_01T02_30_00Z
);

const eurUsdNewConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'USD',
  '100',
  new RateType('New'),
  S_1990_03_01T02_30_00Z
);

/* Exchange Rate starts*/

/* MRM, THR */

/* MRM ECB */
const eurInrMrmEcbARate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const usdInrMrmEcbARate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const usdInrMrmEcbLastRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  LAST,
  S_10,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurUsdMrmEcbIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_2,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurInrMrmEcbADuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurInrMrmEcbIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  true,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const usdInrMrmEcbIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const usdInrMrmEcbIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurInrMrmEcbIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurInrMrmEcbIndirectTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  true,
  new CurrencyFactor(5),
  new CurrencyFactor(10)
);

const usdInrMrmEcbIndirectFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(10),
  new CurrencyFactor(5)
);

const usdInrMrmEcbIndirectTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  new CurrencyFactor(10),
  new CurrencyFactor(5)
);

const eurInrMrmEcbIndirectFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(5),
  new CurrencyFactor(10)
);

const usdInrMrmEcbADuplicateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurUsdMrmEcbIndirectFalseRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_2,
  EUR,
  USD,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const usdInrMrmEcbDuplicateDateRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurInrMrmEcbAskRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  ASK,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurInrMrmEcbLastRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  LAST,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const usdInrMrmEcbAskRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  ASK,
  S_10,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (): ExchangeRate[] => exchangeRates;

  adapter.getDefaultSettingsForTenant = (): TenantSettings => null as any;
  adapter.getExchangeRateTypeDetailsForTenant = (): Map<
    RateType,
    ExchangeRateTypeDetail
  > => {
    const exchangeRate: Map<RateType, ExchangeRateTypeDetail> = new Map();
    exchangeRate.set(A, new ExchangeRateTypeDetail(buildCurrency('INR'), true));
    exchangeRate.set(
      LAST,
      new ExchangeRateTypeDetail(buildCurrency('AFN'), true)
    );
    exchangeRate.set(ASK, new ExchangeRateTypeDetail(null, false));
    return exchangeRate;
  };
  return adapter;
}

describe('Non Fixed Rate Currency Conversion -- Reference currency null tenant settings Tests.', () => {
  it('Test Single Conversion With Reference Currency.', () => {
    const result: SingleNonFixedRateConversionResult = currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([eurInrMrmEcbARate, usdInrMrmEcbARate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Bulk Conversion With Reference Currency.', () => {
    const result: SingleNonFixedRateConversionResult = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(eurUsdAConversionParam),
        buildAdapter([eurInrMrmEcbARate, usdInrMrmEcbARate]),
        TENANT_ID
      )
      .get(eurUsdAConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Conversion Reference Currency And Inversion Null', () => {
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAskConversionParam,
        buildAdapter([eurInrMrmEcbAskRate, usdInrMrmEcbAskRate]),
        TENANT_ID
      )
    ).toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Exchange Rate Record Having Future Date', () => {
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParamPastDate,
        buildAdapter([usdInrMrmEcbARate, eurInrMrmEcbARate]),
        TENANT_ID
      )
    ).toThrowError(CurrencyConversionError);
  });

  it('Test Conversion With Non-Existing Reference Currency', () => {
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdLastConversionParam,
        buildAdapter([usdInrMrmEcbLastRate, eurInrMrmEcbLastRate]),
        TENANT_ID
      )
    ).toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Non-Existing RateType', () => {
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdNewConversionParam,
        buildAdapter([usdInrMrmEcbLastRate, eurInrMrmEcbLastRate]),
        TENANT_ID
      )
    ).toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Direct Rate No From Reference Pair', () => {
    const result = currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        usdInrMrmEcbARate,
        eurUsdMrmEcbIndirectTrueRate,
        eurUsdMrmEcbIndirectFalseRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmEcbIndirectFalseRate);
  });

  it('Test Reference Currency With Direct RateNo To Reference Pair', () => {
    const result = currencyConverter
      .convertCurrenciesWithNonFixedRate(
        Array.of(eurUsdAConversionParam),
        buildAdapter([
          eurInrMrmEcbARate,
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate
        ]),
        TENANT_ID
      )
      .get(eurUsdAConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmEcbIndirectFalseRate);
  });

  it('Test Reference Currency With Direct Rate No From And To Reference Pair', () => {
    const result = currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurUsdMrmEcbIndirectTrueRate,
        eurUsdMrmEcbIndirectFalseRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmEcbIndirectFalseRate);
  });

  it('Test Reference Currency Duplicate From Reference Pair', () => {
    expect(() =>
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
    ).toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency Duplicate To Reference Pair', () => {
    expect(() =>
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
    ).toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency Duplicate From And To Reference Pair.', () => {
    expect(() =>
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
    ).toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency From Indirect To Indirect', () => {
    const result = currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmEcbIndirectTrueRate,
        usdInrMrmEcbIndirectTrueRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate.exchangeRateType.rateType).toBe(A.rateType);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Direct', () => {
    const result = currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmEcbIndirectTrueRate,
        usdInrMrmEcbIndirectFalseRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('2');
    expect(result.roundedOffConvertedAmount.valueString).toBe('2');

    expect(result.exchangeRate.exchangeRateType.rateType).toBe(A.rateType);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Indirect', () => {
    const result = currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmEcbIndirectFalseRate,
        usdInrMrmEcbIndirectTrueRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('5000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('5000');

    expect(result.exchangeRate.exchangeRateType.rateType).toBe(A.rateType);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Direct', () => {
    const result = currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmEcbIndirectFalseRate,
        usdInrMrmEcbIndirectFalseRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.roundedOffConvertedAmount.valueString).toBe('50');

    expect(result.exchangeRate.exchangeRateType.rateType).toBe(A.rateType);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Indirect Factor More Than One', () => {
    const result = currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
        usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('800');
    expect(result.roundedOffConvertedAmount.valueString).toBe('800');

    expect(result.exchangeRate.exchangeRateType.rateType).toBe(A.rateType);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Direct Factor More Than One', () => {
    const result = currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
        usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('8');
    expect(result.roundedOffConvertedAmount.valueString).toBe('8');

    expect(result.exchangeRate.exchangeRateType.rateType).toBe(A.rateType);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Indirect Factor More Than One.', () => {
    const result = currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
        usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('20000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('20000');

    expect(result.exchangeRate.exchangeRateType.rateType).toBe(A.rateType);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Direct Factor More Than One.', () => {
    const result = currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
        usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');

    expect(result.exchangeRate.exchangeRateType.rateType).toBe(A.rateType);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });
});
