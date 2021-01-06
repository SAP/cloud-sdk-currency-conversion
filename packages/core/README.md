# Currency Conversion Core

Currency Conversion is a JS library that you can use to convert currency exchange rates. You can perform conversions either with one currency pair or perform multiple conversions through a single API call. You can use a data adapter to provide exchange rates, configuration settings, and so on.

## Direct Conversions

Direct conversions happen between a source currency and a target currency, by using the exact rate from the source to the target currency. A conversion request with USD as the source currency and EUR as the target currency is performed only if an exchange rate from USD to EUR is available. Conversions will fail if, say, only the rate from EUR to USD is available.

However, this scenario is covered by indirect conversions as described in the following section.

## Indirect Conversions By Using an Inverse Rate

You can request a conversion from INR to USD even if the rates available are from USD to INR. You (or your consumers) enable the inverse rates setting for each exchange rate type. You can then provide the rate type information by using the data adapter. Note that inverse rates are only used if no direct rates are available. For example, if you have enabled the inverse rate type for INR to USD and if a direct rate is available for this currency pair, it will still be given precedence over the inverse rate. If a direct rate from INR to USD is not found, the library looks for the USD to INR rate.

## Indirect Conversions By Using a Reference Rate

A currency conversion can be performed by using a reference or intermediate currency outside of your desired currency pair. A conversion from INR to USD can be performed by using a reference currency, say EUR, with the currency exchange rates for INR to EUR and USD to EUR. Note that this can be done only if a reference currency for these rates is specified in when you define these exchange rate pairs, in the 'toCurrency' field.

## Usage

### Direct Conversion

```js
import {
  SingleFixedRateConversionResult,
  ConversionParameterForFixedRate
} from '@sap-cloud-sdk/currency-conversion-models';
import { CurrencyConverter } from '@sap-cloud-sdk/currency-conversion-core';
// Initialize the Currency Conversion Library.
const currConverter = new CurrencyConverter();

try {
  const result: SingleFixedRateConversionResult = currConverter.convertCurrencyWithFixedRate(
    new ConversionParameterForFixedRate('INR', 'USD', '10.00', '70.23')
  );
} catch (error) {
  // Exception handling here
}
```

> INFO:
Indirect conversions using inverse rates and reference currencies are disabled by default. You can use the data adapter implementation to specify whether you want to enable them, for each exchange rate type.

> CAUTION:
If a reference currency is provided, it takes precedence over direct rates. The conversion will be performed based on the reference currency specified. Inverse rates are not considered in this scenario.
