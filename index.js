//TillCheckout alpha version
/*
### Roadmap
- advance form styling
- autofill feature
- cvv refreshing feature
- eslint
*/
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import transactionRequest from "../api/transactionRequest";

const TillCheckout = ({
  merchantApi,
  transactionId,
  amount,
  onSucccess,
  onError,
}) => {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const handleWebMessageEvent = (data) => {
    //debit
    if (data !== "false") {
      setIsPaymentLoading(true);
      transactionRequest.debitRequest(
        {
          merchantApi,
          transactionId,
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
