"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRateValue = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var bignumber_js_1 = require("bignumber.js");
var currency_conversion_error_1 = require("./currency-conversion-error");
var conversion_model_errors_1 = require("./constants/conversion-model-errors");
var ExchangeRateValue = /** @class */ (function () {
    function ExchangeRateValue(valueString, decimalValue) {
        this._valueString = valueString.trim();
        if (decimalValue < new bignumber_js_1.BigNumber(0)) {
            throw new currency_conversion_error_1.CurrencyConversionError(conversion_model_errors_1.ConversionModelErrors.ILLEGAL_EXCHANGE_RATE);
        }
        this._decimalValue = decimalValue;
    }
    Object.defineProperty(ExchangeRateValue.prototype, "valueString", {
        get: function () {
            return this._valueString;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRateValue.prototype, "decimalValue", {
        get: function () {
            return this._decimalValue;
        },
        enumerable: false,
        configurable: true
    });
    return ExchangeRateValue;
}());
exports.ExchangeRateValue = ExchangeRateValue;
