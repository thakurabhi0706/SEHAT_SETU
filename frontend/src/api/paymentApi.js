import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const createPaymentOrder = async (
  appointmentId
) => {
  const response = await api.post(
    `/payment/create-order`,
    { appointmentId }
  );

  return response.data;
};

export const verifyPayment = async (
  paymentData
) => {
  const response = await api.post(
    `/payment/verify`,
    paymentData
  );

  return response.data;
};