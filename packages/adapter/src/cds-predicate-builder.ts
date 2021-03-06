/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import { Tenant } from '@sap-cloud-sdk/core';
import {
  TenantSettings,
  ConversionParameterForNonFixedRate,
  ExchangeRateTypeDetail,
  Currency
} from '@sap-cloud-sdk/currency-conversion-models';
import { isNullish, unique, createLogger } from '@sap-cloud-sdk/util';
import { AdapterError } from './constants/adapter-error';
const logger = createLogger('adapter');
logger.info('Simple Inregration Objects Adapter');

export function buildPredicateForDefaultTenantSettings(tenant: Tenant): string {
  return `${getTenantIdPredicate(tenant)} and isConfigurationActive = true`;
}
export function buildPredicateForExchangeRateTypeDetails(rateTypes: string[], tenant: Tenant): string {
  const uniqueRateTypes = unique(rateTypes);
  validateExchangeRates(uniqueRateTypes);
  const exchangeRateTypePredicates = uniqueRateTypes.map(rateType => `exchangeRateType = '${rateType}'`);
  return `${getTenantIdPredicate(tenant)} and (${exchangeRateTypePredicates.join(' or ')})`;
}

export function buildPredicateForExchangeRates(
  conversionParameters: ConversionParameterForNonFixedRate[],
  tenant: Tenant,
  tenantSettings: TenantSettings,
  exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail>
): string {
  const tenantBasedPredicates = [getTenantIdPredicate(tenant), ...getTenantSettingsPredicates(tenantSettings)];
  return conversionParameters
    .map((param: ConversionParameterForNonFixedRate) => {
      const subPredicates = [
        ...tenantBasedPredicates,
        ...getPredicatesForParameter(param, exchangeRateTypeDetailMap.get(param.exchangeRateType))
      ];

      return `( ${subPredicates.join(' and ')} )`;
    })
    .join(' or ');
}

function getPredicatesForParameter(
  conversionParameter: ConversionParameterForNonFixedRate,
  exchangeRateTypeDetail: ExchangeRateTypeDetail | undefined
): string[] {
  const currencyPairs = [
    getCurrencyPair(conversionParameter.fromCurrency, conversionParameter.toCurrency),
    ...getReferenceAndInverseCurrency(conversionParameter, exchangeRateTypeDetail)
  ];

  return [
    `exchangeRateType = '${conversionParameter.exchangeRateType}'`,
    `validFromDateTime <= '${conversionParameter.conversionAsOfDateTime.toISOString()}' `,
    `( ${currencyPairs.join(' or ')} )`
  ];
}

function getTenantIdPredicate(tenant: Tenant): string {
  return `tenantID = '${tenant.id}'`;
}

function getTenantSettingsPredicates(tenantSettings: TenantSettings): string[] {
  return tenantSettings
    ? [
        `dataProviderCode = '${tenantSettings.ratesDataProviderCode}'`,
        `dataSource = '${tenantSettings.ratesDataSource}'`
      ]
    : [];
}

function getReferenceAndInverseCurrency(
  conversionParameter: ConversionParameterForNonFixedRate,
  exchangeRateTypeDetail: ExchangeRateTypeDetail | undefined
): string[] {
  if (exchangeRateTypeDetail?.referenceCurrency) {
    return [
      getCurrencyPair(conversionParameter.fromCurrency, exchangeRateTypeDetail.referenceCurrency),
      getCurrencyPair(conversionParameter.toCurrency, exchangeRateTypeDetail.referenceCurrency)
    ];
  }
  if (exchangeRateTypeDetail?.isInversionAllowed) {
    return [getCurrencyPair(conversionParameter.toCurrency, conversionParameter.fromCurrency)];
  }
  return [];
}

function getCurrencyPair(fromCurrency: Currency | undefined, toCurrency: Currency | undefined): string {
  const pair = [
    `fromCurrencyThreeLetterISOCode = '${fromCurrency?.currencyCode}'`,
    `toCurrencyThreeLetterISOCode = '${toCurrency?.currencyCode}'`
  ];
  return `( ${pair.join(' and ')} )`;
}

function validateExchangeRates(rateTypes: string[]): void {
  if (isNullish(rateTypes)) {
    throw new Error(AdapterError.EMPTY_RATE_TYPE_LIST);
  }
}
