/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
namespace com.sap.integrationmodel.currencyconversion;

using com.sap.integrationmodel.currencyconversion.C_TenantConfigForConversions from '../../db/integrationmodel_cc_db_cds/tenant-configuration-for-conversion-model';

/*
    #DO NOT MODIFY
    Draft Disabled OData Service for Tenant Configuration with SAP Market Rates Management Connectivity enabled..
*/
annotate SimpleTenantConfigService with @(requires : [
        'authenticated-user',  // Allows user token mechanism for authentication.
        'system-user'          // Allows technical token mechanism for authentication.
]);

service SimpleTenantConfigService {

        entity TenantConfigForConversions @(restrict : [
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
        ]) as projection on C_TenantConfigForConversions;
}