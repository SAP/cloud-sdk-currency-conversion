"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCurrency = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var currency_type_1 = require("../currency-type");
var currency_conversion_error_1 = require("../currency-conversion-error");
var conversion_model_errors_1 = require("../constants/conversion-model-errors");
var currency_codes_json_1 = __importDefault(require("./currency-codes.json"));
/**
 * Currency builder from given currency code string,
 * and throws an error if the given string is not a valid currency code.
 * @param currencyCode Currency code string
 * @param error Error object to capture any error in building the currency object.
 * @returns Currency object build from given currency code.
 */
function buildCurrency(currencyCode) {
    var curMnrUnits = 'CcyMnrUnts';
    var curNumCode = 'CcyNbr';
    if (currencyCode === null ||
        typeof currencyCode === 'undefined' ||
        currencyCode.length === 0) {
        throw new currency_conversion_error_1.CurrencyConversionError(conversion_model_errors_1.ConversionModelErrors.NULL_CURRENCY_CODES);
    }
    var currency = currency_codes_json_1.default[currencyCode];
    if (currency === null || typeof currency === 'undefined') {
        throw new currency_conversion_error_1.CurrencyConversionError(conversion_model_errors_1.ConversionModelErrors.INVALID_CURRENCY_CODES);
    }
    return new currency_type_1.Currency(currencyCode, Number.parseInt(currency[curMnrUnits], 10), currency[curNumCode]);
}
exports.buildCurrency = buildCurrency;
