/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  BulkConversionResult,
  CurrencyAmount,
  CurrencyConversionError,
  ConversionParameterForNonFixedRate,
  DataAdapter,
  ExchangeRate,
  ExchangeRateTypeDetail,
  SingleNonFixedRateConversionResult,
  TenantSettings,
  Value,
  setDefaultSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { isNullish, createLogger } from '@sap-cloud-sdk/util';
import { BigNumber } from 'bignumber.js';
import { ConversionError } from '../constants/conversion-error';
import { ExchangeRateRecordDeterminer } from '../core/exchange-rate-record-determiner';
import { configureBigNumber } from './configure-big-number';
import { validateCurrencyFactor } from './validate-currency-factor';
const logger = createLogger('core');

const DEFAULT_SCALE = 14;
export const CURR_FORMAT = {
  decimalSeparator: '.',
  groupSize: 0,
  secondaryGroupSize: 0,
  fractionGroupSeparator: '',
  fractionGroupSize: 0
};

/*
 * Conversion logic for all the APIs for Non Fixed Rate.
 */
export async function performNonFixedConversion(
  conversionParameters: ConversionParameterForNonFixedRate[],
  dataAdapter: DataAdapter,
  tenant: Tenant,
  overrideTenantSetting?: TenantSettings
): Promise<BulkConversionResult<ConversionParameterForNonFixedRate, SingleNonFixedRateConversionResult>> {
  if (isNullish(dataAdapter) || isNullish(tenant?.id)) {
    throw new CurrencyConversionError(ConversionError.NULL_ADAPTER_TENANT);
  }
  const tenantSettings = overrideTenantSetting
    ? fetchOverrideTenantSettings(overrideTenantSetting)
    : await fetchDefaultTenantSettings(dataAdapter, tenant);
  const exchangeRateResultSet = await fetchExchangeRate(conversionParameters, dataAdapter, tenant, tenantSettings);
  const exchangeRateTypeDetailsMap = await fetchExchangeRateType(conversionParameters, dataAdapter, tenant);
  const exchangeRateDeterminer = new ExchangeRateRecordDeterminer(
    tenant,
    tenantSettings,
    exchangeRateResultSet,
    exchangeRateTypeDetailsMap
  );
  return performBulkNonFixedConversion(exchangeRateDeterminer, conversionParameters, tenant);
}
async function fetchExchangeRate(
  conversionParameters: ConversionParameterForNonFixedRate[],
  dataAdapter: DataAdapter,
  tenant: Tenant,
  tenantSettings: TenantSettings
): Promise<ExchangeRate[]> {
  const exchangeRates = await dataAdapter
    .getExchangeRatesForTenant(conversionParameters, tenant, tenantSettings)
    .catch(error => {
      logger.error(error.message);
      throw new CurrencyConversionError(ConversionError.ERROR_FETCHING_EXCHANGE_RATES);
    });
  if (!exchangeRates?.length) {
    logger.error(`Data Adpater returned empty list for exchange rates for tenant ${JSON.stringify(tenant)}`);
    throw new CurrencyConversionError(ConversionError.EMPTY_EXCHANGE_RATE_LIST);
  }
  return exchangeRates;
}

async function fetchExchangeRateType(
  conversionParameters: ConversionParameterForNonFixedRate[],
  dataAdapter: DataAdapter,
  tenant: Tenant
): Promise<Map<string, ExchangeRateTypeDetail>> {
  const rateTypes = conversionParameters.map(conversionParameter => conversionParameter.exchangeRateType);
  const exchangeRateTypeDetailMap = await dataAdapter
    .getExchangeRateTypeDetailsForTenant(tenant, rateTypes)
    .catch(error => {
      logger.error(error.message);
      throw new CurrencyConversionError(ConversionError.ERROR_FETCHING_EXCHANGE_RATES);
    });
  return exchangeRateTypeDetailMap;
}

