import axios from "axios";

const API_URL =
  "http://localhost:5000/api/payment";

export const createPaymentOrder = async (
  appointmentId
) => {

  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/create-order`,
    { appointmentId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const verifyPayment = async (
  paymentData
) => {

  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/verify`,
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};