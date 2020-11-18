"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatesDataProviderCode = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var currency_conversion_error_1 = require("./currency-conversion-error");
var conversion_model_errors_1 = require("./constants/conversion-model-errors");
var RatesDataProviderCode = /** @class */ (function () {
    function RatesDataProviderCode(dataProviderCode) {
        if (!dataProviderCode || !dataProviderCode.trim()) {
            throw new currency_conversion_error_1.CurrencyConversionError(conversion_model_errors_1.ConversionModelErrors.NULL_RATES_DATA_PROVIDER_CODE);
        }
        this._dataProviderCode = dataProviderCode.trim();
    }
    Object.defineProperty(RatesDataProviderCode.prototype, "dataProviderCode", {
        get: function () {
            return this._dataProviderCode;
        },
        enumerable: false,
        configurable: true
    });
    return RatesDataProviderCode;
}());
exports.RatesDataProviderCode = RatesDataProviderCode;
