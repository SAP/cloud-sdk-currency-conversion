/* Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  ConversionParameterForFixedRate,
  CurrencyAmount,
  SingleFixedRateConversionResult
} from '@sap-cloud-sdk/currency-conversion-models';
import { BigNumber } from 'bignumber.js';
import { CURR_FORMAT } from './non-fixed-rate-helper';

export function performSingleFixedConversion(
  conversionParams: ConversionParameterForFixedRate
): SingleFixedRateConversionResult {
  const convertedAmount =
    conversionParams.fromCurrency.currencyCode === conversionParams.toCurrency.currencyCode
      ? new CurrencyAmount(conversionParams.fromAmount.decimalValue.toFormat(CURR_FORMAT))
      : calculateConvertedAmtForFixedRate(conversionParams);
  const numOfDefaultFractionDigs = conversionParams.toCurrency.defaultFractionDigits;
  const roundedValString = convertedAmount.decimalValue.toFormat(
    numOfDefaultFractionDigs,
    BigNumber.ROUND_HALF_UP,
    CURR_FORMAT
  );
  const roundedOffAmount = new CurrencyAmount(roundedValString);
  return new SingleFixedRateConversionResult(convertedAmount, roundedOffAmount);
}

function calculateConvertedAmtForFixedRate(conversionParams: ConversionParameterForFixedRate): CurrencyAmount {
  const result = conversionParams.fromAmount.decimalValue.multipliedBy(conversionParams.fixedRateValue.decimalValue);
  return new CurrencyAmount(result.toFormat(CURR_FORMAT));
}
