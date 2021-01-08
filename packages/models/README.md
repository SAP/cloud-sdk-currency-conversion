# SAP Cloud SDK Currency Conversion Models

The SAP Cloud SDK currency conversion library is a TypeScript library that you can use to convert currency exchange rates. You can perform conversions either with one currency pair or perform multiple conversions through a single API call. You can use a data adapter to provide exchange rates, configuration settings, and so on.

## Fixed Rate

It is the exact exchange rate provided at run-time. The library uses the run-time rates to perform the conversion.

## Non-Fixed Rate

It is a set of exchange rates provided to the library. The library picks the "best rate" from the list and uses it to perform each conversion. This "best rate" is determined by using various factors such as the from currency, to currency, the date time for which the conversion is requested, and the exchange rate type. If provided, the provider and source are also taken into consideration. The inversion and reference currency settings, if set, are considered to decide which rate to use.

You must implement a data adapter to enable the library to read the exchange rates from your data source.
