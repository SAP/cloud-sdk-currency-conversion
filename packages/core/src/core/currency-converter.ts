/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  ConversionParameterForFixedRate,
  SingleFixedRateConversionResult,
  BulkConversionResult,
  ConversionParameterForNonFixedRate,
  DataAdapter,
  SingleNonFixedRateConversionResult,
  TenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { isNullish } from '@sap-cloud-sdk/util';
import { ConversionParameter } from '@sap-cloud-sdk/currency-conversion-models/src/conversion-parameter';
import { logger as log, logAndGetError } from '../helper/logger';
import { ConversionError } from '../constants/conversion-error';
import { performNonFixedConversion } from '../helper/non-fixed-rate-helper';
import { performSingleFixedConversion } from '../helper/fixed-rate-helper';

/**
 * Currency Converter API class which exposes methods to
 * perform currency conversion. It performs currency conversion
 * for a given value from a source currency to a target currency.
 * The conversion logic expects that the required exchange rates and
 * the configuration for conversion are readily available in the
 * expected format. It provides multiple APIs for currency conversion
 * based on the input provided by the user.
 */
export class CurrencyConverter {
  private static readonly MAXIMUM_CONVERSION_PARAMETER_ALLOWED: number = 1000;

  /**
   * Provides conversion capabilities for multiple conversions in one call
   * and depends on the {@link ExchangeRateValue} provided specifically in
   * the request. Check the inline messages of any individual conversion
   * failures for detailed information.
   *
   * <p>
   * If the 'fromCurrency' and 'toCurrency' are the same in the
   * {@link ConversionParametersForFixedRate}, the response amount will be
   * the same as the input currency amount and the given exchange rate value
   * is not used in the conversion.
   * </p>
   *
   * @param {ConversionParameterForFixedRate} conversionParameters:
   * A list of conversion parameters for a fixed rate. This acts as the input
   * for the conversion and the same object is provided in the resultant
   * {@link SingleFixedRateConversionResult} for correlation. The maximum
   * number of conversion parameters supported in a single call is 1000.
   *
   * @returns {BulkConversionResult}: The conversion result for a
   * fixed rate.
   */
  public convertCurrenciesWithFixedRate(
    conversionParameters: ConversionParameterForFixedRate[]
  ): BulkConversionResult<ConversionParameterForFixedRate, SingleFixedRateConversionResult> {
    if (!this.validateBulkConversionParameters(conversionParameters)) {
      throw logAndGetError(ConversionError.INVALID_PARAMS);
    }
    const resultMap = conversionParameters.reduce((results, conversionParameter) => {
      try {
        const singleConversionResult = this.convertCurrencyWithFixedRate(conversionParameter);
        results.set(conversionParameter, singleConversionResult);
      } catch (err) {
        log.error(`Fixed rate conversion for parameter ${conversionParameter} failed with error: ${err}`);
        results.set(conversionParameter, err);
      }
      return results;
    }, new Map());
    return new BulkConversionResult(resultMap);
  }

  /**
   * Provides conversion capabilities for one conversion in one call
   * and depends on the {@link ExchangeRateValue} provided specifically
   * in the request. Please use the API for bulk conversion if you want
   * to perform multiple conversions.
   *
   * <p>
   * If the 'fromCurrency' and 'toCurrency' are the same in the
   * {@link ConversionParametersForFixedRate}, the response amount will be
   * the same as the input currency amount and the given exchange rate value
   * is not used in the conversion.
   * </p>
   *
   * @param {ConversionParameterForFixedRate} conversionParameter A list of
   * conversion parameters for a fixed rate. This acts as the input for the
   * conversion and the same object is provided in the resultant
   * {@link SingleFixedRateConversionResult} for correlation. The maximum
   * number of conversion parameters supported in a single call is 1000.
   *
   *
   * @returns {SingleFixedRateConversionResult} Returns a single conversion
   * result for a fixed rate.
   */
  public convertCurrencyWithFixedRate(
    conversionParameter: ConversionParameterForFixedRate
  ): SingleFixedRateConversionResult {
    if (!this.validateSingleConversionParameter(conversionParameter)) {
      throw logAndGetError(ConversionError.INVALID_PARAMS);
    }
    return performSingleFixedConversion(conversionParameter);
  }

