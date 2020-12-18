/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  buildCurrency,
  DataAdapter,
  TenantSettings,
  ExchangeRateTypeDetail,
  ConversionParameterForNonFixedRate,
  ExchangeRate,
  ExchangeRateValue
} from '@sap-cloud-sdk/currency-conversion-models';
import { isNullish } from '@sap-cloud-sdk/util';
import { logger as log, logAndGetError } from './helper/logger';
import { AdapterError } from './constants/adapter-error';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cds = require('@sap/cds');
const { SELECT } = cds.ql;

/**
 * Data Adapter provides the implementation of {@link DataAdapter} specific to the integration object provided for
 * currency conversion. It has the method implementation to get exchange rates, default tenant settings and exchange
 * rate type details from the relevant database tables. This enables the library to fetch the relevant
 * {@link ExchangeRate}, {@link TenantSettings} and {@link ExchangeRateTypeDetails} to perform conversions.
 */
export class SimpleIntegrationObjectsAdapter implements DataAdapter {
  /**
   * Returns a list of {@link ExchangeRate} to be used for conversion for a given list of
   * {@link ConversionParameterForNonFixedRate} , {@link TenantSettings} for a specific {@link Tenant}. It performs
   * the select query for the exchange rates on CurrencyExchangeRates table.
   *
   * @param conversionParameters
   *            The {@link ConversionParameterForNonFixedRate} to fetch the relevant exchange rates.
   *
   * @param tenant
   *            The {@link Tenant} for which the conversion is requested.
   *
   * @param tenantSettings
   *            The {@link TenantSettings} to fetch the relevant exchange rates.
   *
   * @returns The promise of list of {@link ExchangeRate}.
   *
   * @throws DataAdapterException
   *             An exception that occurs when none of the requested conversions could be processed.
   */
  async getExchangeRatesForTenant(
    conversionParameters: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): Promise<ExchangeRate[]> {
    try {
      if (isNullish(conversionParameters) || conversionParameters.length === 0) {
        throw logAndGetError(AdapterError.NULL_CONVERSION_PARAMETERS);
      }

      const rateTypeSet: Set<string> = new Set();
      conversionParameters.map((param: any) => {
        rateTypeSet.add(param.exchangeRateType);
      });
      const exchangeRateTypeDetailMap = await this.getExchangeRateTypeDetailsForTenant(tenant, rateTypeSet);
      const exchangeRateQuery = this.prepareQueryForExchangeRatesForTenant(
        conversionParameters,
        tenant,
        tenantSettings,
        exchangeRateTypeDetailMap
      );
      log.debug(`CDS Query generated: ${exchangeRateQuery}`);
      const resultSet = await cds.run(exchangeRateQuery);
      return this.fetchExchangeRateFromResultSet(resultSet);
    } catch (error) {
      throw logAndGetError(AdapterError.EXCHANGE_RATE_CONNECTION_ERROR);
    }
  }

  prepareQueryForExchangeRatesForTenant(
    conversionParameters: ConversionParameterForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings,
    exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail>
  ): any {
    const { CurrencyExchangeRates } = cds.entities('com.sap.integrationmodel.currencyconversion');
    let predicate = '';

    conversionParameters.forEach((param: any, index: any) => {
      predicate += index === 0 ? `( tenantID = '${tenant.id}' ` : `or ( tenantID = '${tenant.id}' `;
      if (tenantSettings != null) {
        predicate += `and dataProviderCode = '${tenantSettings.ratesDataProviderCode}' 
          and dataSource = '${tenantSettings.ratesDataSource}'`;
      }
      predicate += `and exchangeRateType = '${param.exchangeRateType}' 
        and validFromDateTime <= '${param.conversionAsOfDateTime.toISOString()}' 
        and ( ( fromCurrencyThreeLetterISOCode = '${param.fromCurrency.currencyCode}' 
        and toCurrencyThreeLetterISOCode = '${param.toCurrency.currencyCode}' ) `;
      predicate = this.addReferenceAndInverseCurrency(param, exchangeRateTypeDetailMap, predicate);
      predicate += ') )';
    });

    const exchangeRateQuery: any = SELECT.from(CurrencyExchangeRates)
      .where(predicate)
      .orderBy('validFromDateTime', 'desc');
    return exchangeRateQuery;
  }

