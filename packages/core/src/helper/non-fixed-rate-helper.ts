/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core/dist/scp-cf/tenant';
import {
  BulkNonFixedRateConversionResult,
  CurrencyAmount,
  CurrencyConversionError,
  ConversionParametersForNonFixedRate,
  DataAdapter,
  ExchangeRate,
  ExchangeRateTypeDetail,
  ExchangeRateValue,
  RateType,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  OverrideTenantSetting
} from '@sap-cloud-sdk/currency-conversion-models';
import { BigNumber } from 'bignumber.js';
import { ConversionErrors } from '../constants/conversion-errors';
import { logger as log } from './logger';
import { ExchangeRateRecordDeterminer } from '../core/exchange-rate-record-determiner';

const DEFAULT_SCALE = 14;
export const CURR_FORMAT = {
  decimalSeparator: '.',
  groupSize: 0,
  secondaryGroupSize: 0,
  fractionGroupSeparator: '',
  fractionGroupSize: 0
};

export function convertCurrenciesWithNonFixedRateHelper(
  conversionParameters: ConversionParametersForNonFixedRate[],
  dataAdapter: DataAdapter,
  tenant: Tenant,
  overrideTenantSetting?: OverrideTenantSetting
): BulkNonFixedRateConversionResult {
  let tenantSettings = null;
  if (dataAdapter === null || tenant === null || tenant.id === null) {
    throw new CurrencyConversionError(ConversionErrors.NULL_ADAPTER_TENANT);
  }
  if (overrideTenantSetting === undefined) {
    tenantSettings = fetchDefaultTenantSettings(dataAdapter, tenant);
  } else {
    tenantSettings = fetchOverrideTenantSettings(overrideTenantSetting);
  }
  return convertCurrencies(
    conversionParameters,
    dataAdapter,
    tenant,
    tenantSettings
  );
}

export function setBigNumberConfig(scaleForDivision: number): typeof BigNumber {
  const bigNum = BigNumber.clone({
    DECIMAL_PLACES: scaleForDivision,
    ROUNDING_MODE: 4
  });
  return bigNum;
}

/*
 * Conversion logic for all the APIs for Non Fixed Rate.
 */
function convertCurrencies(
  conversionParameters: ConversionParametersForNonFixedRate[],
  dataAdapter: DataAdapter,
  tenant: Tenant,
  tenantSettings: TenantSettings | null | undefined
): BulkNonFixedRateConversionResult {
  const exchangeRateResultSet = fetchExchangeRate(
    conversionParameters,
    dataAdapter,
    tenant,
    tenantSettings
  );
  const exchangeRateTypeDetalsMap = fetchExchangeRateType(
    conversionParameters,
    dataAdapter,
    tenant
  );
  const exchnageRateDeterminer = new ExchangeRateRecordDeterminer(
    tenant,
    tenantSettings,
    exchangeRateResultSet,
    exchangeRateTypeDetalsMap
  );
  return performBulkNonFixedConversion(
    exchnageRateDeterminer,
    conversionParameters,
    tenant
  );
}
function fetchExchangeRate(
  conversionParameters: ConversionParametersForNonFixedRate[],
  dataAdapter: DataAdapter,
  tenant: Tenant,
  tenantSettings: TenantSettings | null | undefined
): ExchangeRate[] {
  let exchangeRateResultSet: ExchangeRate[] = new Array();
  try {
    exchangeRateResultSet = dataAdapter.getExchangeRatesForTenant(
      conversionParameters,
      tenant,
      tenantSettings
    );
  } catch (error) {
    log?.error(ConversionErrors.ERR_FETCHING_EXCHANGE_RATES);
    throw new CurrencyConversionError(
      ConversionErrors.ERR_FETCHING_EXCHANGE_RATES
    );
  }
  if (exchangeRateResultSet === null || exchangeRateResultSet.length === 0) {
    log?.error(
      'Data Adpater returned empty list for exchange rates for tenant',
      JSON.stringify(tenant)
    );
    throw new CurrencyConversionError(
      ConversionErrors.EMPTY_EXCHANGE_RATE_LIST
    );
  }
  return exchangeRateResultSet;
}

