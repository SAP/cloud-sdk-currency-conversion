/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-len */
export enum AdapterError {
  ILLEGAL_ARGUEMENT_EXCEPTION = 'Empty parameter list',
  EXCHANGE_RATE_CONNECTION_ERROR = 'CDS error occurred in creating the DB connection while fetching the exchange rates.',
  EMPTY_RATE_TYPE_LIST = 'Empty Rate Type List',
  EXCHANGE_RATE_DETAIL_CONNECTION_ERROR = 'Exchange Rate Detail Connection Error',
  EXCHANGE_RATE_DETAIL_PREPARE_STATEMENT_ERROR = 'CDS error occurred in creating the prepared statement for fetching the exchange rates type details.',
  EXCHANGE_RATE_DETAIL_QUERY_ERROR = 'CDS error occurred in executing the query for exchange rates type details.',
  EXCHANGE_RATE_QUERY_ERROR = 'CDS error occurred in executing the query for exchange rates.',
  DATABASE_TYPE_ERROR = 'CDS error occurred in checking the data base type.',
  TENANT_SETTING_CONNECTION_ERROR = 'CDS error occurred in creating the database connection while fetching the default tenant settings. Please try again later.',
  TENANT_SETTING_PREPARE_STATEMENT_ERROR = 'CDS error occurred in creating the prepared statement for fetching the default tenant settings. Please try again later.',
  TENANT_SETTING_QUERY_ERROR = 'CDS error occurred in executing the query for default tenant settings. Please try again later.',
  NULL_CONVERSION_PARAMETERS = 'Conversion parameters is empty'
}
