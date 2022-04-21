//CLIENT
/*
### will potentially remove processing debit from mobile client later, for demo purpose only
*/
import axios from "axios";

//debit
const postDebitPayment = (
  { merchantApi, amount, transactionToken, isRecurring = false },
  callback
) => {
  const {
    transactionApiUrl,
    apiKey,
    apiUser,
    apiPassword,
    transactionId: merchantTransactionId,
  } = merchantApi;
  let debitUri = `${transactionApiUrl}/transaction/${apiKey}/debit`;
  let data = {
    merchantTransactionId,
    amount,
    currency: "AUD",
    withRegister: true,
    transactionIndicator: isRecurring ? "RECURRING" : "SINGLE",
    transactionToken,
  };
  axios
    .post(debitUri, data, {
      auth: {
        username: apiUser,
        password: apiPassword,
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

// TBC (testing)
//status check
const getStatus = (endpoint) => {
  axios
    .get(apiInfo.hostUrl + endpoint, {
      auth: {
        username: apiInfo.apiUser,
        password: apiInfo.apiPassword,
      },
    })
    .then((res) => {
      console.log(`Status: ${res.status}`);
      console.log("Body: ", res.data);
    })
    .catch((err) => {
      console.log("App Error:\n" + err);
      console.log("\nURI: \n" + statusUri);
      console.log("\nRequest Headers:\n" + err.request._header);
    });
};

export default {
  getStatus,
  postDebitPayment,
};
