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
exports.setBigNumberConfig = exports.convertCurrenciesWithNonFixedRateHelper = exports.CURR_FORMAT = void 0;
var currency_conversion_models_1 = require("@sap-cloud-sdk/currency-conversion-models");
var bignumber_js_1 = require("bignumber.js");
var conversion_errors_1 = require("../constants/conversion-errors");
var exchange_rate_record_determiner_1 = require("../core/exchange-rate-record-determiner");
var logger_1 = require("./logger");
var DEFAULT_SCALE = 14;
exports.CURR_FORMAT = {
    decimalSeparator: '.',
    groupSize: 0,
    secondaryGroupSize: 0,
    fractionGroupSeparator: '',
    fractionGroupSize: 0
};
function convertCurrenciesWithNonFixedRateHelper(conversionParameters, dataAdapter, tenant, overrideTenantSetting) {
    return __awaiter(this, void 0, void 0, function () {
        var tenantSettings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tenantSettings = null;
                    if (dataAdapter === null || tenant === null || tenant.id === null) {
                        throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.NULL_ADAPTER_TENANT);
                    }
                    if (!(overrideTenantSetting === undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchDefaultTenantSettings(dataAdapter, tenant)];
                case 1:
                    tenantSettings = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    tenantSettings = fetchOverrideTenantSettings(overrideTenantSetting);
                    _a.label = 3;
                case 3: return [2 /*return*/, convertCurrencies(conversionParameters, dataAdapter, tenant, tenantSettings)];
            }
        });
    });
}
exports.convertCurrenciesWithNonFixedRateHelper = convertCurrenciesWithNonFixedRateHelper;
function setBigNumberConfig(scaleForDivision) {
    var bigNum = bignumber_js_1.BigNumber.clone({
        DECIMAL_PLACES: scaleForDivision,
        ROUNDING_MODE: 4
    });
    return bigNum;
}
exports.setBigNumberConfig = setBigNumberConfig;
/*
 * Conversion logic for all the APIs for Non Fixed Rate.
 */
