"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyFactor = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var currency_conversion_error_1 = require("./currency-conversion-error");
var conversion_model_errors_1 = require("./constants/conversion-model-errors");
var CurrencyFactor = /** @class */ (function () {
    function CurrencyFactor(currencyFactor) {
        if (currencyFactor === void 0) { currencyFactor = 1; }
        if (currencyFactor < 0) {
            throw new currency_conversion_error_1.CurrencyConversionError(conversion_model_errors_1.ConversionModelErrors.NEGATIVE_CURRENCY_FACTOR);
        }
        this._currencyFactor = currencyFactor;
    }
    Object.defineProperty(CurrencyFactor.prototype, "currencyFactor", {
        get: function () {
            return this._currencyFactor;
        },
        enumerable: false,
        configurable: true
    });
    return CurrencyFactor;
}());
exports.CurrencyFactor = CurrencyFactor;
