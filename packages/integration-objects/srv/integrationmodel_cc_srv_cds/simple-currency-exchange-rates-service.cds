/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

namespace com.sap.integrationmodel.currencyconversion;

using com.sap.integrationmodel.currencyconversion.C_CurrencyExchangeRates from '../../db/integrationmodel_cc_db_cds/currency-exchange-rates-model';

/*
    #DO NOT MODIFY
    Draft Disabled OData Service for Currency Exchange Rates.
*/
annotate SimpleCurrencyExchangeRateService with @(requires : [
        'authenticated-user',  // Allows user token mechanism for authentication.
        'system-user'          // Allows technical token mechanism for authentication.
]);

service SimpleCurrencyExchangeRateService {
        @Capabilities : {
                Insertable : true,
                Updatable  : true,
                Deletable  : true
        }
        entity CurrencyExchangeRates @(restrict : [
        {
                grant : ['READ'],
                to    : 'CurrencyConversionDisplay'
        },
        {
                grant : [
                        'WRITE',
                        'CREATE',
                        'UPDATE',
                        'DELETE',
                        'READ'
                ],
                to    : 'CurrencyConversionConfigure'
        }
        ]) as select from C_CurrencyExchangeRates order by validFromDateTime desc;
}