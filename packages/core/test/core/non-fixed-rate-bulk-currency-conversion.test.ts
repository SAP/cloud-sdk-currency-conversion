/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  buildCurrency,
  Currency,
  CurrencyConversionError,
  DataAdapter,
  ExchangeRate,
  Value,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  ExchangeRateTypeDetail,
  ConversionParameterForNonFixedRate,
  buildConversionParameterForNonFixedRate,
  setDefaultSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { ConversionError } from '../../src/constants/conversion-error';
import { CurrencyConverter } from '../../src/core/currency-converter';

const TENANT_ID: Tenant = { id: 'TenantID' };
const TENANT_ID1: Tenant = { id: 'tenantId1' };

const MRM = 'MRM';
const ECB = 'ECB';
const THR = 'THR';

const B = 'B';
const M = 'M';
const ASK = 'ASK';

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');
const BHD: Currency = buildCurrency('BHD');
const CLF: Currency = buildCurrency('CLF');

const S_100: Value = new Value('100');
const S_123_123: Value = new Value('123.123');
const S_0_300623: Value = new Value('0.300623');

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_01_16T02_30_00Z: Date = new Date('2020-01-16T02:30:00Z');
const S_2019_09_16T02_30_00Z: Date = new Date('2019-09-16T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

const defaultTenantSettings: TenantSettings = {
  ratesDataProviderCode: MRM,
  ratesDataSource: ECB
};

const inrEurMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_2019_09_16T02_30_00Z
);
const eurInrDecimalValueConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'INR',
  '120.4576776757575757567',
  B,
  S_2020_01_01T02_30_00Z
);
const usdBhdMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'BHD',
  '100.12122',
  M,
  S_2020_01_01T02_30_00Z
);
const usdClfMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'CLF',
  '100.111231',
  M,
  S_2020_01_01T02_30_00Z
);
const inrBhdMFiveParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'BHD',
  '20.1',
  M,
  S_2020_01_01T02_30_00Z
);
const inrBhdMMoreThanFiveParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'BHD',
  '8499999.99990',
  M,
  S_2020_01_01T02_30_00Z
);

const inrEurMConversionParamPastDate: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_1990_03_01T02_30_00Z
);

/* Exchange Rate starts*/

/* MRM, THR */

const eurInrMrmThrMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const usdEurMrmThrMRate: ExchangeRate = {
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
  validFromDateTime: S_2019_09_16T02_30_00Z
};

/* MRM ECB */
const eurInrMrmEcbDirectConversionDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: B
  },
  value: S_123_123,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const inrEurMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const eurInrMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_01_16T02_30_00Z
};

const eurInrMrmEcbIndirectConversionRate: ExchangeRate = {
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
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmEcbAskRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: ASK
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const inrEurMrmEcbMDiffrentTenantRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID1),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const eurInrMrmEcbAskIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: ASK
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdBhdMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: BHD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdClfMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: USD,
  toCurrency: CLF,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const inrBhdMrmEcbMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_0_300623,
  fromCurrency: INR,
  toCurrency: BHD,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const inrEurMrmEcbMDuplicateRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const eurInrMrmEcbMDuplicateRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 10,
    toCurrencyfactor: 5
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

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
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

