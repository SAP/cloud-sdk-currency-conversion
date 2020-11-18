"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSettings = void 0;
var TenantSettings = /** @class */ (function () {
    function TenantSettings(ratesDataProviderCode, ratesDataSource) {
        this._ratesDataProviderCode = ratesDataProviderCode;
        this._ratesDataSource = ratesDataSource;
    }
    Object.defineProperty(TenantSettings.prototype, "ratesDataProviderCode", {
        get: function () {
            return this._ratesDataProviderCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TenantSettings.prototype, "ratesDataSource", {
        get: function () {
            return this._ratesDataSource;
        },
        enumerable: false,
        configurable: true
    });
    return TenantSettings;
}());
exports.TenantSettings = TenantSettings;
