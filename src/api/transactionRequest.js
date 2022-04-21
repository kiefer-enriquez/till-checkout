//API LAYER
import client from "./client";

const debitRequest = ({ merchantApi, amount, transactionToken }, callback) => {
  client.postDebitPayment(
    {
      merchantApi,
      amount,
      transactionToken,
    },
    (res) => {
      callback(res);
    }
  );
};

// TBC (testing)
const statusRequest = ({ uuid }) => {
  let endpoint = `/status/4gaw3UnTwYzXa9hnKgyT/getByUuid/${uuid}`;
  client.getStatus(endpoint);
};

export default { debitRequest, statusRequest };
