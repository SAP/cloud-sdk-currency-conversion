"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRateRecordDeterminer = void 0;
var currency_conversion_models_1 = require("@sap-cloud-sdk/currency-conversion-models");
var bignumber_js_1 = require("bignumber.js");
var logger_1 = require("../helper/logger");
var conversion_errors_1 = require("../constants/conversion-errors");
var non_fixed_rate_helper_1 = require("../helper/non-fixed-rate-helper");
var ExchangeRateRecordDeterminer = /** @class */ (function () {
    function ExchangeRateRecordDeterminer(tenant, tenantSettings, exchangeRateResultSet, exchangeRateTypeDetailMap) {
        this._tenant = tenant;
        this._tenantSettings = tenantSettings;
        this._exchangeRateResultSet = exchangeRateResultSet;
        this._exchangeRateTypeDetailMap = exchangeRateTypeDetailMap;
        this._isTenantSettingNull = tenantSettings == null;
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Tenant setting is: ', JSON.stringify(tenantSettings));
    }
    ExchangeRateRecordDeterminer.prototype.getBestMatchedExchangeRateRecord = function (conversionParameter) {
        var filterdExchangeRateList = this.getSortedFilteredExchangeRateResultSet(conversionParameter);
        var firstItemFromList = this.getFirstEntryFromList(filterdExchangeRateList);
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('For conversionRequest ' +
            JSON.stringify(conversionParameter.fromCurrency) +
            ' - ' +
            JSON.stringify(conversionParameter.toCurrency) +
            ' - ' +
            conversionParameter.conversionAsOfDateTime +
            ' exchange rate information to be used is valid date ' +
            firstItemFromList.validFromDateTime +
            ' - rate value as ' +
            JSON.stringify(firstItemFromList.exchangeRateValue) +
            ' - inverted entry as ' +
            firstItemFromList.isIndirect);
        return firstItemFromList;
    };
    ExchangeRateRecordDeterminer.prototype.getSortedFilteredExchangeRateResultSet = function (conversionParameter) {
        var _a, _b;
        var exchangeRateResultSetforConversion;
        if (this.referenceCurrencyExists(conversionParameter.exchangeRateType)) {
            /* If the reference currency is provided, then get all the exchange rate
             * records including it.
             */
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Reference currency is defined for the exchange rate type in the conversion parameter - ', JSON.stringify((_b = (_a = this._exchangeRateTypeDetailMap) === null || _a === void 0 ? void 0 : _a.get(conversionParameter.exchangeRateType)) === null || _b === void 0 ? void 0 : _b.referenceCurrency));
            exchangeRateResultSetforConversion = this.getResultSetWithReferenceCurrency(conversionParameter);
        }
        else {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Reference currency is not defined for the exchange rate type in the conversion parameter. Conversion will be performed with either direct or inverted rate.');
            var exchangeRateWithBothDirectAndInvertedCurrencyPair = this.getResultSetWithBothDirectAndInvertedCurrencyPair(conversionParameter); // get the result set having all the combination of 'To/From' currency.
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug("Number of exchange rate records with all the combination of 'To/From' currency is  - ", exchangeRateWithBothDirectAndInvertedCurrencyPair.length);
            /* check if there is a record with direct currency pair as the conversion
             * parameter, else take the record with inverted currency pair.
             */
            exchangeRateResultSetforConversion = this.getExchangeRateWithEitherDirectOrInvertedCurrencyPair(exchangeRateWithBothDirectAndInvertedCurrencyPair, conversionParameter);
        }
        return exchangeRateResultSetforConversion;
    };
    ExchangeRateRecordDeterminer.prototype.getResultSetWithReferenceCurrency = function (conversionParameter) {
        /* Get all exchange rates with 'From' Currency as 'From' or 'To' Currency of
         * conversionParameter or 'To' Currency as Reference Currency or direct rate
         * i.e. matched 'From' and 'To' Currency in exchange rate and conversion
         * parameter.
         */
        var fromOrToOrDirectReferenceCurrencyPair = this.getFilteredResultSetWithReferenceCurrency(conversionParameter);
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug("Number of exchange rate records with 'From' Currency as 'From' or 'To' Currency of conversionParameter or 'To' Currency as Reference Currency or direct rate is - ", fromOrToOrDirectReferenceCurrencyPair.length);
        /* Get all exchange rates with 'From' Currency as 'From' Currency of
         * conversionParameter & 'To' Currency as Reference Currency.
         */
        var fromReferenceCurrencyPair = this.getFilterdResultSetFromReferenceCurrencyPair(conversionParameter, fromOrToOrDirectReferenceCurrencyPair);
        /* Get all exchange rates with 'From' Currency as 'To' Currency of
         * conversionParameter & 'To' Currency as Reference Currency.
         */
        var toReferenceCurrencyPair = this.getFilteredResultSetToReferenceCurrencyPair(conversionParameter, fromOrToOrDirectReferenceCurrencyPair);
        return this.getEitherDerivedOrDirectConversion(fromOrToOrDirectReferenceCurrencyPair, fromReferenceCurrencyPair, toReferenceCurrencyPair, conversionParameter);
    };
    ExchangeRateRecordDeterminer.prototype.getEitherDerivedOrDirectConversion = function (fromOrToOrDirectReferenceCurrencyPair, fromReferenceCurrencyPair, toReferenceCurrencyPair, conversionParameter) {
        var _a, _b;
        var exchangeRateList;
        if (fromReferenceCurrencyPair.length === 0 ||
            toReferenceCurrencyPair.length === 0) {
            /* if either pair is empty i.e. To to Reference Currency or From
             * to Reference Currencys, look for direct currency pair.
             */
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Could not find exchange rate record with reference currency, checking for exchange rate record with direct currency pair.');
            exchangeRateList = this.getExchangeRateRecordWithDirectConversionRate(fromOrToOrDirectReferenceCurrencyPair, conversionParameter);
        }
        else {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Conversion is done based on reference currency ', JSON.stringify((_b = (_a = this._exchangeRateTypeDetailMap) === null || _a === void 0 ? void 0 : _a.get(conversionParameter.exchangeRateType)) === null || _b === void 0 ? void 0 : _b.referenceCurrency));
            exchangeRateList = this.getDerivedExchangeRate(
            // get the derived exchange rates
            this.getFirstEntryFromList(fromReferenceCurrencyPair), this.getFirstEntryFromList(toReferenceCurrencyPair));
        }
        return exchangeRateList;
    };
    ExchangeRateRecordDeterminer.prototype.getDerivedExchangeRate = function (fromReferenceCurrencyPair, toReferenceCurrencyPair) {
        var derivedExchangeRateValue = this.getDerivedExchangeRateValue(fromReferenceCurrencyPair, toReferenceCurrencyPair);
        var derivedExchangeRateList = [];
        var derivedExchangeRate = new currency_conversion_models_1.ExchangeRate(this._tenant, this._isTenantSettingNull
            ? null
            : fromReferenceCurrencyPair.ratesDataProviderCode, this._isTenantSettingNull
            ? null
            : fromReferenceCurrencyPair.ratesDataSource, fromReferenceCurrencyPair.exchangeRateType, new currency_conversion_models_1.ExchangeRateValue(derivedExchangeRateValue, new bignumber_js_1.BigNumber(derivedExchangeRateValue)), fromReferenceCurrencyPair.fromCurrency, toReferenceCurrencyPair.fromCurrency, fromReferenceCurrencyPair.validFromDateTime.getTime() <
            toReferenceCurrencyPair.validFromDateTime.getTime()
            ? fromReferenceCurrencyPair.validFromDateTime
            : toReferenceCurrencyPair.validFromDateTime);
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('The derived exchange rate for conversion based on reference currency has : rates data provider as', JSON.stringify(derivedExchangeRate.ratesDataProviderCode), ' data source as', JSON.stringify(derivedExchangeRate.ratesDataSource), 'rate type as', JSON.stringify(derivedExchangeRate.exchangeRateType.rateType), 'exchange rate value as', JSON.stringify(derivedExchangeRate.exchangeRateValue.decimalValue), 'valid from date time as', derivedExchangeRate.validFromDateTime);
        derivedExchangeRateList.push(derivedExchangeRate);
        return derivedExchangeRateList;
    };
    ExchangeRateRecordDeterminer.prototype.getDerivedExchangeRateValue = function (fromReferenceCurrencyPair, toReferenceCurrencyPair) {
        /*  Exchange rate value will be x/y. x is the exchange rate value in
         * fromReferenceCurrencyPair and  y in the toReferenceCurrencyPair -
         * isIndirect will influence if the value is x or 1/x, y or 1/y.
         * Considering from and to currency factors, the formula will be =
         * (x*(tox/fromx))/(y*(toy/fromy) or (x/y)*(tox/fromx)/(toy/fromy)
         */
        var isFromReferenecPairIndirect = fromReferenceCurrencyPair.isIndirect;
        var fromExchangeRateValue = fromReferenceCurrencyPair.exchangeRateValue.decimalValue;
        /* zero scale results in exception in division hence we will take the
         * default value of scale as 1.
         */
        var fromExchangeRateValueScale = fromExchangeRateValue.dp() === 0 ? 1 : fromExchangeRateValue.dp();
        var isToReferenecPairIndirect = toReferenceCurrencyPair.isIndirect;
        var toExchangeRateValue = toReferenceCurrencyPair.exchangeRateValue.decimalValue;
        /* zero scale results in exception in division hence we will take the
         * default value of scale as 1.
         */
        var toExchangeRateValueScale = toExchangeRateValue.dp() === 0 ? 1 : toExchangeRateValue.dp();
        var additionOfScales = fromExchangeRateValueScale + toExchangeRateValueScale;
        var scaleForDivision = additionOfScales > ExchangeRateRecordDeterminer.DEFAULT_SCALE
            ? additionOfScales
            : ExchangeRateRecordDeterminer.DEFAULT_SCALE;
        var indirectFromExchangeRateValue = this.getIndirectRateValue(fromExchangeRateValue, fromExchangeRateValueScale);
        var indirectToExchangeRateValue = this.getIndirectRateValue(toExchangeRateValue, toExchangeRateValueScale);
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('FromReferenceCurrencyPair has isIndirect set to', isFromReferenecPairIndirect, 'exchange rate value as', JSON.stringify(fromExchangeRateValue), '. ToReferenceCurrencyPair has isIndirect set to', isToReferenecPairIndirect, ', exchange rate value as', JSON.stringify(toExchangeRateValue));
        var effectiveExchangeRateValue;
        // (tox/fromx)/(toy/fromy)
        var effectiveCurrencyFactor = this.getCurrencyFactorRatio(fromReferenceCurrencyPair) /
            this.getCurrencyFactorRatio(toReferenceCurrencyPair);
        var bigNum = non_fixed_rate_helper_1.setBigNumberConfig(scaleForDivision);
        // Both 'From' & 'To' to Reference currency are indirect: (1/x)/(1/y) = y/x
        if (isFromReferenecPairIndirect && isToReferenecPairIndirect) {
            effectiveExchangeRateValue = new bigNum(indirectFromExchangeRateValue).dividedBy(indirectToExchangeRateValue);
        }
        else if (isFromReferenecPairIndirect) {
            effectiveExchangeRateValue = new bigNum(indirectFromExchangeRateValue).dividedBy(toExchangeRateValue); // 'From' to Reference currency rate is indirect (1/x), 'To' to Reference currency rate is direct (y)  -> (1/x)/y = 1/(x*y)
        }
        else if (isToReferenecPairIndirect) {
            effectiveExchangeRateValue = new bigNum(fromExchangeRateValue).dividedBy(indirectToExchangeRateValue); // 'From' to Reference currency rate is direct (x), 'To' to Reference currency rate is direct (1/y) -> x/(1/y) = x*y
        }
        else {
            effectiveExchangeRateValue = new bigNum(fromExchangeRateValue).dividedBy(toExchangeRateValue); // Both 'From' & 'To' to Reference currency are direct -> x/y
        }
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Effective rate for conversion based on reference currency before multiplying the effective currency factor is - ', JSON.stringify(effectiveExchangeRateValue));
        return effectiveExchangeRateValue
            .multipliedBy(new bignumber_js_1.BigNumber(effectiveCurrencyFactor.toString()))
            .toString();
    };
    ExchangeRateRecordDeterminer.prototype.getIndirectRateValue = function (exchangeRateValue, fromExchangeRateValueScale) {
        if (JSON.stringify(exchangeRateValue) === JSON.stringify(new bignumber_js_1.BigNumber(0))) {
            throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.ZERO_RATE_REFERENCE_CURRENCY);
        }
        var bigNum = non_fixed_rate_helper_1.setBigNumberConfig(fromExchangeRateValueScale);
        return new bigNum(1).dividedBy(exchangeRateValue);
    };
    ExchangeRateRecordDeterminer.prototype.getCurrencyFactorRatio = function (exchangeRate) {
        var currencyFactorRatio = exchangeRate.toCurrencyfactor.currencyFactor /
            exchangeRate.fromCurrencyfactor.currencyFactor;
        this.isRatioNaNOrInfinite(currencyFactorRatio);
        return currencyFactorRatio;
    };
    ExchangeRateRecordDeterminer.prototype.isRatioNaNOrInfinite = function (currencyFactorRatio) {
        /* Adding the exception explicitly since 0.0/0.0 does not throw an exception
         * and the conversion will fail eventually with null error message in it.
         */
        if (!Number.isFinite(currencyFactorRatio) ||
            Number.isNaN(currencyFactorRatio)) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error("The currency factor in the exchange rate resulted in an exception. Either 'from' or 'to' currency factor is zero");
            throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.ZERO_CURRENCY_FACTOR);
        }
    };
    ExchangeRateRecordDeterminer.prototype.getResultSetWithBothDirectAndInvertedCurrencyPair = function (conversionParameter) {
        var _this = this;
        var exchangeRateWithBothDirectAndInvertedCurrency;
        exchangeRateWithBothDirectAndInvertedCurrency = this._exchangeRateResultSet.filter(function (exchangeRate) {
            return _this.ifCommonFiltersMatch(exchangeRate, conversionParameter) && // filter the result set based on date, tenant id, rate type
                _this.ifRateFromOrToCurrencyMatchesParamFromCurrency(exchangeRate, conversionParameter) && // filter the result if 'From/To' currency in exchange rate records matched 'From' currency in conversion parameter.
                _this.ifRateFromOrToCurrencyMatchesParamToCurrency(exchangeRate, conversionParameter);
        } // filter the result if 'From/To' currency in exchange rate records matched 'To' currency in conversion parameter.
        );
        if (!this._isTenantSettingNull) {
            /* use the data provider code & data provider code filter only when
             * tenant setting is provided.
             */
            exchangeRateWithBothDirectAndInvertedCurrency = exchangeRateWithBothDirectAndInvertedCurrency.filter(function (exchangeRate) {
                var _a, _b;
                return _this.ifRatesDataProviderCodeMatches(exchangeRate, (_a = _this._tenantSettings) === null || _a === void 0 ? void 0 : _a.ratesDataProviderCode) &&
                    _this.ifRatesDataSourceMatches(exchangeRate, (_b = _this._tenantSettings) === null || _b === void 0 ? void 0 : _b.ratesDataSource);
            });
        }
        return exchangeRateWithBothDirectAndInvertedCurrency.sort(function (a, b) {
            if (b.validFromDateTime < a.validFromDateTime) {
                return -1;
            }
            if (b.validFromDateTime > a.validFromDateTime) {
                return 1;
            }
            return 0;
        }); // sort the result set based on validFromDateTime, latest first.
    };
    ExchangeRateRecordDeterminer.prototype.getExchangeRateWithEitherDirectOrInvertedCurrencyPair = function (exchangeRateWithBothDirectAndInvertedCurrencyList, conversionParameter) {
        var exchangeRateListForGivenCurrencyPair = this.getExchangeRateRecordWithDirectConversionRate(exchangeRateWithBothDirectAndInvertedCurrencyList, conversionParameter);
        /* If there is no exchange rate record with direct from/to currency pair,
         * check if there is an exchange rate record with inverted currency pair.
         */
        if (exchangeRateListForGivenCurrencyPair.length === 0) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Could not find exchange rate record with direct from/to currency pair, checking for exchange rate record with inverted from/to currency pair.');
            exchangeRateListForGivenCurrencyPair = this.getExchangeRateRecordWithInvertedConversionRate(exchangeRateWithBothDirectAndInvertedCurrencyList, conversionParameter);
        }
        return exchangeRateListForGivenCurrencyPair;
    };
    ExchangeRateRecordDeterminer.prototype.getFilteredResultSetWithReferenceCurrency = function (conversionParameter) {
        var _this = this;
        var exchangeRateWithReferenceCurrency;
        /* filtering based on date, exchange rate type, tenant and reference
         * currency as 'To' currency.
         */
        exchangeRateWithReferenceCurrency = this._exchangeRateResultSet.filter(function (exchangeRate) {
            return _this.ifCommonFiltersMatch(exchangeRate, conversionParameter) &&
                _this.ifRateHasDirectOrToAsReferenceCurrency(exchangeRate, conversionParameter);
        });
        if (!this._isTenantSettingNull) {
            /* use the data provider code & data provider code filter only when
             * tenant setting is provided.
             */
            exchangeRateWithReferenceCurrency = exchangeRateWithReferenceCurrency.filter(function (exchangeRate) {
                var _a, _b;
                return _this.ifRatesDataProviderCodeMatches(exchangeRate, (_a = _this._tenantSettings) === null || _a === void 0 ? void 0 : _a.ratesDataProviderCode) &&
                    _this.ifRatesDataSourceMatches(exchangeRate, (_b = _this._tenantSettings) === null || _b === void 0 ? void 0 : _b.ratesDataSource);
            });
        }
        return exchangeRateWithReferenceCurrency.sort(function (a, b) {
            if (b.validFromDateTime < a.validFromDateTime) {
                return -1;
            }
            if (b.validFromDateTime > a.validFromDateTime) {
                return 1;
            }
            return 0;
        }); // sort the result set based on validFromDateTime, latest first.
    };
    ExchangeRateRecordDeterminer.prototype.duplicateRateExists = function (exchangeRateForDuplicateCheck) {
        if (this._isTenantSettingNull) {
            // There is no filter for data provider code & data source if tenant setting is null.
            this.multipleDataSourceProviderSameTimestampExists(exchangeRateForDuplicateCheck); // Multiple entries with same time, data provider code & data source.
            this.multipleDataSourceOrProviderExists(exchangeRateForDuplicateCheck); // Multiple entries with same time but different data provider code or data source.
        }
        else {
            this.sameTimestampExists(exchangeRateForDuplicateCheck); // Multiple entries with same time stamp.
        }
    };
    /* Get all exchange rates with 'From' Currency as 'From' Currency of
     * conversionParameter & 'To' Currency as Reference Currency.
     */
    ExchangeRateRecordDeterminer.prototype.getFilterdResultSetFromReferenceCurrencyPair = function (conversionParameter, exchangeRateResultSetWithReferenceCurrency) {
        var _this = this;
        var exchangeRateList = exchangeRateResultSetWithReferenceCurrency
            .filter(function (exchangeRate) {
            return _this.ifRateToCurrencyMatchesReferenceCurrency(exchangeRate, conversionParameter) &&
                _this.ifRateFromCurrencyMatchesParamFromCurrency(exchangeRate, conversionParameter);
        })
            .sort(function (a, b) {
            if (b.validFromDateTime < a.validFromDateTime) {
                return -1;
            }
            if (b.validFromDateTime > a.validFromDateTime) {
                return 1;
            }
            return 0;
        }); // sort the result set based on validFromDateTime, latest first.
        this.duplicateRateExists(exchangeRateList);
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug("Number of exchange rate records with 'From' Currency as 'From' Currency of conversionParameter and 'To' Currency as Reference Currency - ", exchangeRateList.length);
        return exchangeRateList;
    };
    /* Get all exchange rates with 'From' Currency as 'To' Currency of
     * conversionParameter & 'To' Currency as Reference Currency.
     */
    ExchangeRateRecordDeterminer.prototype.getFilteredResultSetToReferenceCurrencyPair = function (conversionParameter, exchangeRateResultSetWithReferenceCurrency) {
        var _this = this;
        var exchangeRateList = exchangeRateResultSetWithReferenceCurrency
            .filter(function (exchangeRate) {
            return _this.ifRateToCurrencyMatchesReferenceCurrency(exchangeRate, conversionParameter) &&
                _this.ifRateFromCurrencyMatchesParamToCurrency(exchangeRate, conversionParameter);
        })
            .sort(function (a, b) {
            if (b.validFromDateTime < a.validFromDateTime) {
                return -1;
            }
            if (b.validFromDateTime > a.validFromDateTime) {
                return 1;
            }
            return 0;
        }); // sort the result set based on validFromDateTime, latest first.
        this.duplicateRateExists(exchangeRateList);
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug("Number of exchange rate records with 'From' Currency as 'To' Currency of conversionParameter and 'To' Currency as Reference Currency - ", exchangeRateList.length);
        return exchangeRateList;
    };
    ExchangeRateRecordDeterminer.prototype.getExchangeRateRecordWithDirectConversionRate = function (exchangeRateWithBothDirectAndInvertedCurrencyList, conversionParameter) {
        var _this = this;
        var exchangeRateList = exchangeRateWithBothDirectAndInvertedCurrencyList.filter(function (exchangeRate) {
            return _this.ifFromToCurrencyMatchesForDirectConversion(exchangeRate, conversionParameter);
        });
        this.duplicateRateExists(exchangeRateList);
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Number of exchange rate record with direct currency pair is - ', exchangeRateList.length);
        return exchangeRateList;
    };
    ExchangeRateRecordDeterminer.prototype.getExchangeRateRecordWithInvertedConversionRate = function (exchangeRateWithBothDirectAndInvertedCurrencyList, conversionParameter) {
        var _this = this;
        var exchangeRateList = new Array();
        if (this.isInversionAllowed(conversionParameter.exchangeRateType)) {
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Inversion is allowed for the exchange rate type - ', JSON.stringify(conversionParameter.exchangeRateType));
            exchangeRateList = exchangeRateWithBothDirectAndInvertedCurrencyList.filter(function (exchangeRate) {
                return _this.ifFromToCurrencyMatchesForInvertedConversion(exchangeRate, conversionParameter);
            });
        }
        this.duplicateRateExists(exchangeRateList);
        logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug('Number of exchange rate record with inverted currency pair is - ', exchangeRateList.length);
        return exchangeRateList;
    };
    ExchangeRateRecordDeterminer.prototype.multipleDataSourceProviderSameTimestampExists = function (filterdExchangeRateList) {
        var _this = this;
        if (filterdExchangeRateList.length > 1) {
            var firstItemFromList_1 = this.getFirstEntryFromList(filterdExchangeRateList);
            var exchangeRateRecordWithSameTimeStamp = filterdExchangeRateList.filter(function (exchangeRate) {
                return exchangeRate.validFromDateTime ===
                    firstItemFromList_1.validFromDateTime &&
                    _this.ifRatesDataProviderMatchesOrHasNullValue(exchangeRate, firstItemFromList_1.ratesDataProviderCode) &&
                    _this.ifRatesDataSourceMatchesOrHasNullValue(exchangeRate, firstItemFromList_1.ratesDataSource);
            });
            if (exchangeRateRecordWithSameTimeStamp.length !== 1) {
                var errorMessage = 'Exchange Rate record to be used has Rates Data Provider Code : ' +
                    JSON.stringify(firstItemFromList_1.ratesDataProviderCode) +
                    ' Rates Data Source : ' +
                    JSON.stringify(firstItemFromList_1.ratesDataSource) +
                    ' Time stamp : ' +
                    firstItemFromList_1.validFromDateTime;
                logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error(errorMessage);
                throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.DUPLICATE_CONVERSION_RECORD_FOUND);
            }
        }
    };
    /*
     * Check if there are exchange record rate present with different data source
     * or data provider code for the date on which conversion is being performed.
     */
    ExchangeRateRecordDeterminer.prototype.multipleDataSourceOrProviderExists = function (filterdExchangeRateList) {
        if (filterdExchangeRateList.length > 1) {
            var firstItemFromList_2 = this.getFirstEntryFromList(filterdExchangeRateList);
            /* filter the result set which is not from future date w.r.t the time
             * conversion is to be performed.
             */
            var bestMatchedExchangeRateRecord = filterdExchangeRateList.filter(function (exchangeRate) {
                return exchangeRate.validFromDateTime === firstItemFromList_2.validFromDateTime;
            });
            for (var _i = 0, bestMatchedExchangeRateRecord_1 = bestMatchedExchangeRateRecord; _i < bestMatchedExchangeRateRecord_1.length; _i++) {
                var exchangeRate = bestMatchedExchangeRateRecord_1[_i];
                if (this.multipleDataProviderOrSourceExists(exchangeRate, firstItemFromList_2)) {
                    logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('Multiple Matching exchange rate records (with different Data Provider Code or Data Source) found for conversion.');
                    var errorMessage = 'Exchange Rate record to be used has Rates Data Provider Code : ' +
                        JSON.stringify(firstItemFromList_2.ratesDataProviderCode) +
                        ' Rates Data Source : ' +
                        JSON.stringify(firstItemFromList_2.ratesDataSource) +
                        ' Exchange Rate record found with different Data Provider Code : ' +
                        JSON.stringify(exchangeRate.ratesDataProviderCode) +
                        ' Data Source : ' +
                        JSON.stringify(exchangeRate.ratesDataSource);
                    logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug(errorMessage);
                    throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.MULTIPLE_CONVERSION_RECORD_FOUND);
                }
            }
        }
    };
    ExchangeRateRecordDeterminer.prototype.sameTimestampExists = function (filterdExchangeRateList) {
        if (filterdExchangeRateList.length > 1) {
            var firstItemFromList_3 = this.getFirstEntryFromList(filterdExchangeRateList);
            var exchangeRateRecordWithSameTimeStamp = filterdExchangeRateList.filter(function (exchangeRate) {
                return exchangeRate.validFromDateTime === firstItemFromList_3.validFromDateTime;
            });
            if (exchangeRateRecordWithSameTimeStamp.length !== 1) {
                var errorMessage = 'Multiple Exchange Rate Records found for same timestamp - ' +
                    firstItemFromList_3.validFromDateTime;
                logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('Multiple Exchange Rate Records found for same timestamp.');
                logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.debug(errorMessage);
                throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.DUPLICATE_CONVERSION_RECORD_FOUND);
            }
        }
    };
    ExchangeRateRecordDeterminer.prototype.getFirstEntryFromList = function (filterdExchangeRateList) {
        if (filterdExchangeRateList.length === 0) {
            /* Throw the exception if there is no exchange rate record found
             * based on above filtering criteria.
             */
            logger_1.logger === null || logger_1.logger === void 0 ? void 0 : logger_1.logger.error('No Matching exchange rate record found for conversion.');
            throw new currency_conversion_models_1.CurrencyConversionError(conversion_errors_1.ConversionErrors.NO_MATCHING_EXCHANGE_RATE_RECORD);
        }
        else {
            return filterdExchangeRateList[0];
        }
    };
    ExchangeRateRecordDeterminer.prototype.ifCommonFiltersMatch = function (exchangeRate, conversionParameter) {
        return (this.ifTenantMatches(exchangeRate) && // filter the result set based on tenant id, currency pair & rate type.
            this.isDateOnOrBeforeConversion(exchangeRate, conversionParameter) && // filter the result set which is not from future date w.r.t the time conversion is to be performed.
            this.ifExchangeRateTypeMatches(exchangeRate, conversionParameter));
    };
    ExchangeRateRecordDeterminer.prototype.ifTenantMatches = function (exchangeRate) {
        var _a;
        return ((_a = exchangeRate.tenantIdentifier) === null || _a === void 0 ? void 0 : _a.id) === this._tenant.id;
    };
    ExchangeRateRecordDeterminer.prototype.isDateOnOrBeforeConversion = function (exchangeRate, conversionParameter) {
        return (exchangeRate.validFromDateTime.getTime() <
            conversionParameter.conversionAsOfDateTime.getTime() ||
            exchangeRate.validFromDateTime.getTime() ===
                conversionParameter.conversionAsOfDateTime.getTime());
    };
    ExchangeRateRecordDeterminer.prototype.ifExchangeRateTypeMatches = function (exchangeRate, conversionParameter) {
        return (exchangeRate.exchangeRateType.rateType ===
            conversionParameter.exchangeRateType.rateType);
    };
    ExchangeRateRecordDeterminer.prototype.ifRateFromCurrencyMatchesParamFromCurrency = function (exchangeRate, conversionParameter) {
        return (JSON.stringify(exchangeRate.fromCurrency) ===
            JSON.stringify(conversionParameter.fromCurrency));
    };
    ExchangeRateRecordDeterminer.prototype.ifRateToCurrencyMatchesParamToCurrency = function (exchangeRate, conversionParameter) {
        return (JSON.stringify(exchangeRate.toCurrency) ===
            JSON.stringify(conversionParameter.toCurrency));
    };
    ExchangeRateRecordDeterminer.prototype.ifRateFromCurrencyMatchesParamToCurrency = function (exchangeRate, conversionParameter) {
        return (JSON.stringify(exchangeRate.fromCurrency) ===
            JSON.stringify(conversionParameter.toCurrency));
    };
    ExchangeRateRecordDeterminer.prototype.ifRateToCurrencyMatchesParamFromCurrency = function (exchangeRate, conversionParameter) {
        return (JSON.stringify(exchangeRate.toCurrency) ===
            JSON.stringify(conversionParameter.fromCurrency));
    };
    ExchangeRateRecordDeterminer.prototype.ifRateFromOrToCurrencyMatchesParamFromCurrency = function (exchangeRate, conversionParameter) {
        return (this.ifRateFromCurrencyMatchesParamFromCurrency(exchangeRate, conversionParameter) ||
            this.ifRateToCurrencyMatchesParamFromCurrency(exchangeRate, conversionParameter));
    };
    ExchangeRateRecordDeterminer.prototype.ifRateFromOrToCurrencyMatchesParamToCurrency = function (exchangeRate, conversionParameter) {
        return (this.ifRateToCurrencyMatchesParamToCurrency(exchangeRate, conversionParameter) ||
            this.ifRateFromCurrencyMatchesParamToCurrency(exchangeRate, conversionParameter));
    };
    ExchangeRateRecordDeterminer.prototype.ifFromToCurrencyMatchesForDirectConversion = function (exchangeRate, conversionParameter) {
        return (this.ifRateFromCurrencyMatchesParamFromCurrency(exchangeRate, conversionParameter) &&
            this.ifRateToCurrencyMatchesParamToCurrency(exchangeRate, conversionParameter));
    };
    ExchangeRateRecordDeterminer.prototype.ifFromToCurrencyMatchesForInvertedConversion = function (exchangeRate, conversionParameter) {
        return (this.ifRateFromCurrencyMatchesParamToCurrency(exchangeRate, conversionParameter) &&
            this.ifRateToCurrencyMatchesParamFromCurrency(exchangeRate, conversionParameter));
    };
    /* exchange rates with 'From' Currency as 'From' or 'To' Currency of
     * conversionParameter or 'To' Currency as Reference Currency or direct rate
     * i.e. matched 'From' and 'To' Currency in exchange rate and conversion
     * parameter.
     */
    ExchangeRateRecordDeterminer.prototype.ifRateHasDirectOrToAsReferenceCurrency = function (exchangeRate, conversionParameter) {
        return (this.ifFromToCurrencyMatchesForDirectConversion(exchangeRate, conversionParameter) ||
            (this.ifRateToCurrencyMatchesReferenceCurrency(exchangeRate, conversionParameter) &&
                this.ifRateFromCurrencyMatchesParamFromOrToCurrency(exchangeRate, conversionParameter)));
    };
    ExchangeRateRecordDeterminer.prototype.ifRateFromCurrencyMatchesParamFromOrToCurrency = function (exchangeRate, conversionParameter) {
        return (this.ifRateFromCurrencyMatchesParamFromCurrency(exchangeRate, conversionParameter) ||
            this.ifRateFromCurrencyMatchesParamToCurrency(exchangeRate, conversionParameter));
    };
    ExchangeRateRecordDeterminer.prototype.ifRateToCurrencyMatchesReferenceCurrency = function (exchangeRate, conversionParameter) {
        var _a, _b;
        return (JSON.stringify(exchangeRate.toCurrency) ===
            JSON.stringify((_b = (_a = this._exchangeRateTypeDetailMap) === null || _a === void 0 ? void 0 : _a.get(conversionParameter.exchangeRateType)) === null || _b === void 0 ? void 0 : _b.referenceCurrency));
    };
    ExchangeRateRecordDeterminer.prototype.ifRatesDataProviderCodeMatches = function (exchangeRate, ratesDataProviderCode) {
        return (exchangeRate.ratesDataProviderCode != null &&
            ratesDataProviderCode != null &&
            exchangeRate.ratesDataProviderCode !== undefined &&
            ratesDataProviderCode !== undefined &&
            exchangeRate.ratesDataProviderCode.dataProviderCode ===
                ratesDataProviderCode.dataProviderCode);
    };
    ExchangeRateRecordDeterminer.prototype.ifRatesDataSourceMatches = function (exchangeRate, ratesDataSource) {
        return (exchangeRate.ratesDataSource != null &&
            ratesDataSource != null &&
            exchangeRate.ratesDataSource !== undefined &&
            ratesDataSource !== undefined &&
            exchangeRate.ratesDataSource.dataSource === ratesDataSource.dataSource);
    };
    ExchangeRateRecordDeterminer.prototype.ifRatesDataProviderMatchesOrHasNullValue = function (exchangeRate, ratesDataProviderCode) {
        return (exchangeRate.ratesDataProviderCode == null ||
            ratesDataProviderCode == null ||
            this.ifRatesDataProviderCodeMatches(exchangeRate, ratesDataProviderCode));
    };
    ExchangeRateRecordDeterminer.prototype.ifRatesDataSourceMatchesOrHasNullValue = function (exchangeRate, ratesDataSource) {
        return (exchangeRate.ratesDataSource == null ||
            ratesDataSource == null ||
            this.ifRatesDataSourceMatches(exchangeRate, ratesDataSource));
    };
    ExchangeRateRecordDeterminer.prototype.referenceCurrencyExists = function (rateType) {
        var _a, _b, _c;
        return (this.rateTypeExists(rateType) &&
            ((_b = (_a = this._exchangeRateTypeDetailMap) === null || _a === void 0 ? void 0 : _a.get(rateType)) === null || _b === void 0 ? void 0 : _b.referenceCurrency) !=
                null &&
            ((_c = this._exchangeRateTypeDetailMap.get(rateType)) === null || _c === void 0 ? void 0 : _c.referenceCurrency) !==
                undefined);
    };
    ExchangeRateRecordDeterminer.prototype.rateTypeExists = function (rateType) {
        return (this._exchangeRateTypeDetailMap != null &&
            this._exchangeRateTypeDetailMap !== undefined &&
            this._exchangeRateTypeDetailMap.get(rateType) != null &&
            this._exchangeRateTypeDetailMap.get(rateType) !== undefined);
    };
    ExchangeRateRecordDeterminer.prototype.isInversionAllowed = function (rateType) {
        var _a, _b, _c;
        return (this.rateTypeExists(rateType) &&
            ((_c = (_b = (_a = this._exchangeRateTypeDetailMap) === null || _a === void 0 ? void 0 : _a.get(rateType)) === null || _b === void 0 ? void 0 : _b.isInversionAllowed) !== null && _c !== void 0 ? _c : false));
    };
    ExchangeRateRecordDeterminer.prototype.multipleDataProviderOrSourceExists = function (exchangeRate, firstItemFromList) {
        return (!this.ifRatesDataProviderMatchesOrHasNullValue(exchangeRate, firstItemFromList.ratesDataProviderCode) ||
            !this.ifRatesDataSourceMatchesOrHasNullValue(exchangeRate, firstItemFromList.ratesDataSource));
    };
    ExchangeRateRecordDeterminer.DEFAULT_SCALE = 14;
    return ExchangeRateRecordDeterminer;
}());
exports.ExchangeRateRecordDeterminer = ExchangeRateRecordDeterminer;
