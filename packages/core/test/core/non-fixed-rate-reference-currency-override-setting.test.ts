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
  buildExchangeRateTypeDetail,
  setDefaultSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { CurrencyConverter } from '../../src/core/currency-converter';

const TENANT_ID: Tenant = { id: 'TenantID' };

const MRM = 'MRM';
const ECB = 'ECB';
const THR = 'THR';

const A = 'A';
const LAST = 'LAST';
const ASK = 'ASK';

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');

const S_2: Value = new Value('2');
const S_5: Value = new Value('5');
const S_10: Value = new Value('10');

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_02_01T02_30_00Z: Date = new Date('2020-02-01T02:30:00Z');
const S_2020_03_01T02_30_00Z: Date = new Date('2020-03-01T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

const defaultTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: ECB
};
const overrideTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: THR
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
const eurInrMrmEcbARate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmEcbARate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdInrMrmEcbLastRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: LAST
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurUsdMrmEcbIndirectTrueRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_2,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmEcbADuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurInrMrmEcbIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmEcbIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdInrMrmEcbIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmEcbIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurInrMrmEcbIndirectTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmEcbIndirectFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdInrMrmEcbIndirectTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmEcbIndirectFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmEcbADuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurUsdMrmEcbIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_2,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmEcbDuplicateDateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmEcbAskRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: ASK
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurInrMrmEcbLastRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: LAST
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmEcbAskRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: ASK
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

/* MRM THR */

const usdInrMrmThrAskRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: ASK
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurInrMrmThrAskRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: ASK
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmThrLastRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: LAST
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurInrMrmThrLastRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: LAST
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurUsdMrmThrIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_2,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmThrIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_2,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurInrMrmThrARate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmThrARate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmThrADuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmThrADuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmThrDuplicateDateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmThrIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurInrMrmThrIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurInrMrmThrIndirectTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const eurInrMrmThrIndirectFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 5,
    toCurrencyfactor: 10
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmThrIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdInrMrmThrIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdInrMrmThrIndirectTrueFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdInrMrmThrIndirectFalseFactorMoreThanOneRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: USD,
  toCurrency: INR,
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
      buildAdapter([eurInrMrmThrARate, usdInrMrmThrARate, eurInrMrmEcbARate, usdInrMrmEcbARate]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.data.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Bulk Conversion With Reference Currency.', async () => {
    const result: SingleNonFixedRateConversionResult = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(eurUsdAConversionParam),
        buildAdapter([eurInrMrmThrARate, usdInrMrmThrARate, eurInrMrmEcbARate, usdInrMrmEcbARate]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(eurUsdAConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.data.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Conversion Reference Currency And Inversion Null', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAskConversionParam,
        buildAdapter([eurInrMrmThrAskRate, usdInrMrmThrAskRate, eurInrMrmEcbAskRate, usdInrMrmEcbAskRate]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Exchange Rate Record Having Future Date', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParamPastDate,
        buildAdapter([usdInrMrmThrARate, eurInrMrmThrARate, usdInrMrmEcbARate, eurInrMrmEcbARate]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Conversion With Non-Existing Reference Currency', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdLastConversionParam,
        buildAdapter([usdInrMrmThrLastRate, eurInrMrmThrLastRate, usdInrMrmEcbLastRate, eurInrMrmEcbLastRate]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Non-Existing RateType', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdNewConversionParam,
        buildAdapter([usdInrMrmEcbLastRate, eurInrMrmEcbLastRate, usdInrMrmThrLastRate, eurInrMrmThrLastRate]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency With Direct Rate No From Reference Pair', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        usdInrMrmThrARate,
        eurUsdMrmThrIndirectTrueRate,
        eurUsdMrmThrIndirectFalseRate,
        usdInrMrmEcbARate,
        eurUsdMrmEcbIndirectTrueRate,
        eurUsdMrmEcbIndirectFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmThrIndirectFalseRate);
  });

  it('Test Reference Currency With Direct Rate No To Reference Pair', async () => {
    const result = (
      await currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(eurUsdAConversionParam),
        buildAdapter([
          eurInrMrmThrARate,
          eurUsdMrmThrIndirectTrueRate,
          eurUsdMrmThrIndirectFalseRate,
          eurInrMrmEcbARate,
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).get(eurUsdAConversionParam) as SingleNonFixedRateConversionResult;
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmThrIndirectFalseRate);
  });

  it('Test Reference Currency With Direct Rate No From And To Reference Pair', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurUsdMrmThrIndirectTrueRate,
        eurUsdMrmThrIndirectFalseRate,
        eurUsdMrmEcbIndirectTrueRate,
        eurUsdMrmEcbIndirectFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate).toMatchObject(eurUsdMrmThrIndirectFalseRate);
  });

  it('Test Reference Currency Duplicate From Reference Pair', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParam,
        buildAdapter([
          eurUsdMrmThrIndirectTrueRate,
          eurUsdMrmThrIndirectFalseRate,
          eurInrMrmThrARate,
          usdInrMrmThrARate,
          eurInrMrmThrADuplicateRate,
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate,
          eurInrMrmEcbARate,
          usdInrMrmEcbARate,
          eurInrMrmEcbADuplicateRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency Duplicate To Reference Pair', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParam,
        buildAdapter([
          eurUsdMrmThrIndirectTrueRate,
          eurUsdMrmThrIndirectFalseRate,
          eurInrMrmThrARate,
          usdInrMrmThrARate,
          usdInrMrmThrDuplicateDateRate,
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate,
          eurInrMrmEcbARate,
          usdInrMrmEcbARate,
          usdInrMrmEcbDuplicateDateRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency Duplicate From And To Reference Pair.', async () => {
    await expect(
      currencyConverter.convertCurrencyWithNonFixedRate(
        eurUsdAConversionParam,
        buildAdapter([
          eurUsdMrmThrIndirectTrueRate,
          eurUsdMrmThrIndirectFalseRate,
          eurInrMrmThrARate,
          usdInrMrmThrARate,
          eurInrMrmThrADuplicateRate,
          usdInrMrmThrADuplicateRate,
          eurUsdMrmEcbIndirectTrueRate,
          eurUsdMrmEcbIndirectFalseRate,
          eurInrMrmEcbARate,
          usdInrMrmEcbARate,
          eurInrMrmEcbADuplicateRate,
          usdInrMrmEcbADuplicateRate
        ]),
        TENANT_ID,
        overrideTenantSettings
      )
    ).rejects.toThrowError(CurrencyConversionError);
  });

  it('Test Reference Currency From Indirect To Indirect', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectTrueRate,
        usdInrMrmThrIndirectTrueRate,
        eurInrMrmEcbIndirectTrueRate,
        usdInrMrmEcbIndirectTrueRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate.data.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.data.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.data.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Direct', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectTrueRate,
        usdInrMrmThrIndirectFalseRate,
        eurInrMrmEcbIndirectTrueRate,
        usdInrMrmEcbIndirectFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('2');
    expect(result.roundedOffConvertedAmount.valueString).toBe('2');
    expect(result.exchangeRate.data.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.data.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.data.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Indirect', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectFalseRate,
        usdInrMrmThrIndirectTrueRate,
        eurInrMrmEcbIndirectFalseRate,
        usdInrMrmEcbIndirectTrueRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('5000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('5000');
    expect(result.exchangeRate.data.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.data.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.data.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Direct', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectFalseRate,
        usdInrMrmThrIndirectFalseRate,
        eurInrMrmEcbIndirectFalseRate,
        usdInrMrmEcbIndirectFalseRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('50');
    expect(result.roundedOffConvertedAmount.valueString).toBe('50');
    expect(result.exchangeRate.data.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.data.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.data.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Indirect Factor More Than One', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectTrueFactorMoreThanOneRate,
        usdInrMrmThrIndirectTrueFactorMoreThanOneRate,
        eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
        usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('800');
    expect(result.roundedOffConvertedAmount.valueString).toBe('800');
    expect(result.exchangeRate.data.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.data.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.data.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Indirect To Direct Factor More Than One', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectTrueFactorMoreThanOneRate,
        usdInrMrmThrIndirectFalseFactorMoreThanOneRate,
        eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
        usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('8');
    expect(result.roundedOffConvertedAmount.valueString).toBe('8');
    expect(result.exchangeRate.data.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.data.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.data.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Indirect Factor More Than One.', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectFalseFactorMoreThanOneRate,
        usdInrMrmThrIndirectTrueFactorMoreThanOneRate,
        eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
        usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('20000');
    expect(result.roundedOffConvertedAmount.valueString).toBe('20000');
    expect(result.exchangeRate.data.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.data.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.data.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });

  it('Test Reference Currency From Direct To Direct Factor More Than One.', async () => {
    const result = await currencyConverter.convertCurrencyWithNonFixedRate(
      eurUsdAConversionParam,
      buildAdapter([
        eurInrMrmThrIndirectFalseFactorMoreThanOneRate,
        usdInrMrmThrIndirectFalseFactorMoreThanOneRate,
        eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
        usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
      ]),
      TENANT_ID,
      overrideTenantSettings
    );
    expect(result).toBeTruthy();
    expect(result.convertedAmount.valueString).toBe('200');
    expect(result.roundedOffConvertedAmount.valueString).toBe('200');
    expect(result.exchangeRate.data.ratesDataProviderCode).toBe('MRM');
    expect(result.exchangeRate.data.ratesDataSource).toBe('THR');
    expect(result.exchangeRate.data.exchangeRateType).toBe(A);
    expect(result.exchangeRate.fromCurrency.currencyCode).toBe('EUR');
    expect(result.exchangeRate.toCurrency.currencyCode).toBe('USD');
  });
});