  addReferenceAndInverseCurrency(
    conversionParameter: ConversionParameterForNonFixedRate,
    exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail>,
    predicate: string
  ): string {
    if (this.referenceCurrencyExists(conversionParameter.exchangeRateType, exchangeRateTypeDetailMap)) {
      predicate = this.buildPredicateForReferenceCurrency(predicate, conversionParameter, exchangeRateTypeDetailMap);
    }
    if (this.isInversionAllowed(conversionParameter.exchangeRateType, exchangeRateTypeDetailMap)) {
      predicate = this.buildPredicateForInvertedCurrency(predicate, conversionParameter);
    }
    return predicate;
  }

  referenceCurrencyExists(rateType: string, exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail>): boolean {
    return (
      this.rateTypeExists(rateType, exchangeRateTypeDetailMap) &&
      exchangeRateTypeDetailMap.get(rateType)?.referenceCurrency != null
    );
  }

  rateTypeExists(rateType: string, exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail>): boolean {
    return (
      exchangeRateTypeDetailMap != null &&
      exchangeRateTypeDetailMap.size !== 0 &&
      exchangeRateTypeDetailMap.get(rateType) != null
    );
  }

  isInversionAllowed(rateType: string, exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail>): boolean {
    const exchangeRateTypeDetail: ExchangeRateTypeDetail | undefined = exchangeRateTypeDetailMap.get(rateType);
    const isInversible = exchangeRateTypeDetail ? exchangeRateTypeDetail.isInversionAllowed : false;
    return this.rateTypeExists(rateType, exchangeRateTypeDetailMap) && isInversible;
  }

  buildPredicateForReferenceCurrency(
    exchangeRateQuery: string,
    conversionParameter: ConversionParameterForNonFixedRate,
    exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail>
  ): string {
    const exchangeRateTypeDetail: ExchangeRateTypeDetail | undefined = exchangeRateTypeDetailMap.get(
      conversionParameter.exchangeRateType
    );

    // Build the predicate for 'from' to 'reference currency'
    exchangeRateQuery += `or ( fromCurrencyThreeLetterISOCode = '${conversionParameter.fromCurrency.currencyCode}' 
        and toCurrencyThreeLetterISOCode = '${exchangeRateTypeDetail?.referenceCurrency?.currencyCode}' ) `;

    // Build the predicate for 'to' to 'reference currency'
    exchangeRateQuery += `or ( fromCurrencyThreeLetterISOCode = '${conversionParameter.toCurrency.currencyCode}' 
        and toCurrencyThreeLetterISOCode = '${exchangeRateTypeDetail?.referenceCurrency?.currencyCode}' ) `;

    return exchangeRateQuery;
  }

  buildPredicateForInvertedCurrency(
    exchangeRateQuery: string,
    conversionParameter: ConversionParameterForNonFixedRate
  ): string {
    // Build the predicate for inverted currency pair
    exchangeRateQuery += `or ( fromCurrencyThreeLetterISOCode = '${conversionParameter.toCurrency.currencyCode}' 
        and toCurrencyThreeLetterISOCode = '${conversionParameter.fromCurrency.currencyCode}' ) `;

    return exchangeRateQuery;
  }

  fetchExchangeRateFromResultSet(exchangeRateResults: ExchangeRate[]): ExchangeRate[] {
    const exchangeRateList: ExchangeRate[] = exchangeRateResults.map((result: any) => {
      const TENANT_ID = { id: result.tenantID };
      return new ExchangeRate(
        TENANT_ID,
        result.dataProviderCode == null ? (null as any) : result.dataProviderCode,
        result.dataSource == null ? (null as any) : result.dataSource,
        result.exchangeRateType,
        new ExchangeRateValue(result.exchangeRateValue.toString()),
        buildCurrency(result.fromCurrencyThreeLetterISOCode),
        buildCurrency(result.toCurrencyThreeLetterISOCode),
        new Date(result.validFromDateTime),
        result.isIndirect,
        parseFloat(result.fromCurrencyFactor),
        parseFloat(result.toCurrencyFactor)
      );
    });
    log.debug(`Number of exchange rates returned from query is: ${exchangeRateResults.length}`);
    log.debug(`Exchange rates returned from query is: ${exchangeRateList}`);
    return exchangeRateList;
  }

