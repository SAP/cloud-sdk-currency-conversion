# SAP Cloud SDK Currency Conversion Integration Objects

The SAP Cloud SDK currency conversion library is a TypeScript library that can be used to convert currency exchange rates. You can perform conversions with either one currency pair or multiple conversions through a single API call. You can use a data adapter to provide exchange rates, configuration settings, and so on.

## Integration Objects

Integration objects are reusable artifacts consisting of data models that send the required information to the library, and services that operate on the data models. These artifacts are shipped with Currency Conversion and can be used in addition to the library.

Integration objects come with data models and services that you can use to send persisted information to the library, rather than providing all the information at run time. Integration objects are intended to help with the use of the library but you can consume the library without them by using a custom data adapter.

The OData services provided are as follows:

* Simple Currency Exchange Rate

* Simple Exchange Rate Type

* Simple Tenant Configuration
