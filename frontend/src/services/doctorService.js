import axios from "axios";

const API_URL = "http://localhost:5000/api/doctor";

export const getDoctorProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateDoctorProfile = async (data) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/profile`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await axios.get(
    `http://localhost:5000/api/doctor/${id}`
  );

  return response.data;
};