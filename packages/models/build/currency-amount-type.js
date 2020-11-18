"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyAmount = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var bignumber_js_1 = require("bignumber.js");
var CurrencyAmount = /** @class */ (function () {
    function CurrencyAmount(valueString) {
        this._valueString = valueString.trim();
        this._decimalValue = new bignumber_js_1.BigNumber(valueString.trim());
    }
    Object.defineProperty(CurrencyAmount.prototype, "valueString", {
        get: function () {
            return this._valueString;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CurrencyAmount.prototype, "decimalValue", {
        get: function () {
            return this._decimalValue;
        },
        enumerable: false,
        configurable: true
    });
    return CurrencyAmount;
}());
exports.CurrencyAmount = CurrencyAmount;
