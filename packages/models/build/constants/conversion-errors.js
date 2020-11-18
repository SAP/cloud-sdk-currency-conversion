"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionErrors = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var ConversionErrors;
(function (ConversionErrors) {
    ConversionErrors["INVALID_PARAMS"] = "Conversion failed due to invalid parameters";
    ConversionErrors["CONVERSION_FAILED"] = "Fixed Rate conversion failed";
    ConversionErrors["INVALID_CURRENCY_CODES"] = "Provided currency code does not exist.";
    ConversionErrors["NULL_CURRENCY_CODES"] = "Invalid currency code.";
    ConversionErrors["ILLEGAL_EXCHANGE_RATE"] = "Exchange rate value must be a positive numeral value.";
    ConversionErrors["NULL_RATE_TYPE"] = "Fields in rateType cannot be null.";
    ConversionErrors["NEGATIVE_CURRENCY_FACTOR"] = "The CurrencyFactor must be a positive value.";
    ConversionErrors["NULL_RATES_DATA_PROVIDER_CODE"] = "Fields in RatesDataProviderCode cannot be null.";
    ConversionErrors["NULL_RATES_DATA_SOURCE"] = "Fields in RatesDataSource cannot be null.";
    ConversionErrors["NO_MATCHING_EXCHANGE_RATE_RECORD"] = "No matching exchange rate record found for conversion. Check your conversion parameters against your exchange rate list and retry.";
    ConversionErrors["MULTIPLE_CONVERSION_RECORD_FOUND"] = "Multiple matching exchange rate records (with different Data Provider Code or Data Source, but with the same time stamp) found for conversion.";
    ConversionErrors["DUPLICATE_CONVERSION_RECORD_FOUND"] = "Duplicate exchange rate records (with the same time stamp, data provider code, and data source) found.";
    ConversionErrors["ZERO_CURRENCY_FACTOR"] = "The currency factor in the exchange rate resulted in an exception. Check that the 'from' and 'to' currency factors are not zero.";
    ConversionErrors["NULL_ADAPTER_TENANT"] = "Adapter or tenant cannot be null.";
    ConversionErrors["ERROR_FETCHING_DEFAULT_SETTINGS"] = "Exception occured while fetching the default settings.";
    ConversionErrors["ERR_FETCHING_EXCHANGE_RATES"] = "Exception occured whike fetching the exchange rates.";
    ConversionErrors["NON_FIXED_CONVERSION_FAILED"] = "Non fixed conversion has failed";
    ConversionErrors["ZERO_RATE_REFERENCE_CURRENCY"] = "The exchange rate derivation failed for the conversion based on reference currency. Check that the exchange rate values in 'from' to 'Reference Currency' or 'to' to 'Reference Currency' are not zero.";
})(ConversionErrors = exports.ConversionErrors || (exports.ConversionErrors = {}));
