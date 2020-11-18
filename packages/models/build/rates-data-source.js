"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatesDataSource = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var currency_conversion_error_1 = require("./currency-conversion-error");
var conversion_model_errors_1 = require("./constants/conversion-model-errors");
var RatesDataSource = /** @class */ (function () {
    function RatesDataSource(dataSource) {
        if (!dataSource || !dataSource.trim()) {
            throw new currency_conversion_error_1.CurrencyConversionError(conversion_model_errors_1.ConversionModelErrors.NULL_RATES_DATA_SOURCE);
        }
        this._dataSource = dataSource.trim();
    }
    Object.defineProperty(RatesDataSource.prototype, "dataSource", {
        get: function () {
            return this._dataSource;
        },
        enumerable: false,
        configurable: true
    });
    return RatesDataSource;
}());
exports.RatesDataSource = RatesDataSource;
