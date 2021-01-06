# SAP Cloud SDK Currency Conversion Data Adapter

The SAP Cloud SDK currency conversion library is a TypeScript library that you can use to convert currency exchange rates. You can perform conversions either with one currency pair or perform multiple conversions through a single API call. You can use a data adapter to provide exchange rates, configuration settings, and so on.

The data adapter provides the library with access to relevant exchange rates and configurations. You use the data adapter to send currency exchange rates to the library.

At runtime, the conversion library interacts with the data adapter by calling the relevant methods to provide the information you request.

## Usage

The following code examples show the various usages of the module:

### Non-Fixed Rate Conversion

1. Single Conversion

```js
import {
  BulkConversionResult,
  SingleNonFixedRateConversionResult,
  ConversionParameterForNonFixedRate,
  TenantSettings
} from '@sap-cloud-sdk/currency-conversion-models';
import { SimpleIntegrationObjectsAdapter } from '@sap-cloud-sdk/currency-conversion-data-adapter';
import { CurrencyConverter } from '@sap-cloud-sdk/currency-conversion-core';
// Initialize the Currency Conversion Library.
const currConverter = new CurrencyConverter();

// Initialize the Data Adapter implementation you would like to use.
const dataAdapter = new SimpleIntegrationObjectsAdapter();

// Prepare the parameter for your conversion request.
const eurUsdMidParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'EUR',
  'USD',
  '500.123',
  'MID',
  new Date('2020-02-01T02:30:00Z')
);

// Prepare the override tenant setting
const overrideTenantSetting: TenantSettings = { ratesDataProviderCode: 'MRM', ratesDataSource: 'ECB' };

// Call the conversion library for a single conversion using adapter.

try {
  const singleConversionresult: SingleNonFixedRateConversionResult = await currConverter.convertCurrencyWithNonFixedRate(
    eurUsdMidParam,
    dataAdapter,
    { id: 'TenantID' },
    overrideTenantSetting
  );
  const convertedAmount = singleConversionresult.convertedAmount.decimalValue;
} catch (error) {
  // Exception handling here
}
```

2. Bulk Conversion

```js
// Or... if you would like to perform bulk conversions, use the following...

const jpyUsdMidParam: ConversionParameterForNonFixedRate = new ConversionParameterForNonFixedRate(
  'JPY',
  'USD',
  '485.324',
  'MID',
  new Date('2020-01-01T02:30:00Z')
);

const paramList = [eurUsdMidParam, jpyUsdMidParam];

// ...and so on.

// Call the conversion library for bulk conversion.

try {
  const bulkConversionResult: BulkConversionResult<
    ConversionParameterForNonFixedRate,
    SingleNonFixedRateConversionResult
  > = await currConverter.convertCurrenciesWithNonFixedRate(paramList, dataAdapter, TENANT_ID, overrideTenantSetting);
} catch (error) {
  // Exception handling here;
}

// Process the results.

paramList.forEach((param: ConversionParameterForNonFixedRate) => {
  if (bulkConversionResult.get(param) instanceof SingleNonFixedRateConversionResult) {
    const convertedAmount = bulkConversionresult.get(param).convertedAmount.decimalValue;
  } else {
    // Handle specific failures.
  }
});
```
