# Merchant Configuration Endpoint

This project consists of an api endpoint (at /api/merchant_config) that allows a registered merchant to update their  pre qualification status, and minimum/maximum loan amounts for their store.

Note that this Api endpoint can only be used to update the merchant configuration; it requires the merchant ID to already exist in the DB. If a request is made with an invalid or nonexistent merchant ID, it will return a 400 error.

Some data validation checks are implemented (see js/repo/index, MerchantRepo verify_merchant_configuration). Data validation checks need to be reviewed based on business logic (ie. min/max loan amount caps, etc.) The frontend should also perform a check to ensure all required fields min loan amount, max loan amount and prequalification are being provided.

The DB schema was modified to include the prequal_enabled (boolean) property. There is currently no default value assigned to it. Should prequal be enabled or disabled by default?


# Unit Tests
The following Unit Tests have been implemented for the route:

* POST request to /api/merchant_config returns 200 if merchant configuration was updated successfully
* POST request to /api/merchant_config returns 400 if there is no merchant registered to the merchant ID
* POST request to /api/merchant_config returns 400 if minimum loan amount is invalid
* POST request to /api/merchant_config returns 400 if maximum loan amount is invalid
* POST request to  /api/merchant_config returns 400 if prequal value is invalid


## Setting up your Development Environment
```
npm i
npm start
```
