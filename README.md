# Till React Native

React Native support for [Payment.js](https://gateway.tillpayments.com/documentation/gateway#payment-js-javascript-integration).

## Description

The following library allows developers to use [Payment.js](ttps://gateway.tillpayments.com/documentation/gateway#payment-js-javascript-integration) with react native without ejecting. Developers can use it with both client and server side integrations.

## Prequisites

- This library relies on:

[React Native Webview](https://www.npmjs.com/package/react-native-webview), [Axio](https://www.npmjs.com/package/axios) and . Please follow [this guide](https://github.com/react-native-community/react-native-webview/blob/HEAD/docs/Getting-Started.md) to install in your project first..

## Installation

- Ensure you've completed the setps in [prequisites.](#prequisites)

- Install package via npm or yarn:

`npm install --save tillcheckout` OR `yarn add tillcheckout`

- Import in your project

```javascript
import TillCheckout from "tillcheckout";
```

## Usage

```jsx
import TillCheckout from "tillcheckout";

/*
This is STRICTLY for DEMO purposes only.
Please DO NOT store api information to your files (dev or live). 

We are looking to improve how we can get debit request process on a backend instead.
*/
const apiInfo = {
  transactionApiUrl: "", // till payment gateway url
  apiKey: "",
  apiUser: "",
  apiPassword: "",
  transactionId: "", // unique transaction id
  webClientUrl: "", // form url to tokenize credit card details
};

const MyTillCheckout = () => (
  <TillCheckout
    merchantApi={apiInfo}
    amount="2.00"
    onSucccess={(data) =>
      console.log("Till checkout session is successful:", data)
    }
    onError={(err) => {
      Alert.alert("Error", err.response.errorMessage, [
        {
          text: "OK",
        },
      ]);
    }}
  />
);

export default MyTillCheckout;
```

## Component props

- `merchantApi` (Object) - REQUIRED key-val api data.
- `onSuccess` (?Function) - Called upon success of the payment session
- `onError` (?Function) - Called upon error of the checkout session
- `amount` (String) - Decimals separated by ., max. 3 decimals

### Roadmap

- security, obfuscate api creds by processing debit request on backend
- advance form styling
- autofill feature
- cvv refreshing feature
- eslint
- typescript