  /**
   * Provides conversion capabilities for one conversion in one call
   * by picking the best possible exchange rate that is applicable.
   * Currency conversion is performed on the required conversion parameter.
   * It uses the {@link ExchangeRate} and other tenant-based settings like
   * the data provider code for conversion provided by the 'DataAdapter'.
   * You must use the API for bulk conversion if you want to perform
   * multiple conversions.
   *
   * <p>
   * If the 'fromCurrency' and 'toCurrency' are the same in the
   * {@link ConversionParametersForNonFixedRate}, the response amount will be
   * the same as the input currency amount and an {@link ExchangeRate} entry is
   * provided with default values, with the exchange rate value as 1.
   * </p>
   *
   * @param {ConversionParameterForNonFixedRate} conversionParameter:
   * A conversion parameter for a non-fixed rate. This acts as the input for
   * the conversion and the same object is provided in the resultant
   * {@link SingleNonFixedRateConversionResult} for correlation.
   *
   * @param {DataAdapter} adapter:
   * Your implementation of {@link DataAdapter} that provides a list of
   * {@link ExchangeRate}s and {@link TenantSettings} for the conversion being
   * performed.
   *
   * @param {Tenant} tenant:
   * Representation of the tenant. A tenant represents the customer account
   * on cloud foundry.
   *
   * @param {TenantSettings} overrideTenantSetting
   * These settings are used for this conversion request. Default
   * {@link TenantSettings} provided by the {@link DataAdapter} are not used
   * during the conversion process because the override setting takes
   * precedence. This value cannot be null, and it should be a valid object
   * for consuming this API.
   *
   * @returns {SingleNonFixedRateConversionResult}:
   * The single conversion result for a non-fixed rate.
   */
  public convertCurrencyWithNonFixedRate(
    conversionParameter: ConversionParameterForNonFixedRate,
    adapter: DataAdapter,
    tenant: Tenant,
    overrideTenantSetting?: TenantSettings
  ): SingleNonFixedRateConversionResult {
    if (!this.validateSingleConversionParameter(conversionParameter)) {
      throw logAndGetError(ConversionError.INVALID_PARAMS);
    }
    const bulkConversionResult = performNonFixedConversion(
      Array.of(conversionParameter),
      adapter,
      tenant,
      overrideTenantSetting
    );
    const singleConversionResult = bulkConversionResult.get(conversionParameter);
    if (singleConversionResult instanceof Error) {
      throw singleConversionResult;
    }
    return singleConversionResult;
  }

  /**
   * Provides conversion capabilities for multiple conversions in one call
   * by overriding the default tenant settings that are provided by the
   * {@link DataAdapter} and uses the Data Adapter provided in the input to
   * get the required {@link ExchangeRate}s. The default data source setting
   * is not applicable for this request. Check the inlinem essages of any
   * individual conversion failures for detailed information.
   *
   * <p>
   * If the 'fromCurrency' and 'toCurrency' are the same in the
   * {@link ConversionParametersForNonFixedRate}, the response amount will be
   * the same as the input currency amount and a {@link ExchangeRate} entry is
   * provided with default values, with the exchange rate value as 1.
   * </p>
   *
   * @param {ConversionParameterForNonFixedRate} conversionParameters: A list of
   * conversion parameters for a non-fixed rate. This acts as the input for the
   * conversion and the same object is provided in the result
   * {@link SingleNonFixedRateConversionResult} for correlation.
   * The maximum number of conversion parameters supported in a single call
   * is 1000.
   *
   * @param {DataAdapter} adapter:
   * Your implementation of {@link DataAdapter} that provides a list of
   * {@link ExchangeRate}s and {@link TenantSettings} for the conversion being
   * performed.
   *
   * @param {Tenant} tenant:
   * Representation of the tenant. A tenant represents the customer account
   * on cloud foundry.
   *
   * @param {TenantSettings} overrideTenantSetting
   * These settings are used for this conversion request. Default
   * {@link TenantSettings} provided by the {@link DataAdapter} are not used
   * during the conversion process because the override setting takes
   * precedence. This value cannot be null, and it should be a valid object
   * for consuming this API.
   *
   * @returns {BulkNonFixedRateConversionResult}:
   * The conversion result for a non-fixed rate.
   */
  public convertCurrenciesWithNonFixedRate(
    conversionParameters: ConversionParameterForNonFixedRate[],
    adapter: DataAdapter,
    tenant: Tenant,
    overrideTenantSetting?: TenantSettings
  ): BulkConversionResult<ConversionParameterForNonFixedRate, SingleNonFixedRateConversionResult> {
    if (!this.validateBulkConversionParameters(conversionParameters)) {
      throw logAndGetError(ConversionError.INVALID_PARAMS);
    }
    return performNonFixedConversion(conversionParameters, adapter, tenant, overrideTenantSetting);
  }

  private validateSingleConversionParameter(conversionParameter: ConversionParameter): boolean {
    if (isNullish(conversionParameter)) {
      log.error('The conversion parameter used for conversion is null or undefined.');
      return false;
    }
    return true;
  }

  private validateBulkConversionParameters(conversionParams: ConversionParameter[]): boolean {
    if (isNullish(conversionParams)) {
      log.error('The conversion parameter list used for conversion is null or undefined.');
      return false;
    }
    if (!conversionParams.length) {
      log.error('The conversion parameter list for conversion is empty.');
      return false;
    }
    if (conversionParams.length > CurrencyConverter.MAXIMUM_CONVERSION_PARAMETER_ALLOWED) {
      log.error(
        // eslint-disable-next-line max-len
        `The number of conversion parameters for conversion exceeded the allowed limit of ${CurrencyConverter.MAXIMUM_CONVERSION_PARAMETER_ALLOWED}.`
      );
      return false;
    }

    return true;
  }
}
