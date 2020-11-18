"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkFixedRateConversionResult = void 0;
var BulkFixedRateConversionResult = /** @class */ (function () {
    function BulkFixedRateConversionResult(resultMap) {
        this.resultMap = resultMap;
    }
    BulkFixedRateConversionResult.prototype.get = function (conversionParametersForFixedRate) {
        return this.resultMap.get(conversionParametersForFixedRate);
    };
    BulkFixedRateConversionResult.prototype.values = function () {
        return this.resultMap.values();
    };
    BulkFixedRateConversionResult.prototype.entrySet = function () {
        return new Set(this.resultMap.entries());
    };
    return BulkFixedRateConversionResult;
}());
exports.BulkFixedRateConversionResult = BulkFixedRateConversionResult;