function fetchExchangeRateType(
  conversionParameters: ConversionParametersForNonFixedRate[],
  dataAdapter: DataAdapter,
  tenant: Tenant
): Map<RateType, ExchangeRateTypeDetail> {
  let exchangeRateTypeDetailMap: Map<
    RateType,
    ExchangeRateTypeDetail
  > = new Map();
  try {
    const rateTypeSet: Set<RateType> = new Set();
    for (const conversionParameter of conversionParameters) {
      rateTypeSet.add(conversionParameter.exchangeRateType);
    }
    exchangeRateTypeDetailMap = dataAdapter.getExchangeRateTypeDetailsForTenant(
      tenant,
      rateTypeSet
    );
  } catch (error) {
    log?.error(ConversionErrors.ERR_FETCHING_EXCHANGE_RATES);
    throw new CurrencyConversionError(
      ConversionErrors.ERR_FETCHING_EXCHANGE_RATES
    );
  }
  return exchangeRateTypeDetailMap;
}

function performBulkNonFixedConversion(
  exchangeRateDeterminer: ExchangeRateRecordDeterminer,
  conversionParameters: ConversionParametersForNonFixedRate[],
  tenant: Tenant
): BulkNonFixedRateConversionResult {
  const resultMap: Map<
    ConversionParametersForNonFixedRate,
    SingleNonFixedRateConversionResult | CurrencyConversionError
  > = new Map();
  for (const conversionParameter of conversionParameters) {
    try {
      const result = performSingleNonFixedConversion(
        exchangeRateDeterminer,
        conversionParameter,
        tenant
      );
      resultMap.set(conversionParameter, result);
    } catch (error) {
      log?.error(
        ConversionErrors.NON_FIXED_CONVERSION_FAILED,
        'for parameter : ',
        JSON.stringify(conversionParameter),
        'with exception :',
        error
      );
      resultMap.set(
        conversionParameter,
        new CurrencyConversionError((error as Error).message)
      );
    }
  }
  return new BulkNonFixedRateConversionResult(resultMap);
}

function performSingleNonFixedConversion(
  exchangeRateDeterminer: ExchangeRateRecordDeterminer,
  conversionParameters: ConversionParametersForNonFixedRate,
  tenant: Tenant
): SingleNonFixedRateConversionResult {
  let convertedValue: CurrencyAmount;
  let exchangeRateUsedForConversion: ExchangeRate;
  if (
    conversionParameters.fromCurrency.currencyCode ===
    conversionParameters.toCurrency.currencyCode
  ) {
    convertedValue = new CurrencyAmount(
      conversionParameters.fromAmount.decimalValue.toFormat(CURR_FORMAT)
    );
    exchangeRateUsedForConversion = new ExchangeRate(
      tenant,
      null,
      null,
      conversionParameters.exchangeRateType,
      new ExchangeRateValue('1', new BigNumber(1)),
      conversionParameters.fromCurrency,
      conversionParameters.toCurrency,
      conversionParameters.conversionAsOfDateTime
    );
  } else {
    exchangeRateUsedForConversion = exchangeRateDeterminer.getBestMatchedExchangeRateRecord(
      conversionParameters
    );
    convertedValue = doConversionWithThePickedRateRecord(
      conversionParameters,
      exchangeRateUsedForConversion
    );
  }
  return new SingleNonFixedRateConversionResult(
    exchangeRateUsedForConversion,
    convertedValue,
    getRoundedOffConvertedAmount(convertedValue, conversionParameters)
  );
}

function getRoundedOffConvertedAmount(
  currAmount: CurrencyAmount,
  conversionParam: ConversionParametersForNonFixedRate
): CurrencyAmount {
  return new CurrencyAmount(
    currAmount.decimalValue
      .decimalPlaces(
        conversionParam.toCurrency.defaultFractionDigits,
        BigNumber.ROUND_HALF_UP
      )
      .toFormat(CURR_FORMAT)
  );
}

