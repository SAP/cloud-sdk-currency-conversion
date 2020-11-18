"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkNonFixedRateConversionResult = void 0;
var BulkNonFixedRateConversionResult = /** @class */ (function () {
    function BulkNonFixedRateConversionResult(resultMap) {
        this.resultMap = resultMap;
    }
    BulkNonFixedRateConversionResult.prototype.get = function (conversionParametersForFixedRate) {
        return this.resultMap.get(conversionParametersForFixedRate);
    };
    BulkNonFixedRateConversionResult.prototype.values = function () {
        return this.resultMap.values();
    };
    BulkNonFixedRateConversionResult.prototype.entrySet = function () {
        return new Set(this.resultMap.entries());
    };
    return BulkNonFixedRateConversionResult;
}());
exports.BulkNonFixedRateConversionResult = BulkNonFixedRateConversionResult;