  /**
   * Returns the {@link TenantSettings} associated with a {@link Tenant}. It only fetches the entry for which
   * isConfigurationActive is set to true. It performs the select query for {@link TenantSettings} on
   * TenantConfigForConversions table.
   *
   * @param tenant
   *            The {@link Tenant} for which the conversion is requested.
   *
   * @returns The promise of default {@link TenantSettings} for the given {@link Tenant}.
   *
   * @throws DataAdapterException
   *             An exception that occurs when none of the requested conversions could be processed.
   */
  async getDefaultSettingsForTenant(tenant: Tenant): Promise<TenantSettings> {
    try {
      const { TenantConfigForConversions } = cds.entities('com.sap.integrationmodel.currencyconversion');
      const defaultTenantSettingsResult = await cds
        .read(TenantConfigForConversions)
        .where(`tenantID = '${tenant.id}' and isConfigurationActive = true`);
      return this.fetchDefaultSettingsForTenantFromResultSet(defaultTenantSettingsResult);
    } catch (error) {
      throw logAndGetError(AdapterError.TENANT_SETTING_CONNECTION_ERROR);
    }
  }

  fetchDefaultSettingsForTenantFromResultSet(defaultTenantSettingsResult: any): TenantSettings {
    // get the last tenant setting
    const defaultTenantSetting = defaultTenantSettingsResult[defaultTenantSettingsResult.length - 1];
    const tenantSettings: TenantSettings = {
      ratesDataProviderCode: defaultTenantSetting.defaultDataProviderCode,
      ratesDataSource: defaultTenantSetting.defaultDataSource
    };
    log.debug(`Tenant settings returned from query is: ${tenantSettings}`);
    return tenantSettings;
  }

  /**
   * Returns the {@link Map} of the {@link ExchangeRateTypeDetail} with the {@link RateType} as the key for a given
   * {@link Set} of {@link RateType}. Based on that the details, we can determine if the inversion is allowed for the
   * rate type and if there is any reference currency specified for the rate type. It performs the select query for
   * {@link ExchangeRateTypeDetail} on ExchangeRateTypes table.
   *
   * @param tenant
   *            The {@link Tenant} for which the exchange rate type details is requested.
   * @param rateTypeSet
   *            The {@link Set} of {@link RateType} used to fetch the relevant exchange rate type details.
   *
   * @returns The promise of {@link Map} of the {@link ExchangeRateTypeDetail} with the {@link RateType} as the key.
   *
   * @throws DataAdapterException
   *             An exception that occurs when none of the requested conversions could be processed.
   */
  async getExchangeRateTypeDetailsForTenant(
    tenant: Tenant,
    rateTypeSet: Set<string>
  ): Promise<Map<string, ExchangeRateTypeDetail>> {
    try {
      const { ExchangeRateTypes } = cds.entities('com.sap.integrationmodel.currencyconversion');
      this.isRateTypeNullOrEmpty(rateTypeSet);

      let predicate = `tenantID = '${tenant.id}' and ( `;
      const rateTypes = Array.from(rateTypeSet);
      rateTypes.slice(0, -1).forEach((rateType: string) => {
        predicate += `exchangeRateType = '${rateType}' or `;
      });
      predicate += `exchangeRateType = '${rateTypes[rateTypes.length - 1]}' )`;
      const rateTypeDetailsQuery: any = SELECT.from(ExchangeRateTypes).where(predicate);
      const exchangeRateTypeDetailsResults: JSON[] = await cds.run(rateTypeDetailsQuery);
      return this.fetchExchangeRateTypeDetailsForTenantFromResultSet(exchangeRateTypeDetailsResults);
    } catch (error) {
      throw logAndGetError(AdapterError.EXCHANGE_RATE_DETAIL_CONNECTION_ERROR);
    }
  }

  fetchExchangeRateTypeDetailsForTenantFromResultSet(
    exchangeRateTypeDetailsResults: JSON[]
  ): Map<string, ExchangeRateTypeDetail> {
    const exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail> = new Map();
    exchangeRateTypeDetailsResults.forEach((result: any) => {
      exchangeRateTypeDetailMap.set(
        result.exchangeRateType,
        new ExchangeRateTypeDetail(
          result.referenceCurrencyThreeLetterISOCode === 'NULL'
            ? (null as any)
            : buildCurrency(result.referenceCurrencyThreeLetterISOCode),
          result.isInversionAllowed
        )
      );
    });
    exchangeRateTypeDetailMap.forEach((value, key) => {
      log.debug(key, value);
    });
    return exchangeRateTypeDetailMap;
  }

  isRateTypeNullOrEmpty(rateTypeSet: Set<string>): void {
    if (isNullish(rateTypeSet)) {
      throw logAndGetError(AdapterError.EMPTY_RATE_TYPE_LIST);
    }
  }
}
