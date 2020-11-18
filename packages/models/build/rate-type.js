"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateType = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var currency_conversion_error_1 = require("./currency-conversion-error");
var conversion_model_errors_1 = require("./constants/conversion-model-errors");
var RateType = /** @class */ (function () {
    function RateType(rateType) {
        if (!rateType || !rateType.trim()) {
            throw new currency_conversion_error_1.CurrencyConversionError(conversion_model_errors_1.ConversionModelErrors.NULL_RATE_TYPE);
        }
        this._rateType = rateType.trim();
    }
    Object.defineProperty(RateType.prototype, "rateType", {
        get: function () {
            return this._rateType;
        },
        enumerable: false,
        configurable: true
    });
    return RateType;
}());
exports.RateType = RateType;
