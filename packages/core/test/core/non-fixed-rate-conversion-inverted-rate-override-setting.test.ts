/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  buildCurrency,
  BulkConversionResult,
  Currency,
  CurrencyConversionError,
  CurrencyAmount,
  DataAdapter,
  ExchangeRate,
  Value,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  ExchangeRateTypeDetail,
  ConversionParameterForNonFixedRate,
  buildConversionParameterForNonFixedRate,
  buildExchangeRateTypeDetail,
  setDefaultSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { ConversionError } from '../../src/constants/conversion-error';
import { CurrencyConverter } from '../../src/core/currency-converter';

const TENANT_ID: Tenant = { id: 'TenantID' };

const MRM = 'MRM';
const ECB = 'ECB';
const THR = 'THR';

const B = 'B';
const M = 'M';
const ABC = 'ABC';

const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');

const S_20: Value = new Value('20');
const S_30: Value = new Value('30');
const S_100: Value = new Value('100');

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
const overrideTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: THR
};

/* Conversion Parameter starts*/

const usdEurMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  M,
  S_2020_01_01T02_30_00Z
);
const usdEurBConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  B,
  S_2020_01_01T02_30_00Z
);
const eurUsdMrmEcbABCConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  ABC,
  S_2020_01_01T02_30_00Z
);
const usdEurBConversionParamPastDate: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  B,
  S_1990_03_01T02_30_00Z
);

/* Conversion Parameter ends*/

/* Exchange Rate starts*/

