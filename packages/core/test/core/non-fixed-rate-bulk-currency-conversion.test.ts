/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core/dist/scp-cf/tenant';
import {
  buildCurrency,
  Currency,
  CurrencyConversionError,
  CurrencyFactor,
  DataAdapter,
  ExchangeRate,
  ExchangeRateValue,
  RateType,
  RatesDataProviderCode,
  RatesDataSource,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  ExchangeRateTypeDetail,
  ConversionParametersForNonFixedRate
} from '@sap-cloud-sdk/currency-conversion-models';
import { BigNumber } from 'bignumber.js';
import { CurrencyConverter } from '../../src/core/conversion-api';

const TENANT_ID: Tenant = { id: 'TenantID' };
const TENANT_ID1: Tenant = { id: 'tenantId1' };

const MRM: RatesDataProviderCode = new RatesDataProviderCode('MRM');
const ECB: RatesDataSource = new RatesDataSource('ECB');
const THR: RatesDataSource = new RatesDataSource('THR');

const M: RateType = new RateType('M');
const B: RateType = new RateType('B');
const ASK: RateType = new RateType('ASK');

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');
const BHD: Currency = buildCurrency('BHD');
const CLF: Currency = buildCurrency('CLF');

const S_100: ExchangeRateValue = new ExchangeRateValue(
  '100',
  new BigNumber('100')
);
const S_123_123: ExchangeRateValue = new ExchangeRateValue(
  '123.123',
  new BigNumber('123.123')
);
const S_0_300623: ExchangeRateValue = new ExchangeRateValue(
  '0.300623',
  new BigNumber('0.300623')
);

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_01_16T02_30_00Z: Date = new Date('2020-01-16T02:30:00Z');
const S_2019_09_16T02_30_00Z: Date = new Date('2019-09-16T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

const defaultTenantSettings: TenantSettings = new TenantSettings(MRM, ECB);

const inrEurMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_2019_09_16T02_30_00Z
);
const eurInrDecimalValueConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'INR',
  '120.4576776757575757567',
  B,
  S_2020_01_01T02_30_00Z
);
const usdBhdMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'USD',
  'BHD',
  '100.12122',
  M,
  S_2020_01_01T02_30_00Z
);
const usdClfMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'USD',
  'CLF',
  '100.111231',
  M,
  S_2020_01_01T02_30_00Z
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

const inrEurMConversionParamPastDate: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_1990_03_01T02_30_00Z
);

/* Exchange Rate starts*/

/* MRM, THR */

const eurInrMrmThrMRate: ExchangeRate = new ExchangeRate(
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

/* MRM ECB */
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
const usdBhdMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  USD,
  BHD,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const usdClfMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  USD,
  CLF,
  S_2020_01_01T02_30_00Z,
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
  new CurrencyFactor(10),
  new CurrencyFactor(5)
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
  new CurrencyFactor(10),
  new CurrencyFactor(5)
);

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParametersForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[] => exchangeRates;

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): TenantSettings =>
    defaultTenantSettings;
  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<RateType>
  ): Map<RateType, ExchangeRateTypeDetail> => new Map();
  return adapter;
}

function buildAdapterThrowsExcpetion(
  exchangeRates: ExchangeRate[]
): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParametersForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[] => {
    throw new CurrencyConversionError('Data Adapter Exceptions.');
    return exchangeRates;
  };

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): TenantSettings =>
    defaultTenantSettings;
  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<RateType>
  ): Map<RateType, ExchangeRateTypeDetail> => new Map();
  return adapter;
}

function buildAdapterWithNullExchangeRates(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParametersForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[] => null as any;

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): TenantSettings =>
    defaultTenantSettings;
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

