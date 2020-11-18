"use strict";
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleFixedRateConversionResult = void 0;
var SingleFixedRateConversionResult = /** @class */ (function () {
    function SingleFixedRateConversionResult(convertedAmt, roundedOffConvertedAmt) {
        this._convertedAmount = convertedAmt;
        this._roundedOffConvertedAmount = roundedOffConvertedAmt;
    }
    Object.defineProperty(SingleFixedRateConversionResult.prototype, "convertedAmount", {
        get: function () {
            return this._convertedAmount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleFixedRateConversionResult.prototype, "roundedOffConvertedAmount", {
        get: function () {
            return this._roundedOffConvertedAmount;
        },
        enumerable: false,
        configurable: true
    });
    return SingleFixedRateConversionResult;
}());
exports.SingleFixedRateConversionResult = SingleFixedRateConversionResult;