/*
 * Performs the multiplication of the converted value for fixed or non fixed
 * rate with the ratio of factors od to/from currency.
 * @param {ConversionParametersForNonFixedRate} conversionParameters:
 * conversion request on which currency conversion has to be performed.
 * @param {ExchangeRate} exchangeRateToBeUsed: latest exchange rate for the
 * currency pair for which conversion has to be performed. It will be used to
 * determine the latest exchange rate from the list of exchange rates provided
 * in the DataAdpater.
 * @return {CurrencyAmount} converted value from the BigNumber after
 * toFormat to plain string is performed on it.
 */
function doConversionWithThePickedRateRecord(
  conversionParameters: ConversionParametersForNonFixedRate,
  exchangeRateToBeUsed: ExchangeRate
): CurrencyAmount {
  const fromAmount: BigNumber = conversionParameters.fromAmount.decimalValue;
  const convertedValue: BigNumber = fromAmount.multipliedBy(
    getEffectiveExchangeRateValue(conversionParameters, exchangeRateToBeUsed)
  );
  return new CurrencyAmount(convertedValue.toFormat(CURR_FORMAT));
}

function getEffectiveExchangeRateValue(
  conversionParameters: ConversionParametersForNonFixedRate,
  exchangeRateToBeUsed: ExchangeRate
): BigNumber {
  let effectiveExchangeRateValue: BigNumber;
  const isIndirect: boolean = exchangeRateToBeUsed.isIndirect;
  const exchangeRateValue: BigNumber =
    exchangeRateToBeUsed.exchangeRateValue.decimalValue;
  const currencyFactorRatio: BigNumber = getCurrencyFactorRatio(
    exchangeRateToBeUsed
  );

  const additionOfScales =
    conversionParameters.fromAmount.decimalValue.dp() +
    exchangeRateValue.decimalPlaces();
  const scaleForDivision: number =
    additionOfScales > DEFAULT_SCALE ? additionOfScales : DEFAULT_SCALE;
  const bigNum = setBigNumberConfig(scaleForDivision);
  if (ifFromToCurrencyMatches(conversionParameters, exchangeRateToBeUsed)) {
    effectiveExchangeRateValue = getEffecttiveRateForDirectOrReferenceCurrencyPair(
      isIndirect,
      exchangeRateValue,
      currencyFactorRatio,
      bigNum
    );
  } else {
    effectiveExchangeRateValue = getEffecttiveRateForInvertedCurrencyPair(
      isIndirect,
      exchangeRateValue,
      currencyFactorRatio,
      bigNum
    );
  }
  return effectiveExchangeRateValue;
}

function ifFromToCurrencyMatches(
  conversionParameters: ConversionParametersForNonFixedRate,
  exchangeRateToBeUsed: ExchangeRate
): boolean {
  return (
    conversionParameters.fromCurrency.currencyCode ===
      exchangeRateToBeUsed.fromCurrency.currencyCode &&
    conversionParameters.toCurrency.currencyCode ===
      exchangeRateToBeUsed.toCurrency.currencyCode
  );
}

function getEffecttiveRateForDirectOrReferenceCurrencyPair(
  isIndirect: boolean,
  exchangeRateValue: BigNumber,
  currencyFactorRatio: BigNumber,
  bigNum: typeof BigNumber
): BigNumber {
  let effectiveExchangeRateValue: BigNumber;
  if (isIndirect) {
    effectiveExchangeRateValue = new bigNum(1).dividedBy(exchangeRateValue);
    isRatioNaNOrInfinite(effectiveExchangeRateValue.toNumber());
    effectiveExchangeRateValue = effectiveExchangeRateValue.multipliedBy(
      currencyFactorRatio
    );
  } else {
    effectiveExchangeRateValue = exchangeRateValue.multipliedBy(
      currencyFactorRatio
    );
  }
  return effectiveExchangeRateValue;
}

function getEffecttiveRateForInvertedCurrencyPair(
  isIndirect: boolean,
  exchangeRateValue: BigNumber,
  currencyFactorRatio: BigNumber,
  bigNum: typeof BigNumber
) {
  let effectiveExchangeRateValue: BigNumber;
  if (isIndirect) {
    const effectiveCurrencyFactorRatio = new bigNum(1).dividedBy(
      currencyFactorRatio
    );
    effectiveExchangeRateValue = exchangeRateValue.multipliedBy(
      effectiveCurrencyFactorRatio
    );
  } else {
    const exchangeRateCurrencyFactorValue = exchangeRateValue.multipliedBy(
      currencyFactorRatio
    );
    effectiveExchangeRateValue = new bigNum(1).dividedBy(
      exchangeRateCurrencyFactorValue
    );
  }
  return effectiveExchangeRateValue;
}

