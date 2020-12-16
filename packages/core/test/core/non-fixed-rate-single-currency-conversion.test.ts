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
  TenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { CurrencyConverter } from '../../src/core/currency-converter';

const TENANT_ID: Tenant = { id: 'TenantID' };
const TENANT_ID1: Tenant = { id: 'tenantId1' };

const MRM = 'MRM';
const ECB = 'ECB';
const THR = 'THR';

const M = 'M';
const B = 'B';
const ASK = 'ASK';

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');
const BHD: Currency = buildCurrency('BHD');
const CLF: Currency = buildCurrency('CLF');

const S_100: ExchangeRateValue = new ExchangeRateValue('100');
const S_123_123: ExchangeRateValue = new ExchangeRateValue('123.123');
const S_0_300623: ExchangeRateValue = new ExchangeRateValue('0.300623');

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_01_16T02_30_00Z: Date = new Date('2020-01-16T02:30:00Z');
const S_2019_09_16T02_30_00Z: Date = new Date('2019-09-16T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

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
const eurInrDecimalValueConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'EUR',
  'INR',
  '120.4576776757575757567',
  B,
  S_2020_01_01T02_30_00Z
);
const usdBhdMConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'USD',
  'BHD',
  '100.12122',
  M,
  S_2020_01_01T02_30_00Z
);
const usdClfMConversionParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'USD',
  'CLF',
  '100.111231',
  M,
  S_2020_01_01T02_30_00Z
);
const inrBhdMFiveParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'INR',
  'BHD',
  '20.1',
  M,
  S_2020_01_01T02_30_00Z
);
const inrBhdMMoreThanFiveParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'INR',
  'BHD',
  '8499999.99990',
  M,
  S_2020_01_01T02_30_00Z
);

const inrEurMConversionParamPastDate: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
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
  1,
  1
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
  1,
  1
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
  1,
  1
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
  1,
  1
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
  1,
  1
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
  1,
  1
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
  1,
  1
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
  1,
  1
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
  1,
  1
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
  1,
  1
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
  1,
  1
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
  1,
  1
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
  10,
  5
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
  10,
  5
);

const currencyConverter: CurrencyConverter = new CurrencyConverter();

function buildAdapter(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[] => exchangeRates;

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): TenantSettings => defaultTenantSettings;
  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<string>
  ): Map<string, ExchangeRateTypeDetail> => new Map();
  return adapter;
}

function buildAdapterThrowsExcpetion(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[] => {
    throw new CurrencyConversionError('Data Adapter Exceptions.');
    return exchangeRates;
  };

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): TenantSettings => defaultTenantSettings;
  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<string>
  ): Map<string, ExchangeRateTypeDetail> => new Map();
  return adapter;
}

