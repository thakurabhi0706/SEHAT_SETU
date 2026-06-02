import axios from "axios";

const API_URL =
  "http://localhost:5000/api/patient";

export const getPatientProfile =
  async () => {

    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/profile`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return response.data;
};

export const updatePatientProfile =
  async (data) => {

    const token =
      localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/profile`,
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return response.data;
};