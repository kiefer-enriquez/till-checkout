//API LAYER
import client from "./client";

const debitRequest = (
  { merchantApi, transactionId, amount, transactionToken },
  callback
) => {
  client.postDebitPayment(
    {
      merchantApi,
      amount,
      transactionId,
      transactionToken,
    },
    (res) => {
      callback(res);
    }
  );
};

// TBC (alpha testing)
const statusRequest = ({ uuid }) => {
  let endpoint = `/status/4gaw3UnTwYzXa9hnKgyT/getByUuid/${uuid}`;
  client.getStatus(endpoint);
};

export default { debitRequest, statusRequest };