function convertCurrencies(conversionParameters, dataAdapter, tenant, tenantSettings) {
    return __awaiter(this, void 0, void 0, function () {
        var exchangeRateResultSet, exchangeRateTypeDetalsMap, exchnageRateDeterminer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchExchangeRate(conversionParameters, dataAdapter, tenant, tenantSettings)];
                case 1:
                    exchangeRateResultSet = _a.sent();
                    return [4 /*yield*/, fetchExchangeRateType(conversionParameters, dataAdapter, tenant)];
                case 2:
                    exchangeRateTypeDetalsMap = _a.sent();
                    exchnageRateDeterminer = new exchange_rate_record_determiner_1.ExchangeRateRecordDeterminer(tenant, tenantSettings, exchangeRateResultSet, exchangeRateTypeDetalsMap);
                    return [2 /*return*/, performBulkNonFixedConversion(exchnageRateDeterminer, conversionParameters, tenant)];
            }
        });
    });
}
function fetchExchangeRate(conversionParameters, dataAdapter, tenant, tenantSettings) {
    return __awaiter(this, void 0, void 0, function () {
        var exchangeRateResultSet, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exchangeRateResultSet = new Array();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dataAdapter.getExchangeRatesForTenant(conversionParameters, tenant, tenantSettings)];
                case 2:
                    exchangeRateResultSet = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error(conversion_errors_1.ConversionErrors.ERR_FETCHING_EXCHANGE_RATES);
                    throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.ERR_FETCHING_EXCHANGE_RATES);
                case 4:
                    if (exchangeRateResultSet === null || exchangeRateResultSet.length === 0) {
                        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('Data Adpater returned empty list for exchange rates for tenant', JSON.stringify(tenant));
                        throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.EMPTY_EXCHANGE_RATE_LIST);
                    }
                    return [2 /*return*/, exchangeRateResultSet];
            }
        });
    });
}
function fetchExchangeRateType(conversionParameters, dataAdapter, tenant) {
    return __awaiter(this, void 0, void 0, function () {
        var exchangeRateTypeDetailMap, rateTypeSet, _i, conversionParameters_1, conversionParameter, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exchangeRateTypeDetailMap = new Map();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    rateTypeSet = new Set();
                    for (_i = 0, conversionParameters_1 = conversionParameters; _i < conversionParameters_1.length; _i++) {
                        conversionParameter = conversionParameters_1[_i];
                        rateTypeSet.add(conversionParameter.exchangeRateType);
                    }
                    return [4 /*yield*/, dataAdapter.getExchangeRateTypeDetailsForTenant(tenant, rateTypeSet)];
                case 2:
                    exchangeRateTypeDetailMap = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error(conversion_errors_1.ConversionErrors.ERR_FETCHING_EXCHANGE_RATES);
                    throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.ERR_FETCHING_EXCHANGE_RATES);
                case 4: return [2 /*return*/, exchangeRateTypeDetailMap];
            }
        });
    });
}
function performBulkNonFixedConversion(exchangeRateDeterminer, conversionParameters, tenant) {
    var resultMap = new Map();
    for (var _i = 0, conversionParameters_2 = conversionParameters; _i < conversionParameters_2.length; _i++) {
        var conversionParameter = conversionParameters_2[_i];
        try {
            var result = performSingleNonFixedConversion(exchangeRateDeterminer, conversionParameter, tenant);
            resultMap.set(conversionParameter, result);
        }
        catch (error) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error(conversion_errors_1.ConversionErrors.NON_FIXED_CONVERSION_FAILED, 'for parameter : ', JSON.stringify(conversionParameter), 'with exception :', error);
            resultMap.set(conversionParameter, new currency_conversion_models_1.CurrencyConversionError(error.message));
        }
    }
    return new currency_conversion_models_1.BulkNonFixedRateConversionResult(resultMap);
}
function performSingleNonFixedConversion(exchangeRateDeterminer, conversionParameters, tenant) {
    var convertedValue;
    var exchangeRateUsedForConversion;
    if (conversionParameters.fromCurrency.currencyCode ===
        conversionParameters.toCurrency.currencyCode) {
        convertedValue = new currency_conversion_models_1.CurrencyAmount(conversionParameters.fromAmount.decimalValue.toFormat(exports.CURR_FORMAT));
        exchangeRateUsedForConversion = new currency_conversion_models_1.ExchangeRate(tenant, null, null, conversionParameters.exchangeRateType, new currency_conversion_models_1.ExchangeRateValue('1', new bignumber_js_1.BigNumber(1)), conversionParameters.fromCurrency, conversionParameters.toCurrency, conversionParameters.conversionAsOfDateTime);
    }
    else {
        exchangeRateUsedForConversion = exchangeRateDeterminer.getBestMatchedExchangeRateRecord(conversionParameters);
        convertedValue = doConversionWithThePickedRateRecord(conversionParameters, exchangeRateUsedForConversion);
    }
    return new currency_conversion_models_1.SingleNonFixedRateConversionResult(exchangeRateUsedForConversion, convertedValue, getRoundedOffConvertedAmount(convertedValue, conversionParameters));
}
function getRoundedOffConvertedAmount(currAmount, conversionParam) {
    return new currency_conversion_models_1.CurrencyAmount(currAmount.decimalValue
        .decimalPlaces(conversionParam.toCurrency.defaultFractionDigits, bignumber_js_1.BigNumber.ROUND_HALF_UP)
        .toFormat(exports.CURR_FORMAT));
}
/*
 * Performs the multiplication of the converted value for fixed or non fixed
 * rate with the ratio of factors od to/from currency.
 * @param {ConversionParametersForNonFixedRate} conversionParameters:
 * conversion request on which currency conversion has to be performed.
 * @param {ExchangeRate} exchangeRateToBeUsed: latest exchange rate for the
 * currency pair for which conversion has to be performed. It will be used to
 * determine the latest exchange rate from the list of exchange rates provided
 * in the DataAdpater.
 * @return {CurrencyAmount} converted value from the BigNumber after
 * toFormat to plain string is performed on it.
 */
function doConversionWithThePickedRateRecord(conversionParameters, exchangeRateToBeUsed) {
    var fromAmount = conversionParameters.fromAmount.decimalValue;
    var convertedValue = fromAmount.multipliedBy(getEffectiveExchangeRateValue(conversionParameters, exchangeRateToBeUsed));
    return new currency_conversion_models_1.CurrencyAmount(convertedValue.toFormat(exports.CURR_FORMAT));
}
function getEffectiveExchangeRateValue(conversionParameters, exchangeRateToBeUsed) {
    var effectiveExchangeRateValue;
    var isIndirect = exchangeRateToBeUsed.isIndirect;
    var exchangeRateValue = exchangeRateToBeUsed.exchangeRateValue.decimalValue;
    var currencyFactorRatio = getCurrencyFactorRatio(exchangeRateToBeUsed);
    var additionOfScales = conversionParameters.fromAmount.decimalValue.dp() +
        exchangeRateValue.decimalPlaces();
    var scaleForDivision = additionOfScales > DEFAULT_SCALE ? additionOfScales : DEFAULT_SCALE;
    var bigNum = setBigNumberConfig(scaleForDivision);
    if (ifFromToCurrencyMatches(conversionParameters, exchangeRateToBeUsed)) {
        effectiveExchangeRateValue = getEffecttiveRateForDirectOrReferenceCurrencyPair(isIndirect, exchangeRateValue, currencyFactorRatio, bigNum);
    }
    else {
        effectiveExchangeRateValue = getEffecttiveRateForInvertedCurrencyPair(isIndirect, exchangeRateValue, currencyFactorRatio, bigNum);
    }
    return effectiveExchangeRateValue;
}
function ifFromToCurrencyMatches(conversionParameters, exchangeRateToBeUsed) {
    return (conversionParameters.fromCurrency.currencyCode ===
        exchangeRateToBeUsed.fromCurrency.currencyCode &&
        conversionParameters.toCurrency.currencyCode ===
            exchangeRateToBeUsed.toCurrency.currencyCode);
}
function getEffecttiveRateForDirectOrReferenceCurrencyPair(isIndirect, exchangeRateValue, currencyFactorRatio, bigNum) {
    var effectiveExchangeRateValue;
    if (isIndirect) {
        effectiveExchangeRateValue = new bigNum(1).dividedBy(exchangeRateValue);
        isRatioNaNOrInfinite(effectiveExchangeRateValue.toNumber());
        effectiveExchangeRateValue = effectiveExchangeRateValue.multipliedBy(currencyFactorRatio);
    }
    else {
        effectiveExchangeRateValue = exchangeRateValue.multipliedBy(currencyFactorRatio);
    }
    return effectiveExchangeRateValue;
}
function getEffecttiveRateForInvertedCurrencyPair(isIndirect, exchangeRateValue, currencyFactorRatio, bigNum) {
    var effectiveExchangeRateValue;
    if (isIndirect) {
        var effectiveCurrencyFactorRatio = new bigNum(1).dividedBy(currencyFactorRatio);
        effectiveExchangeRateValue = exchangeRateValue.multipliedBy(effectiveCurrencyFactorRatio);
    }
    else {
        var exchangeRateCurrencyFactorValue = exchangeRateValue.multipliedBy(currencyFactorRatio);
        effectiveExchangeRateValue = new bigNum(1).dividedBy(exchangeRateCurrencyFactorValue);
    }
    return effectiveExchangeRateValue;
}
/*
 * @private
 * Returns the ratio of factors of to/from currency and converts
 * it to BigNumber since this has to be multiplied with the converted
 * value for non fixed rates which is a BigNumber.
 * @param {ExchangeRate} exchangeRate: latest exchange
 * rate for the currency pair for which conversion has to be performed.
 * @return BigNumber ratio of factor of 'To' currency
 * (also local or destination) to 'From' currency
 * (also foreign or source currency).
 */
