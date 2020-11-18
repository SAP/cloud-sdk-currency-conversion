"use strict";
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleNonFixedRateConversionResult = void 0;
var SingleNonFixedRateConversionResult = /** @class */ (function () {
    function SingleNonFixedRateConversionResult(exchangeRate, convertedAmt, roundedOffConvertedAmt) {
        this._exchangeRate = exchangeRate;
        this._convertedAmount = convertedAmt;
        this._roundedOffConvertedAmount = roundedOffConvertedAmt;
    }
    Object.defineProperty(SingleNonFixedRateConversionResult.prototype, "exchangeRate", {
        get: function () {
            return this._exchangeRate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleNonFixedRateConversionResult.prototype, "convertedAmount", {
        get: function () {
            return this._convertedAmount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleNonFixedRateConversionResult.prototype, "roundedOffConvertedAmount", {
        get: function () {
            return this._roundedOffConvertedAmount;
        },
        enumerable: false,
        configurable: true
    });
    return SingleNonFixedRateConversionResult;
}());
exports.SingleNonFixedRateConversionResult = SingleNonFixedRateConversionResult;
