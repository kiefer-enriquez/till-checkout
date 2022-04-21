//TillCheckout alpha version
/*
### Roadmap
- security, obfuscate api creds by processing debit request on backend
- advance form styling
- autofill feature
- cvv refreshing feature
- eslint
- typescript
*/
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import transactionRequest from "./src/api/transactionRequest";

const TillCheckout = ({ merchantApi, amount, onSucccess, onError }) => {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const handleWebMessageEvent = (data) => {
    //debit
    if (data !== "false") {
      setIsPaymentLoading(true);
      transactionRequest.debitRequest(
        {
          merchantApi,
          amount,
          transactionToken: data,
        },
        (response) => {
          setIsPaymentLoading(false);
          console.log(response);
          //callback
          !response.success
            ? onError({ success: false, response })
            : onSucccess({ success: true, response });
        }
      );
    }
  };

  return (
    <>
      {isPaymentLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#FF591F" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: `${merchantApi.webClientUrl}/?amount=${amount}` }}
            style={{ marginTop: 20 }}
            onMessage={(event) => {
              handleWebMessageEvent(event.nativeEvent.data);
            }}
          />
        </View>
      )}
    </>
  );
};

export default TillCheckout;
