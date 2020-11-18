"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var Currency = /** @class */ (function () {
    function Currency(currencyCode, defaultFractionDigits, numericCode) {
        this._currencyCode = currencyCode;
        this._numericCode = numericCode;
        this._defaultFractionDigits = defaultFractionDigits;
    }
    Object.defineProperty(Currency.prototype, "currencyCode", {
        get: function () {
            return this._currencyCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Currency.prototype, "defaultFractionDigits", {
        get: function () {
            return this._defaultFractionDigits;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Currency.prototype, "numericCode", {
        get: function () {
            return this._numericCode;
        },
        enumerable: false,
        configurable: true
    });
    return Currency;
}());
exports.Currency = Currency;
