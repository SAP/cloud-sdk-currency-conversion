"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionParametersForNonFixedRate = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var currency_builder_1 = require("./helper/currency-builder");
var currency_amount_type_1 = require("./currency-amount-type");
var ConversionParametersForNonFixedRate = /** @class */ (function () {
    function ConversionParametersForNonFixedRate(fromCurrency, toCurrency, fromAmount, exchangeRateType, conversionAsOfDateTime) {
        if (conversionAsOfDateTime === void 0) { conversionAsOfDateTime = new Date(); }
        this._fromCurrency = currency_builder_1.buildCurrency(fromCurrency);
        this._toCurrency = currency_builder_1.buildCurrency(toCurrency);
        this._fromAmount = new currency_amount_type_1.CurrencyAmount(fromAmount);
        this._exchangeRateType = exchangeRateType;
        this._conversionAsOfDateTime = conversionAsOfDateTime;
    }
    Object.defineProperty(ConversionParametersForNonFixedRate.prototype, "fromCurrency", {
        get: function () {
            return this._fromCurrency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversionParametersForNonFixedRate.prototype, "toCurrency", {
        get: function () {
            return this._toCurrency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversionParametersForNonFixedRate.prototype, "fromAmount", {
        get: function () {
            return this._fromAmount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversionParametersForNonFixedRate.prototype, "exchangeRateType", {
        get: function () {
            return this._exchangeRateType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversionParametersForNonFixedRate.prototype, "conversionAsOfDateTime", {
        get: function () {
            return this._conversionAsOfDateTime;
        },
        enumerable: false,
        configurable: true
    });
    return ConversionParametersForNonFixedRate;
}());
exports.ConversionParametersForNonFixedRate = ConversionParametersForNonFixedRate;