describe('Non Fixed Rate -- Bulk Currency Conversion Tests Positive.', () => {
  it('Test Direct Conversion Decimal Value.', () => {
    const result = currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(eurInrDecimalValueConversionParam),
      buildAdapter([
        eurInrMrmEcbDirectConversionDecimal,
        inrEurMrmEcbMRate,
        inrEurMrmEcbMDiffrentTenantRate,
        eurInrMrmThrMRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(
      (result.get(
        eurInrDecimalValueConversionParam
      ) as SingleNonFixedRateConversionResult).convertedAmount.valueString
    ).toBe('14831.1106484722999998921741');
    expect(
      (result.get(
        eurInrDecimalValueConversionParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount
        .valueString
    ).toBe('14831.11');
    expect(
      (result.get(
        eurInrDecimalValueConversionParam
      ) as SingleNonFixedRateConversionResult).exchangeRate.ratesDataSource
        ?.dataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion Exponent Three.', () => {
    const result = currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(usdBhdMConversionParam),
      buildAdapter([usdBhdMrmEcbMRate]),
      TENANT_ID
    );
    expect(
      result.get(usdBhdMConversionParam) as SingleNonFixedRateConversionResult
    ).toBeTruthy();
    expect(
      (result.get(
        usdBhdMConversionParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(3);
    expect(
      (result.get(usdBhdMConversionParam) as SingleNonFixedRateConversionResult)
        .exchangeRate.ratesDataSource?.dataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Off Value Exponent Four.', () => {
    const result = currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(usdClfMConversionParam),
      buildAdapter([usdClfMrmEcbMRate]),
      TENANT_ID
    );
    expect(
      result.get(usdClfMConversionParam) as SingleNonFixedRateConversionResult
    ).toBeTruthy();
    expect(
      (result.get(
        usdClfMConversionParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(4);
    expect(
      (result.get(usdClfMConversionParam) as SingleNonFixedRateConversionResult)
        .exchangeRate.ratesDataSource?.dataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Halfup Last Digit Five.', () => {
    const result = currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(inrBhdMFiveParam),
      buildAdapter([inrBhdMrmEcbMRate]),
      TENANT_ID
    );
    expect(
      result.get(inrBhdMFiveParam) as SingleNonFixedRateConversionResult
    ).toBeTruthy();
    expect(
      (result.get(inrBhdMFiveParam) as SingleNonFixedRateConversionResult)
        .convertedAmount.valueString
    ).toEqual('6.0425223');
    expect(
      (result.get(inrBhdMFiveParam) as SingleNonFixedRateConversionResult)
        .roundedOffConvertedAmount.valueString
    ).toEqual('6.043');
    expect(
      (result.get(
        inrBhdMFiveParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(inrBhdMFiveParam.toCurrency.defaultFractionDigits);
    expect(
      (result.get(inrBhdMFiveParam) as SingleNonFixedRateConversionResult)
        .exchangeRate.ratesDataSource?.dataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Halfup Last Digit More Than Five.', () => {
    const result = currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(inrBhdMMoreThanFiveParam),
      buildAdapter([inrBhdMrmEcbMRate]),
      TENANT_ID
    );
    expect(
      result.get(inrBhdMMoreThanFiveParam) as SingleNonFixedRateConversionResult
    ).toBeTruthy();
    expect(
      (result.get(
        inrBhdMMoreThanFiveParam
      ) as SingleNonFixedRateConversionResult).convertedAmount.valueString
    ).toEqual('2555295.4999699377');
    expect(
      (result.get(
        inrBhdMMoreThanFiveParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount
        .valueString
    ).toEqual('2555295.5');
    expect(
      (result.get(
        inrBhdMMoreThanFiveParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(1);
    expect(
      (result.get(
        inrBhdMMoreThanFiveParam
      ) as SingleNonFixedRateConversionResult).exchangeRate.ratesDataSource
        ?.dataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion With Empty Exchange RateType Details.', () => {
    const result = currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(inrEurMConversionParam),
      buildAdapter([
        inrEurMrmEcbMRate,
        eurInrMrmEcbMRate,
        eurInrMrmEcbIndirectConversionRate,
        eurUsdMrmEcbAskRate,
        inrEurMrmEcbMDiffrentTenantRate,
        usdEurMrmThrMRate,
        eurInrMrmThrMRate,
        eurInrMrmEcbAskIndirectFalseRate
      ]),
      TENANT_ID
    );
    expect(
      result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult
    ).toBeTruthy();
    expect(
      (result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult)
        .exchangeRate.fromCurrency.currencyCode
    ).toEqual(inrEurMrmEcbMRate.fromCurrency.currencyCode);
    expect(
      (result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult)
        .exchangeRate.toCurrency.currencyCode
    ).toEqual(inrEurMrmEcbMRate.toCurrency.currencyCode);
    expect(
      (result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult)
        .convertedAmount.valueString
    ).toBe('10000');
    expect(
      (result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult)
        .roundedOffConvertedAmount.valueString
    ).toBe('10000');
    expect(
      (result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult)
        .exchangeRate.ratesDataSource?.dataSource
    ).toBe('ECB');
  });
  // Non Fixed Rate -- Single Currency Conversoin Tests Negative.
  it('Test Single Conversion With Exchange Rate Record Having Future Date', () => {
    expect(
      currencyConverter
        .convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParamPastDate),
          buildAdapter([
            eurInrMrmThrMRate,
            inrEurMrmEcbMRate,
            eurInrMrmEcbMRate
          ]),
          TENANT_ID
        )
        .get(inrEurMConversionParamPastDate)
    ).toBeTruthy();

    expect(
      currencyConverter
        .convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParamPastDate),
          buildAdapter([
            eurInrMrmThrMRate,
            inrEurMrmEcbMRate,
            eurInrMrmEcbMRate
          ]),
          TENANT_ID
        )
        .get(inrEurMConversionParamPastDate)
    ).toBeInstanceOf(CurrencyConversionError);
  });

  it('Test Single Conversion With Null Conversion Params', () => {
    const temp: ConversionParametersForNonFixedRate[] = new Array();
    expect(() =>
      currencyConverter
        .convertCurrenciesWithNonFixedRate(
          Array.of(temp[0]),
          buildAdapter([
            eurInrMrmThrMRate,
            inrEurMrmEcbMRate,
            eurInrMrmEcbMRate
          ]),
          TENANT_ID
        )
        .get(temp[0])
    ).toThrowError();
  });

  it('Test Single Conversion With Empty Exchange Rates.', () => {
    const temp: ExchangeRate[] = new Array();
    expect(() =>
      currencyConverter
        .convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParamPastDate),
          buildAdapter(temp),
          TENANT_ID
        )
        .get(inrEurMConversionParamPastDate)
    ).toThrowError(CurrencyConversionError);
  });
  it('Test Single Conversion With ExchangeRates Throws DataAdapterException.', () => {
    const temp: ExchangeRate[] = new Array();
    expect(() =>
      currencyConverter
        .convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParamPastDate),
          buildAdapterThrowsExcpetion(temp),
          TENANT_ID
        )
        .get(inrEurMConversionParamPastDate)
    ).toThrowError();
  });
  it('Test Single Conversion With Duplicate Exchange Rate Same TimeStamp', () => {
    expect(
      currencyConverter
        .convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParam),
          buildAdapter([inrEurMrmEcbMDuplicateRate, inrEurMrmEcbMRate]),
          TENANT_ID
        )
        .get(inrEurMConversionParam)
    ).toBeInstanceOf(CurrencyConversionError);
  });
  it('Test Single Conversion With Duplicate Record.', () => {
    expect(
      currencyConverter
        .convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParam),
          buildAdapter([inrEurMrmEcbMDuplicateRate, inrEurMrmEcbMRate]),
          TENANT_ID
        )
        .get(inrEurMConversionParam)
    ).toBeInstanceOf(CurrencyConversionError);
  });
  it('Test Single Conversion With No Record Found', () => {
    expect(
      currencyConverter
        .convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParam),
          buildAdapter([eurInrMrmThrMRate, eurInrMrmEcbMDuplicateRate]),
          TENANT_ID
        )
        .get(inrEurMConversionParam)
    ).toBeInstanceOf(CurrencyConversionError);
  });
  it('Test Single Conversion With Data Adapter Null', () => {
    const temp: DataAdapter[] = new Array();
    expect(() =>
      currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        temp[0],
        TENANT_ID
      )
    ).toThrowError();
  });
  it('Test Single Conversion With Exchange Rates Null', () => {
    const temp: ExchangeRate[] = new Array();
    expect(() =>
      currencyConverter
        .convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParam),
          buildAdapterWithNullExchangeRates(),
          TENANT_ID
        )
        .get(inrEurMConversionParam)
    ).toThrowError(CurrencyConversionError);
  });
  it('Test Single Conversion With Exchange Rates And Default TS Null', () => {
    const temp: ExchangeRate[] = new Array();
    expect(() =>
      currencyConverter
        .convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParam),
          buildAdapterWithNullExchangeRatesAndDefaultTenantSettings(),
          TENANT_ID
        )
        .get(inrEurMConversionParam)
    ).toThrowError(CurrencyConversionError);
  });
});
