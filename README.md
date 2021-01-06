# Cloud SDK Currency Conversion

## Description

Currency Conversion is an extension library built on SAP Cloud SDK. You can use this library to facilitate currency exchange rate conversions.

> The library does not provide any market data out-of-the-box. You must provide the currency exchange rates to the library from your own data sources. You can use the [SAP Market Rates Management](https://www.sap.com/products/market-rates-management.html) service or any other of your choice.

You can use the library for the following functions:

- Direct one-to-one conversions, from a source currency to a target currency.
- Indirect conversions by using inverse rates or a "reference currency".
- Fixed rate conversions, for when you have the exact currency exchange rate that you want to use in your conversion operations.
- Non-fixed rate conversions, for when you have a set of exchange rates, as opposed to the exact rate. The library will pick the "best rate" from the set depending on [various factors](https://sap.github.io/cloud-sdk/docs/java/features/extensions/extension-library/curconv/sap-currency-conversion-extension-library-for-cloud-sdk-for-java/#non-fixed-rate).

The library provides the following modules:

- [Core](packages/core/)
- [Adapter](packages/adapter/)
- [Models](packages/models/)

## Features

### Convert Currencies

Get currency exchange rates converted from a base currency to a target currency by using the Currency Conversion library.

#### Get Bulk Conversions

Get multiple currency pairs converted through a single call. You can use the library methods to get more than one currency pair converted at the same time.

#### Get Direct and Indirect Conversions

Get direct and indirect currency conversions for your currency pairs. Direct conversions are one-to-one conversions between a source and a target currency. Indirect conversions are performed by using inverse rates or a reference currency.

## Requirements

Currency Conversion requires the following to run:

- TypeScript 4.0.2+
- Node.js
- @sap/cds 4.3.0+

## Download and Installation

1. Clone the repository

```bash
git clone https://github.com/sap-staging/cloud-sdk-currency-conversion.git
```

2. Install the dependencies

```bash
yarn install
```

## Usage

The following code examples show the various usages of the library:

- [Direct Conversion](https://github.com/sap-staging/cloud-sdk-currency-conversion/tree/open-source-documentation/packages/core#usage)

- [Non-Fixed Rate Conversion](https://github.com/sap-staging/cloud-sdk-currency-conversion/tree/open-source-documentation/packages/adapter#usage)

## How to obtain support

The GitHub issue tracker is the preferred channel for bug reports, features requests and asking questions.

## License

This project is licensed under Apache 2.0 as noted in the [license file](https://github.com/sap-staging/cloud-sdk-currency-conversion/blob/main/LICENSES/Apache-2.0.txt).
