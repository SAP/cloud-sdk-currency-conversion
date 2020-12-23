/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-len */
import {
  ExchangeRateTypeDetail,
  buildConversionParameterForNonFixedRate,
  buildExchangeRateTypeDetail,
  buildCurrency,
  buildTenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { SimpleIntegrationObjectsAdapter } from '../../src/adapter-cds';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cds = require('@sap/cds/lib');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { expect, before } = require('.');
const { INSERT } = cds.ql;

// while jest has 'test' as alias to 'it', mocha doesn't
if (!global.test) {
  global.test = it;
}

const model = cds.compile.cdl(`
  namespace com.sap.integrationmodel.currencyconversion;

  context IntegrationModelType {
    type TCurrencyConversionIntegrationModelGUID: UUID;
    type TCurrencyCode :                String(3);
    type TDataProviderCode :            String(15);
    type TExchangeRateType :            String(15);
    type TExchangeRateTypeDescription : String(30);
    type TDataSource :                  String(15);
    type TDateTime :                    DateTime;
    type TExchangeRateValue :           Decimal(24,14);  // Decimal(Precision, Scale)
    type TFromCurrencyFactor :          Integer64;
    type TToCurrencyFactor :            Integer64;
    type TBoolean :                     Boolean;
    type TDestinationName  :            String(200);
  };
  type User : String(255);
  aspect managed {
    createdAt  : Timestamp @cds.on.insert : $now;
    createdBy  : User      @cds.on.insert : $user;
    modifiedAt : Timestamp @cds.on.insert : $now  @cds.on.update : $now;
    modifiedBy : User      @cds.on.insert : $user @cds.on.update : $user;
  }

  entity CurrencyExchangeRates : managed {

    key ID                             : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null;
        tenantID                       : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        dataProviderCode               : IntegrationModelType.TDataProviderCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        dataSource                     : IntegrationModelType.TDataSource not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        exchangeRateType               : IntegrationModelType.TExchangeRateType not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        fromCurrencyThreeLetterISOCode : IntegrationModelType.TCurrencyCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        toCurrencyThreeLetterISOCode   : IntegrationModelType.TCurrencyCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        validFromDateTime              : IntegrationModelType.TDateTime not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        exchangeRateValue              : IntegrationModelType.TExchangeRateValue not null;
        isRateValueIndirect            : IntegrationModelType.TBoolean default false;
        fromCurrencyFactor             : IntegrationModelType.TFromCurrencyFactor default 1;
        toCurrencyFactor               : IntegrationModelType.TToCurrencyFactor default 1;
  }

  entity ExchangeRateTypes : managed {

    key ID                                  : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null;
        tenantID                            : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        exchangeRateType                    : IntegrationModelType.TExchangeRateType not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        exchangeRateTypeDescription         : localized IntegrationModelType.TExchangeRateTypeDescription;
        isInversionAllowed                  : IntegrationModelType.TBoolean default false;
        referenceCurrencyThreeLetterISOCode : IntegrationModelType.TCurrencyCode;
  }

  entity TenantConfigForConversions : managed {

    key ID                      : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null;
        tenantID                : IntegrationModelType.TCurrencyConversionIntegrationModelGUID not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        defaultDataProviderCode : IntegrationModelType.TDataProviderCode not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        defaultDataSource       : IntegrationModelType.TDataSource not null; // This field is implicitly considered as one of the composite keys in OData extensions.
        isConfigurationActive   : IntegrationModelType.TBoolean default false;
        connectToSAPMarketRatesManagement : IntegrationModelType.TBoolean default false; // @Beta: Added for MRM connectivity. If value is 'Yes', destinationName must be provided.
        destinationName         : IntegrationModelType.TDestinationName; // @Beta: Added for MRM connectivity : Destination Name.
  };
`);

describe('cds.ql → cqn', () => {
  const adapter = new SimpleIntegrationObjectsAdapter();

  describe('adapter test', () => {
    // insert data into table
    INSERT.into('CurrencyExchangeRates')
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
          null,
          null,
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
          null,
          null,
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
          null,
          null,
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
          null,
          null,
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
          null,
          null,
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
    INSERT.into('ExchangeRateTypes').rows([
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'MID', 'MID', true, 'INR'],
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'BID', 'BID', false, 'INR'],
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'ASK', 'ASK', true, 'INR'],
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'LAST', 'LAST', true, 'INR'],
      ['5d4abe96-faed-4b47-b7ed-ae4be76f9dfb', 'MID', 'MID', false, 'INR'],
      ['5d4abe96-faed-4b47-b7ed-ae4be76f9dfb', 'BID', 'BID', true, 'INR']
    ]);
    INSERT.into('TenantConfigForConversions').rows([
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'MRM', 'ECB', true],
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'MRM', 'ECB', false],
      ['5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb', 'MRM', 'THR', false],
      ['5d4abe96-0000-4b47-b7ed-ae4be76f9dfb', 'MID', 'BOR', true],
      ['5d4abe96-1111-4b47-b7ed-ae4be76f9111', 'MRM', 'THR', true],
      ['5d4abe96-2222-4b47-b7ed-ae4be76f9222', 'MID', 'TIR', true],
      ['5d4abe96-2222-4b47-b7ed-ae4be76f9222', 'MID', 'TBR', false],
      ['5d4abe96-2222-4b47-b7ed-ae4be76f9222', 'MRK', 'TZR', false]
    ]);

    const conversionParameters = new Array(
      buildConversionParameterForNonFixedRate('EUR', 'USD', '50', 'LAST', new Date('2020-07-19T00:20:30.000Z')),
      buildConversionParameterForNonFixedRate('EUR', 'JPY', '50', 'LAST', new Date('2020-07-19T00:20:30.000Z'))
    );
    const TENANT_ID = { id: '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb' };
    const tenantSettings = buildTenantSettings('MRM', 'ECB');

    const rateTypeSet: Set<string> = new Set();
    conversionParameters.map((param: any) => {
      rateTypeSet.add(param.exchangeRateType);
    });

    const exchangeRateTypeDetailMap: Map<string, ExchangeRateTypeDetail> = new Map();
    exchangeRateTypeDetailMap.set('LAST', buildExchangeRateTypeDetail(buildCurrency('INR'), true));
    it('checking exchange rates', async () => {
      await cds.deploy(model).to('sqlite::memory:');

      const cqn = adapter.prepareQueryForExchangeRatesForTenant(
        conversionParameters,
        TENANT_ID,
        tenantSettings,
        exchangeRateTypeDetailMap
      );

      expect(cqn).to.eql({
        SELECT: {
          from: {
            ref: ['com.sap.integrationmodel.currencyconversion.CurrencyExchangeRates']
          },
          columns: [
            {
              ref: ['createdAt'],
              as: 'createdAt'
            },
            {
              ref: ['createdBy'],
              as: 'createdBy'
            },
            {
              ref: ['modifiedAt'],
              as: 'modifiedAt'
            },
            {
              ref: ['modifiedBy'],
              as: 'modifiedBy'
            },
            {
              ref: ['ID'],
              as: 'ID'
            },
            {
              ref: ['tenantID'],
              as: 'tenantID'
            },
            {
              ref: ['dataProviderCode'],
              as: 'dataProviderCode'
            },
            {
              ref: ['dataSource'],
              as: 'dataSource'
            },
            {
              ref: ['exchangeRateType'],
              as: 'exchangeRateType'
            },
            {
              ref: ['fromCurrencyThreeLetterISOCode'],
              as: 'fromCurrencyThreeLetterISOCode'
            },
            {
              ref: ['toCurrencyThreeLetterISOCode'],
              as: 'toCurrencyThreeLetterISOCode'
            },
            {
              ref: ['validFromDateTime'],
              as: 'validFromDateTime'
            },
            {
              ref: ['exchangeRateValue'],
              as: 'exchangeRateValue'
            },
            {
              ref: ['isRateValueIndirect'],
              as: 'isRateValueIndirect'
            },
            {
              ref: ['fromCurrencyFactor'],
              as: 'fromCurrencyFactor'
            },
            {
              ref: ['toCurrencyFactor'],
              as: 'toCurrencyFactor'
            }
          ],
          where: [
            '(',
            {
              ref: ['tenantID']
            },
            '=',
            {
              val: '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb'
            },
            'and',
            {
              ref: ['dataProviderCode']
            },
            '=',
            {
              val: 'MRM'
            },
            'and',
            {
              ref: ['dataSource']
            },
            '=',
            {
              val: 'ECB'
            },
            'and',
            {
              ref: ['exchangeRateType']
            },
            '=',
            {
              val: 'LAST'
            },
            'and',
            {
              ref: ['validFromDateTime']
            },
            '<=',
            {
              val: '2020-07-19T00:20:30.000Z'
            },
            'and',
            '(',
            '(',
            {
              ref: ['fromCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'EUR'
            },
            'and',
            {
              ref: ['toCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'USD'
            },
            ')',
            'or',
            '(',
            {
              ref: ['fromCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'EUR'
            },
            'and',
            {
              ref: ['toCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'INR'
            },
            ')',
            'or',
            '(',
            {
              ref: ['fromCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'USD'
            },
            'and',
            {
              ref: ['toCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'INR'
            },
            ')',
            'or',
            '(',
            {
              ref: ['fromCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'USD'
            },
            'and',
            {
              ref: ['toCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'EUR'
            },
            ')',
            ')',
            ')',
            'or',
            '(',
            {
              ref: ['tenantID']
            },
            '=',
            {
              val: '5d4abe96-aecb-4b47-b7ed-ae4be76f9dfb'
            },
            'and',
            {
              ref: ['dataProviderCode']
            },
            '=',
            {
              val: 'MRM'
            },
            'and',
            {
              ref: ['dataSource']
            },
            '=',
            {
              val: 'ECB'
            },
            'and',
            {
              ref: ['exchangeRateType']
            },
            '=',
            {
              val: 'LAST'
            },
            'and',
            {
              ref: ['validFromDateTime']
            },
            '<=',
            {
              val: '2020-07-19T00:20:30.000Z'
            },
            'and',
            '(',
            '(',
            {
              ref: ['fromCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'EUR'
            },
            'and',
            {
              ref: ['toCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'JPY'
            },
            ')',
            'or',
            '(',
            {
              ref: ['fromCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'EUR'
            },
            'and',
            {
              ref: ['toCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'INR'
            },
            ')',
            'or',
            '(',
            {
              ref: ['fromCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'JPY'
            },
            'and',
            {
              ref: ['toCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'INR'
            },
            ')',
            'or',
            '(',
            {
              ref: ['fromCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'JPY'
            },
            'and',
            {
              ref: ['toCurrencyThreeLetterISOCode']
            },
            '=',
            {
              val: 'EUR'
            },
            ')',
            ')',
            ')'
          ],
          orderBy: [
            {
              ref: ['validFromDateTime'],
              sort: 'desc'
            }
          ]
        }
      });
    });
  });
});
