"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRateTypeDetail = void 0;
var ExchangeRateTypeDetail = /** @class */ (function () {
    function ExchangeRateTypeDetail(referenceCurrency, isInversionAllowed) {
        if (isInversionAllowed === void 0) { isInversionAllowed = false; }
        this._referenceCurrency = referenceCurrency;
        this._isInversionAllowed = isInversionAllowed;
    }
    Object.defineProperty(ExchangeRateTypeDetail.prototype, "isInversionAllowed", {
        get: function () {
            return this._isInversionAllowed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExchangeRateTypeDetail.prototype, "referenceCurrency", {
        get: function () {
            return this._referenceCurrency;
        },
        enumerable: false,
        configurable: true
    });
    return ExchangeRateTypeDetail;
}());
exports.ExchangeRateTypeDetail = ExchangeRateTypeDetail;
