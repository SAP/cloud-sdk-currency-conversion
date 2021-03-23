/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  buildCurrency,
  ConversionParameterForNonFixedRate,
  ExchangeRateTypeDetail,
  ExchangeRate,
  Value,
  Currency,
  TenantSettings,
  buildConversionParameterForNonFixedRate,
  buildExchangeRateTypeDetail,
  setDefaultSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { ExchangeRateRecordDeterminer } from '../../src/core/exchange-rate-record-determiner';
import { ConversionError } from '../../src/constants/conversion-error';

const TENANT_ID: Tenant = { id: 'TenantID' };
const TENANT_ID1: Tenant = { id: 'tenantId1' };

const MRM = 'MRM';
const ECB = 'ECB';
const THR = 'THR';

const A = 'A';
const M = 'M';
const ASK = 'ASK';
const LAST = 'LAST';

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');

const S_0: Value = new Value('0');
const S_0_5: Value = new Value('0.5');
const S_1: Value = new Value('1');
const S_2: Value = new Value('2');
const S_3: Value = new Value('3');
const S_50: Value = new Value('50');
const S_5: Value = new Value('5');
const S_8: Value = new Value('8');
const S_10: Value = new Value('10');
const S_0_02: Value = new Value('0.02');
const S_0_08: Value = new Value('0.08');
const S_7_00000001: Value = new Value('7.00000001');
const S_21_00000001: Value = new Value('21.00000001');
const S_100: Value = new Value('100');
const S_200: Value = new Value('200');
const S_7_0: Value = new Value('7.0');
const S_21_0: Value = new Value('21.0');
const S_0_33333333333333: Value = new Value('0.33333333333333');

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_02_01T02_30_00Z: Date = new Date('2020-02-01T02:30:00Z');
const S_2020_01_16T02_30_00Z: Date = new Date('2020-01-16T02:30:00Z');
const S_2019_09_16T02_30_00Z: Date = new Date('2019-09-16T02:30:00Z');
const S_2020_03_01T02_30_00Z: Date = new Date('2020-03-01T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

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
const eurInrMConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'INR',
  '10',
  M,
  S_2020_01_01T02_30_00Z
);
const eurInrInvalidCurrPairConversionParam = buildConversionParameterForNonFixedRate(
  'AUD',
  'BSD',
  '100',
  M,
  S_2020_01_01T02_30_00Z
);
const inrEurAskConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'EUR',
  '100',
  ASK,
  S_2020_01_01T02_30_00Z
);
const usdEurAskConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'USD',
  'EUR',
  '100',
  ASK,
  S_2020_01_01T02_30_00Z
);
const eurUsdAConversionParam: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '100',
  A,
  S_2020_03_01T02_30_00Z
);
const inrEurMConversionParamPastDate: ConversionParameterForNonFixedRate = buildConversionParameterForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_1990_03_01T02_30_00Z
);

//

/* Exchange Rate starts*/

const inrEurMrmThrMRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

const inrEurMrmThrMDuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
};

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
  validFromDateTime: S_2020_01_16T02_30_00Z
};

const eurInrMrmThrMDuplicateRate: ExchangeRate = {
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

const eurInrMrmThrAskIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: ASK
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmThrAskIndirectFalseRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: ASK
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const inrEurMrmThrMDiffrentTenantRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID1),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: INR,
  toCurrency: EUR,
  validFromDateTime: S_2019_09_16T02_30_00Z
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

const eurInrMrmThrADateBeforeRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2019_09_16T02_30_00Z
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

const eurInrMrmThrZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmThrZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmThrZeroFactor: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmThrZeroFactor: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
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

const eurInrMrmThrZeroFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmThrZeroFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurUsdMrmThrMRate: ExchangeRate = {
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

const usdEurMrmThrMRate: ExchangeRate = {
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

const eurInrMrmThrIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_3,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmThrIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_3,
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

const eurInrMrmEcbADateBeforeRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_5,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2019_09_16T02_30_00Z
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

const inrEurMrmEcbMDuplicateRate: ExchangeRate = {
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
    exchangeRateType: M
  },
  value: S_100,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_01_16T02_30_00Z
};

const eurInrMrmEcbIndirectFalseRate: ExchangeRate = {
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

const eurInrMrmEcbMDuplicateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
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

const eurInrMrmEcbAskIndirectTrueRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: true,
    fromCurrencyfactor: 1,
    toCurrencyfactor: 1
  },
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

const eurUsdMrmEcbMRate: ExchangeRate = {
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

const usdEurMrmEcbMRate: ExchangeRate = {
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

const eurUsdMrmEcbIndirectTrueRate: ExchangeRate = {
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
  value: S_2,
  fromCurrency: EUR,
  toCurrency: USD,
  validFromDateTime: S_2020_01_01T02_30_00Z
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

const usdInrMrmEcbDuplicateDateRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmEcbIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_3,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmEcbIndirectFalseRateInfiniteDecimal: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_3,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmEcbZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmEcbZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmEcbZeroFactor: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_10,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmEcbZeroFactor: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
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

const eurInrMrmEcbZeroFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const usdInrMrmEcbZeroFactorRate: ExchangeRate = {
  settings: {
    tenantIdentifier: TENANT_ID,
    isIndirect: false,
    fromCurrencyfactor: 0,
    toCurrencyfactor: 0
  },
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmEcbScaleMoreThanZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_7_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmEcbScaleMoreThanZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_21_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmThrScaleMoreThanZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_7_0,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmThrScaleMoreThanZeroRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_21_0,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmEcbScaleMoreThanDefaultRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_7_00000001,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmEcbScaleMoreThanDefaultRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: ECB,
    exchangeRateType: A
  },
  value: S_21_00000001,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

const eurInrMrmThrScaleMoreThanDefaultRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_7_00000001,
  fromCurrency: EUR,
  toCurrency: INR,
  validFromDateTime: S_2020_02_01T02_30_00Z
};

const usdInrMrmThrScaleMoreThanDefaultRate: ExchangeRate = {
  settings: setDefaultSettings(TENANT_ID),
  data: {
    ratesDataProviderCode: MRM,
    ratesDataSource: THR,
    exchangeRateType: A
  },
  value: S_21_00000001,
  fromCurrency: USD,
  toCurrency: INR,
  validFromDateTime: S_2020_01_01T02_30_00Z
};

/* Exchange Rate ends*/

function instantiateExchangeRateRecordDeterminer(exchangeRateResultSet: ExchangeRate[]): ExchangeRateRecordDeterminer {
  return new ExchangeRateRecordDeterminer(
    TENANT_ID,
    overrideTenantSettings,
    exchangeRateResultSet,
    getExchangeRateTypeDetailsForTenant()
  );
}

function getExchangeRateTypeDetailsForTenant(): Map<string, ExchangeRateTypeDetail> {
  const exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail> = new Map();
  exchangeRateTypeDetailMap.set(A, buildExchangeRateTypeDetail(INR, true));
  exchangeRateTypeDetailMap.set(M, buildExchangeRateTypeDetail(null as any, true));
  exchangeRateTypeDetailMap.set(ASK, buildExchangeRateTypeDetail(null as any, true));
  return exchangeRateTypeDetailMap;
}

describe('Exchange Rate Record Determiner Override Tenant Setting', () => {
  it('Get best matched exchange rate record', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmThrMRate,
      eurInrMrmThrMRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbMRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      inrEurMConversionParam
    );
    expect(inrEurMrmThrMRate).toEqual(actualExchangeRateRecord);
  });

  it('Conversion with exchange rate record having future date', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmEcbMRate,
      eurInrMrmEcbMRate,
      eurInrMrmEcbARate,
      inrEurMrmThrMRate,
      eurInrMrmThrMRate,
      eurInrMrmThrARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        inrEurMConversionParamPastDate
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('exchange rate record with different data providers', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrMRate,
      eurInrMrmThrMDuplicateRate,
      eurInrMrmThrAskIndirectTrueRate,
      eurInrMrmThrAskIndirectTrueRate,
      eurInrMrmEcbMDuplicateRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurInrMConversionParam
    );
    expect(eurInrMrmThrMDuplicateRate).toEqual(actualExchangeRateRecord);
  });

  it('Duplicate exchange rate record', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmThrMDuplicateRate,
      inrEurMrmThrMRate,
      eurInrMrmThrAskIndirectFalseRate,
      eurInrMrmThrAskIndirectTrueRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        inrEurMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('No exchange rate record for currency pair AUD-BSD', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrMRate,
      inrEurMrmThrMRate,
      inrEurMrmThrMDuplicateRate,
      inrEurMrmThrMRate,
      eurInrMrmThrAskIndirectFalseRate,
      eurInrMrmThrAskIndirectTrueRate,
      eurInrMrmEcbMRate,
      inrEurMrmEcbMRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurInrInvalidCurrPairConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('No exchange rate record for different tenant', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrMRate,
      inrEurMrmThrMRate,
      inrEurMrmThrMDuplicateRate,
      inrEurMrmThrMRate,
      eurInrMrmThrAskIndirectFalseRate,
      eurInrMrmThrAskIndirectTrueRate,
      eurInrMrmEcbMRate,
      inrEurMrmEcbMRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      TENANT_ID1,
      overrideTenantSettings,
      exchangeRateResultSet,
      getExchangeRateTypeDetailsForTenant()
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        inrEurMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Single exchange rate record for different tenant', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmThrMDiffrentTenantRate,
      eurInrMrmThrMRate,
      inrEurMrmThrMRate,
      inrEurMrmThrMDuplicateRate,
      inrEurMrmThrMRate,
      eurInrMrmThrAskIndirectFalseRate,
      eurInrMrmThrAskIndirectTrueRate,
      inrEurMrmEcbMDiffrentTenantRate,
      eurInrMrmEcbMRate,
      inrEurMrmEcbMRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      TENANT_ID1,
      overrideTenantSettings,
      exchangeRateResultSet,
      getExchangeRateTypeDetailsForTenant()
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      inrEurMConversionParam
    );
    expect(inrEurMrmThrMDiffrentTenantRate).toEqual(actualExchangeRateRecord);
  });

  /* INVERTED RATE TEST CASE STARTS */

  it('Inverted exchange rate record indirect true', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmThrMDuplicateRate,
      inrEurMrmThrMRate,
      eurInrMrmThrAskIndirectFalseRate,
      eurInrMrmThrAskIndirectTrueRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        inrEurAskConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('Inverted conversion exchange rate record with exchange rate type detail null', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmThrMRate,
      usdEurMrmThrMRate,
      eurUsdMrmEcbMRate,
      usdEurMrmEcbMRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      TENANT_ID,
      overrideTenantSettings,
      exchangeRateResultSet,
      null as any
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        usdEurAskConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  /* INVERTED RATE TEST CASE ENDS */

  /* REFERENCE CURRENCY STARTS */

  it('Reference Currency as INR', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrARate,
      usdInrMrmThrARate,
      eurInrMrmEcbARate,
      usdInrMrmEcbARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
      data: {
        ratesDataProviderCode: MRM,
        ratesDataSource: THR,
        exchangeRateType: A
      },
      value: S_0_5,
      fromCurrency: EUR,
      toCurrency: USD,
      validFromDateTime: S_2020_01_01T02_30_00Z
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR scale more than zero rate', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbScaleMoreThanZeroRate,
      usdInrMrmEcbScaleMoreThanZeroRate,
      eurInrMrmThrScaleMoreThanZeroRate,
      usdInrMrmThrScaleMoreThanZeroRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
      data: {
        ratesDataProviderCode: MRM,
        ratesDataSource: THR,
        exchangeRateType: A
      },
      value: S_0_33333333333333,
      fromCurrency: EUR,
      toCurrency: USD,
      validFromDateTime: S_2020_01_01T02_30_00Z
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR scale more than default', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbScaleMoreThanDefaultRate,
      usdInrMrmEcbScaleMoreThanDefaultRate,
      eurInrMrmThrScaleMoreThanDefaultRate,
      usdInrMrmThrScaleMoreThanDefaultRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
      data: {
        ratesDataProviderCode: MRM,
        ratesDataSource: THR,
        exchangeRateType: A
      },
      value: new Value('0.3333333336507937'),
      fromCurrency: EUR,
      toCurrency: USD,
      validFromDateTime: S_2020_01_01T02_30_00Z
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR From Reference Currency Pair Valid DateTime', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbADateBeforeRate,
      eurInrMrmThrADateBeforeRate,
      usdInrMrmEcbARate,
      usdInrMrmThrARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
      data: {
        ratesDataProviderCode: MRM,
        ratesDataSource: THR,
        exchangeRateType: A
      },
      value: S_0_5,
      fromCurrency: EUR,
      toCurrency: USD,
      validFromDateTime: S_2019_09_16T02_30_00Z
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with non existing rate type', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      usdInrMrmThrLastRate,
      eurInrMrmThrLastRate,
      usdInrMrmEcbLastRate,
      eurInrMrmEcbLastRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD);
  });

  it('Reference Currency with Direct Rate No From Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      usdInrMrmThrARate,
      eurUsdMrmThrIndirectTrueRate,
      eurUsdMrmThrIndirectFalseRate,
      eurInrMrmEcbARate,
      eurUsdMrmEcbIndirectTrueRate,
      eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(eurUsdMrmThrIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with Direct Rate No To Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrARate,
      eurUsdMrmThrIndirectTrueRate,
      eurUsdMrmThrIndirectFalseRate,
      eurUsdMrmEcbIndirectTrueRate,
      eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(eurUsdMrmThrIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with zero rate', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbZeroRate,
      usdInrMrmEcbZeroRate,
      eurInrMrmThrZeroRate,
      usdInrMrmThrZeroRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.ZERO_RATE_REFERENCE_CURRENCY);
  });

  it('Reference Currency with zero factor', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbZeroFactor,
      usdInrMrmEcbZeroFactor,
      eurInrMrmThrZeroFactor,
      usdInrMrmThrZeroFactor
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.ZERO_CURRENCY_FACTOR);
  });

  it('Reference Currency with zero factor and zero rate', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbZeroFactorRate,
      usdInrMrmEcbZeroFactorRate,
      eurInrMrmThrZeroFactorRate,
      usdInrMrmThrZeroFactorRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.ZERO_RATE_REFERENCE_CURRENCY);
  });

  it('Reference Currency with Direct Rate No From and To Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmThrIndirectTrueRate,
      eurUsdMrmThrIndirectFalseRate,
      eurUsdMrmEcbIndirectTrueRate,
      eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(eurUsdMrmThrIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with duplicate from reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
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
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('Reference Currency with duplicate to reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
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
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  it('Reference Currency with duplicate from and to reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
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
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurUsdAConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND);
  });

  /* Combination of indirect in 'From' and 'To' Currency */

  it('From Reference Rate as Indirect and To Reference Rate as Indirect', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectTrueRate,
      usdInrMrmThrIndirectTrueRate,
      eurInrMrmEcbIndirectTrueRate,
      usdInrMrmEcbIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
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
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as Indirect and To Reference Rate as direct', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectTrueRate,
      usdInrMrmThrIndirectFalseRate,
      eurInrMrmEcbIndirectTrueRate,
      usdInrMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
      data: {
        ratesDataProviderCode: MRM,
        ratesDataSource: THR,
        exchangeRateType: A
      },
      value: S_0_02,
      fromCurrency: EUR,
      toCurrency: USD,
      validFromDateTime: S_2020_01_01T02_30_00Z
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as indirect', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectFalseRate,
      usdInrMrmThrIndirectTrueRate,
      eurInrMrmEcbIndirectFalseRate,
      usdInrMrmEcbIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
      data: {
        ratesDataProviderCode: MRM,
        ratesDataSource: THR,
        exchangeRateType: A
      },
      value: S_50,
      fromCurrency: EUR,
      toCurrency: USD,
      validFromDateTime: S_2020_01_01T02_30_00Z
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectFalseRate,
      usdInrMrmThrIndirectFalseRate,
      eurInrMrmEcbIndirectFalseRate,
      usdInrMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
      data: {
        ratesDataProviderCode: MRM,
        ratesDataSource: THR,
        exchangeRateType: A
      },
      value: S_0_5,
      fromCurrency: EUR,
      toCurrency: USD,
      validFromDateTime: S_2020_01_01T02_30_00Z
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct Infinite decimal', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectFalseRateInfiniteDecimal,
      usdInrMrmThrIndirectFalseRateInfiniteDecimal,
      eurInrMrmEcbIndirectFalseRateInfiniteDecimal,
      usdInrMrmEcbIndirectFalseRateInfiniteDecimal
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
      data: {
        ratesDataProviderCode: MRM,
        ratesDataSource: THR,
        exchangeRateType: A
      },
      value: S_1,
      fromCurrency: EUR,
      toCurrency: USD,
      validFromDateTime: S_2020_01_01T02_30_00Z
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as indirect and To Reference Rate as indirect factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectTrueFactorMoreThanOneRate,
      usdInrMrmThrIndirectTrueFactorMoreThanOneRate,
      eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
      usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
      data: {
        ratesDataProviderCode: MRM,
        ratesDataSource: THR,
        exchangeRateType: A
      },
      value: S_8,
      fromCurrency: EUR,
      toCurrency: USD,
      validFromDateTime: S_2020_01_01T02_30_00Z
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as indirect and To Reference Rate as direct factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectTrueFactorMoreThanOneRate,
      usdInrMrmThrIndirectFalseFactorMoreThanOneRate,
      eurInrMrmEcbIndirectTrueFactorMoreThanOneRate,
      usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
      data: {
        ratesDataProviderCode: MRM,
        ratesDataSource: THR,
        exchangeRateType: A
      },
      value: S_0_08,
      fromCurrency: EUR,
      toCurrency: USD,
      validFromDateTime: S_2020_01_01T02_30_00Z
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as indirect factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectFalseFactorMoreThanOneRate,
      usdInrMrmThrIndirectTrueFactorMoreThanOneRate,
      eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
      usdInrMrmEcbIndirectTrueFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
      data: {
        ratesDataProviderCode: MRM,
        ratesDataSource: THR,
        exchangeRateType: A
      },
      value: S_200,
      fromCurrency: EUR,
      toCurrency: USD,
      validFromDateTime: S_2020_01_01T02_30_00Z
    };
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmThrIndirectFalseFactorMoreThanOneRate,
      usdInrMrmThrIndirectFalseFactorMoreThanOneRate,
      eurInrMrmEcbIndirectFalseFactorMoreThanOneRate,
      usdInrMrmEcbIndirectFalseFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = {
      settings: setDefaultSettings(TENANT_ID),
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
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });
});
