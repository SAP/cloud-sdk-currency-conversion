"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionModelErrors = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var ConversionModelErrors;
(function (ConversionModelErrors) {
    ConversionModelErrors["INVALID_CURRENCY_CODES"] = "Provided currency code does not exist.";
    ConversionModelErrors["NULL_CURRENCY_CODES"] = "Invalid currency code.";
    ConversionModelErrors["ILLEGAL_EXCHANGE_RATE"] = "Exchange rate value must be a positive numeral value.";
    ConversionModelErrors["NULL_RATE_TYPE"] = "Fields in rateType cannot be null.";
    ConversionModelErrors["NEGATIVE_CURRENCY_FACTOR"] = "The CurrencyFactor must be a positive value.";
    ConversionModelErrors["NULL_RATES_DATA_PROVIDER_CODE"] = "Fields in RatesDataProviderCode cannot be null.";
    ConversionModelErrors["NULL_RATES_DATA_SOURCE"] = "Fields in RatesDataSource cannot be null.";
})(ConversionModelErrors = exports.ConversionModelErrors || (exports.ConversionModelErrors = {}));
