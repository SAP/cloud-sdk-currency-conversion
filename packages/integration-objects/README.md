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

In a reference application, a typical package.json to consume Integration Objects is as follows:
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
  "license": "Apache-2.0",
  "dependencies": {
    "@sap-cloud-sdk/currency-conversion-core": "0.0.1",
    "@sap-cloud-sdk/currency-conversion-models": "0.0.1",
    "@sap-cloud-sdk/currency-conversion-data-adapter": "0.0.1",
    "@sap-cloud-sdk/currency-conversion-integration-objects": "0.0.1"
  }
}

```
Following are the prerequisites: 
1. Create *srv* and *db* folders in your project as a typical CDS project would look like.
	
2. Ensure that the *postinstall* hook in the package.json is present as above. The folders named *srv* and *db* into which you would be copying the downloaded artifacts should be the same as the ones created in step 1. This step also copies the *cds-security.json* to the parent directory.

3. To bind roles to the xsuaa service, one would need to bind the role definition provided in the cds-security.json to the xsuaa service in the deployment descriptor under the resources section. A typical configuration in the mta.yaml file would look like the below:
```parameters:
      service: xsuaa
      service-plan: application
      path: ./cds-security.json
```

4. To run the APIs, the user needs to be assigned the roles of *CurrencyConversionDisplay* or *CurrencyConversionConfigure* that have been generated after completing step 3. The *xsuaa* section under the *cds* in the package.json takes care of this. If step 3 was skipped, all users would be able to access the APIs.
	
5. The database kind needs to be specified based on the database being used. The above example shows HANA being used. This configuration would generate native artifacts. 

6. To build this entire project, you need to run the *build* script from the package.json. This step generates all the corresponding native artifacts for *db* and *srv*. It generates the *manifest.yml* files too in case you need to deploy the modules individually.
