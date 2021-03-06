/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
const cds = require('@sap/cds/lib');
const { INSERT } = cds.ql;

// monkey patching older releases:
if (!cds.compile.cdl) {
  cds.compile.cdl = cds.parse;
}

export async function insertTenantSettingsData(): Promise<void> {
  await INSERT.into('com.sap.integrationmodel.currencyconversion.TenantConfigForConversions')
    .columns(['tenantID', 'defaultDataProviderCode', 'defaultDataSource', 'isConfigurationActive'])
    .rows([
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'MRM', 'ECB', true],
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'MRM', 'ECB', false],
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'MRM', 'THR', false],
      ['5d4abe96-0000-4b47-b7ed-ae4be76f9dfb', 'MID', 'BOR', true],
      ['5d4abe96-1111-4b47-b7ed-ae4be76f9111', 'MRM', 'THR', true],
      ['5d4abe96-2222-4b47-b7ed-ae4be76f9222', 'MID', 'TIR', true],
      ['5d4abe96-2222-4b47-b7ed-ae4be76f9222', 'MID', 'TBR', false],
      ['5d4abe96-2222-4b47-b7ed-ae4be76f9222', 'MRK', 'TZR', false]
    ]);
}

export async function insertExchangeRateTypesData(): Promise<void> {
  await INSERT.into('com.sap.integrationmodel.currencyconversion.ExchangeRateTypes')
    .columns([
      'tenantID',
      'exchangeRateType',
      'exchangeRateTypeDescription',
      'isInversionAllowed',
      'referenceCurrencyThreeLetterISOCode'
    ])
    .rows([
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'MID', 'MID', false, 'NULL'],
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'BID', 'BID', false, 'INR'],
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'ASK', 'ASK', true, 'NULL'],
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'LAST', 'LAST', true, 'INR'],
      ['5d4abe96-faed-4b47-b7ed-ae4be76f9dfb', 'MID', 'MID', false, 'INR'],
      ['5d4abe96-faed-4b47-b7ed-ae4be76f9dfb', 'BID', 'BID', true, 'INR']
    ]);
}

export async function insertExchangeRatesData(): Promise<void> {
  await INSERT.into('com.sap.integrationmodel.currencyconversion.CurrencyExchangeRates')
    .columns(
      'tenantID',
      'dataProviderCode',
      'dataSource',
      'exchangeRateType',
      'fromCurrencyThreeLetterISOCode',
      'toCurrencyThreeLetterISOCode',
      'validFromDateTime',
      'exchangeRateValue',
      'isRateValueIndirect',
      'fromCurrencyFactor',
      'toCurrencyFactor'
    )
    .rows([
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'NULL',
        'NULL',
        'MID',
        'EUR',
        'INR',
        '2020-01-01T02:30:00Z',
        80.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'NULL',
        'NULL',
        'MID',
        'EUR',
        'JPY',
        '2020-01-01T02:30:00Z',
        180.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'NULL',
        'NULL',
        'MID',
        'EUR',
        'USD',
        '2020-01-01T02:30:00Z',
        180.0,
        true,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'NULL',
        'NULL',
        'MID',
        'USD',
        'JPY',
        '2020-01-01T02:30:00Z',
        180.0,
        true,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'NULL',
        'NULL',
        'MID',
        'USD',
        'INR',
        '2020-01-01T02:30:00Z',
        180.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'THR',
        'MID',
        'EUR',
        'INR',
        '2020-01-01T02:30:00Z',
        80.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'THR',
        'MID',
        'EUR',
        'JPY',
        '2020-01-01T02:30:00Z',
        180.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'THR',
        'MID',
        'EUR',
        'USD',
        '2020-01-01T02:30:00Z',
        180.0,
        true,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'THR',
        'MID',
        'USD',
        'JPY',
        '2020-01-01T02:30:00Z',
        180.0,
        true,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'THR',
        'MID',
        'USD',
        'INR',
        '2020-01-01T02:30:00Z',
        180.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'MID',
        'EUR',
        'INR',
        '2020-01-01T02:30:00Z',
        80.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'MID',
        'EUR',
        'JPY',
        '2020-01-01T02:30:00Z',
        180.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'MID',
        'EUR',
        'USD',
        '2020-01-01T02:30:00Z',
        0.8,
        true,
        1,
        10
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'MID',
        'USD',
        'JPY',
        '2020-01-01T02:30:00Z',
        0.8,
        true,
        10,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'MID',
        'USD',
        'INR',
        '2020-01-01T02:30:00Z',
        180.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'MID',
        'USD',
        'EUR',
        '2020-01-01T02:30:00Z',
        0.8,
        true,
        1,
        10
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'BID',
        'EUR',
        'INR',
        '2020-01-01T02:30:00Z',
        80.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'BID',
        'EUR',
        'JPY',
        '2020-01-01T02:30:00Z',
        180.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'BID',
        'EUR',
        'USD',
        '2020-01-01T02:30:00Z',
        0.8,
        true,
        1,
        10
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'BID',
        'USD',
        'JPY',
        '2020-01-01T02:30:00Z',
        0.8,
        true,
        10,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'BID',
        'USD',
        'INR',
        '2020-01-01T02:30:00Z',
        180.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'BID',
        'USD',
        'EUR',
        '2020-01-01T02:30:00Z',
        0.8,
        true,
        1,
        10
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'ASK',
        'USD',
        'EUR',
        '2020-01-01T02:30:00Z',
        0.8,
        true,
        1,
        10
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'ASK',
        'EUR',
        'USD',
        '2020-01-01T02:30:00Z',
        0.8,
        true,
        1,
        10
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'LAST',
        'USD',
        'INR',
        '2020-01-01T02:30:00Z',
        180.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'LAST',
        'USD',
        'EUR',
        '2020-01-01T02:30:00Z',
        0.8,
        true,
        1,
        10
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'LAST',
        'EUR',
        'INR',
        '2020-01-01T02:30:00Z',
        80.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'LAST',
        'EUR',
        'USD',
        '2020-01-01T02:30:00Z',
        80.0,
        false,
        1,
        1
      ],
      [
        '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb',
        'MRM',
        'ECB',
        'NEW',
        'EUR',
        'USD',
        '2020-01-01T02:30:00Z',
        100,
        true,
        1,
        1
      ]
    ]);
}
