import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_BASE_URL}/prescriptions`;

export const createPrescription =
  async (prescriptionData) => {

    const token =
      localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/create`,
      prescriptionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
};

export const getPatientPrescriptions =
  async () => {

    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/patient`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
};