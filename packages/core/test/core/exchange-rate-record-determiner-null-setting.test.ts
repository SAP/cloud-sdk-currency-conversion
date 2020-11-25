/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core/dist/scp-cf/tenant';
import {
  buildCurrency,
  ExchangeRate,
  ExchangeRateValue,
  RateType,
  RatesDataProviderCode,
  RatesDataSource,
  Currency,
  CurrencyFactor,
  ExchangeRateTypeDetail,
  ConversionParametersForNonFixedRate
} from '@sap-cloud-sdk/currency-conversion-models';
import { BigNumber } from 'bignumber.js';
import { ExchangeRateRecordDeterminer } from '../../src/core/exchange-rate-record-determiner';
import { ConversionError } from '../../src/constants/conversion-error';

const TENANT_ID: Tenant = { id: 'TenantID' };
const TENANT_ID1: Tenant = { id: 'tenantId1' };

const MRM: RatesDataProviderCode = new RatesDataProviderCode('MRM');
const BYOR: RatesDataProviderCode = new RatesDataProviderCode('BYOR');
const ECB: RatesDataSource = new RatesDataSource('ECB');
const THR: RatesDataSource = new RatesDataSource('THR');

const A: RateType = new RateType('A');
const M: RateType = new RateType('M');
const ASK: RateType = new RateType('ASK');
const LAST: RateType = new RateType('LAST');

const INR: Currency = buildCurrency('INR');
const EUR: Currency = buildCurrency('EUR');
const USD: Currency = buildCurrency('USD');

const S_0: ExchangeRateValue = new ExchangeRateValue('0', new BigNumber('0'));
const S_2: ExchangeRateValue = new ExchangeRateValue('2', new BigNumber('2'));
const S_3: ExchangeRateValue = new ExchangeRateValue('3', new BigNumber('3'));
const S_5: ExchangeRateValue = new ExchangeRateValue('5', new BigNumber('5'));
const S_10: ExchangeRateValue = new ExchangeRateValue(
  '10',
  new BigNumber('10')
);
const S_100: ExchangeRateValue = new ExchangeRateValue(
  '100',
  new BigNumber('100')
);

const S_0_5: ExchangeRateValue = new ExchangeRateValue(
  '0.5',
  new BigNumber('0.5')
);
const S_1: ExchangeRateValue = new ExchangeRateValue('1', new BigNumber('1'));
const S_50: ExchangeRateValue = new ExchangeRateValue(
  '50',
  new BigNumber('50')
);

const S_8: ExchangeRateValue = new ExchangeRateValue('8', new BigNumber('8'));
const S_0_02: ExchangeRateValue = new ExchangeRateValue(
  '0.02',
  new BigNumber('0.02')
);
const S_0_08: ExchangeRateValue = new ExchangeRateValue(
  '0.08',
  new BigNumber('0.08')
);
const S_7_00000001: ExchangeRateValue = new ExchangeRateValue(
  '7.00000001',
  new BigNumber('7.00000001')
);
const S_21_00000001: ExchangeRateValue = new ExchangeRateValue(
  '21.00000001',
  new BigNumber('21.00000001')
);

const S_200: ExchangeRateValue = new ExchangeRateValue(
  '200',
  new BigNumber('200')
);
const S_7_0: ExchangeRateValue = new ExchangeRateValue(
  '7.0',
  new BigNumber('7.0')
);
const S_21_0: ExchangeRateValue = new ExchangeRateValue(
  '21.0',
  new BigNumber('21.0')
);
const S_0_33333333333333: ExchangeRateValue = new ExchangeRateValue(
  '0.33333333333333',
  new BigNumber('0.33333333333333')
);

const S_2020_01_01T02_30_00Z: Date = new Date('2020-01-01T02:30:00Z');
const S_2020_02_01T02_30_00Z: Date = new Date('2020-02-01T02:30:00Z');
const S_2020_01_16T02_30_00Z: Date = new Date('2020-01-16T02:30:00Z');
const S_2019_09_16T02_30_00Z: Date = new Date('2019-09-16T02:30:00Z');
const S_2020_03_01T02_30_00Z: Date = new Date('2020-03-01T02:30:00Z');
const S_1990_03_01T02_30_00Z: Date = new Date('1990-03-01T02:30:00Z');

const inrEurMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_2019_09_16T02_30_00Z
);
const eurInrMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'INR',
  '10',
  M,
  S_2020_01_01T02_30_00Z
);
const eurInrInvalidCurrPairConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'AUD',
  'BSD',
  '100',
  M,
  S_2020_01_01T02_30_00Z
);
const inrEurAskConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'EUR',
  '100',
  ASK,
  S_2020_01_01T02_30_00Z
);
const eurUsdAConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'EUR',
  'USD',
  '100',
  A,
  S_2020_03_01T02_30_00Z
);
const inrEurMConversionParamPastDate: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'INR',
  'EUR',
  '100',
  M,
  S_1990_03_01T02_30_00Z
);
const usdEurMConversionParam: ConversionParametersForNonFixedRate = new ConversionParametersForNonFixedRate(
  'USD',
  'EUR',
  '100',
  M,
  S_2020_01_01T02_30_00Z
);

/* Exchange Rate starts*/

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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurInrMrmEcbAskIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  ASK,
  S_100,
  EUR,
  INR,
  S_2020_01_01T02_30_00Z,
  true,
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

const eurUsdMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const usdEurMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
  USD,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const usdInrMrmEcbMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  M,
  S_100,
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

const eurUsdMrmEcbIndirectTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_2,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  true,
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
const eurInrMrmEcbADateBeforeRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_5,
  EUR,
  INR,
  S_2019_09_16T02_30_00Z,
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
const eurUsdMrmEcbARate: ExchangeRate = new ExchangeRate(
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

const eurInrMrmIndirectTrueRate: ExchangeRate = new ExchangeRate(
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
const eurInrMrmIndirectFalseRate: ExchangeRate = new ExchangeRate(
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

const eurInrMrmIndirectTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
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
const eurInrMrmIndirectFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
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

const usdInrMrmIndirectTrueRate: ExchangeRate = new ExchangeRate(
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
const usdInrMrmIndirectFalseRate: ExchangeRate = new ExchangeRate(
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

const usdInrMrmIndirectTrueFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
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
const usdInrMrmIndirectFalseFactorMoreThanOneRate: ExchangeRate = new ExchangeRate(
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

const inrEurMrmThrMRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  INR,
  EUR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
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
const eurInrMrmThrARate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  A,
  S_5,
  EUR,
  INR,
  S_2019_09_16T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurInrMrmIndirectFalseRateInfiniteDecimal: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_3,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const usdInrMrmIndirectFalseRateInfiniteDecimal: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_3,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurInrMrmEcbZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const usdInrMrmEcbZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurInrMrmEcbZeroFactor: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(0),
  new CurrencyFactor(0)
);
const usdInrMrmEcbZeroFactor: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_10,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(0),
  new CurrencyFactor(0)
);

const eurInrMrmEcbZeroFactorRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(0),
  new CurrencyFactor(0)
);
const usdInrMrmEcbZeroFactorRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(0),
  new CurrencyFactor(0)
);

const eurInrMrmEcbScaleMoreThanDefaultRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_7_00000001,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const usdInrMrmEcbScaleMoreThanDefaultRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_21_00000001,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

const eurInrMrmEcbScaleMoreThanZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_7_0,
  EUR,
  INR,
  S_2020_02_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const usdInrMrmEcbScaleMoreThanZeroRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  ECB,
  A,
  S_21_0,
  USD,
  INR,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
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
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const eurUsdByorEcbIndirectFalseInvertedTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  BYOR,
  ECB,
  M,
  S_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);
const eurUsdMrmThrIndirectFalseInvertedTrueRate: ExchangeRate = new ExchangeRate(
  TENANT_ID,
  MRM,
  THR,
  M,
  S_100,
  EUR,
  USD,
  S_2020_01_01T02_30_00Z,
  false,
  new CurrencyFactor(1),
  new CurrencyFactor(1)
);

/* Exchange Rate ends*/

function instantiateExchangeRateRecordDeterminer(
  exchangeRateResultSet: ExchangeRate[]
): ExchangeRateRecordDeterminer {
  return new ExchangeRateRecordDeterminer(
    TENANT_ID,
    null,
    exchangeRateResultSet,
    getExchangeRateTypeDetailsForTenant()
  );
}

function getExchangeRateTypeDetailsForTenant(): Map<
  RateType,
  ExchangeRateTypeDetail
> {
  const exchangeRateTypeDetailMap: Map<
    RateType,
    ExchangeRateTypeDetail
  > = new Map();
  exchangeRateTypeDetailMap.set(A, new ExchangeRateTypeDetail(INR, true));
  exchangeRateTypeDetailMap.set(M, new ExchangeRateTypeDetail(null, true));
  exchangeRateTypeDetailMap.set(ASK, new ExchangeRateTypeDetail(null, true));
  return exchangeRateTypeDetailMap;
}

describe('Exchange Rate Record Determiner Null Tenant Setting', () => {
  it('Get best matched exchange rate record', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmEcbMRate,
      eurInrMrmEcbMRate,
      eurInrMrmEcbARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      inrEurMConversionParam
    );
    expect(inrEurMrmEcbMRate).toEqual(actualExchangeRateRecord);
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
    expect(errInput.message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('exchange rate record with different data providers', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmEcbMRate,
      eurInrMrmThrMRate,
      eurInrMrmEcbMDuplicateRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        eurInrMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(
      ConversionError.MULTIPLE_CONVERSION_RECORD_FOUND
    );
  });

  it('Duplicate exchange rate record', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMDuplicateRate,
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
    expect(errInput.message).toBe(
      ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
    );
  });

  it('No exchange rate record for currency pair AUD-BSD', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbARate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMDuplicateRate,
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
    expect(errInput.message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('No exchange rate record for different tenant', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbARate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMDuplicateRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      TENANT_ID1,
      null,
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
    expect(errInput.message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Single exchange rate record for different tenant', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmEcbMDiffrentTenantRate,
      eurInrMrmEcbARate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMDuplicateRate,
      eurInrMrmEcbAskIndirectFalseRate,
      eurInrMrmEcbAskIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      TENANT_ID1,
      null,
      exchangeRateResultSet,
      getExchangeRateTypeDetailsForTenant()
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      inrEurMConversionParam
    );
    expect(inrEurMrmEcbMDiffrentTenantRate).toEqual(actualExchangeRateRecord);
  });

  // /* INVERTED RATE TEST CASE STARTS */

  it('Inverted conversion with duplicate rate', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      inrEurMrmEcbMDuplicateRate,
      inrEurMrmEcbMDuplicateRate,
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
    expect(errInput.message).toBe(
      ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
    );
  });

  it('Inverted conversion with different data source', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      eurUsdMrmThrIndirectFalseInvertedTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        usdEurMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(
      ConversionError.MULTIPLE_CONVERSION_RECORD_FOUND
    );
  });

  it('Inverted conversion with different data provider', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      eurUsdByorEcbIndirectFalseInvertedTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        usdEurMConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(
      ConversionError.MULTIPLE_CONVERSION_RECORD_FOUND
    );
  });

  it('Inverted Single conversion with inverted currency pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmEcbIndirectFalseInvertedTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      usdEurMConversionParam
    );
    expect(eurUsdMrmEcbIndirectFalseInvertedTrueRate).toEqual(
      actualExchangeRateRecord
    );
  });

  it('Inverted Single conversion with direct currency pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmEcbIndirectFalseInvertedTrueRate,
      usdEurMrmEcbIndirectFalseInvertedTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      usdEurMConversionParam
    );
    expect(usdEurMrmEcbIndirectFalseInvertedTrueRate).toEqual(
      actualExchangeRateRecord
    );
  });

  it('Inverted conversion exchange rate record with exchange rate type detail null', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmEcbMRate,
      usdEurMrmEcbMRate,
      eurInrMrmEcbAskIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = new ExchangeRateRecordDeterminer(
      TENANT_ID,
      null,
      exchangeRateResultSet,
      null
    );
    try {
      const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
        inrEurAskConversionParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  /* INVERTED RATE TEST CASE ENDS */

  /* REFERENCE CURRENCY STARTS */

  it('Reference Currency as INR', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbARate,
      usdInrMrmEcbARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_0_5,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR scale more than zero rate', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbScaleMoreThanZeroRate,
      usdInrMrmEcbScaleMoreThanZeroRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_0_33333333333333,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR scale more than default', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbScaleMoreThanDefaultRate,
      usdInrMrmEcbScaleMoreThanDefaultRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      new ExchangeRateValue(
        '0.3333333336507937',
        new BigNumber('0.3333333336507937')
      ),
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency as INR From Reference Currency Pair Valid DateTime', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbADateBeforeRate,
      usdInrMrmEcbARate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_0_5,
      EUR,
      USD,
      S_2019_09_16T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with non existing rate type', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      usdInrMrmEcbLastRate,
      eurInrMrmEcbLastRate
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
    expect(errInput.message).toBe(
      ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
    );
  });

  it('Reference Currency with Direct Rate No From Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      usdInrMrmEcbARate,
      eurUsdMrmEcbIndirectTrueRate,
      eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(eurUsdMrmEcbIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with Direct Rate No To Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
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
    expect(eurUsdMrmEcbIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with zero rate', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbZeroRate,
      usdInrMrmEcbZeroRate
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
    expect(errInput.message).toBe(
      ConversionError.ZERO_RATE_REFERENCE_CURRENCY
    );
  });

  it('Reference Currency with zero factor', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmEcbZeroFactor,
      usdInrMrmEcbZeroFactor
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
      usdInrMrmEcbZeroFactorRate
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
    expect(errInput.message).toBe(
      ConversionError.ZERO_RATE_REFERENCE_CURRENCY
    );
  });

  it('Reference Currency with Direct Rate No From and To Reference Pair', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurUsdMrmEcbIndirectTrueRate,
      eurUsdMrmEcbIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(eurUsdMrmEcbIndirectFalseRate).toEqual(actualExchangeRateRecord);
  });

  it('Reference Currency with duplicate from reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
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
    expect(errInput.message).toBe(
      ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
    );
  });

  it('Reference Currency with duplicate to reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
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
    expect(errInput.message).toBe(
      ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
    );
  });

  it('Reference Currency with duplicate from and to reference pair', () => {
    let errInput = new Error();
    const exchangeRateResultSet: ExchangeRate[] = [
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
    expect(errInput.message).toBe(
      ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
    );
  });

  /* Combination of indirect in 'From' and 'To' Currency */

  it('From Reference Rate as Indirect and To Reference Rate as Indirect', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmIndirectTrueRate,
      usdInrMrmIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_2,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as Indirect and To Reference Rate as direct', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmIndirectTrueRate,
      usdInrMrmIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_0_02,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as indirect', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmIndirectFalseRate,
      usdInrMrmIndirectTrueRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_50,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmIndirectFalseRate,
      usdInrMrmIndirectFalseRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_0_5,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct Infinite decimal', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmIndirectFalseRateInfiniteDecimal,
      usdInrMrmIndirectFalseRateInfiniteDecimal
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_1,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as indirect and To Reference Rate as indirect factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmIndirectTrueFactorMoreThanOneRate,
      usdInrMrmIndirectTrueFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_8,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as indirect and To Reference Rate as direct factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmIndirectTrueFactorMoreThanOneRate,
      usdInrMrmIndirectFalseFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_0_08,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as indirect factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmIndirectFalseFactorMoreThanOneRate,
      usdInrMrmIndirectTrueFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_200,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });

  it('From Reference Rate as direct and To Reference Rate as direct factor more than one', () => {
    const exchangeRateResultSet: ExchangeRate[] = [
      eurInrMrmIndirectFalseFactorMoreThanOneRate,
      usdInrMrmIndirectFalseFactorMoreThanOneRate
    ];
    const exchangeRateRecordDeterminer: ExchangeRateRecordDeterminer = instantiateExchangeRateRecordDeterminer(
      exchangeRateResultSet
    );
    const expectedExchangeRate: ExchangeRate = new ExchangeRate(
      TENANT_ID,
      null,
      null,
      A,
      S_2,
      EUR,
      USD,
      S_2020_01_01T02_30_00Z,
      false,
      new CurrencyFactor(1),
      new CurrencyFactor(1)
    );
    const actualExchangeRateRecord: ExchangeRate = exchangeRateRecordDeterminer.getBestMatchedExchangeRateRecord(
      eurUsdAConversionParam
    );
    expect(expectedExchangeRate).toEqual(actualExchangeRateRecord);
  });
});
