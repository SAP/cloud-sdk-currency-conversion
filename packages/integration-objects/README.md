# SAP Cloud SDK Currency Conversion Integration Objects

The SAP Cloud SDK currency conversion library is a TypeScript library that can be used to convert currency exchange rates. You can perform conversions with either one currency pair or multiple conversions through a single API call. You can use a data adapter to provide exchange rates, configuration settings, and so on.

## Integration Objects

Integration objects come with data models, UIs, and services that you can use to send persisted information to the library, rather than providing all the information at run time. Integration objects are intended to help with the use of the library but you can consume the library without them by using a custom data adapter.

The OData services come in two variants: draft-enabled and draft-disabled. If you intend to use both the OData services and UIs, use the draft-enabled OData APIs. This API structure mimics the draft record creation in the Manage Default Configurations application when you create more than one configuration. However, if you intend to use only the OData APIs, it is recommended that you use the draft-disabled services, which are as follows:

* Simple Currency Exchange Rate

* Simple Exchange Rate Type

* Simple Tenant Configuration
