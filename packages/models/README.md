# Currency Conversion Models

Currency Conversion is a JS library that you can use to convert currency exchange rates. You can perform conversions either with one currency pair or perform multiple conversions through a single API call. You can use a data adapter to provide exchange rates, configuration settings, and so on.

## Fixed Rate

The exact exchange rate provided at run-time. The library uses the run-time rates to perform the conversion.

## Non-Fixed Rate

A set of exchange rates you provide to the library. The library picks the "best rate" from the list and uses it to perform each conversion. This "best rate" is determined by using various factors such as the from currency, to currency, the date time for which the conversion is requested, and the exchange rate type. If provided, the provider and source are also taken into consideration. The inversion and reference currency settings, if set, are considered to decide which rate to use.

You must implement the data adapter to enable the library to read the exchange rates from your data source.