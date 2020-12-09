/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import { ConversionParametersForNonFixedRate } from './conversion-parameters-for-non-fixed-rate';
import { ExchangeRate } from './exchange-rate';
import { ExchangeRateTypeDetail } from './exchange-rate-type-detail';
import { TenantSettings } from './tenant-settings';
/**
 * An interface with the method signatures to get exchange rates, exchange rate
 * type details and default tenant settings. You must provide an implementation
 * of this interface when calling the non-fixed rate Conversion APIs. This
 * enables the library to fetch the relevant {@link ExchangeRate},
 * {@link ExchangeRateTypeDetail} and {@link TenantSettings} to perform
 * conversions.
 */
export interface DataAdapter {
  /**
   * Returns a list of {@link ExchangeRate} to be used for conversion for a
   * given list of {@link ConversionParametersForNonFixedRate}. It fetches
   * the exchange rates with the given {@link TenantSettings} for a specific
   * {@link Tenant}. It is recommended that its implementation provides a
   * minimal response so that the
   * conversion process is optimized.
   *
   * @param conversionParameters
   *      The {@link ConversionParametersForNonFixedRate} to fetch the relevant
   * exchange rates.
   *
   * @param tenant
   *       The {@link Tenant} for which the conversion is requested.
   *
   * @param tenantSettings
   *        The {@link TenantSettings} to fetch the relevant exchange rates.
   *
   * @return The list of {@link ExchangeRate}.
   */
  getExchangeRatesForTenant(
    conversionParameters: ConversionParametersForNonFixedRate[],
    tenant: Tenant,
    tenantSettings: TenantSettings
  ): ExchangeRate[];

  /**
   * Returns the default {@link TenantSettings} associated with a
   * {@link Tenant}.
   *
   * @param tenant
   *            The {@link Tenant} for which the conversion is requested.
   *
   * @return The default {@link TenantSettings} for the given {@link Tenant}.
   *
   */
  getDefaultSettingsForTenant(tenant: Tenant): TenantSettings;

  /**
   * Returns the {@link Map} of the {@link ExchangeRateTypeDetail} with
   * the {@link RateType} as the key for a given
   * {@link Set} of {@link RateType}. It fetches the details of the given
   * rate types. Based on that the details, we can determine if the inversion
   * is allowed for the rate type and if there is any reference currency
   * specified for the rate type.
   *
   * @param tenant
   *            The {@link Tenant} for which the exchange rate type details
   *            is requested.
   * @param rateTypeSet
   *            The {@link Set} of {@link RateType} used to fetch the relevant
   *            exchange rate type details.
   *
   * @return The {@link Map} of the {@link ExchangeRateTypeDetail} with the
   *         {@link RateType} as the key.
   *
   */
  getExchangeRateTypeDetailsForTenant(tenant: Tenant, rateTypeSet: Set<string>): Map<string, ExchangeRateTypeDetail>;
}
