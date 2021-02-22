# SAP Cloud SDK Currency Conversion Integration Objects

The SAP Cloud SDK currency conversion library is a TypeScript library that can be used to convert amounts to different currencies. Conversions can be performed with either one currency pair or multiple conversions through a single API call. You can use a data adapter to provide exchange rates, configuration settings, and so on.

## Integration Objects

Integration objects are reusable artifacts consisting of data models that send the required information to the library and services that operate on the data models. These can be used to send persisted information, rather than providing all the information at run time. These objects are intended to help with the use of the library but you can consume the library without them by using a custom data adapter.

The following OData services are provided:

* Simple Currency Exchange Rate

* Simple Exchange Rate Type

* Simple Tenant Configuration

> NOTE:
To consume integration objects, the project must contain libraries relevant to [SAP Cloud Application Programming Model](https://cap.cloud.sap/docs/) or CAP.
