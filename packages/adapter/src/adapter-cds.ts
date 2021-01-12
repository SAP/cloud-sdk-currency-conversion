/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  buildCurrency,
  DataAdapter,
  TenantSettings,
  ExchangeRateTypeDetail,
  ConversionParameterForNonFixedRate,
  ExchangeRate,
  ExchangeRateValue,
  logAndGetError,
  logger as log
} from '@sap-cloud-sdk/currency-conversion-models';
import { isNullish } from '@sap-cloud-sdk/util';
import {
  buildPredicateForDefaultTenantSettings,
  buildPredicateForExchangeRates,
  buildPredicateForExchangeRateTypeDetails
} from './cds-predicate-builder';
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
   * @throws AdapterError
   *             An error that occurs when none of the requested conversions could be processed.
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
      const exchangeRateTypes = conversionParameters.map((param: any) => param.exchangeRateType);
      const exchangeRateTypeDetailMap = await this.getExchangeRateTypeDetailsForTenant(tenant, exchangeRateTypes);
      const { CurrencyExchangeRates } = cds.entities('com.sap.integrationmodel.currencyconversion');
      const exchangeRateQuery = SELECT.from(CurrencyExchangeRates)
        .where(buildPredicateForExchangeRates(conversionParameters, tenant, tenantSettings, exchangeRateTypeDetailMap))
        .orderBy('validFromDateTime', 'desc');
      log.debug(`CDS Query generated: ${exchangeRateQuery}`);
      const resultSet = await exchangeRateQuery;

      return this.buildExchangeRates(resultSet);
    } catch (error) {
      throw logAndGetError(AdapterError.EXCHANGE_RATE_CONNECTION_ERROR);
    }
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
   * @throws AdapterError
   *             An error that occurs when none of the requested conversions could be processed.
   */
  async getDefaultSettingsForTenant(tenant: Tenant): Promise<TenantSettings> {
    try {
      const { TenantConfigForConversions } = cds.entities('com.sap.integrationmodel.currencyconversion');
      const defaultTenantSettingsResult = await SELECT.from(TenantConfigForConversions).where(
        buildPredicateForDefaultTenantSettings(tenant)
      );
      return this.buildDefaultSettingsForTenant(defaultTenantSettingsResult);
    } catch (error) {
      throw logAndGetError(AdapterError.TENANT_SETTING_CONNECTION_ERROR);
    }
  }

  /**
   * Returns the {@link Map} of the {@link ExchangeRateTypeDetail} with the {@link RateType} as the key for a given
   * {@link Set} of {@link RateType}. Based on that the details, we can determine if the inversion is allowed for the
   * rate type and if there is any reference currency specified for the rate type. It performs the select query for
   * {@link ExchangeRateTypeDetail} on ExchangeRateTypes table.
   *
   * @param tenant
   *            The {@link Tenant} for which the exchange rate type details is requested.
   * @param rateTypes
   *            The {@link Array} of {@link RateType} used to fetch the relevant exchange rate type details.
   *
   * @returns The promise of {@link Map} of the {@link ExchangeRateTypeDetail} with the {@link RateType} as the key.
   *
   * @throws AdapterError
   *             An error that occurs when none of the requested conversions could be processed.
   */
  async getExchangeRateTypeDetailsForTenant(
    tenant: Tenant,
    rateTypes: string[]
  ): Promise<Map<string, ExchangeRateTypeDetail>> {
    try {
      const { ExchangeRateTypes } = cds.entities('com.sap.integrationmodel.currencyconversion');
      const exchangeRateTypeDetailsResults = await SELECT.from(ExchangeRateTypes).where(
        buildPredicateForExchangeRateTypeDetails(rateTypes, tenant)
      );
      return this.buildExchangeRateTypeDetails(exchangeRateTypeDetailsResults);
    } catch (error) {
      throw logAndGetError(AdapterError.EXCHANGE_RATE_DETAIL_CONNECTION_ERROR);
    }
  }

  private buildExchangeRates(exchangeRateResults: ExchangeRate[]): ExchangeRate[] {
    const exchangeRateList: ExchangeRate[] = exchangeRateResults.map(
      (result: any) =>
        new ExchangeRate(
          { id: result.tenantID },
          result.dataProviderCode,
          result.dataSource,
          result.exchangeRateType,
          new ExchangeRateValue(result.exchangeRateValue.toString()),
          buildCurrency(result.fromCurrencyThreeLetterISOCode),
          buildCurrency(result.toCurrencyThreeLetterISOCode),
          new Date(result.validFromDateTime),
          result.isRateValueIndirect,
          parseFloat(result.fromCurrencyFactor),
          parseFloat(result.toCurrencyFactor)
        )
    );
    log.debug(`Number of exchange rates returned from query is: ${exchangeRateResults.length}`);
    log.debug(`Exchange rates returned from query is: ${exchangeRateList}`);
    return exchangeRateList;
  }

  private buildExchangeRateTypeDetails(exchangeRateTypeDetailsResults: any[]): Map<string, ExchangeRateTypeDetail> {
    const exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail> = exchangeRateTypeDetailsResults.reduce(
      (map: Map<string, ExchangeRateTypeDetail>, result: any) =>
        map.set(
          result.exchangeRateType,
          new ExchangeRateTypeDetail(
            result.referenceCurrencyThreeLetterISOCode === 'NULL'
              ? (null as any)
              : buildCurrency(result.referenceCurrencyThreeLetterISOCode),
            result.isInversionAllowed
          )
        ),
      new Map()
    );
    log.debug(
      `Map(\n${Array.from(exchangeRateTypeDetailMap)
        .map(([key, value]) => `  ${key}: ${JSON.stringify(value, null, 2)}`)
        .join(',\n')}\n)`
    );
    return exchangeRateTypeDetailMap;
  }

  private buildDefaultSettingsForTenant(defaultTenantSettingsResult: any): TenantSettings {
    // get the last tenant setting
    const defaultTenantSetting = defaultTenantSettingsResult[defaultTenantSettingsResult.length - 1];
    const tenantSettings: TenantSettings = {
      ratesDataProviderCode: defaultTenantSetting.defaultDataProviderCode,
      ratesDataSource: defaultTenantSetting.defaultDataSource
    };
    log.debug(`Tenant settings returned from query is: ${tenantSettings}`);
    return tenantSettings;
  }
}