// Direct Currency Pair MRM, ECB
const usdEurMrmEcbIndirectTrueInvertedTrueRate: ExchangeRate = {
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
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmEcbIndirectTrueInvertedFalseRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmEcbIndirectFalseInvertedTrueRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmEcbIndirectFalseInvertedFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

// Inverted Currency Pair MRM, ECB
const eurUsdMrmEcbIndirectTrueInvertedTrueRate: ExchangeRate = {
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
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmEcbIndirectTrueInvertedFalseRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmEcbIndirectFalseInvertedTrueRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmEcbIndirectFalseInvertedFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmEcbNewRateType = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: ABC
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

// Direct Currency Pair MRM, THR
const usdEurMrmThrIndirectTrueInvertedTrueRate: ExchangeRate = {
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
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmThrIndirectTrueInvertedFalseRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmThrIndirectFalseInvertedTrueRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmThrIndirectFalseInvertedFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdEurMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_20,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

// Inverted Currency Pair MRM, THR
const eurUsdMrmThrIndirectTrueInvertedTrueRate: ExchangeRate = {
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
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmThrIndirectTrueInvertedFalseRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmThrIndirectFalseInvertedTrueRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmThrIndirectFalseInvertedFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 100
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: B
  },
  value: S_30,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmThrNewRateType: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: ABC
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: EUR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

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
    const exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail> = new Map();
    exchangeRateTypeDetailMap.set(B, buildExchangeRateTypeDetail(null as any, false));
    exchangeRateTypeDetailMap.set(M, buildExchangeRateTypeDetail(null as any, true));
    return Promise.resolve(exchangeRateTypeDetailMap);
  };
  return adapter;
}

describe('Non Fixed Rate -- Inverted Rate conversion override tenant settings', () => {
  it('Inverted Single Conversion With Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectFalseInvertedTrueRate,
      S_1,
      S_1
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      usdEurMConversionParam,
      buildAdapter([eurUsdMrmThrIndirectFalseInvertedTrueRate, eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Single Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmThrIndirectFalseInvertedTrueRate,
      S_10000,
      S_10000
    );
    const result: SingleNonFixedRateConversionResult = await currencyConverter.convertCurrencyWithNonFixedRate(
      usdEurMConversionParam,
      buildAdapter([
        eurUsdMrmThrIndirectFalseInvertedTrueRate,
        usdEurMrmThrIndirectFalseInvertedTrueRate,
        eurUsdMrmEcbIndirectFalseInvertedTrueRate,
        usdEurMrmEcbIndirectFalseInvertedTrueRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectFalseInvertedTrueRate,
      S_1,
      S_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([eurUsdMrmThrIndirectFalseInvertedTrueRate, eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Inverted Bulk Conversion With Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmThrIndirectFalseInvertedTrueRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([
        eurUsdMrmThrIndirectFalseInvertedTrueRate,
        usdEurMrmThrIndirectFalseInvertedTrueRate,
        eurUsdMrmEcbIndirectFalseInvertedTrueRate,
        usdEurMrmEcbIndirectFalseInvertedTrueRate
      ]),
      TENANT_ID,
      overrideTenantSettings
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
      buildAdapter([eurUsdMrmThrIndirectFalseInvertedTrueRate, eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurBConversionParamPastDate)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(usdEurBConversionParamPastDate) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Inverted Conversion With New Exchange Rate Type', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrNewRateType,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [eurUsdMrmEcbABCConversionParam],
      buildAdapter([eurUsdMrmThrNewRateType, eurUsdMrmEcbNewRateType]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(eurUsdMrmEcbABCConversionParam)).toBeTruthy();
    expect(result.get(eurUsdMrmEcbABCConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectTrueInvertedTrueRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([eurUsdMrmThrIndirectTrueInvertedTrueRate, eurUsdMrmEcbIndirectTrueInvertedTrueRate]),
      TENANT_ID,
      overrideTenantSettings
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
      buildAdapter([eurUsdMrmThrIndirectTrueInvertedFalseRate, eurUsdMrmEcbIndirectTrueInvertedFalseRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect False Inverted True Inverted Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectFalseInvertedTrueRate,
      S_1,
      S_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([eurUsdMrmThrIndirectFalseInvertedTrueRate, eurUsdMrmEcbIndirectFalseInvertedTrueRate]),
      TENANT_ID,
      overrideTenantSettings
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
      buildAdapter([eurUsdMrmThrIndirectFalseInvertedFalseRate, eurUsdMrmEcbIndirectFalseInvertedFalseRate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect True Inverted True Inverted Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
      S_300,
      S_300
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([
        eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Inverted Currency Pair Factor More Than One Rate', async () => {
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([
        eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect False Inverted True Inverted Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
      S_0_333333333333,
      S_0_33
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([
        eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
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
      buildAdapter([
        eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurBConversionParam)).toBeInstanceOf(CurrencyConversionError);
    expect((result.get(usdEurBConversionParam) as CurrencyConversionError).message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Conversion For Indirect True Inverted True Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmThrIndirectTrueInvertedTrueRate,
      S_1,
      S_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([
        usdEurMrmThrIndirectTrueInvertedTrueRate,
        eurUsdMrmThrIndirectTrueInvertedTrueRate,
        usdEurMrmEcbIndirectTrueInvertedTrueRate,
        eurUsdMrmEcbIndirectTrueInvertedTrueRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmThrIndirectTrueInvertedFalseRate,
      S_1,
      S_1
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([
        usdEurMrmThrIndirectTrueInvertedFalseRate,
        eurUsdMrmThrIndirectTrueInvertedFalseRate,
        usdEurMrmEcbIndirectTrueInvertedFalseRate,
        eurUsdMrmEcbIndirectTrueInvertedFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurBConversionParam)).toBeTruthy();
    expect(result.get(usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmThrIndirectFalseInvertedTrueRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([
        usdEurMrmThrIndirectFalseInvertedTrueRate,
        eurUsdMrmThrIndirectFalseInvertedTrueRate,
        usdEurMrmEcbIndirectFalseInvertedTrueRate,
        eurUsdMrmEcbIndirectFalseInvertedTrueRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Direct Currency Pair', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmThrIndirectFalseInvertedFalseRate,
      S_10000,
      S_10000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([
        usdEurMrmThrIndirectFalseInvertedFalseRate,
        eurUsdMrmThrIndirectFalseInvertedFalseRate,
        usdEurMrmEcbIndirectFalseInvertedFalseRate,
        eurUsdMrmEcbIndirectFalseInvertedFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurBConversionParam)).toBeTruthy();
    expect(result.get(usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
      S_50,
      S_50
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([
        usdEurMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
        eurUsdMrmThrIndirectTrueInvertedTrueFactorMoreThanOneRate,
        usdEurMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectTrueInvertedTrueFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect True Inverted False Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate,
      S_50,
      S_50
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([
        usdEurMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate,
        eurUsdMrmThrIndirectTrueInvertedFalseFactorMoreThanOneRate,
        usdEurMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectTrueInvertedFalseFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurBConversionParam)).toBeTruthy();
    expect(result.get(usdEurBConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted True Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
      S_20000,
      S_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurMConversionParam],
      buildAdapter([
        usdEurMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
        eurUsdMrmThrIndirectFalseInvertedTrueFactorMoreThanOneRate,
        usdEurMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectFalseInvertedTrueFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurMConversionParam)).toBeTruthy();
    expect(result.get(usdEurMConversionParam)).toEqual(expectedConversionResult);
  });

  it('Conversion For Indirect False Inverted False Direct Currency Pair Factor More Than One Rate', async () => {
    const expectedConversionResult: SingleNonFixedRateConversionResult = new SingleNonFixedRateConversionResult(
      usdEurMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate,
      S_20000,
      S_20000
    );
    const result: BulkConversionResult<
      ConversionParameterForNonFixedRate,
      SingleNonFixedRateConversionResult
    > = await currencyConverter.convertCurrenciesWithNonFixedRate(
      [usdEurBConversionParam],
      buildAdapter([
        usdEurMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate,
        eurUsdMrmThrIndirectFalseInvertedFalseFactorMoreThanOneRate,
        usdEurMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate,
        eurUsdMrmEcbIndirectFalseInvertedFalseFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result.get(usdEurBConversionParam)).toBeTruthy();
    expect(result.get(usdEurBConversionParam)).toEqual(expectedConversionResult);
  });
});
