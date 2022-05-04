//CLIENT
import axios from "axios";

//debit
const postDebitPayment = (
  {
    merchantApi,
    amount,
    transactionToken,
    isRecurring = false,
    transactionId: merchantTransactionId,
  },
  callback
) => {
  const { transactionApiUrl, apiKey, apiUser, apiPassword } = merchantApi;
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
      // console.log(`Status: ${res.status}`);
      // console.log('Body: ', res.data);
      callback(res.data);
    })
    .catch((err) => {
      // console.log('App Error:\n' + err);
      // console.log('Error Data:\n', err.response.data);
      callback(err.response.data);
    });
};

//test
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
