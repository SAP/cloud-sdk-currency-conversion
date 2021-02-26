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

## Usage

In reference application, a typical package.json to consume Integration Objects would be as below:
``` {
  "name": "integration-objects-refapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "postinstall": "cp -r node_modules/@sap-cloud-sdk/currency-conversion-integration-objects/srv/* srv/ && cp -r node_modules/@sap-cloud-sdk/currency-conversion-integration-objects/db/* db/ && cp -r node_modules/@sap-cloud-sdk/currency-conversion-integration-objects/cds-security.json .",
    "build": "cds build/all"
  },
  "cds": {
    "requires": {
      "uaa": {
        "kind": "xsuaa"
      },
      "db": {
        "kind": "hana"
      }
    }
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@sap-cloud-sdk/currency-conversion-core": "0.0.2-3e22957",
    "@sap-cloud-sdk/currency-conversion-models": "0.0.2-3e22957",
    "@sap-cloud-sdk/currency-conversion-data-adapter": "0.0.2-3e22957",
    "@sap-cloud-sdk/currency-conversion-integration-objects": "0.0.2-3e22957"
  }
}

```
The following steps need to be done beforehand: 
1. Create srv and db folders in your project as a typical CDS project should look like.
	
2. Having the postinstall hook in the package.json as above The names 'srv' and 'db' into which you'd be moving the downloaded artifacts should be the same as that you created in the previous step. It also moves the cds-security.json to the parent directory.
	
3. To run the APIs, the user would need to be assigned the roles CurrencyConversionDisplay or CurrencyConversionConfigure depending on what roles the user would need as the token generation would require this step to have been done in prior. The xsuaa section under the cds in the package.json takes care of this.
	
4. The DB kind would need to be specified based on the DB being used. The above example shows hana being used. This configuration would generate native artifacts. 

5. To build this entire project, you'd need to run the build script from the package.json. This step generates all the corresponding native artifacts for db and srv and also generates the manifest.yml files in case you'd need to deploy the modules individually.