function buildAdapterThrowsExcpetion(exchangeRates: ExchangeRate[]): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => {
    throw new CurrencyConversionError('Data Adapter Exceptions.');
    Promise.resolve(exchangeRates);
  };

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> =>
    Promise.resolve(defaultTenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

function buildAdapterWithNullExchangeRates(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve(null as any);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> =>
    Promise.resolve(defaultTenantSettings);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

function buildAdapterWithNullExchangeRatesAndDefaultTenantSettings(): DataAdapter {
  const adapter: DataAdapter = {} as DataAdapter;

  adapter.getExchangeRatesForTenant = (
    params: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> => Promise.resolve(null as any);

  adapter.getDefaultSettingsForTenant = (tenant: Tenant): Promise<TenantSettings> => Promise.resolve(null as any);

  adapter.getExchangeRateTypeDetailsForTenant = (
    tenant: Tenant,
    rateTypeSet: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> => Promise.resolve(new Map());
  return adapter;
}

describe('Non Fixed Rate -- Bulk Currency Conversion Tests.', () => {
  it('Test Direct Conversion Decimal Value.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
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
      (result.get(eurInrDecimalValueConversionParam) as SingleNonFixedRateConversionResult).convertedAmount.valueString
    ).toBe('14831.1106484722999998921741');
    expect(
      (result.get(eurInrDecimalValueConversionParam) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount
        .valueString
    ).toBe('14831.11');
    expect(
      (result.get(eurInrDecimalValueConversionParam) as SingleNonFixedRateConversionResult).exchangeRate.data
        .ratesDataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion Exponent Three.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(usdBhdMConversionParam),
      buildAdapter([usdBhdMrmEcbMRate]),
      TENANT_ID
    );
    expect(result.get(usdBhdMConversionParam) as SingleNonFixedRateConversionResult).toBeTruthy();
    expect(
      (result.get(
        usdBhdMConversionParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(3);
    expect(
      (result.get(usdBhdMConversionParam) as SingleNonFixedRateConversionResult).exchangeRate.data.ratesDataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Off Value Exponent Four.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(usdClfMConversionParam),
      buildAdapter([usdClfMrmEcbMRate]),
      TENANT_ID
    );
    expect(result.get(usdClfMConversionParam) as SingleNonFixedRateConversionResult).toBeTruthy();
    expect(
      (result.get(
        usdClfMConversionParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(4);
    expect(
      (result.get(usdClfMConversionParam) as SingleNonFixedRateConversionResult).exchangeRate.data.ratesDataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion Rounded Halfup Last Digit Five.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(inrBhdMFiveParam),
      buildAdapter([inrBhdMrmEcbMRate]),
      TENANT_ID
    );
    expect(result.get(inrBhdMFiveParam) as SingleNonFixedRateConversionResult).toBeTruthy();
    expect((result.get(inrBhdMFiveParam) as SingleNonFixedRateConversionResult).convertedAmount.valueString).toEqual(
      '6.0425223'
    );
    expect(
      (result.get(inrBhdMFiveParam) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.valueString
    ).toEqual('6.043');
    expect(
      (result.get(inrBhdMFiveParam) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(inrBhdMFiveParam.toCurrency.defaultFractionDigits);
    expect((result.get(inrBhdMFiveParam) as SingleNonFixedRateConversionResult).exchangeRate.data.ratesDataSource).toBe(
      'ECB'
    );
  });

  it('Test Direct Conversion Rounded Halfup Last Digit More Than Five.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
      Array.of(inrBhdMMoreThanFiveParam),
      buildAdapter([inrBhdMrmEcbMRate]),
      TENANT_ID
    );
    expect(result.get(inrBhdMMoreThanFiveParam) as SingleNonFixedRateConversionResult).toBeTruthy();
    expect(
      (result.get(inrBhdMMoreThanFiveParam) as SingleNonFixedRateConversionResult).convertedAmount.valueString
    ).toEqual('2555295.4999699377');
    expect(
      (result.get(inrBhdMMoreThanFiveParam) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.valueString
    ).toEqual('2555295.5');
    expect(
      (result.get(
        inrBhdMMoreThanFiveParam
      ) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toEqual(1);
    expect(
      (result.get(inrBhdMMoreThanFiveParam) as SingleNonFixedRateConversionResult).exchangeRate.data.ratesDataSource
    ).toBe('ECB');
  });

  it('Test Direct Conversion With Empty Exchange RateType Details.', async () => {
    const result = await currencyConverter.convertCurrenciesWithNonFixedRate(
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
    expect(result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult).toBeTruthy();
    expect(
      (result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult).exchangeRate.fromCurrency.currencyCode
    ).toEqual(inrEurMrmEcbMRate.fromCurrency.currencyCode);
    expect(
      (result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult).exchangeRate.toCurrency.currencyCode
    ).toEqual(inrEurMrmEcbMRate.toCurrency.currencyCode);
    expect((result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult).convertedAmount.valueString).toBe(
      '10000'
    );
    expect(
      (result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult).roundedOffConvertedAmount.valueString
    ).toBe('10000');
    expect(
      (result.get(inrEurMConversionParam) as SingleNonFixedRateConversionResult).exchangeRate.data.ratesDataSource
    ).toBe('ECB');
  });
  // Non Fixed Rate -- Single Currency Conversoin Tests Negative.
  it('Test Bulk Conversion With Exchange Rate Record Having Future Date', async () => {
    expect(
      (
        await currencyConverter.convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParamPastDate),
          buildAdapter([eurInrMrmThrMRate, inrEurMrmEcbMRate, eurInrMrmEcbMRate]),
          TENANT_ID
        )
      ).get(inrEurMConversionParamPastDate)
    ).toBeTruthy();

    expect(
      (
        await currencyConverter.convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParamPastDate),
          buildAdapter([eurInrMrmThrMRate, inrEurMrmEcbMRate, eurInrMrmEcbMRate]),
          TENANT_ID
        )
      ).get(inrEurMConversionParamPastDate)
    ).toBeInstanceOf(CurrencyConversionError);
  });

  it('Test Bulk Conversion With Null Conversion Params', async () => {
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(
        null as any,
        buildAdapter([eurInrMrmThrMRate, inrEurMrmEcbMRate, eurInrMrmEcbMRate]),
        TENANT_ID
      )
    ).rejects.toThrow(ConversionError.INVALID_PARAMS);
  });

  it('Test Bulk Conversion With Empty Exchange Rates.', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParamPastDate),
        buildAdapter(temp),
        TENANT_ID
      )
    ).rejects.toThrow(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });
  it('Test Bulk Conversion With ExchangeRates Throws DataAdapterException.', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParamPastDate),
        buildAdapterThrowsExcpetion(temp),
        TENANT_ID
      )
    ).rejects.toThrow('Data Adapter Exceptions.');
  });
  it('Test Bulk Conversion With Duplicate Exchange Rate Same TimeStamp', async () => {
    expect(
      (
        await currencyConverter.convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParam),
          buildAdapter([inrEurMrmEcbMDuplicateRate, inrEurMrmEcbMRate]),
          TENANT_ID
        )
      ).get(inrEurMConversionParam)
    ).toBeInstanceOf(CurrencyConversionError);
  });
  it('Test Bulk Conversion With Duplicate Record.', async () => {
    expect(
      (
        await currencyConverter.convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParam),
          buildAdapter([inrEurMrmEcbMDuplicateRate, inrEurMrmEcbMRate]),
          TENANT_ID
        )
      ).get(inrEurMConversionParam)
    ).toBeInstanceOf(CurrencyConversionError);
  });
  it('Test bulk Conversion With No Record Found', async () => {
    expect(
      (
        await currencyConverter.convertCurrenciesWithNonFixedRate(
          Array.of(inrEurMConversionParam),
          buildAdapter([eurInrMrmThrMRate, eurInrMrmEcbMDuplicateRate]),
          TENANT_ID
        )
      ).get(inrEurMConversionParam)
    ).toBeInstanceOf(CurrencyConversionError);
  });
  it('Test bulk Conversion With Data Adapter Null', async () => {
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(Array.of(inrEurMConversionParam), null as any, TENANT_ID)
    ).rejects.toThrow(ConversionError.NULL_ADAPTER_TENANT);
  });
  it('Test bulk Conversion With Exchange Rates Null', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithNullExchangeRates(),
        TENANT_ID
      )
    ).rejects.toThrow(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });
  it('Test Bulk Conversion With Exchange Rates And Default TS Null', async () => {
    const temp: ExchangeRate[] = new Array();
    await expect(
      currencyConverter.convertCurrenciesWithNonFixedRate(
        Array.of(inrEurMConversionParam),
        buildAdapterWithNullExchangeRatesAndDefaultTenantSettings(),
        TENANT_ID
      )
    ).rejects.toThrow(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  });
});