function getCurrencyFactorRatio(exchangeRate) {
    var currencyFactorRatio = exchangeRate.toCurrencyfactor.currencyFactor /
        exchangeRate.fromCurrencyfactor.currencyFactor;
    isRatioNaNOrInfinite(currencyFactorRatio);
    return new bignumber_js_1.BigNumber(currencyFactorRatio);
}
function isRatioNaNOrInfinite(currencyFactorRatio) {
    /* Adding the exception explicitly since 0.0/0.0 does not throw an exception
     * and the conversion will fail eventually with null error message in it.
     */
    if (!Number.isFinite(currencyFactorRatio) ||
        Number.isNaN(currencyFactorRatio)) {
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error("The currency factor in the exchange rate resulted in an exception. Either 'from' or 'to' currency factor is zero");
        throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.ZERO_CURRENCY_FACTOR);
    }
}
function fetchDefaultTenantSettings(dataAdapter, tenant) {
    return __awaiter(this, void 0, void 0, function () {
        var tenantSettingsToBeUsed, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, dataAdapter.getDefaultSettingsForTenant(tenant)];
                case 1:
                    tenantSettingsToBeUsed = _a.sent();
                    logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Default Tenant settings returned from data adapter is : ', tenantSettingsToBeUsed == null
                        ? null
                        : JSON.stringify(tenantSettingsToBeUsed.ratesDataProviderCode), tenantSettingsToBeUsed == null
                        ? null
                        : JSON.stringify(tenantSettingsToBeUsed.ratesDataSource));
                    return [2 /*return*/, tenantSettingsToBeUsed];
                case 2:
                    ex_1 = _a.sent();
                    logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('Error in fetching default tenant settings for tenant ', tenant);
                    throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.ERROR_FETCHING_DEFAULT_SETTINGS);
                case 3: return [2 /*return*/];
            }
        });
    });
}
function fetchOverrideTenantSettings(overrideSetting) {
    isOverrideTenantSettingIncomplete(overrideSetting);
    // create a TenantSettings object from overrideSetting
    var tenantSettingsToBeUsed = new currency_conversion_models_1.TenantSettings(overrideSetting.ratesDataProviderCode, overrideSetting.ratesDataSource);
    logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Override settings is used for conversion : ', JSON.stringify(overrideSetting.ratesDataProviderCode), JSON.stringify(overrideSetting.ratesDataSource));
    return tenantSettingsToBeUsed;
}
/*
 * Checks if both data source and data provider code is present in the
 * tenant setting. tenantSettings can be null but if data source is
 * provided, data provider code also has to be given and vice-versa.
 * Throws an exception if the overrideSetting is null or if the overrideSetting
 * is not null but either of data source or data provider code is null,
 * hence the overrideSetting is incomplete. Otherwise overrideSetting is not
 * null or both data source & data provider code are provided in the
 * overrideSetting.
 */
function isOverrideTenantSettingIncomplete(overrideSetting) {
    if (overrideSetting == null) {
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('Override Tenant Setting can not be null');
        throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.EMPTY_OVERRIDE_TENANT_SETTING);
    }
}