function buildAdapterTSNull(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[] => exchangeRates;

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): TenantSettings => [][0];
  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: Set<string>
  ): Map<string, ExchangeRateTypeDetail> => new Map();
  return adapter;
}
describe('Non Fixed Rate -- Single Currency Conversoin Tests Positive.', () => {
  it('Test Direct Conversion Decimal Value.', () => {
    const result: SingleNonFixedRateConversionResult = currencyConverter.convertCurrencyWithNonFixedRate(
      eurInrDecimalValueConversionParam,
      buildAdapter([
        eurInrMrmEcbDirectConversionDecimal,
        inrEurMrmEcbMRate,
        inrEurMrmEcbMDiffrentTenantRate,
        eurInrMrmThrMRate
      ]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('14831.1106484722999998921741');
    expect(result.roundedOffConvertedAmount.valueString).toBe('14831.11');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
  });

  it('Test Direct Conversion Exponent Three.', () => {
    const result: SingleNonFixedRateConversionResult = currencyConverter.convertCurrencyWithNonFixedRate(
      usdBhdMConversionParam,
      buildAdapter([usdBhdMrmEcbMRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.roundedOffConvertedAmount.decimalValue.dp()).toEqual(3);
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Off Value Exponent Four.', () => {
    const result: SingleNonFixedRateConversionResult = currencyConverter.convertCurrencyWithNonFixedRate(
      usdClfMConversionParam,
      buildAdapter([usdClfMrmEcbMRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.roundedOffConvertedAmount.decimalValue.dp()).toEqual(4);
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Halfup Last Digit Five.', () => {
    const result: SingleNonFixedRateConversionResult = currencyConverter.convertCurrencyWithNonFixedRate(
      inrBhdMFiveParam,
      buildAdapter([inrBhdMrmEcbMRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toEqual('6.0425223');
    expect(result.roundedOffConvertedAmount.valueString).toEqual('6.043');
    expect(result.roundedOffConvertedAmount.decimalValue.dp()).toEqual(
      inrBhdMFiveParam.toCurrency.defaultFractionDigits
    );
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Halfup Last Digit More Than Five.', () => {
    const result: SingleNonFixedRateConversionResult = currencyConverter.convertCurrencyWithNonFixedRate(
      inrBhdMMoreThanFiveParam,
      buildAdapter([inrBhdMrmEcbMRate]),
      TENANT_ID
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toEqual('2555295.4999699377');
    expect(result.roundedOffConvertedAmount.valueString).toEqual('2555295.5');
    expect(result.roundedOffConvertedAmount.decimalValue.dp()).toEqual(1);
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
  });

  it('Test Direct Conversion With Empty Exchange RateType Details.', () => {
    const result: SingleNonFixedRateConversionResult = currencyConverter.convertCurrencyWithNonFixedRate(
      inrEurMConversionParam,
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
    expect(result).toBeTruthy();
    expect(result.exchangeRate.fromCurrency.currencyCode).toEqual(inrEurMrmEcbMRate.fromCurrency.currencyCode);
    expect(result.exchangeRate.toCurrency.currencyCode).toEqual(inrEurMrmEcbMRate.toCurrency.currencyCode);
    expect(result.convertedAmount.valueString).toBe('10000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('10000');
    expect(result.exchangeRate.ratesDataSource).toBe('ECB');
  });
});

describe('Non Fixed Rate -- Single Currency Conversoin Tests Negative.', () => {
  it('Test Single Conversion With Exchange Rat eRecord Having Future Date', () => {
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(
        inrEurMConversionParamPastDate,
        buildAdapter([eurInrMrmThrMRate, inrEurMrmEcbMRate, eurInrMrmEcbMRate]),
        TENANT_ID
      )
    ).toThrowError();
  });

  it('Test Single Conversion With Null Conversion Params', () => {
    const temp: ConversionParameterForNonFixedRate[] = [];
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(
        temp[0],
        buildAdapter([eurInrMrmThrMRate, inrEurMrmEcbMRate, eurInrMrmEcbMRate]),
        TENANT_ID
      )
    ).toThrowError();
  });

  it('Test Single Conversion With Empty Exchange Rates.', () => {
    const temp: ExchangeRate[] = [];
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(inrEurMConversionParamPastDate, buildAdapter(temp), TENANT_ID)
    ).toThrowError();
  });
  it('Test Single Conversion With ExchangeRates Throws DataAdapterException.', () => {
    const temp: ExchangeRate[] = [];
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(
        inrEurMConversionParamPastDate,
        buildAdapterThrowsExcpetion(temp),
        TENANT_ID
      )
    ).toThrowError();
  });
  it('Test Single Conversion With Duplicate Exchange Rate Same TimeStamp', () => {
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(
        inrEurMConversionParam,
        buildAdapter([inrEurMrmEcbMDuplicateRate, inrEurMrmEcbMRate]),
        TENANT_ID
      )
    ).toThrowError();
  });
  it('Test Single Conversion With Duplicate Record.', () => {
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(
        inrEurMConversionParam,
        buildAdapter([inrEurMrmEcbMDuplicateRate, inrEurMrmEcbMRate]),
        TENANT_ID
      )
    ).toThrowError();
  });
  it('Test Single Conversion With No Record Found', () => {
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(
        inrEurMConversionParam,
        buildAdapter([eurInrMrmThrMRate, eurInrMrmEcbMDuplicateRate]),
        TENANT_ID
      )
    ).toThrowError();
  });
  it('Test Single Conversion With Data Adapter Null', () => {
    const temp: DataAdapter[] = [];
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(inrEurMConversionParam, temp[0], TENANT_ID)
    ).toThrowError();
  });
  it('Test Single Conversion With Exchange Rates Null', () => {
    const temp: ExchangeRate[] = [];
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(inrEurMConversionParam, buildAdapter(temp), TENANT_ID)
    ).toThrowError();
  });
  it('Test Single Conversion With Exchange Rates And Default TS Null', () => {
    const temp: ExchangeRate[] = [];
    expect(() =>
      currencyConverter.convertCurrencyWithNonFixedRate(inrEurMConversionParam, buildAdapterTSNull(temp), TENANT_ID)
    ).toThrowError();
  });
});
