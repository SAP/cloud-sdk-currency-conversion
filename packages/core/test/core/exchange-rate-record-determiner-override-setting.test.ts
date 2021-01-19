/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  buildCurrency,
  ConversionParameterForNonFixedRate,
  ExchangeRateTypeDetail,
  ExchangeRate,
  ExchangeRateValue,
  Currency,
  TenantSettings,
  buildExchangeRateValue,
  buildConversionParameterForNonFixedRate,
  buildExchangeRate,
  buildExchangeRateTypeDetail,
  buildTenantSettings
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

const S_0: ExchangeRateValue = buildExchangeRateValue('0');
const S_0_5: ExchangeRateValue = buildExchangeRateValue('0.5');
const S_1: ExchangeRateValue = buildExchangeRateValue('1');
const S_2: ExchangeRateValue = buildExchangeRateValue('2');
const S_3: ExchangeRateValue = buildExchangeRateValue('3');
const S_50: ExchangeRateValue = buildExchangeRateValue('50');
const S_5: ExchangeRateValue = buildExchangeRateValue('5');
const S_8: ExchangeRateValue = buildExchangeRateValue('8');
const S_10: ExchangeRateValue = buildExchangeRateValue('10');
const S_0_02: ExchangeRateValue = buildExchangeRateValue('0.02');
const S_0_08: ExchangeRateValue = buildExchangeRateValue('0.08');
const S_7_00000001: ExchangeRateValue = buildExchangeRateValue('7.00000001');
const S_21_00000001: ExchangeRateValue = buildExchangeRateValue('21.00000001');
const S_100: ExchangeRateValue = buildExchangeRateValue('100');
const S_200: ExchangeRateValue = buildExchangeRateValue('200');
const S_7_0: ExchangeRateValue = buildExchangeRateValue('7.0');
const S_21_0: ExchangeRateValue = buildExchangeRateValue('21.0');
const S_0_33333333333333: ExchangeRateValue = buildExchangeRateValue('0.33333333333333');

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_02_01T02_30_00Z: Date = new Date('2020-02-01T02:30:00Z');
const S_2020_01_16T02_30_00Z: Date = new Date('2020-01-16T02:30:00Z');
const S_2019_09_16T02_30_00Z: Date = new Date('2019-09-16T02:30:00Z');
const S_2020_03_01T02_30_00Z: Date = new Date('2020-03-01T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

const overrideTenantSettings: TenantSettings = buildTenantSettings(MRM, THR);

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

const inrEurMrmThrMRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);
const inrEurMrmThrMDuplicateRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrMRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  EUR,
  INR,
  S_2020_01_16T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmThrMDuplicateRate: ExchangeRate = buildExchangeRate(
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

const eurInrMrmThrAskIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  ASK,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const eurInrMrmThrAskIndirectFalseRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  ASK,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const inrEurMrmThrMDiffrentTenantRate: ExchangeRate = buildExchangeRate(
  TENANT_ID1,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmThrLastRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  LAST,
  S_10,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmThrLastRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  LAST,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurUsdMrmThrIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_2,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const eurUsdMrmThrIndirectFalseRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_2,
  EUR,
  USD,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrARate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmThrADateBeforeRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrARate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrADuplicateRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrADuplicateRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  USD,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  true,
  1,
  1
);
const eurInrMrmThrIndirectFalseRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrIndirectTrueFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  true,
  5,
  10
);
const eurInrMrmThrIndirectFalseFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  5,
  10
);

const usdInrMrmThrIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);
const usdInrMrmThrIndirectFalseRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const usdInrMrmThrIndirectTrueFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  10,
  5
);
const usdInrMrmThrIndirectFalseFactorMoreThanOneRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  10,
  5
);

const usdInrMrmThrDuplicateDateRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrZeroFactor: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  0,
  0
);
const usdInrMrmThrZeroFactor: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  0,
  0
);

const eurInrMrmThrZeroFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  0,
  0
);
const usdInrMrmThrZeroFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  0,
  0
);

const eurUsdMrmThrMRate: ExchangeRate = buildExchangeRate(
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
const usdEurMrmThrMRate: ExchangeRate = buildExchangeRate(
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

const eurInrMrmThrIndirectFalseRateInfiniteDecimal: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_3,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrIndirectFalseRateInfiniteDecimal: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_3,
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
const eurInrMrmEcbADateBeforeRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);
const inrEurMrmEcbMRate: ExchangeRate = buildExchangeRate(
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

const inrEurMrmEcbMDuplicateRate: ExchangeRate = buildExchangeRate(
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

const eurInrMrmEcbMRate: ExchangeRate = buildExchangeRate(
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

const eurInrMrmEcbIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  INR,
  S_2020_01_16T02_30_00Z,
  true,
  1,
  1
);

const eurInrMrmEcbIndirectFalseRate: ExchangeRate = buildExchangeRate(
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

const eurInrMrmEcbMDuplicateRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  INR,
  S_2019_09_16T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbAskIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  ASK,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
  1,
  1
);

const eurInrMrmEcbAskIndirectFalseRate: ExchangeRate = buildExchangeRate(
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

const inrEurMrmEcbMDiffrentTenantRate: ExchangeRate = buildExchangeRate(
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

const eurUsdMrmEcbMRate: ExchangeRate = buildExchangeRate(
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
const usdEurMrmEcbMRate: ExchangeRate = buildExchangeRate(
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

const eurUsdMrmEcbIndirectTrueRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_2,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
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

const eurInrMrmEcbIndirectFalseRateInfiniteDecimal: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_3,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmEcbIndirectFalseRateInfiniteDecimal: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_3,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmEcbZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmEcbZeroFactor: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  0,
  0
);
const usdInrMrmEcbZeroFactor: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  0,
  0
);

const eurInrMrmEcbZeroFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  0,
  0
);
const usdInrMrmEcbZeroFactorRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  0,
  0
);

const eurInrMrmEcbScaleMoreThanZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_7_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmEcbScaleMoreThanZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_21_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

const eurInrMrmThrScaleMoreThanZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_7_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrScaleMoreThanZeroRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_21_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmEcbScaleMoreThanDefaultRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_7_00000001,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmEcbScaleMoreThanDefaultRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_21_00000001,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);
const eurInrMrmThrScaleMoreThanDefaultRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_7_00000001,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  1,
  1
);
const usdInrMrmThrScaleMoreThanDefaultRate: ExchangeRate = buildExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_21_00000001,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  1,
  1
);

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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_5,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_33333333333333,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      buildExchangeRateValue('0.3333333336507937'),
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_5,
      EUR,
      USD,
      S_2019_09_16T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_2,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_02,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_50,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_5,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_1,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_8,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_0_08,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_200,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
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
    const expectedExchangeRate: ExchangeRate = buildExchangeRate(
      TENANT_ID,
      MRM,
      THR,
      A,
      S_2,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      1,
      1
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });
});
