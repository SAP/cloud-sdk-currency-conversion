"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverrideTenantSetting = void 0;
var OverrideTenantSetting = /** @class */ (function () {
    function OverrideTenantSetting(ratesDataProviderCode, ratesDataSource) {
        this._ratesDataProviderCode = ratesDataProviderCode;
        this._ratesDataSource = ratesDataSource;
    }
    Object.defineProperty(OverrideTenantSetting.prototype, "ratesDataProviderCode", {
        get: function () {
            return this._ratesDataProviderCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverrideTenantSetting.prototype, "ratesDataSource", {
        get: function () {
            return this._ratesDataSource;
        },
        enumerable: false,
        configurable: true
    });
    return OverrideTenantSetting;
}());
exports.OverrideTenantSetting = OverrideTenantSetting;
