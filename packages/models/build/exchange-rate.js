"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRate = void 0;
var currency_factor_1 = require("./currency-factor");
var ExchangeRate = /** @class */ (function () {
    function ExchangeRate(tenantIdentifier, ratesDataProviderCode, ratesDataSource, exchangeRateType, exchangeRateValue, fromCurrency, toCurrency, validFromDateTime, isIndirect, fromCurrencyfactor, toCurrencyfactor) {
        if (isIndirect === void 0) { isIndirect = false; }
        if (fromCurrencyfactor === void 0) { fromCurrencyfactor = new currency_factor_1.CurrencyFactor(1); }
        if (toCurrencyfactor === void 0) { toCurrencyfactor = new currency_factor_1.CurrencyFactor(1); }
        this._tenantIdentifier = tenantIdentifier;
        this._ratesDataProviderCode = ratesDataProviderCode;
        this._ratesDataSource = ratesDataSource;
        this._exchangeRateType = exchangeRateType;
        this._exchangeRateValue = exchangeRateValue;
        this._fromCurrency = fromCurrency;
        this._toCurrency = toCurrency;
        this._validFromDateTime = validFromDateTime;
        this._isIndirect = isIndirect;
        this._fromCurrencyfactor = fromCurrencyfactor;
        this._toCurrencyfactor = toCurrencyfactor;
    }
    Object.defineProperty(ExchangeRate.prototype, "tenantIdentifier", {
        get: function () {
            return this._tenantIdentifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRate.prototype, "ratesDataProviderCode", {
        get: function () {
            return this._ratesDataProviderCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRate.prototype, "ratesDataSource", {
        get: function () {
            return this._ratesDataSource;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRate.prototype, "exchangeRateType", {
        get: function () {
            return this._exchangeRateType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRate.prototype, "exchangeRateValue", {
        get: function () {
            return this._exchangeRateValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRate.prototype, "fromCurrency", {
        get: function () {
            return this._fromCurrency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRate.prototype, "toCurrency", {
        get: function () {
            return this._toCurrency;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRate.prototype, "validFromDateTime", {
        get: function () {
            return this._validFromDateTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRate.prototype, "isIndirect", {
        get: function () {
            return this._isIndirect;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRate.prototype, "fromCurrencyfactor", {
        get: function () {
            return this._fromCurrencyfactor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRate.prototype, "toCurrencyfactor", {
        get: function () {
            return this._toCurrencyfactor;
        },
        enumerable: false,
        configurable: true
    });
    return ExchangeRate;
}());
exports.ExchangeRate = ExchangeRate;
