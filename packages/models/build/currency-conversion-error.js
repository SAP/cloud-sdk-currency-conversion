"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyConversionError = void 0;
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
var CurrencyConversionError = /** @class */ (function (_super) {
    __extends(CurrencyConversionError, _super);
    function CurrencyConversionError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
        Object.setPrototypeOf(_this, _newTarget.prototype); // restore prototype chain
        _this.name = CurrencyConversionError.name; // stack traces display correctly now
        return _this;
    }
    return CurrencyConversionError;
}(Error));
exports.CurrencyConversionError = CurrencyConversionError;
