/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core/dist/scp-cf/tenant';
import {
  ConversionParametersForFixedRate,
  SingleFixedRateConversionResult,
  BulkFixedRateConversionResult,
  CurrencyAmount,
  CurrencyConversionError,
  ConversionParametersForNonFixedRate,
  DataAdapter,
  SingleNonFixedRateConversionResult,
  BulkNonFixedRateConversionResult,
  TenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { BigNumber } from 'bignumber.js';
import { logger as log } from '../helper/logger';
import { ConversionError } from '../constants/conversion-error';
import {
  convertCurrenciesWithNonFixedRateHelper,
  CURR_FORMAT
} from '../helper/non-fixed-rate-helper';

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
   * @param {ConversionParametersForFixedRate} conversionParameters:
   * A list of conversion parameters for a fixed rate. This acts as the input
   * for the conversion and the same object is provided in the resultant
   * {@link SingleFixedRateConversionResult} for correlation. The maximum
   * number of conversion parameters supported in a single call is 1000.
   *
   * @returns {BulkFixedRateConversionResult}: The conversion result for a
   * fixed rate.
   */
  public convertCurrenciesWithFixedRate(
    conversionParameters: ConversionParametersForFixedRate[]
  ): BulkFixedRateConversionResult {
    if (!this.validateBulkFixedConversionParameters(conversionParameters)) {
      log?.error(ConversionError.INVALID_PARAMS);
      throw new CurrencyConversionError(ConversionError.INVALID_PARAMS);
    }
    const resultMap: Map<
      ConversionParametersForFixedRate,
      SingleFixedRateConversionResult | CurrencyConversionError
    > = new Map();
    for (const conversionParameter of conversionParameters) {
      try {
        const singleConversionResult: SingleFixedRateConversionResult = this.convertCurrencyWithFixedRate(
          conversionParameter
        );
        resultMap.set(conversionParameter, singleConversionResult);
      } catch (error) {
        log?.error(
          'Fixed Rate Conversion Failed for parameter : ' +
            conversionParameter +
            'with Exception :',
          error
        );
        resultMap.set(
          conversionParameter,
          new CurrencyConversionError((error as Error).message)
        );
      }
    }
    return new BulkFixedRateConversionResult(resultMap);
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
   * @param {ConversionParametersForFixedRate} conversionParameter A list of
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
    conversionParameter: ConversionParametersForFixedRate
  ): SingleFixedRateConversionResult {
    if (!this.validateSingleFixedConversionParameter(conversionParameter)) {
      log?.error(ConversionError.INVALID_PARAMS);
      throw new CurrencyConversionError(ConversionError.INVALID_PARAMS);
    }
    const singleConversionResult: SingleFixedRateConversionResult = this.performSingleFixedConversion(
      conversionParameter
    );
    return singleConversionResult;
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
   * @param {ConversionParametersForNonFixedRate} conversionParameter:
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
    conversionParameter: ConversionParametersForNonFixedRate,
    adapter: DataAdapter,
    tenant: Tenant,
    overrideTenantSetting?: TenantSettings
  ): SingleNonFixedRateConversionResult {
    if (!this.validateSingleNonFixedConversionParameter(conversionParameter)) {
      log?.error(ConversionError.INVALID_PARAMS);
      throw new CurrencyConversionError(ConversionError.INVALID_PARAMS);
    }
    const bulkConversionResult: BulkNonFixedRateConversionResult = convertCurrenciesWithNonFixedRateHelper(
      Array.of(conversionParameter),
      adapter,
      tenant,
      overrideTenantSetting
    );
    const singleConversionResult = bulkConversionResult.get(
      conversionParameter
    );
    if (singleConversionResult instanceof Error) {
      throw new CurrencyConversionError(singleConversionResult.message);
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
   * @param {ConversionParametersForNonFixedRate} conversionParameter: A list of
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
    conversionParameter: ConversionParametersForNonFixedRate[],
    adapter: DataAdapter,
    tenant: Tenant,
    overrideTenantSetting?: TenantSettings
  ): BulkNonFixedRateConversionResult {
    if (!this.validateBulkNonFixedConversionParameters(conversionParameter)) {
      log?.error(ConversionError.INVALID_PARAMS);
      throw new CurrencyConversionError(ConversionError.INVALID_PARAMS);
    }
    const bulkConversionResult: BulkNonFixedRateConversionResult = convertCurrenciesWithNonFixedRateHelper(
      conversionParameter,
      adapter,
      tenant,
      overrideTenantSetting
    );
    return bulkConversionResult;
  }

  private validateSingleNonFixedConversionParameter(
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    if (conversionParameter === null || conversionParameter === undefined) {
      log?.error(
        'The conversion parameter for non fixed conversion is null or undefined'
      );
      return false;
    }
    return true;
  }

  private validateSingleFixedConversionParameter(
    conversionParameter: ConversionParametersForFixedRate
  ): boolean {
    if (conversionParameter === null || conversionParameter === undefined) {
      log?.error(
        'The conversion parameter for fixed conversion is null or undefined'
      );
      return false;
    }
    return true;
  }

  private validateBulkFixedConversionParameters(
    conversionParams: ConversionParametersForFixedRate[]
  ): boolean {
    if (conversionParams === null || conversionParams === undefined) {
      log?.error(
        'The conversion parameter list for non fixed conversion is null or empty'
      );
      return false;
    }
    if (
      conversionParams.length === 0 ||
      conversionParams.length >
        CurrencyConverter.MAXIMUM_CONVERSION_PARAMETER_ALLOWED
    ) {
      log?.error(
        'The conversion parameter list for fixed conversion is empty or the number of parameters for fixed conversion exceeded the allowed limit.'
      );
      return false;
    }
    return true;
  }

  private validateBulkNonFixedConversionParameters(
    conversionParams: ConversionParametersForNonFixedRate[]
  ): boolean {
    if (conversionParams === null || conversionParams === undefined) {
      log?.error(
        'The conversion parameter list for non fixed conversion is null or empty'
      );
      return false;
    }
    if (
      conversionParams.length === 0 ||
      conversionParams.length >
        CurrencyConverter.MAXIMUM_CONVERSION_PARAMETER_ALLOWED
    ) {
      log?.error(
        'The conversion parameter list for fixed conversion is empty or the number of parameters for fixed conversion exceeded the allowed limit.'
      );
      return false;
    }
    return true;
  }
  private performSingleFixedConversion(
    conversionParams: ConversionParametersForFixedRate
  ): SingleFixedRateConversionResult {
    let convertedAmount: CurrencyAmount;
    if (
      conversionParams.fromCurrency.currencyCode ===
      conversionParams.toCurrency.currencyCode
    ) {
      convertedAmount = new CurrencyAmount(
        conversionParams.fromAmount.decimalValue.toFormat(CURR_FORMAT)
      );
    } else {
      convertedAmount = this.calculateConvertedAmtForFixedRate(
        conversionParams
      );
    }
    const numOfDefaultFractionDigs =
      conversionParams.toCurrency.defaultFractionDigits;
    const roundedValString = convertedAmount.decimalValue.toFormat(
      numOfDefaultFractionDigs,
      BigNumber.ROUND_HALF_UP,
      CURR_FORMAT
    );
    const roundedOffAmount = new CurrencyAmount(roundedValString);
    return new SingleFixedRateConversionResult(
      convertedAmount,
      roundedOffAmount
    );
  }

  private calculateConvertedAmtForFixedRate(
    conversionParams: ConversionParametersForFixedRate
  ): CurrencyAmount {
    const result = conversionParams.fromAmount.decimalValue.multipliedBy(
      conversionParams.fixedRateValue.decimalValue
    );
    return new CurrencyAmount(result.toFormat(CURR_FORMAT));
  }
}