function performBulkNonFixedConversion(
  exchangeRateDeterminer: ExchangeRateRecordDeterminer,
  conversionParameters: ConversionParameterForNonFixedRate[],
  tenant: Tenant
): BulkConversionResult<ConversionParameterForNonFixedRate, SingleNonFixedRateConversionResult> {
  const resultMap = conversionParameters.reduce((results, conversionParameter) => {
    try {
      const result = performSingleNonFixedConversion(exchangeRateDeterminer, conversionParameter, tenant);
      results.set(conversionParameter, result);
    } catch (err) {
      logger.error(
        `${ConversionError.NON_FIXED_CONVERSION_FAILED} for parameter : ${JSON.stringify(
          conversionParameter
        )} with exception : ${err}`
      );
      results.set(conversionParameter, err);
    }
    return results;
  }, new Map());
  return new BulkConversionResult(resultMap);
}

function performSingleNonFixedConversion(
  exchangeRateDeterminer: ExchangeRateRecordDeterminer,
  conversionParameters: ConversionParameterForNonFixedRate,
  tenant: Tenant
): SingleNonFixedRateConversionResult {
  let convertedValue: CurrencyAmount;
  let exchangeRateUsed: ExchangeRate;
  if (conversionParameters.fromCurrency.currencyCode === conversionParameters.toCurrency.currencyCode) {
    convertedValue = new CurrencyAmount(conversionParameters.fromAmount.decimalValue.toFormat(CURR_FORMAT));
    exchangeRateUsed = {
      settings: setDefaultSettings(tenant),
      data: {
        ratesDataProviderCode: null,
        ratesDataSource: null,
        exchangeRateType: conversionParameters.exchangeRateType
      },
      value: new Value('1'),
      fromCurrency: conversionParameters.fromCurrency,
      toCurrency: conversionParameters.toCurrency,
      validFromDateTime: conversionParameters.conversionAsOfDateTime
    };
  } else {
    exchangeRateUsed = exchangeRateDeterminer.getBestMatchedExchangeRateRecord(conversionParameters);
    convertedValue = doConversionWithThePickedRateRecord(conversionParameters, exchangeRateUsed);
  }
  return new SingleNonFixedRateConversionResult(
    exchangeRateUsed,
    convertedValue,
    getRoundedOffConvertedAmount(convertedValue, conversionParameters)
  );
}

