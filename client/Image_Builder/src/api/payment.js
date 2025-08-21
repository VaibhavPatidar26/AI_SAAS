import axios from "axios";

export async function apiCreateOrder(amount, token, backendUrl) {
  return await axios.post(`${backendUrl}api/users/BuyCredit/order`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export async function apiVerifyPayment(paymentResponse, alpha, token, backendUrl) {
  return await axios.post(`${backendUrl}api/users/BuyCredit/verify`,
    { ...paymentResponse, credits: alpha },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
