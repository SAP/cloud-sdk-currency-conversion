# Cloud SDK Currency Conversion

## Description

Currency Conversion is an extension library built on SAP Cloud SDK. You can use this library to facilitate currency exchange rate conversions.

> The library does not provide any market data out-of-the-box. You must provide the currency exchange rates to the library from your own data sources. You can use the SAP Market Rates Management service or any other of your choice.

You can use the library for the following functions:

- Direct one-to-one conversions, from a source currency to a target currency.
- Indirect conversions by using inverse rates or a "reference currency".
- Fixed rate conversions, for when you have the exact currency exchange rate that you want to use in your conversion operations.
- Non-fixed rate conversions, for when you have a set of exchange rates, as opposed to the exact rate. The library will pick the "best rate" from the set depending on [various factors](https://sap.github.io/cloud-sdk/docs/java/features/extensions/extension-library/curconv/sap-currency-conversion-extension-library-for-cloud-sdk-for-java/#non-fixed-rate).

## Requirements

Currency Conversion requires the following to run:

- TypeScript 4.0.2+
- Node.js
- @sap/cds 4.3.0+

## Download and Installation

```bash

git clone https://github.com/sap-staging/cloud-sdk-currency-conversion.git

yarn install

```

## How to obtain support

You can report a BCP incident or error through the SAP Support Portal Information published on the SAP site. Use XX-S4C-SDK-CC as the component.

## Contributing

## License

This project is licensed under Apache 2.0 as noted in the [license file](https://github.com/sap-staging/cloud-sdk-currency-conversion/blob/main/LICENSES/Apache-2.0.txt).
