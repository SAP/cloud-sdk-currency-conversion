/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
namespace com.sap.integrationmodel.currencyconversion;

using com.sap.integrationmodel.currencyconversion.C_ExchangeRateTypes from '../../db/integrationmodel_cc_db_cds/exchange-rate-type-model';
using com.sap.integrationmodel.currencyconversion.C_ExchangeRateTypesDescription from '../../db/integrationmodel_cc_db_cds/exchange-rate-type-model';

/*
    #DO NOT MODIFY
    Draft Disabled OData Service for Exchange Rate Type Details.
*/
annotate SimpleExchangeRateTypeService with @(requires : [
        'authenticated-user',  // Allows user token mechanism for authentication.
        'system-user'          // Allows technical token mechanism for authentication.
]);

service SimpleExchangeRateTypeService {

        @Capabilities : {
                Insertable : true,
                Updatable  : true,
                Deletable  : true
        }
        entity ExchangeRateTypes @(restrict : [
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
        ])  as projection on C_ExchangeRateTypes;

        @Capabilities : {
                Insertable : true,
                Updatable  : true,
                Deletable  : true
        }
        entity ExchangeRateTypeDescriptions @(restrict : [
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
        ])  as projection on C_ExchangeRateTypesDescription;
};