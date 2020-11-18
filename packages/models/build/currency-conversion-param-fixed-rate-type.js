"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionParametersForFixedRate = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var bignumber_js_1 = require("bignumber.js");
var currency_builder_1 = require("./helper/currency-builder");
var currency_amount_type_1 = require("./currency-amount-type");
var exchange_rate_value_type_1 = require("./exchange-rate-value-type");
var ConversionParametersForFixedRate = /** @class */ (function () {
    function ConversionParametersForFixedRate(fromCurrency, toCurrency, fromAmount, fixedRate) {
        this._fromCurrency = currency_builder_1.buildCurrency(fromCurrency);
        this._toCurrency = currency_builder_1.buildCurrency(toCurrency);
        this._fromAmount = new currency_amount_type_1.CurrencyAmount(fromAmount);
        this._fixedRateValue = new exchange_rate_value_type_1.ExchangeRateValue(fixedRate, new bignumber_js_1.BigNumber(fixedRate));
    }
    Object.defineProperty(ConversionParametersForFixedRate.prototype, "fromCurrency", {
        get: function () {
            return this._fromCurrency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversionParametersForFixedRate.prototype, "toCurrency", {
        get: function () {
            return this._toCurrency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversionParametersForFixedRate.prototype, "fromAmount", {
        get: function () {
            return this._fromAmount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversionParametersForFixedRate.prototype, "fixedRateValue", {
        get: function () {
            return this._fixedRateValue;
        },
        enumerable: false,
        configurable: true
    });
    return ConversionParametersForFixedRate;
}());
exports.ConversionParametersForFixedRate = ConversionParametersForFixedRate;
