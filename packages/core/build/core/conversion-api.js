"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyConverter = void 0;
var currency_conversion_models_1 = require("@sap-cloud-sdk/currency-conversion-models");
var bignumber_js_1 = require("bignumber.js");
var logger_1 = require("../helper/logger");
var conversion_errors_1 = require("../constants/conversion-errors");
var non_fixed_rate_helper_1 = require("../helper/non-fixed-rate-helper");
/**
 * Currency Converter API class which exposes methods to
 * perform currency conversion. It performs currency conversion
 * for a given value from a source currency to a target currency.
 * The conversion logic expects that the required exchange rates and
 * the configuration for conversion are readily available in the
 * expected format. It provides multiple APIs for currency conversion
 * based on the input provided by the user.
 */
var CurrencyConverter = /** @class */ (function () {
    function CurrencyConverter() {
    }
    /**
     * Provides conversion capabilities for multiple conversions in one call
     * and depends on the {@link ExchangeRateValue} provided specifically in
     * the request. Check the inline messages of any individual conversion
     * failures for detailed information.
     *
     * <p>
     * If the 'fromCurrency' and 'toCurrency' are the same in the
     * {@link ConversionParametersForFixedRate}, the response amount will be
     * the same as the input currency amount and the given exchange rate value
     * is not used in the conversion.
     * </p>
     *
     * @param {ConversionParametersForFixedRate} conversionParameters:
     * A list of conversion parameters for a fixed rate. This acts as the input
     * for the conversion and the same object is provided in the resultant
     * {@link SingleFixedRateConversionResult} for correlation. The maximum
     * number of conversion parameters supported in a single call is 1000.
     *
     * @returns {BulkFixedRateConversionResult}: The conversion result for a
     * fixed rate.
     */
    CurrencyConverter.prototype.convertCurrenciesWithFixedRate = function (conversionParameters) {
        if (!this.validateBulkFixedConversionParameters(conversionParameters)) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error(conversion_errors_1.ConversionErrors.INVALID_PARAMS);
            throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.INVALID_PARAMS);
        }
        var resultMap = new Map();
        for (var _i = 0, conversionParameters_1 = conversionParameters; _i < conversionParameters_1.length; _i++) {
            var conversionParameter = conversionParameters_1[_i];
            try {
                var singleConversionResult = this.convertCurrencyWithFixedRate(conversionParameter);
                resultMap.set(conversionParameter, singleConversionResult);
            }
            catch (error) {
                logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('Fixed Rate Conversion Failed for parameter : ' +
                    conversionParameter +
                    'with Exception :', error);
                resultMap.set(conversionParameter, new currency_conversion_models_1.CurrencyConversionError(error.message));
            }
        }
        return new currency_conversion_models_1.BulkFixedRateConversionResult(resultMap);
    };
    /**
     * Provides conversion capabilities for one conversion in one call
     * and depends on the {@link ExchangeRateValue} provided specifically
     * in the request. Please use the API for bulk conversion if you want
     * to perform multiple conversions.
     *
     * <p>
     * If the 'fromCurrency' and 'toCurrency' are the same in the
     * {@link ConversionParametersForFixedRate}, the response amount will be
     * the same as the input currency amount and the given exchange rate value
     * is not used in the conversion.
     * </p>
     *
     * @param {ConversionParametersForFixedRate} conversionParameter A list of
     * conversion parameters for a fixed rate. This acts as the input for the
     * conversion and the same object is provided in the resultant
     * {@link SingleFixedRateConversionResult} for correlation. The maximum
     * number of conversion parameters supported in a single call is 1000.
     *
     *
     * @returns {SingleFixedRateConversionResult} Returns a single conversion
     * result for a fixed rate.
     */
    CurrencyConverter.prototype.convertCurrencyWithFixedRate = function (conversionParameter) {
        if (!this.validateSingleFixedConversionParameter(conversionParameter)) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error(conversion_errors_1.ConversionErrors.INVALID_PARAMS);
            throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.INVALID_PARAMS);
        }
        var singleConversionResult = this.performSingleFixedConversion(conversionParameter);
        return singleConversionResult;
    };
    /**
     * Provides conversion capabilities for one conversion in one call
     * by picking the best possible exchange rate that is applicable.
     * Currency conversion is performed on the required conversion parameter.
     * It uses the {@link ExchangeRate} and other tenant-based settings like
     * the data provider code for conversion provided by the 'DataAdapter'.
     * You must use the API for bulk conversion if you want to perform
     * multiple conversions.
     *
     * <p>
     * If the 'fromCurrency' and 'toCurrency' are the same in the
     * {@link ConversionParametersForNonFixedRate}, the response amount will be
     * the same as the input currency amount and an {@link ExchangeRate} entry is
     * provided with default values, with the exchange rate value as 1.
     * </p>
     *
     * @param {ConversionParametersForNonFixedRate} conversionParameter:
     * A conversion parameter for a non-fixed rate. This acts as the input for
     * the conversion and the same object is provided in the resultant
     * {@link SingleNonFixedRateConversionResult} for correlation.
     *
     * @param {DataAdapter} adapter:
     * Your implementation of {@link DataAdapter} that provides a list of
     * {@link ExchangeRate}s and {@link TenantSettings} for the conversion being
     * performed.
     *
     * @param {Tenant} tenant:
     * Representation of the tenant. A tenant represents the customer account
     * on cloud foundry.
     *
     * @param {OverrideTenantSetting} overrideTenantSetting
     * These settings are used for this conversion request. Default
     * {@link TenantSettings} provided by the {@link DataAdapter} are not used
     * during the conversion process because the override setting takes
     * precedence. This value cannot be null, and it should be a valid object
     * for consuming this API.
     *
     * @returns {SingleNonFixedRateConversionResult}:
     * The single conversion result for a non-fixed rate.
     */
    CurrencyConverter.prototype.convertCurrencyWithNonFixedRate = function (conversionParameter, adapter, tenant, overrideTenantSetting) {
        return __awaiter(this, void 0, void 0, function () {
            var bulkConversionResult, singleConversionResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.validateSingleNonFixedConversionParameter(conversionParameter)) {
                            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error(conversion_errors_1.ConversionErrors.INVALID_PARAMS);
                            throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.INVALID_PARAMS);
                        }
                        return [4 /*yield*/, non_fixed_rate_helper_1.convertCurrenciesWithNonFixedRateHelper(Array.of(conversionParameter), adapter, tenant, overrideTenantSetting)];
                    case 1:
                        bulkConversionResult = _a.sent();
                        singleConversionResult = bulkConversionResult.get(conversionParameter);
                        if (singleConversionResult instanceof Error) {
                            throw new currency_conversion_models_1.CurrencyConversionError(singleConversionResult.message);
                        }
                        return [2 /*return*/, singleConversionResult];
                }
            });
        });
    };
    /**
     * Provides conversion capabilities for multiple conversions in one call
     * by overriding the default tenant settings that are provided by the
     * {@link DataAdapter} and uses the Data Adapter provided in the input to
     * get the required {@link ExchangeRate}s. The default data source setting
     * is not applicable for this request. Check the inlinem essages of any
     * individual conversion failures for detailed information.
     *
     * <p>
     * If the 'fromCurrency' and 'toCurrency' are the same in the
     * {@link ConversionParametersForNonFixedRate}, the response amount will be
     * the same as the input currency amount and a {@link ExchangeRate} entry is
     * provided with default values, with the exchange rate value as 1.
     * </p>
     *
     * @param {ConversionParametersForNonFixedRate} conversionParameter: A list of
     * conversion parameters for a non-fixed rate. This acts as the input for the
     * conversion and the same object is provided in the result
     * {@link SingleNonFixedRateConversionResult} for correlation.
     * The maximum number of conversion parameters supported in a single call
     * is 1000.
     *
     * @param {DataAdapter} adapter:
     * Your implementation of {@link DataAdapter} that provides a list of
     * {@link ExchangeRate}s and {@link TenantSettings} for the conversion being
     * performed.
     *
     * @param {Tenant} tenant:
     * Representation of the tenant. A tenant represents the customer account
     * on cloud foundry.
     *
     * @param {OverrideTenantSetting} overrideTenantSetting
     * These settings are used for this conversion request. Default
     * {@link TenantSettings} provided by the {@link DataAdapter} are not used
     * during the conversion process because the override setting takes
     * precedence. This value cannot be null, and it should be a valid object
     * for consuming this API.
     *
     * @returns {BulkNonFixedRateConversionResult}:
     * The conversion result for a non-fixed rate.
     */
    CurrencyConverter.prototype.convertCurrenciesWithNonFixedRate = function (conversionParameter, adapter, tenant, overrideTenantSetting) {
        return __awaiter(this, void 0, void 0, function () {
            var bulkConversionResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.validateBulkNonFixedConversionParameters(conversionParameter)) {
                            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error(conversion_errors_1.ConversionErrors.INVALID_PARAMS);
                            throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.INVALID_PARAMS);
                        }
                        return [4 /*yield*/, non_fixed_rate_helper_1.convertCurrenciesWithNonFixedRateHelper(conversionParameter, adapter, tenant, overrideTenantSetting)];
                    case 1:
                        bulkConversionResult = _a.sent();
                        return [2 /*return*/, bulkConversionResult];
                }
            });
        });
    };
    CurrencyConverter.prototype.validateSingleNonFixedConversionParameter = function (conversionParameter) {
        if (conversionParameter === null || conversionParameter === undefined) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('The conversion parameter for non fixed conversion is null or undefined');
            return false;
        }
        return true;
    };
    CurrencyConverter.prototype.validateSingleFixedConversionParameter = function (conversionParameter) {
        if (conversionParameter === null || conversionParameter === undefined) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('The conversion parameter for fixed conversion is null or undefined');
            return false;
        }
        return true;
    };
    CurrencyConverter.prototype.validateBulkFixedConversionParameters = function (conversionParams) {
        if (conversionParams === null || conversionParams === undefined) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('The conversion parameter list for non fixed conversion is null or empty');
            return false;
        }
        if (conversionParams.length === 0 ||
            conversionParams.length >
                CurrencyConverter.MAXIMUM_CONVERSION_PARAMETER_ALLOWED) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('The conversion parameter list for fixed conversion is empty or the number of parameters for fixed conversion exceeded the allowed limit.');
            return false;
        }
        return true;
    };
    CurrencyConverter.prototype.validateBulkNonFixedConversionParameters = function (conversionParams) {
        if (conversionParams === null || conversionParams === undefined) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('The conversion parameter list for non fixed conversion is null or empty');
            return false;
        }
        if (conversionParams.length === 0 ||
            conversionParams.length >
                CurrencyConverter.MAXIMUM_CONVERSION_PARAMETER_ALLOWED) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('The conversion parameter list for fixed conversion is empty or the number of parameters for fixed conversion exceeded the allowed limit.');
            return false;
        }
        return true;
    };
    CurrencyConverter.prototype.performSingleFixedConversion = function (conversionParams) {
        var convertedAmount;
        if (conversionParams.fromCurrency.currencyCode ===
            conversionParams.toCurrency.currencyCode) {
            convertedAmount = new currency_conversion_models_1.CurrencyAmount(conversionParams.fromAmount.decimalValue.toFormat(non_fixed_rate_helper_1.CURR_FORMAT));
        }
        else {
            convertedAmount = this.calculateConvertedAmtForFixedRate(conversionParams);
        }
        var numOfDefaultFractionDigs = conversionParams.toCurrency.defaultFractionDigits;
        var roundedValString = convertedAmount.decimalValue.toFormat(numOfDefaultFractionDigs, bignumber_js_1.BigNumber.ROUND_HALF_UP, non_fixed_rate_helper_1.CURR_FORMAT);
        var roundedOffAmount = new currency_conversion_models_1.CurrencyAmount(roundedValString);
        return new currency_conversion_models_1.SingleFixedRateConversionResult(convertedAmount, roundedOffAmount);
    };
    CurrencyConverter.prototype.calculateConvertedAmtForFixedRate = function (conversionParams) {
        var result = conversionParams.fromAmount.decimalValue.multipliedBy(conversionParams.fixedRateValue.decimalValue);
        return new currency_conversion_models_1.CurrencyAmount(result.toFormat(non_fixed_rate_helper_1.CURR_FORMAT));
    };
    CurrencyConverter.MAXIMUM_CONVERSION_PARAMETER_ALLOWED = 1000;
    return CurrencyConverter;
}());
exports.CurrencyConverter = CurrencyConverter;