function getRoundedOffConvertedAmount(
  currAmount: CurrencyAmount,
  conversionParam: ConversionParameterForNonFixedRate
): CurrencyAmount {
  return new CurrencyAmount(
    currAmount.decimalValue
      .decimalPlaces(conversionParam.toCurrency.defaultFractionDigits, BigNumber.ROUND_HALF_UP)
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
  conversionParameters: ConversionParameterForNonFixedRate,
  exchangeRateToBeUsed: ExchangeRate
): CurrencyAmount {
  const fromAmount: BigNumber = conversionParameters.fromAmount.decimalValue;
  const convertedValue: BigNumber = fromAmount.multipliedBy(
    getEffectiveExchangeRateValue(conversionParameters, exchangeRateToBeUsed)
  );
  return new CurrencyAmount(convertedValue.toFormat(CURR_FORMAT));
}

function getEffectiveExchangeRateValue(
  conversionParameters: ConversionParameterForNonFixedRate,
  exchangeRateToBeUsed: ExchangeRate
): BigNumber {
  let effectiveExchangeRateVal: BigNumber;
  const isIndirect: boolean = exchangeRateToBeUsed.settings.isIndirect;
  const exchangeRateValue: BigNumber = exchangeRateToBeUsed.value.decimalValue;
  const currencyFactorRatio: BigNumber = getCurrencyFactorRatio(exchangeRateToBeUsed);

  const additionOfScales = conversionParameters.fromAmount.decimalValue.dp() + exchangeRateValue.decimalPlaces();
  const scaleForDivision: number = additionOfScales > DEFAULT_SCALE ? additionOfScales : DEFAULT_SCALE;
  const bigNum = configureBigNumber(scaleForDivision);
  if (ifFromToCurrencyMatches(conversionParameters, exchangeRateToBeUsed)) {
    effectiveExchangeRateVal = getEffectiveRateForDirectOrReferenceCurrencyPair(
      isIndirect,
      exchangeRateValue,
      currencyFactorRatio,
      bigNum
    );
  } else {
    effectiveExchangeRateVal = getEffecttiveRateForInvertedCurrencyPair(
      isIndirect,
      exchangeRateValue,
      currencyFactorRatio,
      bigNum
    );
  }
  return effectiveExchangeRateVal;
}

function ifFromToCurrencyMatches(
  conversionParameters: ConversionParameterForNonFixedRate,
  exchangeRateToBeUsed: ExchangeRate
): boolean {
  return (
    conversionParameters.fromCurrency.currencyCode === exchangeRateToBeUsed.fromCurrency.currencyCode &&
    conversionParameters.toCurrency.currencyCode === exchangeRateToBeUsed.toCurrency.currencyCode
  );
}

function getEffectiveRateForDirectOrReferenceCurrencyPair(
  isIndirect: boolean,
  exchangeRateValue: BigNumber,
  currencyFactorRatio: BigNumber,
  bigNum: typeof BigNumber
): BigNumber {
  let effectiveExchangeRateValue: BigNumber;
  if (isIndirect) {
    effectiveExchangeRateValue = new bigNum(1).dividedBy(exchangeRateValue);
    isRatioNaNOrInfinite(effectiveExchangeRateValue.toNumber());
    effectiveExchangeRateValue = effectiveExchangeRateValue.multipliedBy(currencyFactorRatio);
  } else {
    effectiveExchangeRateValue = exchangeRateValue.multipliedBy(currencyFactorRatio);
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
    const effectiveCurrencyFactorRatio = new bigNum(1).dividedBy(currencyFactorRatio);
    effectiveExchangeRateValue = exchangeRateValue.multipliedBy(effectiveCurrencyFactorRatio);
  } else {
    const exchangeRateCurrencyFactorValue = exchangeRateValue.multipliedBy(currencyFactorRatio);
    effectiveExchangeRateValue = new bigNum(1).dividedBy(exchangeRateCurrencyFactorValue);
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
  validateCurrencyFactor(exchangeRate.settings.toCurrencyfactor);
  validateCurrencyFactor(exchangeRate.settings.fromCurrencyfactor);
  const currencyFactorRatio: number = exchangeRate.settings.toCurrencyfactor / exchangeRate.settings.fromCurrencyfactor;
  isRatioNaNOrInfinite(currencyFactorRatio);
  return new BigNumber(currencyFactorRatio);
}

function isRatioNaNOrInfinite(currencyFactorRatio: number): void {
  /* Adding the exception explicitly since 0.0/0.0 does not throw an exception
   * and the conversion will fail eventually with null error message in it.
   */
  if (!Number.isFinite(currencyFactorRatio) || Number.isNaN(currencyFactorRatio)) {
    throw new CurrencyConversionError(ConversionError.ZERO_CURRENCY_FACTOR);
  }
}

async function fetchDefaultTenantSettings(dataAdapter: DataAdapter, tenant: Tenant): Promise<TenantSettings> {
  const tenantSettingsToBeUsed = await dataAdapter.getDefaultSettingsForTenant(tenant).catch(error => {
    logger.error(error.message);
    logger.error(`Error in fetching default tenant settings for tenant ${tenant}`);
    throw new CurrencyConversionError(ConversionError.ERROR_FETCHING_DEFAULT_SETTINGS);
  });
  logger.debug(
    'Default Tenant settings returned from data adapter are :',
    ...(isNullish(tenantSettingsToBeUsed)
      ? [null, null]
      : [tenantSettingsToBeUsed.ratesDataProviderCode, tenantSettingsToBeUsed.ratesDataSource])
  );
  return tenantSettingsToBeUsed;
}

function fetchOverrideTenantSettings(overrideSetting: TenantSettings): TenantSettings {
  if (isOverrideTenantSettingIncomplete(overrideSetting)) {
    logger.error('Override Tenant Setting can not be null');
    throw new CurrencyConversionError(ConversionError.EMPTY_OVERRIDE_TENANT_SETTING);
  }
  // create a TenantSettings object from overrideSetting
  const tenantSettingsToBeUsed: TenantSettings = {
    ratesDataProviderCode: overrideSetting.ratesDataProviderCode,
    ratesDataSource: overrideSetting.ratesDataSource
  };
  logger.debug(
    `Override settings is used for conversion : 
    ${overrideSetting.ratesDataProviderCode}, ${overrideSetting.ratesDataSource}`
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
function isOverrideTenantSettingIncomplete(overrideSetting: TenantSettings): boolean {
  return isNullish(overrideSetting?.ratesDataProviderCode) || isNullish(overrideSetting?.ratesDataSource);
}