/*
 * @private
 * Returns the ratio of factors of to/from currency and converts
 * it to BigNumber since this has to be multiplied with the converted
 * value for non fixed rates which is a BigNumber.
 * @param {ExchangeRate} exchangeRate: latest exchange
 * rate for the currency pair for which conversion has to be performed.
 * @return BigNumber ratio of factor of 'To' currency
 * (also local or destination) to 'From' currency
 * (also foreign or source currency).
 */
function getCurrencyFactorRatio(exchangeRate: ExchangeRate): BigNumber {
  const currencyFactorRatio: number =
    exchangeRate.toCurrencyfactor.currencyFactor /
    exchangeRate.fromCurrencyfactor.currencyFactor;
  isRatioNaNOrInfinite(currencyFactorRatio);
  return new BigNumber(currencyFactorRatio);
}

function isRatioNaNOrInfinite(currencyFactorRatio: number): void {
  /* Adding the exception explicitly since 0.0/0.0 does not throw an exception
   * and the conversion will fail eventually with null error message in it.
   */
  if (
    !Number.isFinite(currencyFactorRatio) ||
    Number.isNaN(currencyFactorRatio)
  ) {
    log?.error(
      "The currency factor in the exchange rate resulted in an exception. Either 'from' or 'to' currency factor is zero"
    );
    throw new CurrencyConversionError(ConversionErrors.ZERO_CURRENCY_FACTOR);
  }
}

function fetchDefaultTenantSettings(
  dataAdapter: DataAdapter,
  tenant: Tenant
): TenantSettings | null | undefined {
  try {
    const tenantSettingsToBeUsed = dataAdapter.getDefaultSettingsForTenant(
      tenant
    );
    log?.debug(
      'Default Tenant settings returned from data adapter is : ',
      tenantSettingsToBeUsed == null
        ? null
        : JSON.stringify(tenantSettingsToBeUsed.ratesDataProviderCode),
      tenantSettingsToBeUsed == null
        ? null
        : JSON.stringify(tenantSettingsToBeUsed.ratesDataSource)
    );
    return tenantSettingsToBeUsed;
  } catch (ex) {
    log?.error('Error in fetching default tenant settings for tenant ', tenant);
    throw new CurrencyConversionError(
      ConversionErrors.ERROR_FETCHING_DEFAULT_SETTINGS
    );
  }
}

function fetchOverrideTenantSettings(
  overrideSetting: OverrideTenantSetting
): TenantSettings {
  isOverrideTenantSettingIncomplete(overrideSetting);
  // create a TenantSettings object from overrideSetting
  const tenantSettingsToBeUsed: TenantSettings = new TenantSettings(
    overrideSetting.ratesDataProviderCode,
    overrideSetting.ratesDataSource
  );
  log?.debug(
    'Override settings is used for conversion : ',
    JSON.stringify(overrideSetting.ratesDataProviderCode),
    JSON.stringify(overrideSetting.ratesDataSource)
  );
  return tenantSettingsToBeUsed;
}

/*
 * Checks if both data source and data provider code is present in the
 * tenant setting. tenantSettings can be null but if data source is
 * provided, data provider code also has to be given and vice-versa.
 * Throws an exception if the overrideSetting is null or if the overrideSetting
 * is not null but either of data source or data provider code is null,
 * hence the overrideSetting is incomplete. Otherwise overrideSetting is not
 * null or both data source & data provider code are provided in the
 * overrideSetting.
 */
function isOverrideTenantSettingIncomplete(
  overrideSetting: OverrideTenantSetting
): void {
  if (overrideSetting == null) {
    log?.error('Override Tenant Setting can not be null');
    throw new CurrencyConversionError(
      ConversionErrors.EMPTY_OVERRIDE_TENANT_SETTING
    );
  }
}
