/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core/dist/scp-cf/tenant';
import { isNullish } from '@sap-cloud-sdk/util';
import {
  CurrencyConversionError,
  ConversionParametersForNonFixedRate,
  ExchangeRate,
  ExchangeRateValue,
  ExchangeRateTypeDetail,
  TenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { ConversionModelError } from '@sap-cloud-sdk/currency-conversion-models/src/constants/conversion-model-error';
import { BigNumber } from 'bignumber.js';
import { logger as log } from '../helper/logger';
import { ConversionError } from '../constants/conversion-error';
import { setBigNumberConfig } from '../helper/set-big-number-config';
import { checkEmptyString } from '../helper/check-empty-string';
import { validateCurrencyFactor } from '../helper/validate-currency-factor';

export class ExchangeRateRecordDeterminer {
  private static readonly DEFAULT_SCALE: number = 14;
  private _tenant: Tenant;
  private _tenantSettings: TenantSettings;
  private _exchangeRateResultSet: ExchangeRate[];
  private _exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail>;
  private _isTenantSettingNull: boolean;

  constructor(
    tenant: Tenant,
    tenantSettings: TenantSettings,
    exchangeRateResultSet: ExchangeRate[],
    exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail>
  ) {
    this._tenant = tenant;
    this._tenantSettings = tenantSettings;
    this._exchangeRateResultSet = exchangeRateResultSet;
    this._exchangeRateTypeDetailMap = exchangeRateTypeDetailMap;
    this._isTenantSettingNull = isNullish(tenantSettings);
    log?.debug('Tenant setting is: ', JSON.stringify(tenantSettings));
  }

  public getBestMatchedExchangeRateRecord(
    conversionParameter: ConversionParametersForNonFixedRate
  ): ExchangeRate {
    const filterdExchangeRateList: ExchangeRate[] = this.getSortedFilteredExchangeRateResultSet(
      conversionParameter
    );
    const firstItemFromList: ExchangeRate = this.getFirstEntryFromList(
      filterdExchangeRateList
    );
    log?.debug(
      'For conversionRequest ' +
        JSON.stringify(conversionParameter.fromCurrency) +
        ' - ' +
        JSON.stringify(conversionParameter.toCurrency) +
        ' - ' +
        conversionParameter.conversionAsOfDateTime +
        ' exchange rate information to be used is valid date ' +
        firstItemFromList.validFromDateTime +
        ' - rate value as ' +
        JSON.stringify(firstItemFromList.exchangeRateValue) +
        ' - inverted entry as ' +
        firstItemFromList.isIndirect
    );
    return firstItemFromList;
  }

  private getSortedFilteredExchangeRateResultSet(
    conversionParameter: ConversionParametersForNonFixedRate
  ): ExchangeRate[] {
    let exchangeRateResultSetforConversion: ExchangeRate[];
    this.validateString(
      conversionParameter.exchangeRateType,
      ConversionModelError.NULL_RATE_TYPE
    );
    if (this.referenceCurrencyExists(conversionParameter.exchangeRateType)) {
      /* If the reference currency is provided, then get all the exchange rate
       * records including it.
       */
      log?.debug(
        'Reference currency is defined for the exchange rate type in the conversion parameter - ',
        JSON.stringify(
          this._exchangeRateTypeDetailMap?.get(
            conversionParameter.exchangeRateType
          )?.referenceCurrency
        )
      );
      exchangeRateResultSetforConversion = this.getResultSetWithReferenceCurrency(
        conversionParameter
      );
    } else {
      log?.debug(
        'Reference currency is not defined for the exchange rate type in the conversion parameter. Conversion will be performed with either direct or inverted rate.'
      );
      const exchangeRateWithBothDirectAndInvertedCurrencyPair: ExchangeRate[] = this.getResultSetWithBothDirectAndInvertedCurrencyPair(
        conversionParameter
      ); // get the result set having all the combination of 'To/From' currency.
      log?.debug(
        "Number of exchange rate records with all the combination of 'To/From' currency is  - ",
        exchangeRateWithBothDirectAndInvertedCurrencyPair.length
      );
      /* check if there is a record with direct currency pair as the conversion
       * parameter, else take the record with inverted currency pair.
       */
      exchangeRateResultSetforConversion = this.getExchangeRateWithEitherDirectOrInvertedCurrencyPair(
        exchangeRateWithBothDirectAndInvertedCurrencyPair,
        conversionParameter
      );
    }
    return exchangeRateResultSetforConversion;
  }

  private getResultSetWithReferenceCurrency(
    conversionParameter: ConversionParametersForNonFixedRate
  ): ExchangeRate[] {
    /* Get all exchange rates with 'From' Currency as 'From' or 'To' Currency of
     * conversionParameter or 'To' Currency as Reference Currency or direct rate
     * i.e. matched 'From' and 'To' Currency in exchange rate and conversion
     * parameter.
     */
    const fromOrToOrDirectReferenceCurrencyPair: ExchangeRate[] = this.getFilteredResultSetWithReferenceCurrency(
      conversionParameter
    );

    log?.debug(
      "Number of exchange rate records with 'From' Currency as 'From' or 'To' Currency of conversionParameter or 'To' Currency as Reference Currency or direct rate is - ",
      fromOrToOrDirectReferenceCurrencyPair.length
    );

    /* Get all exchange rates with 'From' Currency as 'From' Currency of
     * conversionParameter & 'To' Currency as Reference Currency.
     */
    const fromReferenceCurrencyPair: ExchangeRate[] = this.getFilterdResultSetFromReferenceCurrencyPair(
      conversionParameter,
      fromOrToOrDirectReferenceCurrencyPair
    );

    /* Get all exchange rates with 'From' Currency as 'To' Currency of
     * conversionParameter & 'To' Currency as Reference Currency.
     */
    const toReferenceCurrencyPair: ExchangeRate[] = this.getFilteredResultSetToReferenceCurrencyPair(
      conversionParameter,
      fromOrToOrDirectReferenceCurrencyPair
    );

    return this.getEitherDerivedOrDirectConversion(
      fromOrToOrDirectReferenceCurrencyPair,
      fromReferenceCurrencyPair,
      toReferenceCurrencyPair,
      conversionParameter
    );
  }

  private getEitherDerivedOrDirectConversion(
    fromOrToOrDirectReferenceCurrencyPair: ExchangeRate[],
    fromReferenceCurrencyPair: ExchangeRate[],
    toReferenceCurrencyPair: ExchangeRate[],
    conversionParameter: ConversionParametersForNonFixedRate
  ): ExchangeRate[] {
    let exchangeRateList: ExchangeRate[];
    if (!fromReferenceCurrencyPair.length || !toReferenceCurrencyPair.length) {
      /* if either pair is empty i.e. To to Reference Currency or From
       * to Reference Currencys, look for direct currency pair.
       */
      log?.debug(
        'Could not find exchange rate record with reference currency, checking for exchange rate record with direct currency pair.'
      );
      exchangeRateList = this.getExchangeRateRecordWithDirectConversionRate(
        fromOrToOrDirectReferenceCurrencyPair,
        conversionParameter
      );
    } else {
      log?.debug(
        'Conversion is done based on reference currency ',
        JSON.stringify(
          this._exchangeRateTypeDetailMap?.get(
            conversionParameter.exchangeRateType
          )?.referenceCurrency
        )
      );
      exchangeRateList = this.getDerivedExchangeRate(
        // get the derived exchange rates
        this.getFirstEntryFromList(fromReferenceCurrencyPair),
        this.getFirstEntryFromList(toReferenceCurrencyPair)
      );
    }
    return exchangeRateList;
  }

  private getDerivedExchangeRate(
    fromReferenceCurrencyPair: ExchangeRate,
    toReferenceCurrencyPair: ExchangeRate
  ): ExchangeRate[] {
    const derivedExchangeRateValue: string = this.getDerivedExchangeRateValue(
      fromReferenceCurrencyPair,
      toReferenceCurrencyPair
    );
    const derivedExchangeRateList: ExchangeRate[] = [];
    const derivedExchangeRate: ExchangeRate = new ExchangeRate(
      this._tenant,
      this._isTenantSettingNull
        ? (null as any)
        : fromReferenceCurrencyPair.ratesDataProviderCode,
      this._isTenantSettingNull
        ? (null as any)
        : fromReferenceCurrencyPair.ratesDataSource,
      fromReferenceCurrencyPair.exchangeRateType,
      new ExchangeRateValue(derivedExchangeRateValue),
      fromReferenceCurrencyPair.fromCurrency,
      toReferenceCurrencyPair.fromCurrency,
      fromReferenceCurrencyPair.validFromDateTime.getTime() <
      toReferenceCurrencyPair.validFromDateTime.getTime()
        ? fromReferenceCurrencyPair.validFromDateTime
        : toReferenceCurrencyPair.validFromDateTime
    );
    log?.debug(
      'The derived exchange rate for conversion based on reference currency has : rates data provider as',
      JSON.stringify(derivedExchangeRate.ratesDataProviderCode),
      ' data source as',
      JSON.stringify(derivedExchangeRate.ratesDataSource),
      'rate type as',
      JSON.stringify(derivedExchangeRate.exchangeRateType),
      'exchange rate value as',
      JSON.stringify(derivedExchangeRate.exchangeRateValue.decimalValue),
      'valid from date time as',
      derivedExchangeRate.validFromDateTime
    );
    derivedExchangeRateList.push(derivedExchangeRate);
    return derivedExchangeRateList;
  }

  private getDerivedExchangeRateValue(
    fromReferenceCurrencyPair: ExchangeRate,
    toReferenceCurrencyPair: ExchangeRate
  ): string {
    /*  Exchange rate value will be x/y. x is the exchange rate value in
     * fromReferenceCurrencyPair and  y in the toReferenceCurrencyPair -
     * isIndirect will influence if the value is x or 1/x, y or 1/y.
     * Considering from and to currency factors, the formula will be =
     * (x*(tox/fromx))/(y*(toy/fromy) or (x/y)*(tox/fromx)/(toy/fromy)
     */
    const isFromReferenecPairIndirect: boolean =
      fromReferenceCurrencyPair.isIndirect;
    const fromExchangeRateValue: BigNumber =
      fromReferenceCurrencyPair.exchangeRateValue.decimalValue;
    /* zero scale results in exception in division hence we will take the
     * default value of scale as 1.
     */
    const fromExchangeRateValueScale: number =
      fromExchangeRateValue.dp() === 0 ? 1 : fromExchangeRateValue.dp();

    const isToReferenecPairIndirect: boolean =
      toReferenceCurrencyPair.isIndirect;
    const toExchangeRateValue: BigNumber =
      toReferenceCurrencyPair.exchangeRateValue.decimalValue;
    /* zero scale results in exception in division hence we will take the
     * default value of scale as 1.
     */
    const toExchangeRateValueScale: number =
      toExchangeRateValue.dp() === 0 ? 1 : toExchangeRateValue.dp();

    const additionOfScales: number =
      fromExchangeRateValueScale + toExchangeRateValueScale;
    const scaleForDivision: number =
      additionOfScales > ExchangeRateRecordDeterminer.DEFAULT_SCALE
        ? additionOfScales
        : ExchangeRateRecordDeterminer.DEFAULT_SCALE;

    const indirectFromExchangeRateValue: BigNumber = this.getIndirectRateValue(
      fromExchangeRateValue,
      fromExchangeRateValueScale
    );
    const indirectToExchangeRateValue: BigNumber = this.getIndirectRateValue(
      toExchangeRateValue,
      toExchangeRateValueScale
    );

    log?.debug(
      'FromReferenceCurrencyPair has isIndirect set to',
      isFromReferenecPairIndirect,
      'exchange rate value as',
      JSON.stringify(fromExchangeRateValue),
      '. ToReferenceCurrencyPair has isIndirect set to',
      isToReferenecPairIndirect,
      ', exchange rate value as',
      JSON.stringify(toExchangeRateValue)
    );

    let effectiveExchangeRateValue: BigNumber;
    // (tox/fromx)/(toy/fromy)
    const effectiveCurrencyFactor: number =
      this.getCurrencyFactorRatio(fromReferenceCurrencyPair) /
      this.getCurrencyFactorRatio(toReferenceCurrencyPair);

    const bigNum = setBigNumberConfig(scaleForDivision);
    // Both 'From' & 'To' to Reference currency are indirect: (1/x)/(1/y) = y/x
    if (isFromReferenecPairIndirect && isToReferenecPairIndirect) {
      effectiveExchangeRateValue = new bigNum(
        indirectFromExchangeRateValue
      ).dividedBy(indirectToExchangeRateValue);
    } else if (isFromReferenecPairIndirect) {
      effectiveExchangeRateValue = new bigNum(
        indirectFromExchangeRateValue
      ).dividedBy(toExchangeRateValue); // 'From' to Reference currency rate is indirect (1/x), 'To' to Reference currency rate is direct (y)  -> (1/x)/y = 1/(x*y)
    } else if (isToReferenecPairIndirect) {
      effectiveExchangeRateValue = new bigNum(fromExchangeRateValue).dividedBy(
        indirectToExchangeRateValue
      ); // 'From' to Reference currency rate is direct (x), 'To' to Reference currency rate is direct (1/y) -> x/(1/y) = x*y
    } else {
      effectiveExchangeRateValue = new bigNum(fromExchangeRateValue).dividedBy(
        toExchangeRateValue
      ); // Both 'From' & 'To' to Reference currency are direct -> x/y
    }
    log?.debug(
      'Effective rate for conversion based on reference currency before multiplying the effective currency factor is - ',
      JSON.stringify(effectiveExchangeRateValue)
    );
    return effectiveExchangeRateValue
      .multipliedBy(new BigNumber(effectiveCurrencyFactor.toString()))
      .toString();
  }

  private getIndirectRateValue(
    exchangeRateValue: BigNumber,
    fromExchangeRateValueScale: number
  ): BigNumber {
    if (
      JSON.stringify(exchangeRateValue) === JSON.stringify(new BigNumber(0))
    ) {
      throw new CurrencyConversionError(
        ConversionError.ZERO_RATE_REFERENCE_CURRENCY
      );
    }
    const bigNum = setBigNumberConfig(fromExchangeRateValueScale);
    return new bigNum(1).dividedBy(exchangeRateValue);
  }

  private getCurrencyFactorRatio(exchangeRate: ExchangeRate): number {
    validateCurrencyFactor(exchangeRate.toCurrencyfactor);
    validateCurrencyFactor(exchangeRate.fromCurrencyfactor);
    const currencyFactorRatio: number =
      exchangeRate.toCurrencyfactor / exchangeRate.fromCurrencyfactor;
    this.isRatioNaNOrInfinite(currencyFactorRatio);
    return currencyFactorRatio;
  }

  private isRatioNaNOrInfinite(currencyFactorRatio: number): void {
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
      throw new CurrencyConversionError(ConversionError.ZERO_CURRENCY_FACTOR);
    }
  }

  private getResultSetWithBothDirectAndInvertedCurrencyPair(
    conversionParameter: ConversionParametersForNonFixedRate
  ): ExchangeRate[] {
    let exchangeRateWithBothDirectAndInvertedCurrency: ExchangeRate[];
    exchangeRateWithBothDirectAndInvertedCurrency = this._exchangeRateResultSet.filter(
      exchangeRate =>
        this.ifCommonFiltersMatch(exchangeRate, conversionParameter) && // filter the result set based on date, tenant id, rate type
        this.ifRateFromOrToCurrencyMatchesParamFromCurrency(
          exchangeRate,
          conversionParameter
        ) && // filter the result if 'From/To' currency in exchange rate records matched 'From' currency in conversion parameter.
        this.ifRateFromOrToCurrencyMatchesParamToCurrency(
          exchangeRate,
          conversionParameter
        ) // filter the result if 'From/To' currency in exchange rate records matched 'To' currency in conversion parameter.
    );

    if (!this._isTenantSettingNull) {
      /* use the data provider code & data provider code filter only when
       * tenant setting is provided.
       */
      this.validateString(
        this._tenantSettings?.ratesDataProviderCode,
        ConversionModelError.NULL_RATES_DATA_PROVIDER_CODE
      );
      this.validateString(
        this._tenantSettings?.ratesDataSource,
        ConversionModelError.NULL_RATES_DATA_SOURCE
      );
      exchangeRateWithBothDirectAndInvertedCurrency = exchangeRateWithBothDirectAndInvertedCurrency.filter(
        exchangeRate =>
          this.ifRatesDataProviderCodeMatches(
            exchangeRate,
            this._tenantSettings?.ratesDataProviderCode
          ) &&
          this.ifRatesDataSourceMatches(
            exchangeRate,
            this._tenantSettings?.ratesDataSource
          )
      );
    }
    return exchangeRateWithBothDirectAndInvertedCurrency.sort((a, b) => {
      if (b.validFromDateTime < a.validFromDateTime) {
        return -1;
      }
      if (b.validFromDateTime > a.validFromDateTime) {
        return 1;
      }
      return 0;
    }); // sort the result set based on validFromDateTime, latest first.
  }

  private getExchangeRateWithEitherDirectOrInvertedCurrencyPair(
    exchangeRateWithBothDirectAndInvertedCurrencyList: ExchangeRate[],
    conversionParameter: ConversionParametersForNonFixedRate
  ): ExchangeRate[] {
    let exchangeRateListForGivenCurrencyPair: ExchangeRate[] = this.getExchangeRateRecordWithDirectConversionRate(
      exchangeRateWithBothDirectAndInvertedCurrencyList,
      conversionParameter
    );
    /* If there is no exchange rate record with direct from/to currency pair,
     * check if there is an exchange rate record with inverted currency pair.
     */
    if (!exchangeRateListForGivenCurrencyPair.length) {
      log?.debug(
        'Could not find exchange rate record with direct from/to currency pair, checking for exchange rate record with inverted from/to currency pair.'
      );
      exchangeRateListForGivenCurrencyPair = this.getExchangeRateRecordWithInvertedConversionRate(
        exchangeRateWithBothDirectAndInvertedCurrencyList,
        conversionParameter
      );
    }
    return exchangeRateListForGivenCurrencyPair;
  }

  private getFilteredResultSetWithReferenceCurrency(
    conversionParameter: ConversionParametersForNonFixedRate
  ): ExchangeRate[] {
    let exchangeRateWithReferenceCurrency: ExchangeRate[];
    /* filtering based on date, exchange rate type, tenant and reference
     * currency as 'To' currency.
     */
    exchangeRateWithReferenceCurrency = this._exchangeRateResultSet.filter(
      exchangeRate =>
        this.ifCommonFiltersMatch(exchangeRate, conversionParameter) &&
        this.ifRateHasDirectOrToAsReferenceCurrency(
          exchangeRate,
          conversionParameter
        )
    );

    if (!this._isTenantSettingNull) {
      /* use the data provider code & data provider code filter only when
       * tenant setting is provided.
       */
      this.validateString(
        this._tenantSettings?.ratesDataProviderCode,
        ConversionModelError.NULL_RATES_DATA_PROVIDER_CODE
      );
      this.validateString(
        this._tenantSettings?.ratesDataSource,
        ConversionModelError.NULL_RATES_DATA_SOURCE
      );
      exchangeRateWithReferenceCurrency = exchangeRateWithReferenceCurrency.filter(
        exchangeRate =>
          this.ifRatesDataProviderCodeMatches(
            exchangeRate,
            this._tenantSettings?.ratesDataProviderCode
          ) &&
          this.ifRatesDataSourceMatches(
            exchangeRate,
            this._tenantSettings?.ratesDataSource
          )
      );
    }
    return exchangeRateWithReferenceCurrency.sort((a, b) => {
      if (b.validFromDateTime < a.validFromDateTime) {
        return -1;
      }
      if (b.validFromDateTime > a.validFromDateTime) {
        return 1;
      }
      return 0;
    }); // sort the result set based on validFromDateTime, latest first.
  }

  private duplicateRateExists(
    exchangeRateForDuplicateCheck: ExchangeRate[]
  ): void {
    if (this._isTenantSettingNull) {
      // There is no filter for data provider code & data source if tenant setting is null.
      this.multipleDataSourceProviderSameTimestampExists(
        exchangeRateForDuplicateCheck
      ); // Multiple entries with same time, data provider code & data source.
      this.multipleDataSourceOrProviderExists(exchangeRateForDuplicateCheck); // Multiple entries with same time but different data provider code or data source.
    } else {
      this.sameTimestampExists(exchangeRateForDuplicateCheck); // Multiple entries with same time stamp.
    }
  }

  /* Get all exchange rates with 'From' Currency as 'From' Currency of
   * conversionParameter & 'To' Currency as Reference Currency.
   */
  private getFilterdResultSetFromReferenceCurrencyPair(
    conversionParameter: ConversionParametersForNonFixedRate,
    exchangeRateResultSetWithReferenceCurrency: ExchangeRate[]
  ): ExchangeRate[] {
    const exchangeRateList: ExchangeRate[] = exchangeRateResultSetWithReferenceCurrency
      .filter(
        exchangeRate =>
          this.ifRateToCurrencyMatchesReferenceCurrency(
            exchangeRate,
            conversionParameter
          ) &&
          this.ifRateFromCurrencyMatchesParamFromCurrency(
            exchangeRate,
            conversionParameter
          )
      )
      .sort((a, b) => {
        if (b.validFromDateTime < a.validFromDateTime) {
          return -1;
        }
        if (b.validFromDateTime > a.validFromDateTime) {
          return 1;
        }
        return 0;
      }); // sort the result set based on validFromDateTime, latest first.
    this.duplicateRateExists(exchangeRateList);
    log?.debug(
      "Number of exchange rate records with 'From' Currency as 'From' Currency of conversionParameter and 'To' Currency as Reference Currency - ",
      exchangeRateList.length
    );
    return exchangeRateList;
  }

  /* Get all exchange rates with 'From' Currency as 'To' Currency of
   * conversionParameter & 'To' Currency as Reference Currency.
   */
  private getFilteredResultSetToReferenceCurrencyPair(
    conversionParameter: ConversionParametersForNonFixedRate,
    exchangeRateResultSetWithReferenceCurrency: ExchangeRate[]
  ): ExchangeRate[] {
    const exchangeRateList: ExchangeRate[] = exchangeRateResultSetWithReferenceCurrency
      .filter(
        exchangeRate =>
          this.ifRateToCurrencyMatchesReferenceCurrency(
            exchangeRate,
            conversionParameter
          ) &&
          this.ifRateFromCurrencyMatchesParamToCurrency(
            exchangeRate,
            conversionParameter
          )
      )
      .sort((a, b) => {
        if (b.validFromDateTime < a.validFromDateTime) {
          return -1;
        }
        if (b.validFromDateTime > a.validFromDateTime) {
          return 1;
        }
        return 0;
      }); // sort the result set based on validFromDateTime, latest first.

    this.duplicateRateExists(exchangeRateList);
    log?.debug(
      "Number of exchange rate records with 'From' Currency as 'To' Currency of conversionParameter and 'To' Currency as Reference Currency - ",
      exchangeRateList.length
    );
    return exchangeRateList;
  }

  private getExchangeRateRecordWithDirectConversionRate(
    exchangeRateWithBothDirectAndInvertedCurrencyList: ExchangeRate[],
    conversionParameter: ConversionParametersForNonFixedRate
  ): ExchangeRate[] {
    const exchangeRateList: ExchangeRate[] = exchangeRateWithBothDirectAndInvertedCurrencyList.filter(
      exchangeRate =>
        this.ifFromToCurrencyMatchesForDirectConversion(
          exchangeRate,
          conversionParameter
        )
    );
    this.duplicateRateExists(exchangeRateList);
    log?.debug(
      'Number of exchange rate record with direct currency pair is - ',
      exchangeRateList.length
    );
    return exchangeRateList;
  }

  private getExchangeRateRecordWithInvertedConversionRate(
    exchangeRateWithBothDirectAndInvertedCurrencyList: ExchangeRate[],
    conversionParameter: ConversionParametersForNonFixedRate
  ): ExchangeRate[] {
    let exchangeRateList: ExchangeRate[] = new Array();
    if (this.isInversionAllowed(conversionParameter.exchangeRateType)) {
      log?.debug(
        'Inversion is allowed for the exchange rate type - ',
        JSON.stringify(conversionParameter.exchangeRateType)
      );
      exchangeRateList = exchangeRateWithBothDirectAndInvertedCurrencyList.filter(
        exchangeRate =>
          this.ifFromToCurrencyMatchesForInvertedConversion(
            exchangeRate,
            conversionParameter
          )
      );
    }
    this.duplicateRateExists(exchangeRateList);
    log?.debug(
      'Number of exchange rate record with inverted currency pair is - ',
      exchangeRateList.length
    );
    return exchangeRateList;
  }

  private multipleDataSourceProviderSameTimestampExists(
    filterdExchangeRateList: ExchangeRate[]
  ): void {
    if (filterdExchangeRateList.length > 1) {
      const firstItemFromList: ExchangeRate = this.getFirstEntryFromList(
        filterdExchangeRateList
      );
      const exchangeRateRecordWithSameTimeStamp: ExchangeRate[] = filterdExchangeRateList.filter(
        exchangeRate =>
          exchangeRate.validFromDateTime ===
            firstItemFromList.validFromDateTime &&
          this.ifRatesDataProviderMatchesOrHasNullValue(
            exchangeRate,
            firstItemFromList.ratesDataProviderCode
          ) &&
          this.ifRatesDataSourceMatchesOrHasNullValue(
            exchangeRate,
            firstItemFromList.ratesDataSource
          )
      );
      if (exchangeRateRecordWithSameTimeStamp.length !== 1) {
        const errorMessage: string =
          'Exchange Rate record to be used has Rates Data Provider Code : ' +
          JSON.stringify(firstItemFromList.ratesDataProviderCode) +
          ' Rates Data Source : ' +
          JSON.stringify(firstItemFromList.ratesDataSource) +
          ' Time stamp : ' +
          firstItemFromList.validFromDateTime;
        log?.error(errorMessage);
        throw new CurrencyConversionError(
          ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
        );
      }
    }
  }

  /*
   * Check if there are exchange record rate present with different data source
   * or data provider code for the date on which conversion is being performed.
   */
  private multipleDataSourceOrProviderExists(
    filterdExchangeRateList: ExchangeRate[]
  ): void {
    if (filterdExchangeRateList.length > 1) {
      const firstItemFromList: ExchangeRate = this.getFirstEntryFromList(
        filterdExchangeRateList
      );
      /* filter the result set which is not from future date w.r.t the time
       * conversion is to be performed.
       */
      const bestMatchedExchangeRateRecord: ExchangeRate[] = filterdExchangeRateList.filter(
        exchangeRate =>
          exchangeRate.validFromDateTime === firstItemFromList.validFromDateTime
      );

      for (const exchangeRate of bestMatchedExchangeRateRecord) {
        if (
          this.multipleDataProviderOrSourceExists(
            exchangeRate,
            firstItemFromList
          )
        ) {
          log?.error(
            'Multiple Matching exchange rate records (with different Data Provider Code or Data Source) found for conversion.'
          );
          const errorMessage: string =
            'Exchange Rate record to be used has Rates Data Provider Code : ' +
            JSON.stringify(firstItemFromList.ratesDataProviderCode) +
            ' Rates Data Source : ' +
            JSON.stringify(firstItemFromList.ratesDataSource) +
            ' Exchange Rate record found with different Data Provider Code : ' +
            JSON.stringify(exchangeRate.ratesDataProviderCode) +
            ' Data Source : ' +
            JSON.stringify(exchangeRate.ratesDataSource);
          log?.debug(errorMessage);
          throw new CurrencyConversionError(
            ConversionError.MULTIPLE_CONVERSION_RECORD_FOUND
          );
        }
      }
    }
  }

  private sameTimestampExists(filterdExchangeRateList: ExchangeRate[]): void {
    if (filterdExchangeRateList.length > 1) {
      const firstItemFromList: ExchangeRate = this.getFirstEntryFromList(
        filterdExchangeRateList
      );
      const exchangeRateRecordWithSameTimeStamp: ExchangeRate[] = filterdExchangeRateList.filter(
        exchangeRate =>
          exchangeRate.validFromDateTime === firstItemFromList.validFromDateTime
      );
      if (exchangeRateRecordWithSameTimeStamp.length !== 1) {
        const errorMessage: string =
          'Multiple Exchange Rate Records found for same timestamp - ' +
          firstItemFromList.validFromDateTime;
        log?.error('Multiple Exchange Rate Records found for same timestamp.');
        log?.debug(errorMessage);
        throw new CurrencyConversionError(
          ConversionError.DUPLICATE_CONVERSION_RECORD_FOUND
        );
      }
    }
  }

  private getFirstEntryFromList(
    filterdExchangeRateList: ExchangeRate[]
  ): ExchangeRate {
    if (!filterdExchangeRateList.length) {
      /* Throw the exception if there is no exchange rate record found
       * based on above filtering criteria.
       */
      log?.error('No Matching exchange rate record found for conversion.');
      throw new CurrencyConversionError(
        ConversionError.NO_MATCHING_EXCHANGE_RATE_RECORD
      );
    } else {
      return filterdExchangeRateList[0];
    }
  }

  private ifCommonFiltersMatch(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      this.ifTenantMatches(exchangeRate) && // filter the result set based on tenant id, currency pair & rate type.
      this.isDateOnOrBeforeConversion(exchangeRate, conversionParameter) && // filter the result set which is not from future date w.r.t the time conversion is to be performed.
      this.ifExchangeRateTypeMatches(exchangeRate, conversionParameter)
    );
  }

  private ifTenantMatches(exchangeRate: ExchangeRate): boolean {
    return exchangeRate.tenantIdentifier?.id === this._tenant.id;
  }

  private isDateOnOrBeforeConversion(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      exchangeRate.validFromDateTime.getTime() <
        conversionParameter.conversionAsOfDateTime.getTime() ||
      exchangeRate.validFromDateTime.getTime() ===
        conversionParameter.conversionAsOfDateTime.getTime()
    );
  }

  private ifExchangeRateTypeMatches(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    this.validateString(
      exchangeRate.exchangeRateType,
      ConversionModelError.NULL_RATE_TYPE
    );
    return (
      exchangeRate.exchangeRateType === conversionParameter.exchangeRateType
    );
  }

  private ifRateFromCurrencyMatchesParamFromCurrency(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      JSON.stringify(exchangeRate.fromCurrency) ===
      JSON.stringify(conversionParameter.fromCurrency)
    );
  }

  private ifRateToCurrencyMatchesParamToCurrency(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      JSON.stringify(exchangeRate.toCurrency) ===
      JSON.stringify(conversionParameter.toCurrency)
    );
  }

  private ifRateFromCurrencyMatchesParamToCurrency(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      JSON.stringify(exchangeRate.fromCurrency) ===
      JSON.stringify(conversionParameter.toCurrency)
    );
  }

  private ifRateToCurrencyMatchesParamFromCurrency(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      JSON.stringify(exchangeRate.toCurrency) ===
      JSON.stringify(conversionParameter.fromCurrency)
    );
  }

  private ifRateFromOrToCurrencyMatchesParamFromCurrency(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      this.ifRateFromCurrencyMatchesParamFromCurrency(
        exchangeRate,
        conversionParameter
      ) ||
      this.ifRateToCurrencyMatchesParamFromCurrency(
        exchangeRate,
        conversionParameter
      )
    );
  }

  private ifRateFromOrToCurrencyMatchesParamToCurrency(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      this.ifRateToCurrencyMatchesParamToCurrency(
        exchangeRate,
        conversionParameter
      ) ||
      this.ifRateFromCurrencyMatchesParamToCurrency(
        exchangeRate,
        conversionParameter
      )
    );
  }

  private ifFromToCurrencyMatchesForDirectConversion(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      this.ifRateFromCurrencyMatchesParamFromCurrency(
        exchangeRate,
        conversionParameter
      ) &&
      this.ifRateToCurrencyMatchesParamToCurrency(
        exchangeRate,
        conversionParameter
      )
    );
  }

  private ifFromToCurrencyMatchesForInvertedConversion(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      this.ifRateFromCurrencyMatchesParamToCurrency(
        exchangeRate,
        conversionParameter
      ) &&
      this.ifRateToCurrencyMatchesParamFromCurrency(
        exchangeRate,
        conversionParameter
      )
    );
  }

  /* exchange rates with 'From' Currency as 'From' or 'To' Currency of
   * conversionParameter or 'To' Currency as Reference Currency or direct rate
   * i.e. matched 'From' and 'To' Currency in exchange rate and conversion
   * parameter.
   */
  private ifRateHasDirectOrToAsReferenceCurrency(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      this.ifFromToCurrencyMatchesForDirectConversion(
        exchangeRate,
        conversionParameter
      ) ||
      (this.ifRateToCurrencyMatchesReferenceCurrency(
        exchangeRate,
        conversionParameter
      ) &&
        this.ifRateFromCurrencyMatchesParamFromOrToCurrency(
          exchangeRate,
          conversionParameter
        ))
    );
  }

  private ifRateFromCurrencyMatchesParamFromOrToCurrency(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      this.ifRateFromCurrencyMatchesParamFromCurrency(
        exchangeRate,
        conversionParameter
      ) ||
      this.ifRateFromCurrencyMatchesParamToCurrency(
        exchangeRate,
        conversionParameter
      )
    );
  }

  private ifRateToCurrencyMatchesReferenceCurrency(
    exchangeRate: ExchangeRate,
    conversionParameter: ConversionParametersForNonFixedRate
  ): boolean {
    return (
      JSON.stringify(exchangeRate.toCurrency) ===
      JSON.stringify(
        this._exchangeRateTypeDetailMap?.get(
          conversionParameter.exchangeRateType
        )?.referenceCurrency
      )
    );
  }

  private ifRatesDataProviderCodeMatches(
    exchangeRate: ExchangeRate,
    ratesDataProviderCode: string
  ): boolean {
    this.validateString(
      exchangeRate.ratesDataProviderCode,
      ConversionModelError.NULL_RATES_DATA_PROVIDER_CODE
    );
    return (
      !isNullish(exchangeRate.ratesDataProviderCode) &&
      !isNullish(ratesDataProviderCode) &&
      exchangeRate.ratesDataProviderCode === ratesDataProviderCode
    );
  }

  private ifRatesDataSourceMatches(
    exchangeRate: ExchangeRate,
    ratesDataSource: string
  ): boolean {
    this.validateString(
      exchangeRate.ratesDataSource,
      ConversionModelError.NULL_RATES_DATA_SOURCE
    );
    return (
      !isNullish(exchangeRate.ratesDataSource) &&
      !isNullish(ratesDataSource) &&
      exchangeRate.ratesDataSource === ratesDataSource
    );
  }

  private ifRatesDataProviderMatchesOrHasNullValue(
    exchangeRate: ExchangeRate,
    ratesDataProviderCode: string
  ): boolean {
    return (
      isNullish(exchangeRate.ratesDataProviderCode) ||
      isNullish(ratesDataProviderCode) ||
      this.ifRatesDataProviderCodeMatches(exchangeRate, ratesDataProviderCode)
    );
  }

  private ifRatesDataSourceMatchesOrHasNullValue(
    exchangeRate: ExchangeRate,
    ratesDataSource: string
  ): boolean {
    return (
      isNullish(exchangeRate.ratesDataSource) ||
      isNullish(ratesDataSource) ||
      this.ifRatesDataSourceMatches(exchangeRate, ratesDataSource)
    );
  }

  private referenceCurrencyExists(rateType: string): boolean {
    return (
      this.rateTypeExists(rateType) &&
      !isNullish(
        this._exchangeRateTypeDetailMap?.get(rateType)?.referenceCurrency
      )
    );
  }

  private rateTypeExists(rateType: string): boolean {
    return (
      !isNullish(this._exchangeRateTypeDetailMap) &&
      !isNullish(this._exchangeRateTypeDetailMap.get(rateType))
    );
  }

  private isInversionAllowed(rateType: string): boolean {
    return (
      this.rateTypeExists(rateType) &&
      (this._exchangeRateTypeDetailMap?.get(rateType)?.isInversionAllowed ??
        false)
    );
  }

  private multipleDataProviderOrSourceExists(
    exchangeRate: ExchangeRate,
    firstItemFromList: ExchangeRate
  ): boolean {
    this.validateString(
      firstItemFromList.ratesDataProviderCode,
      ConversionModelError.NULL_RATES_DATA_PROVIDER_CODE
    );
    this.validateString(
      firstItemFromList.ratesDataSource,
      ConversionModelError.NULL_RATES_DATA_SOURCE
    );
    return (
      !this.ifRatesDataProviderMatchesOrHasNullValue(
        exchangeRate,
        firstItemFromList.ratesDataProviderCode
      ) ||
      !this.ifRatesDataSourceMatchesOrHasNullValue(
        exchangeRate,
        firstItemFromList.ratesDataSource
      )
    );
  }

  private validateString(string: string, errorMessage: string): void {
    if (checkEmptyString(string)) {
      throw new CurrencyConversionError(errorMessage);
    }
  }
}
