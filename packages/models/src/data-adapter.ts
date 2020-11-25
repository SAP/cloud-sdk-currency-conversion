/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core/dist/scp-cf/tenant';
import { ConversionParametersForNonFixedRate } from './conversion-parameters-for-non-fixed-rate';
import { ExchangeRate } from './exchange-rate';
import { ExchangeRateTypeDetail } from './exchange-rate-type-detail';
import { RateType } from './rate-type';
import { TenantSettings } from './tenant-settings';
/**
 * An interface with the method signatures to get exchange rates, exchange rate type details and default tenant
 * settings. You must provide an implementation of this interface when calling the non-fixed rate Conversion APIs. This
 * enables the library to fetch the relevant {@link ExchangeRate}, {@link ExchangeRateTypeDetail} and
 * {@link TenantSettings} to perform conversions.
 */
export interface DataAdapter {
  /**
   * Returns a list of {@link ExchangeRate} to be used for conversion for a given list of
   * {@link ConversionParametersForNonFixedRate}. It fetches the exchange rates with the given {@link TenantSettings}
   * for a specific {@link Tenant}. It is recommended that its implementation provides a minimal response so that the
   * conversion process is optimized.
   *
   * @param conversionParameters
   *            The {@link ConversionParametersForNonFixedRate} to fetch the relevant exchange rates.
   *
   * @param tenant
   *            The {@link Tenant} for which the conversion is requested.
   *
   * @param tenantSettings
   *            The {@link TenantSettings} to fetch the relevant exchange rates.
   *
   * @return The list of {@link ExchangeRate}.
   *
   * @throws DataAdapterException
   *             An exception that occurs when none of the requested conversions could be processed.
   */
  getExchangeRatesForTenant(
    conversionParameters: ConversionParametersForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings | null | undefined
  ): ExchangeRate[];

  /**
   * Returns the default {@link TenantSettings} associated with a {@link Tenant}.
   *
   * @param tenant
   *            The {@link Tenant} for which the conversion is requested.
   *
   * @return The default {@link TenantSettings} for the given {@link Tenant}.
   *
   * @throws DataAdapterException
   *             An exception that occurs when none of the requested conversions could be processed.
   */
  getDefaultSettingsForTenant(tenant: Tenant): TenantSettings;
  /**
   * Returns the {@link Map} of the {@link ExchangeRateTypeDetail} with the {@link RateType} as the key for a given
   * {@link Set} of {@link RateType}. It fetches the details of the given rate types. Based on that the details, we
   * can determine if the inversion is allowed for the rate type and if there is any reference currency specified for
   * the rate type.
   *
   * @param tenant
   *            The {@link Tenant} for which the exchange rate type details is requested.
   * @param rateTypeSet
   *            The {@link Set} of {@link RateType} used to fetch the relevant exchange rate type details.
   *
   * @return The {@link Map} of the {@link ExchangeRateTypeDetail} with the {@link RateType} as the key.
   *
   * @throws DataAdapterException
   *             An exception that occurs when none of the requested conversions could be processed.
   */

  getExchangeRateTypeDetailsForTenant(
    tenant: Tenant,
    rateTypeSet: Set<RateType>
  ): Map<RateType, ExchangeRateTypeDetail>;
}
